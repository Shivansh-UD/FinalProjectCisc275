// src/Components/APIKeyForm.tsx
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './APIKeyForm.css';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

const saveKeyData = "MYKEY";
let inputKey = "";

export function APIKeyForm(): React.JSX.Element {
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    inputKey = event.target.value;
  }

  async function handleSubmit() {
    if (!inputKey.startsWith("sk-")) {
      toast.error("API key must start with sk-");
      return;
    }

    try {
      await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "user", content: "Say hello" }],
          max_tokens: 5,
        },
        {
          headers: {
            Authorization: `Bearer ${inputKey}`,
            "Content-Type": "application/json",
          }
        }
      );

      localStorage.setItem(saveKeyData, JSON.stringify(inputKey));
      toast.success("API Key Saved Successfully!");
      setTimeout(() => window.location.reload(), 1000);

    } catch (error) {
      console.error(error);
      toast.error("Invalid API Key. Please check and try again!");
    }
  }

  return (
    <div className="api-form-container">
      <div className="form-card">
        <h2>🔐 Enter Your OpenAI API Key</h2>
        <p className="form-subtext">
          Your key is securely stored in your browser and never shared.
        </p>
        <Form>
          <Form.Control
            type="password"
            placeholder="sk-..."
            onChange={changeKey}
            className="key-input"
          />
          <div className="submit-button">
            <Button onClick={handleSubmit}>Submit Key</Button>
          </div>
        </Form>
      </div>
      <Toaster />
    </div>
  );
}
