import React from 'react';
import { Tabs, Tab, Badge } from 'react-bootstrap';
import { FiCopy } from 'react-icons/fi';

const MainContent = () => {
  return (
    <div className="p-4">
      <h1>PositionsStream — стрим обновлений информации по изменению позиций портфеля</h1>
      
      <Tabs defaultActiveKey="exchange" id="main-content-tabs" className="mb-3">
        <Tab eventKey="exchange" title="Работа с биржей">
          {/* Content for "Работа с биржей" */}
        </Tab>
        <Tab eventKey="sandbox" title="Работа в песочнице">
          {/* Content for "Работа в песочнице" */}
        </Tab>
      </Tabs>

      <div className="d-flex align-items-center mb-3">
        <Badge bg="success">POST</Badge>
        <code className="ms-2 user-select-all">https://www.postman.com/emil-7238890/f-api-public-workspace/request/ejouqgj/auth</code>
        <FiCopy className="ms-2" style={{cursor: 'pointer'}} onClick={() => navigator.clipboard.writeText('https://www.postman.com/emil-7238890/f-api-public-workspace/request/ejouqgj/auth')} />
      </div>

      <h5>Описание</h5>
      <p>
        Метод для получения информации по изменению позиций портфеля в реальном времени.
      </p>

      <h5>Авторизация</h5>
      <p>
        <a href="#auth">Bearer API Token</a>
      </p>

      <h5>Запрос</h5>
      <p>Request body schema application/json</p>
      <ul>
        <li><code>accounts</code> (array) - Массив идентификаторов счетов.</li>
      </ul>
    </div>
  );
};

export default MainContent;
