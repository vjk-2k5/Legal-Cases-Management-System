// page.tsx

'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, useDisclosure } from '@nextui-org/react';

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
      lawyer_id: 1,
      note: 'Case closed successfully.',
    },
  ]);

  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [newCase, setNewCase] = useState<Partial<Case>>({});
  const [newNote, setNewNote] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isNewCaseOpen, onOpen: onNewCaseOpen, onClose: onNewCaseClose } = useDisclosure();

  const handleViewCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    onOpen();
  };

  const handleAddNote = () => {
    if (selectedCase) {
      const newCaseNote: CaseNote = {
        note_id: Date.now(), // Just a placeholder for unique ID
        case_id: selectedCase.case_id,
        lawyer_id: selectedCase.lawyer_id,
        note: newNote,
      };

      setCaseNotes([...caseNotes, newCaseNote]);
      setNewNote('');
    }
  };

  const handleRegisterCase = () => {
    const newCaseData: Case = {
      case_id: Date.now(), // Just a placeholder for unique ID
      client_id: newCase.client_id || 0,
      lawyer_id: newCase.lawyer_id || 0,
      title: newCase.title || '',
      status: newCase.status || '',
      next_hearing_date: newCase.next_hearing_date || '',
    };

    setCases([...cases, newCaseData]);
    setNewCase({});
    onNewCaseClose();
  };

  const handleUpdateCase = () => {
    if (selectedCase) {
      setCases(cases.map((c) => (c.case_id === selectedCase.case_id ? selectedCase : c)));
      onClose();
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
              <p><strong>Lawyer ID:</strong> {selectedCase.lawyer_id}</p>
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
              <Button className="mt-4" onPress={handleAddNote}>
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
          <ModalHeader>
            <h3>Register New Case</h3>
          </ModalHeader>
          <ModalBody>
            <Input
              label="Title"
              placeholder="Enter case title"
              value={newCase.title || ''}
              onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
            />
            <Input
              label="Status"
              placeholder="Enter case status"
              value={newCase.status || ''}
              onChange={(e) => setNewCase({ ...newCase, status: e.target.value })}
            />
            <Input
              label="Next Hearing Date"
              type="date"
              value={newCase.next_hearing_date || ''}
              onChange={(e) => setNewCase({ ...newCase, next_hearing_date: e.target.value })}
            />
            <Input
              label="Lawyer ID"
              placeholder="Enter lawyer ID"
              value={newCase.lawyer_id || ''}
              onChange={(e) => setNewCase({ ...newCase, lawyer_id: parseInt(e.target.value) })}
            />
            <Input
              label="Client ID"
              placeholder="Enter client ID"
              value={newCase.client_id || ''}
              onChange={(e) => setNewCase({ ...newCase, client_id: parseInt(e.target.value) })}
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