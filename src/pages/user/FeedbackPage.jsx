import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Carousel, 
  Accordion, 
  Button,
  Modal,
  Form
} from 'react-bootstrap';
import { 
  StarFill, 
  StarHalf, 
  PersonCircle, 
  QuestionCircle,
  Envelope,
  ChatText
} from 'react-bootstrap-icons';

const FeedbackPage = () => {
  // Feedback Data
  const feedback = [
    {
      name: "Sarah Johnson",
      role: "Frequent Traveler",
      rating: 5,
      comment: "The booking process was incredibly smooth and I got the exact seats I wanted. Highly recommend!",
      featured: true
    },
    {
      name: "Michael Chen",
      role: "Business Traveler",
      rating: 4.5,
      comment: "Reliable service with comfortable buses. The mobile tickets make everything so convenient."
    },
    {
      name: "David Rodriguez",
      role: "Student",
      rating: 5,
      comment: "Affordable prices and great discounts for students. My go-to platform for bus travel."
    },
    {
      name: "Emily Wilson",
      role: "Family Traveler",
      rating: 4,
      comment: "Traveling with kids was easier thanks to the family-friendly booking options."
    }
  ];

  // FAQ Data
  const faqItems = [
    {
      question: "How do I book a bus ticket?",
      answer: "Simply select your departure and arrival cities, choose your travel date, pick your preferred bus, select seats, and complete the payment process."
    },
    {
      question: "Can I cancel or change my booking?",
      answer: "Yes, you can cancel or modify your booking up to 6 hours before departure. Some operators may have different policies."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, PayPal, and various regional payment methods. All transactions are secure."
    }
  ];

  // State for feedback form
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarFill key={`full-${i}`} className="text-teal" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="text-teal" />);
    }
    
    return stars;
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { email, comment });
    setShowFeedbackModal(false);
    setEmail('');
    setComment('');
  };

  return (
    <Container className="my-5 py-5">
      {/* Feedback Section */}
      <section className="mb-5 pb-5">
        <h2 className="text-center mb-5 fw-bold text-purple">What Our Travelers Say</h2>
        
        <Carousel indicators={true} className="pb-4">
          {feedback.map((item, index) => (
            <Carousel.Item key={index}>
              <Row className="justify-content-center">
                <Col lg={8}>
                  <Card className={`border-0 shadow-sm ${item.featured ? 'border-top border-teal border-3' : ''}`}>
                    <Card.Body className="p-4 p-md-5">
                      <div className="d-flex align-items-center mb-4">
                        <div className="me-3">
                          <PersonCircle size={48} className="text-purple" />
                        </div>
                        <div>
                          <h5 className="mb-1">{item.name}</h5>
                          <small className="text-muted">{item.role}</small>
                        </div>
                        <div className="ms-auto">
                          <div className="d-flex">
                            {renderStars(item.rating)}
                          </div>
                        </div>
                      </div>
                      <blockquote className="mb-0">
                        <p className="lead font-italic">"{item.comment}"</p>
                      </blockquote>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="text-center mt-4">
          <Button 
            variant="teal" 
            className="px-4"
            onClick={() => setShowFeedbackModal(true)}
          >
            Share Your Experience
          </Button>
        </div>
      </section>

      {/* Feedback Form Modal */}
      <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Share Your Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFeedbackSubmit}>
            <Form.Group className="mb-3" controlId="feedbackEmail">
              <Form.Label className="d-flex align-items-center">
                <Envelope className="me-2 text-teal" /> Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="feedbackComment">
              <Form.Label className="d-flex align-items-center">
                <ChatText className="me-2 text-teal" /> Your Feedback
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Tell us about your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="teal" type="submit">
                Submit Feedback
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* FAQ Section */}
      <section className="mt-5 pt-5">
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <QuestionCircle size={48} className="text-purple mb-3" />
            <h2 className="fw-bold text-purple">Frequently Asked Questions</h2>
            <p className="lead text-muted">Find quick answers to common questions</p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Accordion flush>
              {faqItems.map((item, index) => (
                <Accordion.Item key={index} eventKey={index.toString()} className="mb-3 border rounded-3 overflow-hidden">
                  <Accordion.Header className="bg-light">
                    <span className="fw-bold text-purple">{item.question}</span>
                  </Accordion.Header>
                  <Accordion.Body className="bg-white">
                    <p className="mb-0">{item.answer}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default FeedbackPage;