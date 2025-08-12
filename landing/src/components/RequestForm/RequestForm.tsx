
import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const RequestForm = () => {
  const [showToken, setShowToken] = useState(false);

  const requestBodyExample = `{
  "accounts": [
    "string"
  ]
}`;

  return (
    <div className="p-3 border-start" style={{height: '100vh'}}>
      <h4 className="mb-3">Запрос</h4>
      
      <Form>
        <Form.Group className="mb-3" controlId="formAuth">
          <Form.Label>Authorization</Form.Label>
          <InputGroup>
            <Form.Control
              type={showToken ? 'text' : 'password'}
              placeholder="Bearer API Token"
            />
            <Button variant="outline-secondary" onClick={() => setShowToken(!showToken)}>
              {showToken ? <FiEyeOff /> : <FiEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEnvironment">
          <Form.Label>Окружение</Form.Label>
          <Form.Select defaultValue="sandbox">
            <option value="sandbox">Работа в песочнице</option>
            <option value="exchange">Работа с биржей</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBody">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            defaultValue={requestBodyExample}
          />
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Отправить запрос
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RequestForm;
