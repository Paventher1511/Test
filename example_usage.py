#!/usr/bin/env python3
"""
Simple example of using Llama with Groq API.
Make sure to set your GROQ_API_KEY environment variable before running.
"""

import os
from llama_groq_client import LlamaGroqClient


def main():
    # Check if API key is set
    if not os.getenv("GROQ_API_KEY"):
        print("❌ Please set your GROQ_API_KEY environment variable")
        print("   Example: export GROQ_API_KEY='your-api-key-here'")
        return
    
    # Initialize the client
    client = LlamaGroqClient()
    
    # Simple question
    question = "What are the key differences between Python and JavaScript?"
    print(f"Question: {question}")
    print("Thinking...")
    
    try:
        response = client.simple_chat(question)
        print(f"\nLlama's Response:\n{response}")
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()