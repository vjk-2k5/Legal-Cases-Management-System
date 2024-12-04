
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';

interface Case {
  case_id: number;
  client_id: number;
  lawyer_id: number;
  title: string;
  status: string;
  next_hearing_date: string;
}

interface Appointment {
  appointment_id: number;
  client_id: number;
  lawyer_id: number;
  appointment_date: string;
  location: string;
}

const LawyerDashboard: React.FC = () => {
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

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointment_date) > new Date()
  );

  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">Lawyer Dashboard</h1>

      <h2 className="text-2xl text-blue-600">Assigned Cases</h2>
      <div className="flex flex-wrap gap-6">
        {cases.map((caseItem) => (
          <Card key={caseItem.case_id} isHoverable variant="bordered" className="flex-1 min-w-[300px] ">
            <CardHeader className="bg-blue-600 text-white">
              <h3 className="text-lg">{caseItem.title}</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Status: {caseItem.status}</p>
              <p>Next Hearing Date: {new Date(caseItem.next_hearing_date).toLocaleDateString()}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <h2 className="mt-8 text-2xl text-blue-600">Upcoming Appointments</h2>
      <div className="flex flex-wrap gap-6">
        {upcomingAppointments.map((appointment) => (
          <Card key={appointment.appointment_id} isHoverable variant="bordered" className="flex-1 min-w-[300px] ">
            <CardHeader className="bg-blue-600 text-white">
              <h3 className="text-lg">Appointment</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Case ID: {appointment.case_id}</p>
              <p>Date: {new Date(appointment.appointment_date).toLocaleString()}</p>
              <p>Location: {appointment.location}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LawyerDashboard;