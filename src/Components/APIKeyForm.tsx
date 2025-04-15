// src/Components/APIKeyForm.tsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './APIKeyForm.css';
import { toast, Toaster } from 'react-hot-toast';

const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);

export function APIKeyForm(): React.JSX.Element {
  const [key, setKey] = useState<string>(prevKey ? JSON.parse(prevKey) : "");

  function handleSubmit() {
    if (key.trim() === "") {
      toast.error("Please enter a valid API key.");
      return;
    }

    localStorage.setItem(saveKeyData, JSON.stringify(key));
    toast.success("API Key saved!");
    setTimeout(() => window.location.reload(), 1500);
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
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
