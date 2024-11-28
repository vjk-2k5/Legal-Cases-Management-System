'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Divider, Accordion, AccordionItem } from '@nextui-org/react';

interface Case {
  case_id: number;
  case_title: string;
  case_status: string;
  next_hearing_date: string;
  notes: string;
  lawyer_id: number;
  lawyer_specialization: string;
  lawyer_first_name: string;
  lawyer_last_name: string;
  lawyer_email: string;
  lawyer_phone_number: string;
}

const ClientCases: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    const fetchCasesData = async () => {
      const client_id = localStorage.getItem('client_id'); 
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch('http://localhost:5000/lcms/client/fetchCases', {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ client_id }), 
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cases');
        }

        const data = await response.json();
        setCases(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCasesData();
  }, []);

  const getLawyerName = (lawyer_first_name: string, lawyer_last_name: string) => {
    return `${lawyer_first_name} ${lawyer_last_name}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">List of Cases</h1>

      <h2 className="text-2xl text-blue-600">Case Summaries</h2>
      <div className="flex flex-wrap gap-6">
        {cases.map((caseItem) => (
          <Card key={caseItem.case_id} isHoverable variant="bordered" className="flex-1 min-w-[300px]">
            <CardHeader className="bg-blue-600 text-white">
              <h3 className="text-lg">{caseItem.case_title}</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Status: {caseItem.case_status}</p>
              <p>Assigned Lawyer: {getLawyerName(caseItem.lawyer_first_name, caseItem.lawyer_last_name)}</p>
              <p>Specialization: {caseItem.lawyer_specialization}</p>
              <Accordion>
                <AccordionItem title="View Details">
                  <h4 className="text-lg">Case Notes</h4>
                  <p>{caseItem.notes}</p>
                  <h4 className="text-lg mt-4">Next Hearing Date</h4>
                  <p>{new Date(caseItem.next_hearing_date).toLocaleString()}</p>
                  <h4 className="text-lg mt-4">Lawyer Contact</h4>
                  <p>Email: {caseItem.lawyer_email}</p>
                  <p>Phone: {caseItem.lawyer_phone_number}</p>
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
