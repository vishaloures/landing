import { useState } from 'react';
import { ListGroup, Card, Accordion } from 'react-bootstrap';
import type { ApiService, ApiMethod } from '../../services/TradeApiSpec';
import { tradeApiSpecService } from '../../services/TradeApiSpec';

const MainContent = () => {
  const [services] = useState<ApiService[]>(tradeApiSpecService.getServices());

  if (services.length === 0) {
    return (
      <div className="p-4">
        <h1>API Спецификация</h1>
        <p>Не найдено ни одного сервиса. Убедитесь, что файл <code>api-spec.json</code> был сгенерирован корректно.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1>Документация API</h1>
      <p>
        Обзор всех доступных сервисов и их методов, сгенерированный из <code>.proto</code> файлов.
      </p>
      
      <Accordion defaultActiveKey="0" alwaysOpen>
        {services.map((service: ApiService, serviceIndex: number) => (
          <Accordion.Item eventKey={String(serviceIndex)} key={service.name}>
            <Accordion.Header>{service.name}</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {service.methods.map((method: ApiMethod) => (
                  <ListGroup.Item key={method.name}>
                    <h5>{method.name}</h5>
                    <p>{method.description || 'Нет описания.'}</p>
                    <Card>
                      <Card.Body>
                        <Card.Text>
                          <strong>Запрос:</strong> <code>{method.requestType}</code>
                        </Card.Text>
                        <Card.Text>
                          <strong>Ответ:</strong> <code>{method.responseType}</code>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default MainContent;

