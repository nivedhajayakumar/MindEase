from deepface import DeepFace
import numpy as np
import base64
import cv2
import json
from io import BytesIO
from PIL import Image

def analyze_facial_expression(image_data):
    # Convert base64 image to numpy array
    image_data = image_data.split(',')[1]
    image = Image.open(BytesIO(base64.b64decode(image_data)))
    image_array = np.array(image)
    
    try:
        # Analyze emotions using DeepFace
        analysis = DeepFace.analyze(image_array, 
                                    actions=['emotion'],
                                    enforce_detection=False)
        
        # Extract emotion data
        emotions = analysis[0]['emotion']
        
        # Calculate depression score based on emotions
        depression_score = calculate_depression_score(emotions)
        
        return {
            'success': True,
            'emotions': emotions,
            'depression_score': depression_score
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def calculate_depression_score(emotions):
    # Convert emotion percentages to a depression score (0-30 scale)
    # This is a simplified algorithm - you would refine this based on research
    score = (
        (emotions['sad'] * 0.25) + 
        (emotions['angry'] * 0.15) + 
        (emotions['fear'] * 0.10) + 
        (emotions['disgust'] * 0.10) - 
        (emotions['happy'] * 0.15) + 
        (emotions['neutral'] * 0.05)
    ) * 30
    
    # Ensure the score is between 0 and 30
    return max(0, min(30, round(score)))