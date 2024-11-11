// page.tsx

'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';

interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

interface Client {
  client_id: number;
  user_id: number;
  additional_client_info: string;
}

interface Case {
  case_id: number;
  client_id: number;
  lawyer_id: number;
  title: string;
  status: string;
  next_hearing_date: string;
}

const ClientContacts: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      client_id: 1,
      user_id: 1,
      additional_client_info: 'Additional info for client 1',
    },
    {
      client_id: 2,
      user_id: 2,
      additional_client_info: 'Additional info for client 2',
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      user_id: 1,
      email: 'john.doe@example.com',
      first_name: 'John',
      last_name: 'Doe',
      phone_number: '123-456-7890',
    },
    {
      user_id: 2,
      email: 'jane.smith@example.com',
      first_name: 'Jane',
      last_name: 'Smith',
      phone_number: '098-765-4321',
    },
  ]);

  const [cases, setCases] = useState<Case[]>([
    {
      case_id: 1,
      client_id: 1,
      lawyer_id: 1,
      title: 'Case 1',
      status: 'Open',
      next_hearing_date: '2023-11-01',
    },
    {
      case_id: 2,
      client_id: 2,
      lawyer_id: 1,
      title: 'Case 2',
      status: 'Closed',
      next_hearing_date: '2023-12-15',
    },
  ]);

  const getClientUser = (client_id: number) => {
    const client = clients.find((client) => client.client_id === client_id);
    if (client) {
      return users.find((user) => user.user_id === client.user_id);
    }
    return null;
  };

  const getClientCases = (client_id: number) => {
    return cases.filter((caseItem) => caseItem.client_id === client_id);
  };

  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">Client Contacts</h1>

      <div className="flex flex-wrap gap-6">
        {clients.map((client) => {
          const clientUser = getClientUser(client.client_id);
          const clientCases = getClientCases(client.client_id);
          if (clientUser) {
            return (
              <Card key={client.client_id} isHoverable variant="bordered" className="flex-1 min-w-[300px] ">
                <CardHeader className="bg-blue-600 text-white">
                  <h3 className="text-lg">{`${clientUser.first_name} ${clientUser.last_name}`}</h3>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>Client ID: {client.client_id}</p>
                  <p>Email: {clientUser.email}</p>
                  <p>Phone: {clientUser.phone_number}</p>
                  <Divider />
                  <h4 className="mt-4">Cases</h4>
                  {clientCases.map((caseItem) => (
                    <div key={caseItem.case_id}>
                      <p>Case Title: {caseItem.title}</p>
                      <p>Status: {caseItem.status}</p>
                      <Divider />
                    </div>
                  ))}
                </CardBody>
              </Card>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ClientContacts;