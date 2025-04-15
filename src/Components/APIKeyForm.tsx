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
    setTimeout(() => window.location.reload(), 1500); // Give user time to see toast
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div className="api-form-container">
      <h2>Enter Your API Key</h2>
      <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Insert API Key Here" 
          onChange={changeKey}
          value={key}
        />
        <br />
        <div className="Submit-Button">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </Form>
      <Toaster />
    </div>
  );
}
