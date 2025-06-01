import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button, Card, Modal,
  Table, Badge, Alert
} from 'react-bootstrap';
import {
  GeoAlt, Calendar, Person, Search, Ticket, BusFront,
  Clock, People, CheckCircle
} from 'react-bootstrap-icons';

const BookTicketsPage = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [showBusModal, setShowBusModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [availableBuses, setAvailableBuses] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7230/api/Authentication/GetBus", {
        method: "POST", // Use POST if your backend expects it
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fromCity,
          toCity,
          departureDate
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableBuses(data);
        setShowBusModal(true);
      } else {
        const error = await response.text();
        alert(`Failed to fetch buses: ${error}`);
      }
    } catch (err) {
      console.error("Error fetching buses:", err);
      alert("An error occurred while fetching available buses.");
    }
  };

  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
    setShowConfirmation(true);
    setShowBusModal(false);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-5 fw-bold text-purple">
        <Ticket className="me-2" />
        Book Bus Tickets
      </h2>

      {/* Search Form */}
      <Card className="mb-5 shadow-sm border-0">
        <Card.Body className="p-4">
          <Form onSubmit={handleSearch}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="fromCity">
                  <Form.Label className="d-flex align-items-center">
                    <GeoAlt className="me-2 text-teal" /> From
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Departure city"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="toCity">
                  <Form.Label className="d-flex align-items-center">
                    <GeoAlt className="me-2 text-teal" /> To
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Destination city"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="departureDate">
                  <Form.Label className="d-flex align-items-center">
                    <Calendar className="me-2 text-teal" /> Departure
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="passengers">
                  <Form.Label className="d-flex align-items-center">
                    <Person className="me-2 text-teal" /> Passengers
                  </Form.Label>
                  <Form.Select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Adult' : 'Adults'}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Button variant="teal" type="submit" className="w-100 py-2">
                  <Search className="me-2" />
                  Book Your Bus
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Bus Selection Modal */}
      <Modal show={showBusModal} onHide={() => setShowBusModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <BusFront className="me-2" />
            Available Buses
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {availableBuses.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Bus Number</th>
                  <th>Operator</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Seats</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availableBuses.map((bus, index) => (
                  <tr key={index}>
                    <td>{bus.id || 'N/A'}</td>
                    <td>
                      {bus.operator || 'N/A'}
                      <Badge bg={bus.type === 'Premium' ? 'purple' : 'teal'} className="ms-2">
                        {bus.type}
                      </Badge>
                    </td>
                    <td><Clock className="me-1" />{bus.departure}</td>
                    <td><Clock className="me-1" />{bus.arrival}</td>
                    <td><People className="me-1" />{bus.availableSeats}/{bus.totalSeats}</td>
                    <td className="fw-bold text-purple">{bus.price}</td>
                    <td>
                      <Button
                        variant="teal"
                        size="sm"
                        onClick={() => handleSelectBus(bus)}
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="warning">No buses found for the selected route and date.</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBusModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Booking Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">
            <CheckCircle className="me-2" />
            Booking Confirmed!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBus && (
            <>
              <Alert variant="success">
                Your seat has been successfully booked!
              </Alert>
              <div className="mb-3">
                <h5>Trip Details:</h5>
                <p className="mb-1"><strong>From:</strong> {fromCity}</p>
                <p className="mb-1"><strong>To:</strong> {toCity}</p>
                <p className="mb-1"><strong>Date:</strong> {departureDate}</p>
              </div>
              <div className="mb-3">
                <h5>Bus Details:</h5>
                <p className="mb-1"><strong>Bus Number:</strong> {selectedBus.id}</p>
                <p className="mb-1"><strong>Operator:</strong> {selectedBus.operator}</p>
                <p className="mb-1"><strong>Departure:</strong> {selectedBus.departure}</p>
                <p className="mb-1"><strong>Arrival:</strong> {selectedBus.arrival}</p>
                <p className="mb-1"><strong>Price:</strong> {selectedBus.price}</p>
              </div>
              <Alert variant="info">
                Your booking reference number is: <strong>B-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowConfirmation(false)}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookTicketsPage;
