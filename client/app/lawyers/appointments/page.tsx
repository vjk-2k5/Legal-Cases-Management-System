// page.tsx

'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from '@nextui-org/react';

interface Appointment {
  appointment_id: number;
  client_id: number;
  lawyer_id: number;
  appointment_date: string;
  location: string;
}

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

const LawyerAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      appointment_id: 1,
      client_id: 1,
      lawyer_id: 1,
      appointment_date: '2023-10-20T10:00:00',
      location: 'Courtroom A',
    },
    {
      appointment_id: 2,
      client_id: 2,
      lawyer_id: 1,
      appointment_date: '2023-11-05T14:00:00',
      location: 'Courtroom B',
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
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const getClientName = (client_id: number) => {
    const client = clients.find((client) => client.client_id === client_id);
    return client ? `${client.first_name} ${client.last_name}` : 'Unknown';
  };

  const getCaseTitle = (case_id: number) => {
    const caseItem = cases.find((caseItem) => caseItem.case_id === case_id);
    return caseItem ? caseItem.title : 'Unknown';
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    onOpen();
  };

  const handleUpdateAppointment = () => {
    if (selectedAppointment) {
      setAppointments(appointments.map((a) => (a.appointment_id === selectedAppointment.appointment_id ? selectedAppointment : a)));
      onClose();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">Lawyer Appointments</h1>

      <div className="flex flex-wrap gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.appointment_id} isHoverable variant="bordered" className="flex-1 min-w-[300px] ">
            <CardHeader className="bg-blue-600 text-white">
              <h3 className="text-lg">Appointment</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Case: {getCaseTitle(appointment.case_id)}</p>
              <p>Client: {getClientName(appointment.client_id)}</p>
              <p>Date: {new Date(appointment.appointment_date).toLocaleString()}</p>
              <p>Location: {appointment.location}</p>
              <Button className="mt-4" onPress={() => handleEditAppointment(appointment)}>
                Edit Appointment
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedAppointment && (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
          <ModalContent>
            <ModalHeader>
              <h3>Edit Appointment</h3>
            </ModalHeader>
            <ModalBody>
              <Input
                label="Appointment Date"
                type="datetime-local"
                value={selectedAppointment.appointment_date}
                onChange={(e) => setSelectedAppointment({ ...selectedAppointment, appointment_date: e.target.value })}
              />
              <Input
                label="Location"
                placeholder="Enter location"
                value={selectedAppointment.location}
                onChange={(e) => setSelectedAppointment({ ...selectedAppointment, location: e.target.value })}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={handleUpdateAppointment}>
                Update Appointment
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default LawyerAppointments;