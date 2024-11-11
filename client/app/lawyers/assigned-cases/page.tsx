// page.tsx

'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';

interface Case {
  case_id: number;
  client_id: number;
  lawyer_id: number;
  title: string;
  status: string;
  next_hearing_date: string;
}

interface Client {
  client_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
}

const AssignedCases: React.FC = () => {
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

  const [clients, setClients] = useState<Client[]>([
    {
      client_id: 1,
      user_id: 1,
      first_name: 'John',
      last_name: 'Doe',
    },
    {
      client_id: 2,
      user_id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
    },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const getClientName = (client_id: number) => {
    const client = clients.find((client) => client.client_id === client_id);
    return client ? `${client.first_name} ${client.last_name}` : 'Unknown';
  };

  const handleViewCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    onOpen();
  };

  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">Assigned Cases</h1>

      <div className="flex flex-wrap gap-6">
        {cases.map((caseItem) => (
          <Card key={caseItem.case_id} isHoverable variant="bordered" className="flex-1 min-w-[300px] ">
            <CardHeader className="bg-blue-600 text-white">
              <h3 className="text-lg">{caseItem.title}</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Client: {getClientName(caseItem.client_id)}</p>
              <p>Status: {caseItem.status}</p>
              <Button className="mt-4" onPress={() => handleViewCase(caseItem)}>
                View Case Details
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedCase && (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
          <ModalContent>
            <ModalHeader>
              <h3>Case Details</h3>
            </ModalHeader>
            <ModalBody>
              <p><strong>Title:</strong> {selectedCase.title}</p>
              <p><strong>Client:</strong> {getClientName(selectedCase.client_id)}</p>
              <p><strong>Status:</strong> {selectedCase.status}</p>
              <p><strong>Next Hearing Date:</strong> {new Date(selectedCase.next_hearing_date).toLocaleDateString()}</p>
              <p><strong>Lawyer ID:</strong> {selectedCase.lawyer_id}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default AssignedCases;