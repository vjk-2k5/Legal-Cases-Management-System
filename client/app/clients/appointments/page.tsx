'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, DatePicker, useDisclosure } from '@nextui-org/react';

interface Case {
  case_id: number;
  title: string;
  status: string;
  next_hearing_date: string;
  lawyer_id: number;
}

interface Appointment {
  appointment_id: number;
  case_id: number;
  appointment_date: string;
  location: string;
}

const ClientDashboard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cases, setCases] = useState<Case[]>([
    {
      case_id: 1,
      title: 'Case 1',
      status: 'Open',
      next_hearing_date: '2023-11-01',
      lawyer_id: 1,
    },
    {
      case_id: 2,
      title: 'Case 2',
      status: 'Closed',
      next_hearing_date: '2023-12-15',
      lawyer_id: 2,
    },
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      appointment_id: 1,
      case_id: 1,
      appointment_date: '2023-10-20T10:00:00',
      location: 'Courtroom A',
    },
    {
      appointment_id: 2,
      case_id: 2,
      appointment_date: '2023-11-05T14:00:00',
      location: 'Courtroom B',
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    lawyer_id: '',
    case_id: '',
    appointment_date: '',
    location: '',
  });

  const handleBookAppointment = () => {
    // Logic to book a new appointment
    const newApp = {
      appointment_id: appointments.length + 1,
      case_id: parseInt(newAppointment.case_id),
      appointment_date: newAppointment.appointment_date,
      location: newAppointment.location,
    };
    setAppointments([...appointments, newApp]);
    onClose(); // Close modal after booking
  };

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointment_date) > new Date()
  );

  const recentAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointment_date) <= new Date()
  );

  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">Appointments</h1>

      <h2 className="text-2xl text-blue-600">Upcoming Appointments</h2>
      <div className="flex flex-wrap gap-6">
        {upcomingAppointments.map((appointment) => (
          <Card key={appointment.appointment_id} isHoverable variant="bordered" className="flex-1 min-w-[300px] ">
            <CardHeader className="bg-blue-600 text-white">
              <h3 className="text-lg">Appointment</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Case ID: {appointment.case_id}</p>
              <p>{new Date(appointment.appointment_date).toLocaleString()}</p>
              <p>Location: {appointment.location}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <h2 className="mt-8 text-2xl text-blue-600">Recent Appointments</h2>
      <div className="flex flex-wrap gap-6">
        {recentAppointments.map((appointment) => (
          <Card key={appointment.appointment_id} isHoverable variant="bordered" className="flex-1 min-w-[300px]">
            <CardHeader className="bg-blue-600 text-white">
              <h3 className="text-lg">Appointment</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Case ID: {appointment.case_id}</p>
              <p>{new Date(appointment.appointment_date).toLocaleString()}</p>
              <p>Location: {appointment.location}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <Button className="mt-8" onPress={onOpen}>
        Book New Appointment
      </Button>

      {/* Modal to book new appointment */}
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader>
            <h3>Book New Appointment</h3>
          </ModalHeader>
          <ModalBody>
            <Input
              label="Lawyer ID"
              value={newAppointment.case_id}
              onChange={(e) => setNewAppointment({ ...newAppointment, lawyer_id: e.target.value })}
            />
            <DatePicker
              label="Appointment Date"
              value={newAppointment.appointment_date ? new Date(newAppointment.appointment_date) : undefined}
              onChange={(date) => setNewAppointment({ ...newAppointment, appointment_date: date?.toISOString() || '' })}
            />
            <Input
              label="Location"
              value={newAppointment.location}
              onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleBookAppointment}>
              Book Appointment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ClientDashboard;