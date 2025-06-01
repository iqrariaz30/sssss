import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  BusFront, 
  Wallet2, 
  ShieldCheck, 
  Ticket, 
  Star, 
  Phone,
  Search, 
  Cursor, 
  CreditCard 
  } from 'react-bootstrap-icons';
   import bus from '../../assets/bus.jpeg';

const HomePage = () => {
  // Define the features array here
  const features = [
    {
      icon: <BusFront size={40} className="text-purple" />,
      title: "10,000+ Daily Departures",
      description: "Wide network across the country"
    },
    {
      icon: <Ticket size={40} className="text-purple" />,
      title: "Easy Seat Selection",
      description: "Choose your preferred seats"
    },
    {
      icon: <Wallet2 size={40} className="text-purple" />,
      title: "Multiple Payment Options",
      description: "Cards, UPI, Net Banking & more"
    },
    {
      icon: <ShieldCheck size={40} className="text-purple" />,
      title: "Secure Booking",
      description: "Your data is always protected"
    },
    {
      icon: <Star size={40} className="text-purple" />,
      title: "Verified Reviews",
      description: "Real feedback from travelers"
    },
    {
      icon: <Phone size={40} className="text-purple" />,
      title: "Mobile Tickets",
      description: "No need to print, show on phone"
    }
  ];

  
  // Steps array for services section
  const steps = [
    {
      icon: <Search size={48} className="text-purple" />,
      step: "Step 1",
      title: "Search Buses",
      description: "Enter your departure, destination, and travel date"
    },
    {
      icon: <Cursor size={48} className="text-purple" />,
      step: "Step 2",
      title: "Select & Book",
      description: "Choose your preferred bus and seats"
    },
    {
      icon: <CreditCard size={48} className="text-purple" />,
      step: "Step 3",
      title: "Pay & Travel",
      description: "Secure payment and receive e-ticket instantly"
    }
  ];

  return (
    <div className="bg-light" style={{ padding: '4rem 0' }}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h1 className="display-4 fw-bold text-purple mb-3">
              Travel Across the Country with Ease
            </h1>
            <p className="lead text-muted mb-4">
              Book your bus tickets in minutes. Choose from thousands of routes with comfortable seats and affordable prices.
            </p>
            <div className="d-flex align-items-center mb-4">
              <div className="me-4">
                <h3 className="text-teal mb-0">10,000+</h3>
                <small className="text-muted">Daily Departures</small>
              </div>
              <div className="me-4">
                <h3 className="text-teal mb-0">50+</h3>
                <small className="text-muted">Bus Operators</small>
              </div>
              <div>
                <h3 className="text-teal mb-0">1M+</h3>
                <small className="text-muted">Happy Travelers</small>
              </div>
            </div>
          </Col>
          
          <Col lg={6}>
            {/* You can add your booking form or image here */}
           <img 
  src={bus} 
  alt="" // ✅ empty alt for decorative images
  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
/>
           
          </Col>
        </Row>
      </Container>

      {/* Features section */}
      <section className="my-5 py-4">
        <Container>
          <h2 className="text-center mb-5 fw-bold text-purple">Why Choose Our Bus Service?</h2>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} md={6} lg={4}>
                <div className="p-4 h-100 border rounded-3 bg-white"> {/* Changed from bg-light to bg-white for better contrast */}
                  <div className="mb-3">
                    {feature.icon}
                  </div>
                  <h4 className="text-teal">{feature.title}</h4>
                  <p className="text-muted mb-0">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Services section */}
      <section className="my-5">
        <Container className="py-5 bg-light rounded-3">
          <h2 className="text-center mb-5 fw-bold text-purple">How Our Bus Booking Works</h2>
          <Row className="g-4">
            {steps.map((item, index) => (
              <Col key={index} md={4}>
                <div className="text-center p-4 h-100">
                  <div className="mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white" 
                         style={{ width: '80px', height: '80px' }}>
                      {item.icon}
                    </div>
                  </div>
                  <span className="d-block text-teal fw-bold mb-2">{item.step}</span>
                  <h4 className="mb-3">{item.title}</h4>
                  <p className="text-muted mb-0">{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;