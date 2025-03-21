# chat_model.py
import sys
import json
from some_ml_library import your_chat_model  # Your actual ML imports

def process_message(message):
    # Your existing ML model logic here
    responses = {
        'hi': 'Hello! How are you feeling today? 😊',
        'i feel sad': 'I\'m here to listen. Can you tell me more about that?',
        'default': 'That sounds interesting. How does that make you feel?'
    }
    
    response = responses.get(message, responses['default'])
    return {'response': response}

if __name__ == "__main__":
    input_message = json.loads(sys.argv[1])
    result = process_message(input_message)
    print(json.dumps(result))