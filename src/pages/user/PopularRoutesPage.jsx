import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal } from 'react-bootstrap';
import { GeoAlt, ArrowRight, LightningCharge, CalendarCheck, TicketDetailed, X } from 'react-bootstrap-icons';

const PopularRoutesPage = () => {
  const [showOffersModal, setShowOffersModal] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(null);
  const [currentOffer, setCurrentOffer] = useState(null);

  const routes = [
    {
      from: "New York",
      to: "Boston",
      price: "$25",
      duration: "4h 30m",
      discount: "10% OFF"
    },
    {
      from: "Los Angeles",
      to: "San Francisco",
      price: "$35",
      duration: "6h 15m",
      discount: "Early Bird"
    },
    {
      from: "Chicago",
      to: "Detroit",
      price: "$28",
      duration: "4h 45m",
      featured: true
    },
    {
      from: "Seattle",
      to: "Portland",
      price: "$22",
      duration: "3h 20m"
    },
    {
      from: "Miami",
      to: "Orlando",
      price: "$18",
      duration: "3h 45m"
    },
    {
      from: "Dallas",
      to: "Austin",
      price: "$20",
      duration: "3h 10m",
      discount: "Weekend Special"
    }
  ];

  // Special Offers Data
  const offers = [
    {
      title: "Flash Sale",
      discount: "30% OFF",
      description: "Limited time offer on all weekend trips",
      icon: <LightningCharge size={32} className="text-teal" />,
      validUntil: "2023-12-15",
      code: "FLASH30"
    },
    {
      title: "Early Bird Special",
      discount: "25% OFF",
      description: "Book 30 days in advance and save",
      icon: <CalendarCheck size={32} className="text-teal" />,
      validUntil: "2024-01-31",
      featured: true
    },
    {
      title: "Student Discount",
      discount: "20% OFF",
      description: "Exclusive offer for students with valid ID",
      icon: <TicketDetailed size={32} className="text-teal" />,
      validUntil: "2024-06-30",
      code: "STUDENT20"
    }
  ];

  // Destination-specific offers
  const destinationOffers = {
    "New York-Boston": [
      {
        title: "NYC Explorer",
        discount: "15% OFF",
        description: "Special discount for New York to Boston route",
        code: "NYB15",
        validUntil: "2023-12-31"
      },
      {
        title: "Weekday Saver",
        discount: "$5 OFF",
        description: "Save on weekday travels between NYC and Boston",
        code: "WEEKDAY5",
        validUntil: "2024-01-15"
      }
    ],
    "Los Angeles-San Francisco": [
      {
        title: "California Dreaming",
        discount: "20% OFF",
        description: "Special offer for California coastal route",
        code: "CALI20",
        validUntil: "2024-02-28"
      },
      {
        title: "Golden Gate Special",
        discount: "Free WiFi",
        description: "Complimentary WiFi on all LA to SF trips",
        validUntil: "2024-03-01"
      }
    ],
    "Chicago-Detroit": [
      {
        title: "Great Lakes Deal",
        discount: "10% OFF",
        description: "Discount for Great Lakes region travel",
        code: "LAKES10",
        validUntil: "2023-12-20"
      }
    ],
    "Seattle-Portland": [
      {
        title: "Pacific Northwest",
        discount: "2-for-1",
        description: "Buy one ticket, get one free on select dates",
        code: "PNW2FOR1",
        validUntil: "2024-01-10"
      }
    ],
    "Miami-Orlando": [
      {
        title: "Florida Sunshine",
        discount: "$10 OFF",
        description: "Discount for Florida residents",
        code: "FLA10",
        validUntil: "2024-01-31"
      }
    ],
    "Dallas-Austin": [
      {
        title: "Texas Special",
        discount: "15% OFF",
        description: "Special Texas route discount",
        code: "TEXAS15",
        validUntil: "2024-02-15"
      },
      {
        title: "Music Lover",
        discount: "Free Upgrade",
        description: "Free seat upgrade for Austin-bound trips",
        validUntil: "2024-03-01"
      }
    ]
  };

  const handleBookNow = (offer, route = null) => {
    if (route) {
      setCurrentDestination(`${route.from}-${route.to}`);
      setCurrentOffer(null);
    } else {
      setCurrentOffer(offer);
      setCurrentDestination(null);
    }
    setShowOffersModal(true);
  };

  const getDestinationOffers = () => {
    if (!currentDestination) return [];
    return destinationOffers[currentDestination] || [];
  };

  return (
    <div className="bg-light py-5">
      <Container>
        {/* Popular Routes Section */}
        <section className="mb-5">
          <h2 className="text-center mb-5 fw-bold text-purple">Popular Bus Routes</h2>
          <Row className="g-4">
            {routes.map((route, index) => (
              <Col key={`route-${index}`} md={6} lg={4}>
                <Card className={`h-100 border-0 shadow-sm ${route.featured ? 'border-top border-teal border-3' : ''}`}>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <GeoAlt size={20} className="text-teal me-2" />
                      <div className="d-flex align-items-center flex-grow-1">
                        <span className="fw-bold">{route.from}</span>
                        <ArrowRight size={16} className="mx-2 text-muted" />
                        <span className="fw-bold">{route.to}</span>
                      </div>
                      {route.discount && (
                        <Badge bg="teal" className="ms-2">
                          {route.discount}
                        </Badge>
                      )}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-muted">From</span>
                        <h4 className="text-purple mb-0">{route.price}</h4>
                      </div>
                      <div className="text-end">
                        <span className="text-muted">Duration</span>
                        <p className="mb-0">{route.duration}</p>
                      </div>
                    </div>
                    <Button 
                      variant="teal" 
                      className="w-100 mt-3"
                      onClick={() => handleBookNow(null, route)}
                    >
                      View Special Offers
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Special Offers Section */}
        <section className="mt-5 pt-5">
          <h2 className="text-center mb-5 fw-bold text-purple">Special Travel Offers</h2>
          <Row className="g-4">
            {offers.map((offer, index) => (
              <Col key={`offer-${index}`} md={4}>
                <Card className={`h-100 border-0 shadow-sm ${offer.featured ? 'border-top border-purple border-3' : ''}`}>
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center">
                        <div className="bg-white p-2 rounded-circle me-3">
                          {offer.icon}
                        </div>
                        <div>
                          <h5 className="mb-0">{offer.title}</h5>
                          <small className="text-muted">Valid until {offer.validUntil}</small>
                        </div>
                      </div>
                      <Badge bg="purple" className="fs-5 px-3 py-2">
                        {offer.discount}
                      </Badge>
                    </div>
                    
                    <p className="mb-4">{offer.description}</p>
                    
                    {offer.code && (
                      <div className="bg-white p-2 rounded mb-3">
                        <small className="text-muted">Use code:</small>
                        <div className="fw-bold text-teal">{offer.code}</div>
                      </div>
                    )}
                    
                    <Button 
                      variant="purple" 
                      className="w-100"
                      onClick={() => handleBookNow(offer)}
                    >
                      Book Now & Save
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Special Offers Modal */}
        <Modal show={showOffersModal} onHide={() => setShowOffersModal(false)} size="lg">
          <Modal.Header className="border-0">
            <Modal.Title className="text-purple">
              {currentOffer ? currentOffer.title : "Special Offers"}
            </Modal.Title>
            <Button variant="link" onClick={() => setShowOffersModal(false)}>
              <X size={24} />
            </Button>
          </Modal.Header>
          <Modal.Body>
            {currentOffer ? (
              <div className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <Badge bg="purple" className="fs-5 px-3 py-2 me-3">
                    {currentOffer.discount}
                  </Badge>
                  <div>
                    <p className="mb-1">{currentOffer.description}</p>
                    {currentOffer.validUntil && (
                      <small className="text-muted">Valid until: {currentOffer.validUntil}</small>
                    )}
                  </div>
                </div>
                {currentOffer.code && (
                  <div className="bg-light p-3 rounded mb-4">
                    <h5 className="text-center mb-2">Your Promo Code</h5>
                    <div className="text-center">
                      <Badge bg="teal" className="fs-4 px-4 py-2">
                        {currentOffer.code}
                      </Badge>
                    </div>
                    <p className="text-center mt-3 mb-0">
                      Use this code at checkout to apply your discount
                    </p>
                  </div>
                )}
                <Button variant="purple" size="lg" className="w-100">
                  Continue to Booking
                </Button>
              </div>
            ) : (
              <>
                <h5 className="mb-4">
                  Special offers for {currentDestination?.replace('-', ' to ')}
                </h5>
                <Row className="g-3">
                  {getDestinationOffers().length > 0 ? (
                    getDestinationOffers().map((offer, index) => (
                      <Col key={`dest-offer-${index}`} md={6}>
                        <Card className="h-100 border-0 shadow-sm">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="mb-0">{offer.title}</h6>
                              <Badge bg="teal">{offer.discount}</Badge>
                            </div>
                            <p className="small mb-3">{offer.description}</p>
                            {offer.code && (
                              <div className="bg-light p-2 rounded mb-2">
                                <small className="text-muted">Use code:</small>
                                <div className="fw-bold text-purple">{offer.code}</div>
                              </div>
                            )}
                            {offer.validUntil && (
                              <small className="text-muted d-block mb-2">
                                Valid until: {offer.validUntil}
                              </small>
                            )}
                            <Button 
                              variant="teal" 
                              size="sm" 
                              className="w-100"
                              onClick={() => {
                                setCurrentOffer(offer);
                              }}
                            >
                              Apply Offer
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Col>
                      <div className="text-center py-4">
                        <p className="text-muted">No special offers currently available for this route.</p>
                        <Button variant="outline-purple" onClick={() => setShowOffersModal(false)}>
                          View All Offers
                        </Button>
                      </div>
                    </Col>
                  )}
                </Row>
              </>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default PopularRoutesPage;