// Updated imports
import express from 'express';
import cors from 'cors';
import db from './db.js';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import assessmentRoutes from './routes/assessment.js';

// Create __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Middleware setup
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Multer configuration to handle image uploads
const upload = multer({ dest: path.join(__dirname, 'python', 'uploads') });

// Default route to check server status
app.get('/', (req, res) => {
  res.send('✅ Backend is working!');
});

// API to fetch all questions
app.get('/api/questions', (req, res) => {
  db.query('SELECT * FROM questions', (err, results) => {
    if (err) {
      console.error('❌ Error fetching questions:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Use assessment routes
app.use('/api/assessment', assessmentRoutes);

// Updated submit endpoint
app.post('/api/submit', (req, res) => {
  const { answers, user_id, emotionScore } = req.body;

  console.log('📥 Received user_id:', user_id);
  console.log('📥 Received answers:', answers);
  console.log('📥 Received emotionScore:', emotionScore);

  // Validation
  if (!emotionScore || typeof emotionScore !== 'number') {
    return res.status(400).json({ error: 'Missing emotion analysis data' });
  }

  if (!Array.isArray(answers) || answers.some((a) => !a.answer) || !user_id) {
    return res.status(400).json({ error: 'Invalid answers or missing user_id' });
  }

  // Store responses in the database
  const values = answers.map(({ question_id, answer }) => [user_id, question_id, answer]);
  const insertQuery = 'INSERT INTO responses (user_id, question_id, answer) VALUES ?';

  db.query(insertQuery, [values], (err) => {
    if (err) {
      console.error('❌ Error saving responses:', err);
      return res.status(500).json({ error: 'Database error while saving responses' });
    }

    // Run the prediction script after saving responses
    const pythonScript = path.join(__dirname, 'python', 'predict.py');
    console.log('🚀 Running Python script at:', pythonScript);

    const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
    const pythonProcess = spawn(pythonCommand, [pythonScript, JSON.stringify(answers)]);

    let predictionData = '';
    pythonProcess.stdout.on('data', (data) => {
      predictionData += data.toString();
    });

    pythonProcess.stderr.on('data', (error) => {
      console.error('❌ Python script error:', error.toString());
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          // Get assessment score from Python script
          const { score: assessmentScore } = JSON.parse(predictionData.trim());

          // Calculate combined score (70% assessment + 30% facial)
          const totalScore = Math.round(assessmentScore * 0.7 + emotionScore * 0.3);

          // Save scores to database
          db.query(
            'INSERT INTO scores (user_id, assessment_score, facial_score, total_score) VALUES (?, ?, ?, ?)',
            [user_id, assessmentScore, emotionScore, totalScore],
            (err) => {
              if (err) {
                console.error('❌ Score save error:', err);
              }
            }
          );

          res.json({
            totalScore,
            breakdown: {
              assessment: assessmentScore,
              facial: emotionScore,
            },
          });
        } catch (parseError) {
          console.error('❌ Output parse error:', parseError);
          res.status(500).json({ error: 'Score calculation failed' });
        }
      } else {
        console.error('❌ Python script failed with exit code:', code);
        res.status(500).json({ error: 'Prediction failed' });
      }
    });
  });
});

// 🎥 Facial Recognition API to analyze emotions
app.post('/api/analyze', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  const imagePath = path.join(__dirname, 'python', 'uploads', req.file.filename);
  console.log('📸 Image received. Path:', imagePath);

  const pythonScript = path.join(__dirname, 'python', 'analyze.py');
  const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
  const pythonProcess = spawn(pythonCommand, [pythonScript, imagePath]);

  let analysisData = '';
  pythonProcess.stdout.on('data', (data) => {
    analysisData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error('❌ Facial Recognition error:', data.toString());
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      try {
        const { dominant_emotion, score } = JSON.parse(analysisData.trim());
        console.log('✅ Detected Emotion:', dominant_emotion, '| Score:', score);
        res.json({
          message: 'Emotion analysis complete',
          dominant_emotion,
          score,
        });
      } catch (parseError) {
        console.error('❌ Error parsing analysis output:', parseError);
        res.status(500).json({ error: 'Failed to parse facial analysis output' });
      }
    } else {
      console.error('❌ Facial recognition failed with exit code:', code);
      res.status(500).json({ error: 'Facial recognition analysis failed' });
    }
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
