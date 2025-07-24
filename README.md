# Llama Groq API Client

A Python client for invoking Llama models using the Groq API.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Get your Groq API key from [Groq Console](https://console.groq.com/keys)

3. Set your API key as an environment variable:
```bash
export GROQ_API_KEY="your-api-key-here"
```

Or create a `.env` file:
```bash
cp .env.example .env
# Edit .env and add your actual API key
```

## Usage

### Basic Example
```python
from llama_groq_client import LlamaGroqClient

# Initialize client
client = LlamaGroqClient()

# Simple chat
response = client.simple_chat("Explain machine learning in simple terms.")
print(response)
```

### Advanced Usage
```python
# Multi-turn conversation
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is Python?"},
    {"role": "assistant", "content": "Python is a programming language..."},
    {"role": "user", "content": "What are its main uses?"}
]

response = client.generate_response(
    messages=messages,
    model="llama3-70b-8192",
    temperature=0.7,
    max_tokens=1024
)
```

## Available Models

- `llama3-8b-8192` - Llama 3 8B (default)
- `llama3-70b-8192` - Llama 3 70B
- `llama3-groq-8b-8192-tool-use-preview` - Llama 3 with tool use
- `llama3-groq-70b-8192-tool-use-preview` - Llama 3 70B with tool use

## Files

- `llama_groq_client.py` - Main client implementation
- `example_usage.py` - Simple usage example
- `requirements.txt` - Python dependencies
- `.env.example` - Environment variables template

## Run Examples

```bash
# Run the comprehensive example
python llama_groq_client.py

# Run the simple example
python example_usage.py
```