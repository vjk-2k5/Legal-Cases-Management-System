// page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Divider, Accordion, AccordionItem } from '@nextui-org/react';

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

interface CaseNote {
  note_id: number;
  case_id: number;
  lawyer_id: number;
  note: string;
}

interface Lawyer {
  lawyer_id: number;
  first_name: string;
  last_name: string;
}

const ClientCases: React.FC = () => {
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

  const [caseNotes, setCaseNotes] = useState<CaseNote[]>([
    {
      note_id: 1,
      case_id: 1,
      lawyer_id: 1,
      note: 'Initial consultation completed.',
    },
    {
      note_id: 2,
      case_id: 2,
      lawyer_id: 2,
      note: 'Case closed successfully.',
    },
  ]);

  const [lawyers, setLawyers] = useState<Lawyer[]>([
    {
      lawyer_id: 1,
      first_name: 'John',
      last_name: 'Doe',
    },
    {
      lawyer_id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
    },
  ]);

  const getLawyerName = (lawyer_id: number) => {
    const lawyer = lawyers.find((lawyer) => lawyer.lawyer_id === lawyer_id);
    return lawyer ? `${lawyer.first_name} ${lawyer.last_name}` : 'Unknown';
  };

  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">
        List of Cases
      </h1>

      <h2 className="text-2xl text-blue-600">Case Summaries</h2>
      <div className="flex flex-wrap gap-6">
        {cases.map((caseItem) => (
          <Card key={caseItem.case_id} isHoverable variant="bordered" className="flex-1 min-w-[300px]">
            <CardHeader className="bg-blue-600 text-white">
              <h3 className="text-lg">{caseItem.title}</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Status: {caseItem.status}</p>
              <p>Assigned Lawyer: {getLawyerName(caseItem.lawyer_id)}</p>
              <Accordion>
                <AccordionItem title="View Details">
                  <h4 className="text-lg">Case Notes</h4>
                  {caseNotes
                    .filter((note) => note.case_id === caseItem.case_id)
                    .map((note) => (
                      <p key={note.note_id}>{note.note}</p>
                    ))}
                  <h4 className="text-lg mt-4">Appointments</h4>
                  {appointments
                    .filter((appointment) => appointment.case_id === caseItem.case_id)
                    .map((appointment) => (
                      <p key={appointment.appointment_id}>
                        Date: {new Date(appointment.appointment_date).toLocaleString()} - Location: {appointment.location}
                      </p>
                    ))}
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientCases;