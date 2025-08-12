
import { useState } from 'react';
import { Nav, Collapse } from 'react-bootstrap';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="p-3" style={{ backgroundColor: '#f8f9fa', height: '100vh' }}>
      <Nav className="flex-column">
        <Nav.Link href="#start">Getting Started</Nav.Link>
        <Nav.Link href="#bussiness cases">Bussiness cases</Nav.Link>
        <Nav.Link href="#test">Test</Nav.Link>
        <Nav.Link 
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          className="d-flex justify-content-between align-items-center"
        >
          Documentation API
          {open ? <FiChevronDown /> : <FiChevronRight />}
        </Nav.Link>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <Nav className="flex-column ms-3">
              <Nav.Link href="#rest">REST API</Nav.Link>
              <Nav.Link href="#grpc" active style={{backgroundColor: '#e9ecef', borderRadius: '5px'}}>gRPC API</Nav.Link>
            </Nav>
          </div>
        </Collapse>
        <Nav.Link href="#Limits">Limits</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
