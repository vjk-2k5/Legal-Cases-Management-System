'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  DatePicker,
  useDisclosure,
  Select,
  SelectItem
} from '@nextui-org/react';

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
  const [cases, setCases] = useState<Case[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  const [newAppointment, setNewAppointment] = useState({
    lawyer_id: '',
    client_id:'',
    case_id: '',
    appointment_date: '',
    location: '',
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); 
        const user_id = localStorage.getItem('user_id');
        const [casesRes, appointmentsRes, locationsRes] = await Promise.all([
          fetch('/api/cases', {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          }),
          fetch('http://localhost:5000/lcms/client/getAppointmentsByUserId', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({user_id}),
          }),
          fetch('http://localhost:5000/lcms/client/getLocations', {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          }),
        ]);
        
        if (locationsRes.ok && appointmentsRes.ok) {
          const locationsData = await locationsRes.json();
          const appointmentsData = await appointmentsRes.json();
          setLocations(locationsData);
          setAppointments(appointmentsData);
          console.log(appointmentsData);
          console.log(locationsData);
        }
  
        if (casesRes.ok && appointmentsRes.ok && locationsRes.ok) {
          const casesData = await casesRes.json();
          const appointmentsData = await appointmentsRes.json();
          const locationsData = await locationsRes.json();
  
          setCases(casesData);
          setAppointments(appointmentsData);
          setLocations(locationsData);
          console.log(locationsData);
        } else {
          console.error('Failed to fetch one or more resources.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  const fetchAndSetClientId = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/lcms/client/getClientIdFromUserId/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({user_id}),
          });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('client_id', data.client_id);
      } else {
        console.error('Failed to fetch client_id');
      }
    } catch (error) {
      console.error('Error fetching client_id:', error);
    }
  };
  const handleBookAppointment = async () => {
    try {
      const clientId = localStorage.getItem('client_id');
      if (clientId) {
        newAppointment.client_id = clientId;
      } else {
        console.error('Client ID is null');
        return;
      }
  
      // Ensure date is in ISO format before sending
      const appointmentToSend = {
        ...newAppointment,
        appointment_date: new Date(newAppointment.appointment_date).toISOString(),
      };
  
      const response = await fetch(
        'http://localhost:5000/lcms/client/addAppointment/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify(appointmentToSend),
        }
      );
  
      if (response.ok) {
        const newApp = await response.json();
        setAppointments([...appointments, newApp]);
        onClose(); // Close the modal after successful booking
      } else {
        console.error('Failed to book appointment.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };
  fetchAndSetClientId();

  const formatDateTimeForInput = (date: string | Date) => {
    const d = new Date(date);
    return d.toISOString().slice(0, 16); // Trims seconds and timezone
  };

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointment_date) > new Date()
  );

  const recentAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointment_date) <= new Date()
  );

  const handleLocationChange = (value: string) => {
    setNewAppointment({ ...newAppointment, location: value });
  };

  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">Appointments</h1>

      <h2 className="text-2xl text-blue-600">Upcoming Appointments</h2>
      <div className="flex flex-wrap gap-6">
        {upcomingAppointments.map((appointment) => (
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

      <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <h3>Book New Appointment</h3>
        </ModalHeader>
        <ModalBody>
          <Input
            label="Lawyer ID"
            value={newAppointment.lawyer_id}
            onChange={(e) => setNewAppointment({ ...newAppointment, lawyer_id: e.target.value })}
          />
          
         <Input
  type="datetime-local"
  label="Appointment Date"
  value={formatDateTimeForInput(newAppointment.appointment_date || new Date())}
  onChange={(e) =>
    setNewAppointment({ ...newAppointment, appointment_date: e.target.value })
  }
/>
          <Select
            id="location"
            label="Location"
            variant="bordered"
            fullWidth
            required
            className="bg-transparent"
            value={newAppointment.location}
            onChange={(e) => handleLocationChange(e.target.value)}
          >
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </Select>
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
