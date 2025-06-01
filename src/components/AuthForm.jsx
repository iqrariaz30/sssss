import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type = 'login', onClose }) => {
  const isSignup = type === 'signup';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // For redirect

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      if (password !== confirmPassword) {
        setError('Passwords do not match!');
        return;
      }

      // Signup logic
      alert('Signup successful!');
      onClose();
    } else {
      // Example Admin Login (Replace with API logic in production)
      if (email === 'admin@gmail.com' && password === 'admin123') {
        alert('Admin login successful!');
        onClose();
        navigate('/admin'); // Redirect to Admin Dashboard
      } else if (email && password) {
        alert('User login successful!');
        onClose();
        navigate('/'); // Redirect to Home or User Page
      } else {
        setError('Invalid credentials!');
      }
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isSignup ? 'Signup' : 'Login'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
             <label>Name</label>
              <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            </div>

             <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {isSignup && (
            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          <Button type="submit" variant="primary">
            {isSignup ? 'Signup' : 'Login'}
          </Button>
          <Button variant="secondary" className="ms-2" onClick={onClose}>Cancel</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthForm;
