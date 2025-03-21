import express from 'express';
import axios from 'axios';

const router = express.Router();

// Process assessment data and facial expression
router.post('/evaluate', async (req, res) => {
  try {
    const { answers, imageData } = req.body;

    // Calculate questionnaire score
    let questionnaireScore = 0;
    for (const answer of Object.values(answers)) {
      questionnaireScore += parseInt(answer);
    }

    // Send image to Python service for facial analysis
    const facialAnalysis = await axios.post('http://localhost:5000/analyze', {
      image: imageData,
    });

    // If facial analysis was successful, combine scores
    let totalScore = questionnaireScore;
    if (facialAnalysis.data.success) {
      // Weight questionnaire as 70% and facial analysis as 30%
      totalScore = Math.round(questionnaireScore * 0.7 + facialAnalysis.data.depression_score * 0.3);
    }

    // Determine result category
    const resultCategory = getResultCategory(totalScore);

    res.json({
      success: true,
      questionnaireScore,
      facialScore: facialAnalysis.data.success ? facialAnalysis.data.depression_score : null,
      totalScore,
      category: resultCategory.category,
      color: resultCategory.color,
    });
  } catch (error) {
    console.error('Assessment evaluation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process assessment',
    });
  }
});

function getResultCategory(score) {
  if (score <= 4) return { category: 'Minimal depression', color: 'green' };
  if (score <= 9) return { category: 'Mild depression', color: 'yellow' };
  if (score <= 14) return { category: 'Moderate depression', color: 'orange' };
  if (score <= 19) return { category: 'Moderately severe depression', color: 'red' };
  return { category: 'Severe depression', color: 'darkred' };
}

// ✅ Correct export syntax for ESM
export default router;
