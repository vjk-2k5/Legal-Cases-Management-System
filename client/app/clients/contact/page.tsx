// page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, DatePicker, useDisclosure } from '@nextui-org/react';

interface Lawyer {
  lawyer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  specialization: string;
}

const ContactsPage: React.FC = () => {
  const [caseLawyers, setCaseLawyers] = useState<Lawyer[]>([
    {
      lawyer_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone_number: '123-456-7890',
      specialization: 'Criminal Law',
    },
    {
      lawyer_id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      phone_number: '098-765-4321',
      specialization: 'Family Law',
    },
  ]);

  const [otherLawyers, setOtherLawyers] = useState<Lawyer[]>([
    {
      lawyer_id: 3,
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice.johnson@example.com',
      phone_number: '555-123-4567',
      specialization: 'Corporate Law',
    },
    {
      lawyer_id: 4,
      first_name: 'Bob',
      last_name: 'Brown',
      email: 'bob.brown@example.com',
      phone_number: '555-987-6543',
      specialization: 'Intellectual Property Law',
    },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    case_id: '',
    appointment_date: '',
    location: '',
  });

  const handleHireLawyer = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    onOpen();
  };

  const confirmHireLawyer = () => {
    if (selectedLawyer) {
      // Logic to book the first appointment with the lawyer
      const newAppointment = {
        appointment_id: Date.now(), // Just a placeholder for unique ID
        case_id: parseInt(appointmentDetails.case_id),
        lawyer_id: selectedLawyer.lawyer_id,
        appointment_date: appointmentDetails.appointment_date,
        location: appointmentDetails.location,
      };

      // Assuming we have an API endpoint to book an appointment
      fetch('/api/client/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Appointment booked:', data);
          onClose();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">Contact</h1>

      <h2 className="text-2xl text-blue-600">Case Lawyers</h2>
      <div className="flex flex-wrap gap-6">
        {caseLawyers.map((lawyer) => (
          <Card key={lawyer.lawyer_id} isHoverable variant="bordered" className="flex-1 min-w-[300px] ">
            <CardHeader className="bg-blue-600 text-white">
              <h3 className="text-lg">{`${lawyer.first_name} ${lawyer.last_name}`}</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Email: {lawyer.email}</p>
              <p>Phone: {lawyer.phone_number}</p>
              <p>Specialization: {lawyer.specialization}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <h2 className="mt-8 text-2xl text-blue-600">Other Lawyers</h2>
      <div className="flex flex-wrap gap-6">
        {otherLawyers.map((lawyer) => (
          <Card key={lawyer.lawyer_id} isHoverable variant="bordered" className="flex-1 min-w-[300px] ">
            <CardHeader className="bg-blue-600 text-white">
              <h3 className="text-lg">{`${lawyer.first_name} ${lawyer.last_name}`}</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Email: {lawyer.email}</p>
              <p>Phone: {lawyer.phone_number}</p>
              <p>Specialization: {lawyer.specialization}</p>
              <Button className="mt-4" onPress={() => handleHireLawyer(lawyer)}>
                Hire Lawyer
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedLawyer && (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
          <ModalContent>
            <ModalHeader>
              <h3>Hire Lawyer</h3>
            </ModalHeader>
            <ModalBody>
              <p>Book the first appointment with {selectedLawyer.first_name} {selectedLawyer.last_name}</p>
              <DatePicker
                label="Appointment Date"
                placeholder="Select Date"
                value={appointmentDetails.appointment_date ? new Date(appointmentDetails.appointment_date) : undefined}
                onChange={(date) => setAppointmentDetails({ ...appointmentDetails, appointment_date: date?.toISOString() || '' })}
              />
              <Input
                label="Location"
                placeholder="Enter Location"
                value={appointmentDetails.location}
                onChange={(e) => setAppointmentDetails({ ...appointmentDetails, location: e.target.value })}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={confirmHireLawyer}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default ContactsPage;