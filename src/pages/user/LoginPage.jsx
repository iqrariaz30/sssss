import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext'; // Adjust the path as needed

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // From your context

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    try {
      const response = await fetch("https://localhost:7230/api/Authentication/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (response.ok) {
        const data = await response.json();

        // Example response: { token: "xxx", role: "admin" }
        console.log("Login successful:", data);

        // Save token and role (optional)
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Set auth context
        login(email); // You can also pass token or role if needed

        // Redirect based on role
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        const error = await response.json();
        alert(error.message || "Login failed. Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred. Please check your internet connection.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
