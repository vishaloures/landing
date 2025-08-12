import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import MainContent from '../components/MainContent/MainContent';
import RequestForm from '../components/RequestForm/RequestForm';

const ApiDocsPage = () => {
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          {/* Sidebar Column */}
          <Col md={3} className="p-0">
            <Sidebar />
          </Col>
          
          {/* Main Content Column */}
          <Col md={6}>
            <MainContent />
          </Col>

          {/* Request Form Column */}
          <Col md={3} className="p-0">
            <RequestForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ApiDocsPage;
