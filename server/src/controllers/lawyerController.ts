import { Request, Response } from 'express';
import { query } from '../config/db';

export const getLawyerFromUserId = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  try {
    const response = await query('SELECT * FROM lawyers WHERE user_id = $1', [user_id]);
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const addCase = async (req: Request, res: Response) => {
    const { lawyer_id, client_id, title,status,next_hearing_date } = req.body;
    try {
        const response = await query('INSERT INTO cases (lawyer_id, client_id, title, status, next_hearing_date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [lawyer_id, client_id, title, status, next_hearing_date]);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const fetchCases = async (req: Request, res: Response) => {
    try {
        const response = await query('SELECT * FROM cases WHERE lawyer_id = $1', [req.body.lawyer_id]);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const updateCase = async (req: Request, res: Response) => {
    const { case_id, lawyer_id,status, next_hearing_date , case_notes } = req.body;
    try {
        const response = await query('UPDATE cases SET status = $1, next_hearing_date = $2 WHERE case_id = $3 RETURNING *', [status, next_hearing_date, case_id]);
        const result = await query('INSERT INTO casenotes (case_id, lawyer_id,note) VALUES ($1, $2,$3) RETURNING *', [case_id, lawyer_id,case_notes]);
        res.status(200).json(response.rows[0]);
        
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const fetchCaseNotesAndConcatenate = async (req: Request, res: Response) => {
    const { case_id } = req.body;
    try {
        
        const response = await query('SELECT * FROM casenotes WHERE case_id = $1', [case_id]);
       
        let notes = response.rows.map((row: any) => row.note).join(' ');
        
        res.status(200).json({ notes });
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getCases = async (req: Request, res: Response) => {
    const { lawyer_id } = req.body; 
    
    try {
        
        const response = await query(`
            SELECT * FROM lawyer_case_details WHERE lawyer_id = $1;`, 
            [lawyer_id]  
        );
        
        res.status(200).json(response.rows);  
    } catch (error) {
        res.status(500).json({ error });   
    }
};

export const getAppointmentByLawyerId = async (req: Request, res: Response) => {
    const { lawyer_id } = req.body; 
    
    try {
        
        const response = await query(`
           SELECT * FROM get_appointments_for_lawyer($1);`, 
            [lawyer_id]  
        );
        
        res.status(200).json(response.rows);  
    } catch (error) {
        res.status(500).json({ error });   
    }
};

export const updateAppointment = async (req: Request, res: Response) => {
    const { appointment_id, appointment_date,location } = req.body;
    try {
        console.log(appointment_id, appointment_date,location);
        const response = await query('CALL update_appointment($1, $2, $3);', [ appointment_id,appointment_date,location]); 
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
}