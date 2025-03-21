"use client";
import "../../styles/assessment.css";
import { useState } from "react";
import { Button } from "../components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/card";
import { Progress } from "../components/progress";
import { RadioGroup, RadioGroupItem } from "../components/radio-group";
import { Label } from "../components/label";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import WebcamCapture from "../components/webcam-capture";
import { analyzeFacialExpression } from "../lib/facial-analysis";

// Define the Question interface
interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  { id: 1, question: "How are you feeling today?", options: ["😃 Very Happy", "🙂 Okay", "😐 Neutral"] },
  { id: 2, question: "How well did you sleep last night?", options: ["🌙 Very well (7+ hrs)", "😴 Fair (5-6 hrs)", "🥱 Poor (<5 hrs)"] },
  { id: 3, question: "Do you feel anxious or worried during the day?", options: ["😊 Rarely", "😕 Sometimes", "😟 Often"] },
  { id: 4, question: "Do you struggle to focus or make decisions?", options: ["🤓 Never", "🤔 Occasionally", "😵‍💫 Often"] },
  { id: 5, question: "Do you feel optimistic about your future?", options: ["🌟 Very optimistic", "🙂 Somewhat optimistic", "🤷‍♂️ Unsure"] },
  { id: 6, question: "Do you feel mentally exhausted?", options: ["💪 Not at all", "😐 Sometimes", "😩 Often"] },
  { id: 7, question: "If your feelings were weather, what would today be?", options: ["☀️ Sunny", "🌥️ Cloudy", "🌧️ Rainy"] },
  { id: 8, question: "Do you feel comfortable sharing your thoughts with someone?", options: ["🗣️ Yes, easily", "🤷 Sometimes", "🙊 Rarely"] },
  { id: 9, question: "How often do you feel proud of yourself?", options: ["🏆 Frequently", "🙂 Occasionally", "😞 Rarely"] },
  { id: 10, question: "If you could change one thing about how you feel, what would it be?", options: ["💤 Better sleep", "😃 More happiness", "⚡ More energy"] },
];

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [facialScore, setFacialScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [captureImage, setCaptureImage] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnswer = (value: string) => {
    const selectedOption = questions[currentQuestion].options.indexOf(value) + 1;
    setAnswers({ ...answers, [questions[currentQuestion].id]: selectedOption.toString() });
  };

  const handleNext = () => {
    if (!answers[questions[currentQuestion].id]) {
      toast({
        title: "Please select an answer",
        description: "You need to select an option before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Capture final facial expression before showing results
      setCaptureImage(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleImageCaptured = async (imageData: string) => {
    try {
      const expressionScore = await analyzeFacialExpression(imageData);
      setFacialScore(expressionScore);
      setShowResults(true);
    } catch (error) {
      console.error("Error analyzing facial expression:", error);
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    Object.values(answers).forEach((value) => {
      const parsedValue = Number(value);
      if (!isNaN(parsedValue)) {
        score += parsedValue;
      }
    });
    return score;
  };

  const getTotalScore = () => {
    const questionnaireScore = calculateScore();
    if (facialScore !== null) {
      return Math.round(questionnaireScore * 0.7 + facialScore * 0.3);
    }
    return questionnaireScore;
  };

  const getResultCategory = (score: number) => {
    if (score <= 4) return { category: "Minimal depression", color: "minimal" };
    if (score <= 9) return { category: "Mild depression", color: "mild" };
    if (score <= 14) return { category: "Moderate depression", color: "moderate" };
    if (score <= 19) return { category: "Moderately severe depression", color: "moderate-severe" };
    return { category: "Severe depression", color: "severe" };
  };

  const startAssessment = () => {
    setWebcamEnabled(true);
  };

  const result = getResultCategory(getTotalScore());
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!webcamEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 p-6">
        <Card className="w-full max-w-2xl shadow-lg rounded-xl border border-pink-200 bg-white/90 backdrop-blur-sm">
          <CardHeader className="px-8 pt-8 pb-6 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-pink-100">
            <CardTitle className="text-3xl font-semibold text-pink-700 font-poppins italic mb-2">
              Mental Wellness Evaluation
            </CardTitle>
            <CardDescription className="text-pink-600 text-base font-medium font-poppins italic">
              Enhanced with AI-Powered Facial Expression Analysis
            </CardDescription>
          </CardHeader>
  
          <CardContent className="px-8 py-6">
            <div className="space-y-5">
              <p className="text-gray-700 text-lg leading-relaxed">
                <span className="block font-poppins font-medium italic text-pink-600 mb-1">What to expect:</span>
                You'll answer 10 questions about your recent emotional state, accompanied by brief facial analysis 
                sessions to better understand your responses.
              </p>
  
              <div className="bg-pink-50/50 p-4 rounded-lg border border-pink-100">
                <p className="text-sm text-pink-700 italic font-poppins">
                  🛡️ Your privacy is protected: All analysis occurs locally in real-time, with no data storage.
                </p>
              </div>
            </div>
          </CardContent>
  
          <CardFooter className="px-8 py-6 bg-pink-50/30 border-t border-pink-100">
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="bg-black text-white font-medium px-6 py-3 rounded-lg border-2 border-black hover:bg-gray-800 hover:border-gray-800 transition-colors"
              >
                Go Back
              </Button>
              
              <Button
                onClick={startAssessment}
                className="bg-black text-white font-medium px-6 py-3 rounded-lg border-2 border-black hover:bg-gray-800 hover:border-gray-800 transition-colors"
              >
                Start Secure Session
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-pink-300 p-6">
        <Card className="w-full max-w-2xl shadow-2xl border-4 border-gray-300 rounded-lg bg-white">
          <CardHeader className="p-6 border-b-2 border-gray-300">
            <CardTitle className="text-3xl font-bold italic text-gray-900">
              Your Assessment Results
            </CardTitle>
            <CardDescription className="text-gray-700 text-lg font-semibold italic">
              Based on your responses and facial expression analysis
            </CardDescription>
          </CardHeader>
  
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold italic mb-2 text-gray-800">
                  Score: {getTotalScore()} / 30
                </h3>
                <Progress value={(getTotalScore() / 30) * 100} className={`h-3 ${result.color}`} />
              </div>
  
              <div className="p-6 rounded-lg bg-gray-100 border-2 border-gray-300">
                <h3 className="text-2xl font-bold italic text-gray-900 mb-2">{result.category}</h3>
                <p className="text-gray-700 text-lg italic leading-relaxed">
                  {result.category === "Minimal depression" &&
                    "Your responses suggest minimal symptoms of depression. Continue monitoring your mental health and practice self-care."}
                  {result.category === "Mild depression" &&
                    "Your responses suggest mild symptoms of depression. Consider speaking with a mental health professional for guidance."}
                  {result.category === "Moderate depression" &&
                    "Your responses suggest moderate symptoms of depression. We recommend consulting with a mental health professional."}
                  {result.category === "Moderately severe depression" &&
                    "Your responses suggest moderately severe symptoms of depression. Please consider seeking professional help soon."}
                  {result.category === "Severe depression" &&
                    "Your responses suggest severe symptoms of depression. We strongly recommend seeking professional help as soon as possible."}
                </p>
              </div>
  
              <div className="text-sm text-gray-600 italic">
                <p>
                  Note: This assessment is not a diagnostic tool. It's designed to help you understand your mental
                  wellbeing and determine if you might benefit from professional support.
                </p>
              </div>
            </div>
          </CardContent>
  
          <CardFooter className="p-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="bg-black text-white font-bold italic px-6 py-3 rounded-lg border-2 border-black transition-all duration-300 hover:bg-gray-800"
            >
              Return Home
            </Button>
  
            <Button
              onClick={() => window.print()}
              className="bg-black text-white font-bold italic px-6 py-3 rounded-lg border-2 border-black transition-all duration-300 hover:bg-gray-800"
            >
              Print Results
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 p-6">
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col md:flex-row gap-8 max-w-6xl">
        {/* Webcam Section */}
        <div className="w-full md:w-1/3 order-2 md:order-1 flex items-center justify-center">
          <WebcamCapture
            onCapture={handleImageCaptured}
            captureNow={captureImage}
            resetCapture={() => setCaptureImage(false)}
          />
        </div>
  
        {/* Assessment Section */}
        <div className="w-full md:w-2/3 order-1 md:order-2">
          <Card className="shadow-2xl rounded-xl bg-white border border-gray-100 overflow-hidden">
            <CardHeader className="p-8 border-b border-gray-200 bg-gradient-to-r from-pink-900 to-pink-500">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-3xl font-bold text-white font-poppins">
                    Question {currentQuestion + 1} of {questions.length}
                  </CardTitle>
                  <CardDescription className="text-pink-100 text-lg font-medium font-poppins mt-1">
                    Mental Health Assessment
                  </CardDescription>
                </div>
                <div className="text-lg font-semibold text-black font-poppins">
  Progress: <span className="font-bold text-black">{Math.round(progress)}%</span>
</div>


              </div>
              <Progress
                value={progress}
                className="h-2.5 rounded-full bg-pink-200 mt-4"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              />
            </CardHeader>
  
            <CardContent className="p-8">
              <div
                className="space-y-8"
                style={{
                  borderRadius: "12px",
                  background: "#fff",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                }}
              >
                <h3
                  className="text-2xl font-bold text-gray-800 font-poppins"
                  style={{
                    lineHeight: "1.4",
                  }}
                >
                  {questions[currentQuestion].question}
                </h3>
  
                <RadioGroup
                  value={answers[questions[currentQuestion].id] || ""}
                  onValueChange={handleAnswer}
                  className="space-y-4"
                >
                  {questions[currentQuestion].options.map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 cursor-pointer hover:bg-pink-50 border border-gray-200 hover:border-pink-300"
                    >
                      <RadioGroupItem
                        value={option}
                        id={`option-${option}`}
                        className="w-6 h-6 border-2 border-pink-400"
                      />
                      <Label
                        htmlFor={`option-${option}`}
                        className="flex-grow text-lg text-gray-700 font-poppins cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
  
            <CardFooter className="p-8 flex justify-between border-t border-gray-200">
            <Button
  onClick={handlePrevious}
  disabled={currentQuestion === 0}
  className="px-8 py-3 text-lg font-semibold font-poppins rounded-lg transition-all duration-300"
  style={{
    backgroundColor: currentQuestion === 0 ? "#d1d5db" : "#000", // Gray when disabled, Black when active
    color: "#fff",
    opacity: currentQuestion === 0 ? 0.7 : 1,
    cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
  }}
  onMouseEnter={(e) => {
    if (currentQuestion !== 0) {
      (e.target as HTMLButtonElement).style.backgroundColor = "#333"; // Slightly lighter black on hover
    }
  }}
  onMouseLeave={(e) => {
    if (currentQuestion !== 0) {
      (e.target as HTMLButtonElement).style.backgroundColor = "#000";
    }
  }}
>
  Previous
</Button>

<Button
  onClick={handleNext}
  className="px-8 py-3 text-lg font-semibold font-poppins rounded-lg transition-all duration-300"
  style={{
    backgroundColor: "#000", // Black color for Next button
    color: "#fff",
  }}
  onMouseEnter={(e) => {
    (e.target as HTMLButtonElement).style.backgroundColor = "#333"; // Lighter black on hover
  }}
  onMouseLeave={(e) => {
    (e.target as HTMLButtonElement).style.backgroundColor = "#000";
  }}
>
  {currentQuestion < questions.length - 1 ? "Next" : "Complete Assessment"}
</Button>

            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
