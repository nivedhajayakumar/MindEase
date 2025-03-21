# Save model and tokenizer (in train_model.py)
from transformers import AutoModelForSequenceClassification, AutoTokenizer

output_dir = "backend/python/mental_health_model"

model.save_pretrained(output_dir)
tokenizer.save_pretrained(output_dir)

print(f"Model saved to {output_dir}")
