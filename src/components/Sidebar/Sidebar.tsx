import React, { useState } from 'react';
import { Nav, Collapse } from 'react-bootstrap';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="p-3" style={{ backgroundColor: '#f8f9fa', height: '100vh' }}>
      <Nav className="flex-column">
        <Nav.Link href="#getting-started">Getting Started</Nav.Link>
        <Nav.Link href="#orders">Orders</Nav.Link>
        <Nav.Link href="#stops">Stops</Nav.Link>
        <Nav.Link 
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          className="d-flex justify-content-between align-items-center"
        >
          OperationsStreamService
          {open ? <FiChevronDown /> : <FiChevronRight />}
        </Nav.Link>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <Nav className="flex-column ms-3">
              <Nav.Link href="#portfolio">PortfolioStream</Nav.Link>
              <Nav.Link href="#positions" active style={{backgroundColor: '#e9ecef', borderRadius: '5px'}}>PositionsStream</Nav.Link>
            </Nav>
          </div>
        </Collapse>
        <Nav.Link href="#securities">Securities</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
