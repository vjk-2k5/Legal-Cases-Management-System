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
  useDisclosure 
} from '@nextui-org/react';

interface Lawyer {
  lawyer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  specialization: string;
}

const ContactsPage: React.FC = () => {
  const [caseLawyers, setCaseLawyers] = useState<Lawyer[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    lawyer_id: '', 
    appointment_date: '',
    location: '',
  });

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        const caseResponse = await fetch('http://localhost:5000/lcms/client/getLawyers', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (caseResponse.ok) {
          const caseData = await caseResponse.json();
          setCaseLawyers(caseData);
        } else {
          console.error('Failed to fetch case lawyers');
        }
      } catch (error) {
        console.error('Error fetching lawyers:', error);
      }
    };

    fetchLawyers();
  }, []);

  const handleHireLawyer = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      lawyer_id: lawyer.lawyer_id,
    }));
    onOpen();
  };

  const formatDateTimeForInput = (date: string | Date) => {
    const d = new Date(date);
    return d.toISOString().slice(0, 16); 
  };

  const confirmHireLawyer = () => {
    if (!appointmentDetails.appointment_date) {
      console.error("Appointment date is required.");
      alert("Please select a valid appointment date.");
      return; 
    }
  
    if (!selectedLawyer) {
      console.error("No lawyer selected.");
      return;
    }

    const newAppointment = {
      client_id: localStorage.getItem('client_id'),
      lawyer_id: appointmentDetails.lawyer_id, 
      appointment_date: appointmentDetails.appointment_date, 
      location: appointmentDetails.location,
    };
  
    fetch('http://localhost:5000/lcms/client/addAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(newAppointment),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to book appointment");
        return response.json();
      })
      .then((data) => {
        console.log('Appointment booked:', data);
        onClose();
      })
      .catch((error) => console.error("Error booking appointment:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">Contact</h1>

      <h2 className="text-2xl text-blue-600">Case Lawyers</h2>
      <div className="flex flex-wrap gap-6">
        {caseLawyers.map((lawyer) => (
          <Card key={lawyer.lawyer_id} isHoverable variant="bordered" className="flex-1 min-w-[300px]">
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
              <Input
                type="datetime-local"
                label="Appointment Date"
                value={formatDateTimeForInput(appointmentDetails.appointment_date || new Date())}
                onChange={(e) => {
                  setAppointmentDetails({
                    ...appointmentDetails,
                    appointment_date: e.target.value, 
                  });
                }}
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
