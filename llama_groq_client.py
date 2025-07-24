import os
import json
from typing import Optional, Dict, Any, List
from groq import Groq


class LlamaGroqClient:
    """A client for interacting with Llama models via Groq API."""
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize the Groq client.
        
        Args:
            api_key: Groq API key. If not provided, will look for GROQ_API_KEY environment variable.
        """
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        if not self.api_key:
            raise ValueError("API key is required. Set GROQ_API_KEY environment variable or pass api_key parameter.")
        
        self.client = Groq(api_key=self.api_key)
    
    def generate_response(
        self,
        messages: List[Dict[str, str]],
        model: str = "llama3-8b-8192",
        temperature: float = 0.7,
        max_tokens: int = 1024,
        top_p: float = 1.0,
        stream: bool = False
    ) -> str:
        """
        Generate a response using a Llama model.
        
        Args:
            messages: List of message dictionaries with 'role' and 'content' keys
            model: Model name (e.g., "llama3-8b-8192", "llama3-70b-8192")
            temperature: Sampling temperature (0.0 to 2.0)
            max_tokens: Maximum number of tokens to generate
            top_p: Nucleus sampling parameter
            stream: Whether to stream the response
            
        Returns:
            Generated response text
        """
        try:
            chat_completion = self.client.chat.completions.create(
                messages=messages,
                model=model,
                temperature=temperature,
                max_tokens=max_tokens,
                top_p=top_p,
                stream=stream
            )
            
            if stream:
                # Handle streaming response
                response_text = ""
                for chunk in chat_completion:
                    if chunk.choices[0].delta.content is not None:
                        response_text += chunk.choices[0].delta.content
                return response_text
            else:
                return chat_completion.choices[0].message.content
                
        except Exception as e:
            raise Exception(f"Error generating response: {str(e)}")
    
    def simple_chat(self, prompt: str, model: str = "llama3-8b-8192") -> str:
        """
        Simple chat interface for single prompts.
        
        Args:
            prompt: User prompt/question
            model: Model name to use
            
        Returns:
            Generated response
        """
        messages = [{"role": "user", "content": prompt}]
        return self.generate_response(messages, model=model)
    
    def get_available_models(self) -> List[str]:
        """
        Get list of available models.
        
        Returns:
            List of available model names
        """
        try:
            models = self.client.models.list()
            return [model.id for model in models.data if "llama" in model.id.lower()]
        except Exception as e:
            print(f"Error fetching models: {str(e)}")
            return ["llama3-8b-8192", "llama3-70b-8192"]  # Fallback list


def main():
    """Example usage of the LlamaGroqClient."""
    # Initialize client
    try:
        client = LlamaGroqClient()
        print("✅ Groq client initialized successfully!")
    except ValueError as e:
        print(f"❌ Error: {e}")
        print("Please set your GROQ_API_KEY environment variable.")
        return
    
    # Example 1: Simple chat
    print("\n🔹 Example 1: Simple Chat")
    prompt = "Explain quantum computing in simple terms."
    try:
        response = client.simple_chat(prompt)
        print(f"Prompt: {prompt}")
        print(f"Response: {response}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Example 2: Multi-turn conversation
    print("\n🔹 Example 2: Multi-turn Conversation")
    messages = [
        {"role": "system", "content": "You are a helpful assistant that explains complex topics clearly."},
        {"role": "user", "content": "What is machine learning?"},
        {"role": "assistant", "content": "Machine learning is a subset of artificial intelligence..."},
        {"role": "user", "content": "Can you give me a practical example?"}
    ]
    
    try:
        response = client.generate_response(messages)
        print(f"Response: {response}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Example 3: Different model and parameters
    print("\n🔹 Example 3: Using Different Parameters")
    try:
        response = client.generate_response(
            messages=[{"role": "user", "content": "Write a short poem about AI."}],
            model="llama3-70b-8192",
            temperature=0.9,
            max_tokens=200
        )
        print(f"Creative Response: {response}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Example 4: Show available models
    print("\n🔹 Available Llama Models:")
    models = client.get_available_models()
    for model in models:
        print(f"  - {model}")


if __name__ == "__main__":
    main()