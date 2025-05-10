// src/Components/APIKeyForm.tsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './APIKeyForm.css';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

const saveKeyData = "MYKEY";

export function APIKeyForm(): React.JSX.Element {
  const [key, setKey] = useState<string>(localStorage.getItem(saveKeyData) ? JSON.parse(localStorage.getItem(saveKeyData)!) : "");

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  async function handleSubmit() {
    if (!key.startsWith("sk-")) {
      toast.error("API key must start with sk-");
      return;
    }

    try {
      // Try a small API call to check if the key works
      await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "user", content: "Say hello" }],
          max_tokens: 5,
        },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          }
        }
      );

      // If success, save the key
      localStorage.setItem(saveKeyData, JSON.stringify(key));
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
            value={key}
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