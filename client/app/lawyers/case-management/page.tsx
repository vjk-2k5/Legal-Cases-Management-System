'use client';

import React, { useEffect, useState } from 'react';
import { 
  Card, CardBody, CardHeader, Divider, Button, Modal, ModalContent, 
  ModalHeader, ModalBody, ModalFooter, Input, Textarea, useDisclosure 
} from '@nextui-org/react';

interface Case {
  case_id: number;
  client_id: number;
  lawyer_id: number;
  title: string;
  status: string;
  next_hearing_date: string;
}

interface CaseNote {
  note_id: number;
  case_id: number;
  lawyer_id: number;
  note: string;
}

const CasesManagement: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [caseNotes, setCaseNotes] = useState<CaseNote[]>([]); 
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [newCase, setNewCase] = useState<Partial<Case>>({});
  const [newNote, setNewNote] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isNewCaseOpen, onOpen: onNewCaseOpen, onClose: onNewCaseClose } = useDisclosure();

  useEffect(() => {
    const fetchCases = async () => {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/lcms/lawyer/fetchCases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ lawyer_id: parseInt(localStorage.getItem('lawyer_id') || '0') }),
      });

      if (response.ok) {
        const data: Case[] = await response.json();
        setCases(data);
      } else {
        console.error('Failed to fetch cases');
      }
    };

    fetchCases();
  }, []);

  const handleViewCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    fetchCaseNotes(caseItem.case_id); 
    onOpen();
  };

  const handleAddNote = async () => {
    if (selectedCase && newNote) {
      const authToken = localStorage.getItem('authToken');
  
      try {
        const response = await fetch('http://localhost:5000/lcms/lawyer/updateCase', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            case_id: selectedCase.case_id,
            lawyer_id: selectedCase.lawyer_id,
            status: selectedCase.status,
            next_hearing_date: selectedCase.next_hearing_date,
            case_notes: newNote,
          }),
        });
  
        if (response.ok) {
          const updatedCase = await response.json();
          setCaseNotes([
            ...caseNotes,
            { note_id: Date.now(), case_id: updatedCase.case_id, lawyer_id: updatedCase.lawyer_id, note: newNote },
          ]);
          setNewNote('');
        } else {
          console.error('Failed to add note');
        }
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  const handleRegisterCase = async () => {
    const newCaseData: Case = {
      case_id: Date.now(), 
      client_id: newCase.client_id || 0,
      lawyer_id: parseInt(localStorage.getItem('lawyer_id') || '0'),
      title: newCase.title || '',
      status: newCase.status || '',
      next_hearing_date: newCase.next_hearing_date || '',
    };

    const authToken = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:5000/lcms/lawyer/addCase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(newCaseData),
    });

    if (response.ok) {
      const savedCase = await response.json();
      setCases([...cases, savedCase]);
      setNewCase({});
      onNewCaseClose();
    } else {
      console.error('Failed to register case');
    }
  };

  const fetchCaseNotes = async (case_id: number) => {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:5000/lcms/lawyer/fetchCaseNotesAndConcatenate', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ case_id }),
    });

    if (response.ok) {
      const notes: CaseNote[] = await response.json();
      setCaseNotes(notes); 
    } else {
      console.error('Failed to fetch case notes');
    }
  };

  const handleUpdateCase = async () => {
    if (selectedCase) {
      const authToken = localStorage.getItem('authToken');
  
      try {
        const response = await fetch('http://localhost:5000/lcms/lawyer/updateCase', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            case_id: selectedCase.case_id,
            lawyer_id: selectedCase.lawyer_id,
            status: selectedCase.status,
            next_hearing_date: selectedCase.next_hearing_date,
            case_notes: newNote, 
          }),
        });
  
        if (response.ok) {
          const updatedCase = await response.json();
          setCases(cases.map((c) => (c.case_id === updatedCase.case_id ? updatedCase : c)));
          setCaseNotes([
            ...caseNotes,
            { note_id: Date.now(), case_id: updatedCase.case_id, lawyer_id: updatedCase.lawyer_id, note: newNote },
          ]);
          setNewNote('');
          onClose();
        } else {
          console.error('Failed to update case');
        }
      } catch (error) {
        console.error('Error updating case:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center mb-8 text-4xl text-blue-600">Cases Management</h1>

      <Button className="mb-4" onPress={onNewCaseOpen}>
        Register New Case
      </Button>

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
              <Button className="mt-4" onPress={() => handleViewCase(caseItem)}>
                Manage Case
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedCase && (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
          <ModalContent>
            <ModalHeader>
              <h3>Case Details</h3>
            </ModalHeader>
            <ModalBody>
              <p><strong>Title:</strong> {selectedCase.title}</p>
              <p><strong>Status:</strong> {selectedCase.status}</p>
              <Input
                label="Update Status"
                placeholder="Enter new status"
                value={selectedCase.status}
                onChange={(e) => setSelectedCase({ ...selectedCase, status: e.target.value })}
              />
              <p><strong>Next Hearing Date:</strong> {new Date(selectedCase.next_hearing_date).toLocaleDateString()}</p>
              <Input
                label="Update Hearing Date"
                type="date"
                value={selectedCase.next_hearing_date}
                onChange={(e) => setSelectedCase({ ...selectedCase, next_hearing_date: e.target.value })}
              />
              <Divider />
              <h4>Case Notes</h4>
              {caseNotes.filter((note) => note.case_id === selectedCase.case_id).map((note) => (
                <p key={note.note_id}>{note.note}</p>
              ))}
              <Textarea
                label="Add Note"
                placeholder="Enter your note here"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <Button className="mt-2" onPress={handleAddNote}>
                Add Note
              </Button>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={handleUpdateCase}>
                Update Case
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Modal isOpen={isNewCaseOpen} onOpenChange={onNewCaseClose}>
        <ModalContent>
          <ModalHeader>Register New Case</ModalHeader>
          <ModalBody>
            <Input
              label="Title"
              value={newCase.title || ''}
              onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
            />
            <Input
              label="Client ID"
              type="number"
              value={newCase.client_id || ''}
              onChange={(e) => setNewCase({ ...newCase, client_id: parseInt(e.target.value) })}
            />
            <Input
              label="Status"
              value={newCase.status || ''}
              onChange={(e) => setNewCase({ ...newCase, status: e.target.value })}
            />
            <Input
              label="Next Hearing Date"
              type="date"
              value={newCase.next_hearing_date || ''}
              onChange={(e) => setNewCase({ ...newCase, next_hearing_date: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleRegisterCase}>
              Register Case
            </Button>
            <Button color="danger" variant="light" onPress={onNewCaseClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CasesManagement;
