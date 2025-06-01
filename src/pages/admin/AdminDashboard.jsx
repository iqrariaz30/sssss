import React, { useState } from 'react';
import { 
  Container, Row, Col, Card, Table, Badge, 
  Dropdown, Nav, Tab, Tabs, ProgressBar,
  Form, Button, ListGroup, Modal
} from 'react-bootstrap';
import { 
  PersonCircle, Bell, Search, Cash, BusFront,
  Calendar, Gear, GraphUp, Ticket, Clipboard,
  ShieldLock, BoxArrowRight, Plus, Pencil, Trash
} from 'react-bootstrap-icons';

const AdminDashboard = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
  const recentBookings = [
    { id: 'BK1001', customer: 'John Doe', route: 'NYC to Boston', date: '2023-06-15', amount: '$45', status: 'confirmed' },
    { id: 'BK1002', customer: 'Jane Smith', route: 'LA to SF', date: '2023-06-15', amount: '$60', status: 'pending' },
    { id: 'BK1003', customer: 'Mike Johnson', route: 'Chicago to Detroit', date: '2023-06-14', amount: '$35', status: 'cancelled' },
    { id: 'BK1004', customer: 'Sarah Williams', route: 'Miami to Orlando', date: '2023-06-14', amount: '$25', status: 'confirmed' },
  ];


  return (
    <Container fluid className="px-0">
      {/* Top Navigation Bar */}
      <Nav className="bg-dark text-white px-4 py-3 shadow-sm justify-content-between align-items-center">
        <Nav.Item>
          <h4 className="mb-0 text-teal">
            <BusFront className="me-2" />
            BusAdmin Dashboard
          </h4>
        </Nav.Item>
        <Nav.Item className="d-flex align-items-center">
          <Form.Control 
            type="search" 
            placeholder="Search..." 
            className="me-3 bg-secondary border-0 text-white" 
          />
          <Bell size={20} className="me-3 text-white" />
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="profile-dropdown" className="d-flex align-items-center">
              <PersonCircle className="me-2" />
              Admin User
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark text-white">
              <Dropdown.Divider />
              <Dropdown.Item className="text-white">
                <BoxArrowRight className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      </Nav>

      {/* Main Content */}
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={2} className="bg-light vh-100 p-3 border-end">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="flex-column"
          >
          </Tabs>
        </Col>

        {/* Dashboard Content */}
        <Col md={10} className="p-4">
          {/* Quick Stats */}
          <Row className="mb-4 g-4">
            <Col md={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted">Total Bookings</h6>
                      <h3 className="text-purple">1,248</h3>
                    </div>
                    <Ticket size={32} className="text-teal" />
                  </div>
                  <small className="text-success">↑ 12% from yesterday</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted">Today's Revenue</h6>
                      <h3 className="text-purple">$8,420</h3>
                    </div>
                    <Cash size={32} className="text-teal" />
                  </div>
                  <small className="text-success">↑ 8% from yesterday</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted">Active Buses</h6>
                      <h3 className="text-purple">28</h3>
                    </div>
                    <BusFront size={32} className="text-teal" />
                  </div>
                  <small>3 in maintenance</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted">Pending Issues</h6>
                      <h3 className="text-purple">5</h3>
                    </div>
                    <ShieldLock size={32} className="text-teal" />
                  </div>
                  <small className="text-danger">2 high priority</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Bookings */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0 text-purple">
                <Ticket className="me-2" />
                Recent Bookings
              </h5>
              <Button variant="teal" size="sm" onClick={() => setShowBookingModal(true)}>
                <Plus className="me-1" />
                New Booking
              </Button>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Route</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.id}</td>
                      <td>{booking.customer}</td>
                      <td>{booking.route}</td>
                      <td>{booking.date}</td>
                      <td>{booking.amount}</td>
                      <td>
                        <Badge 
                          bg={
                            booking.status === 'confirmed' ? 'teal' : 
                            booking.status === 'pending' ? 'warning' : 'danger'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="outline-purple" size="sm" className="me-2">
                          <Pencil size={14} />
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <Trash size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>  
        </Col>
      </Row>

      {/* New Booking Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} size="lg">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="text-purple">
            <Plus className="me-2" />
            Create New Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="fromCity">
                  <Form.Label>From</Form.Label>
                  <Form.Control type="text" placeholder="Departure city" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="toCity">
                  <Form.Label>Route</Form.Label>
                  <Form.Select>
                    <option>Select route</option>
                    <option>NYC to Boston</option>
                    <option>LA to SF</option>
                    <option>Chicago to Detroit</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="departureDate">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="seats">
                  <Form.Label>Seats</Form.Label>
                  <Form.Select>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num}>{num} seat{num !== 1 ? 's' : ''}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="bus">
                  <Form.Label>Bus</Form.Label>
                  <Form.Select>
                    <option>Select bus</option>
                    <option>Bus #101 (Standard)</option>
                    <option>Bus #205 (Premium)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="text" placeholder="$0.00" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowBookingModal(false)}>
            Cancel
          </Button>
          <Button variant="teal">
            Create Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;