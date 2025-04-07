// src/Components/APIKeyForm.tsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './APIKeyForm.css';

const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);

export function APIKeyForm(): React.JSX.Element {
  const [key, setKey] = useState<string>(prevKey ? JSON.parse(prevKey) : "");

  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); // Optional: reload app after saving key
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
    </div>
  );
}
