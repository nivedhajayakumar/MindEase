import sys
import json
import numpy as np

# 🎯 Define score mappings for all question options
SCORE_MAP = {
    # Q1: How are you feeling today?
    "😃 Very Happy": 90,
    "🙂 Okay": 60,
    "😐 Neutral": 40,

    # Q2: How well did you sleep last night?
    "🌙 Very well (7+ hrs)": 85,
    "😴 Fair (5-6 hrs)": 65,
    "🥱 Poor (<5 hrs)": 40,

    # Q3: Do you feel anxious or worried during the day?
    "😊 Rarely": 80,
    "😕 Sometimes": 50,
    "😟 Often": 30,

    # Q4: Do you struggle to focus or make decisions?
    "🤓 Never": 90,
    "🤔 Occasionally": 60,
    "😵‍💫 Often": 35,

    # Q5: Do you feel optimistic about your future?
    "🌟 Very optimistic": 90,
    "🙂 Somewhat optimistic": 70,
    "🤷‍♂️ Unsure": 50,

    # Q6: Do you feel mentally exhausted?
    "💪 Not at all": 85,
    "😐 Sometimes": 55,
    "😩 Often": 30,

    # Q7: If your feelings were weather, what would today be?
    "☀️ Sunny": 90,
    "🌥️ Cloudy": 60,
    "🌧️ Rainy": 40,

    # Q8: Do you feel comfortable sharing your thoughts with someone?
    "🗣️ Yes, easily": 85,
    "🤷 Sometimes": 60,
    "🙊 Rarely": 35,

    # Q9: How often do you feel proud of yourself?
    "🏆 Frequently": 90,
    "🙂 Occasionally": 60,
    "😞 Rarely": 40,

    # Q10: If you could change one thing about how you feel, what would it be?
    "💤 Better sleep": 70,
    "😃 More happiness": 80,
    "⚡ More energy": 75,
}

# 🧠 Define scoring logic to calculate the assessment score
def calculate_assessment_score(answers):
    """
    Calculate the average assessment score based on user's responses.
    Returns a score between 0 and 100.
    """
    total_score = 0
    num_questions = len(answers)

    if num_questions == 0:
        return 50  # Default neutral score if no answers provided

    for answer in answers:
        response = answer.get("answer", "")
        # Get score or default to 50 if not found
        score = SCORE_MAP.get(response, 50)
        total_score += score

    # Calculate average score
    avg_score = int(total_score / num_questions)
    return avg_score


if __name__ == "__main__":
    try:
        # Load answers from command-line argument
        answers = json.loads(sys.argv[1])
        # Calculate assessment score
        score = calculate_assessment_score(answers)
        # Return result as JSON
        print(json.dumps({"score": score}))
    except Exception as e:
        # Return error in case of parsing or processing issues
        print(json.dumps({"error": str(e)}))
