import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, Container } from 'react-bootstrap';
 import backgroundImg from '../../assets/backgroundimg.jpg';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
      <Container fluid className="h-100">
        <Row className="h-100">
          {/* Left Side - Text Content */}
          <Col 
            md={6} 
            className="d-flex flex-column justify-content-center align-items-start px-5"
          >
            <h1 className="mb-3 text-primary">Welcome to OBRS</h1>
            <p className="mb-4 text-muted">Online Bus Reservation System</p>
            <p>Book your bus tickets easily and securely from the comfort of your home. OBRS offers a fast, user-friendly platform to find routes, check availability, and reserve your seat instantly.</p>

            <h2>Seamless Travel Booking at Your Fingertips</h2>
            <p>Explore popular routes, compare fares, and travel with confidence. Whether you're heading home or planning a trip, OBRS ensures a smooth and reliable booking experience.</p>

            <div>
              <Button 
                variant="primary" 
                className="me-3 px-4"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                variant="success" 
                className="px-4"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </div>
          </Col>

          {/* Right Side - Image */}
          <Col md={6} className="d-none d-md-block p-0">
          

<img 
  src={backgroundImg} 
  alt="" 
  style={{ 
    width: '100%', 
    height: '100%', 
    objectFit: 'cover' 
  }} 
/>

        
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WelcomePage;
