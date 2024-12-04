'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from '@nextui-org/react';

interface Appointment {
  appointment_id: number;
  client_id: number;
  lawyer_id: number;
  appointment_date: string;
  location: string;
  client_first_name: string;
  client_last_name: string;
  lawyer_first_name: string;
  lawyer_last_name: string;
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
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);


  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    onOpen();
  };
  const handleUpdateAppointment = async () => {
    if (selectedAppointment) {
      try {
        console.log('Updating appointment:', selectedAppointment);
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:5000/lcms/lawyer/updateAppointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            appointment_id: selectedAppointment.appointment_id,
            appointment_date: selectedAppointment.appointment_date,
            location: selectedAppointment.location,
          }),
        });
  
        if (response.ok) {
          
          setAppointments(appointments.map((a) => (a.appointment_id === selectedAppointment.appointment_id ? selectedAppointment : a)));
          onClose();
        } else {
          console.error('Error updating appointment', response.statusText);
        }
      } catch (error) {
        console.error('Failed to update appointment', error);
      }
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const authToken = localStorage.getItem('authToken');
      const lawyerId = localStorage.getItem('lawyer_id');
      if (authToken && lawyerId) {
        try {
          const response = await fetch('http://localhost:5000/lcms/lawyer/getAppointmentByLawyerId', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ lawyer_id: lawyerId }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Appointments:', data);
            setAppointments(data);
     
          } else {
            console.error('Error fetching data', response.statusText);
          }
        } catch (error) {
          console.error('Failed to fetch appointments', error);
        }
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">Lawyer Appointments</h1>

      <div className="flex flex-wrap gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.appointment_id} isHoverable variant="bordered" className="flex-1 min-w-[300px]">
            <CardHeader className="bg-blue-600 text-white">
              <h3 className="text-lg">Appointment</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Case: {appointment.appointment_id}</p>
              <p>Client: {`${appointment.client_first_name} ${appointment.client_last_name}`}</p>
              <p>Lawyer: {`${appointment.lawyer_first_name} ${appointment.lawyer_last_name}`}</p>
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
