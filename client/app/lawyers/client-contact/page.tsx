// page.tsx

'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { useEffect } from 'react';


interface Case {
  case_id: number;
  client_id: number;
  lawyer_id: number;
  title: string;
  status: string;
  next_hearing_date: string;
  avg_days_until_next_appointment: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
  total_appointments: string;
  client_email: string;
  client_first_name: string;
  client_user_id: number;
}


const ClientContacts: React.FC = () => {
  


  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const fetchCases = async () => {
      try {
        const response = await fetch('http://localhost:5000/lcms/lawyer/fetchClient', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);  
          if (Array.isArray(data)) {
            setCases(data);  
          } else {
            console.error('Received data is not an array');
          }
        } else {
          console.error('Failed to fetch cases');
        }
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };
  
    fetchCases();
  }, []);



  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">Client Contacts</h1>
  
      <div className="flex flex-wrap gap-6">
        {cases.map((caseItem) => {
          
          return (
            <Card key={caseItem.case_id} isHoverable variant="bordered" className="flex-1 min-w-[300px]">
              <CardHeader className="bg-blue-600 text-white">
                <h3 className="text-lg">{`${caseItem.client_first_name} `}</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>Client ID: {caseItem.client_id}</p>
                <p>Email: {caseItem.client_email}</p>
                <p>Status: {caseItem.status}</p>
                <p>Next Hearing Date: {new Date(caseItem.next_hearing_date).toLocaleDateString()}</p>
                <p>Total Appointments: {caseItem.total_appointments}</p>
                <p>Days Until Next Appointment: {caseItem.avg_days_until_next_appointment.days} days</p>
                <Divider />
                <h4 className="mt-4">Case Details</h4>
                <p>Case Title: {caseItem.title}</p>
                <p>Status: {caseItem.status}</p>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};  

export default ClientContacts;