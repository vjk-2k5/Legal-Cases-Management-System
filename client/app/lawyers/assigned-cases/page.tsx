'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';

interface Case {
  case_id: number;
  client_id: number;
  lawyer_id: number;
  title: string;
  status: string;
  next_hearing_date: string;
  client_first_name: string;
  client_last_name: string;
  lawyer_first_name: string;
  lawyer_last_name: string;
}

interface Client {
  client_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
}

interface Lawyer {
  lawyer_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  specialization: string;
}

const AssignedCases: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  useEffect(() => {
    const fetchCasesAndClients = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const lawyer_id = localStorage.getItem('lawyer_id');
        const casesResponse = await fetch('http://localhost:5000/lcms/lawyer/getCases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ lawyer_id }),
        });
        const casesData = await casesResponse.json();
        console.log(casesData);
        setCases(casesData);

        const clientsResponse = await fetch('/api/clients');
        const clientsData = await clientsResponse.json();
        setClients(clientsData);

        const lawyersResponse = await fetch('/api/lawyers');
        const lawyersData = await lawyersResponse.json();
        setLawyers(lawyersData);
      } catch (error) {
        console.error('Error fetching cases or clients:', error);
      }
    };

    fetchCasesAndClients();
  }, []);

  const getClientName = (client_id: number) => {
    const client = clients.find((client) => client.client_id === client_id);
    return client ? `${client.first_name} ${client.last_name}` : 'Unknown';
  };

  const getLawyerName = (lawyer_id: number) => {
    const lawyer = lawyers.find((lawyer) => lawyer.lawyer_id === lawyer_id);
    return lawyer ? `${lawyer.first_name} ${lawyer.last_name}` : 'Unknown';
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
              <p>Client: {caseItem.client_first_name}</p>
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
              <p><strong>Title:</strong> {selectedCase.case_title}</p>
              <p><strong>Client:</strong> {selectedCase.client_first_name}</p>
              <p><strong>Status:</strong> {selectedCase.case_status}</p>
              <p><strong>Next Hearing Date:</strong> {new Date(selectedCase.next_hearing_date).toLocaleDateString()}</p>
              <p><strong>Lawyer:</strong> {selectedCase.lawyer_first_name}</p>
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
