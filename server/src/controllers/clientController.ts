import { Request, Response } from 'express';
import { query } from '../config/db';
import { Locations } from '../types/enum';

export const addAppointment = async (req: Request, res: Response) : Promise<void> => {
    const { client_id, lawyer_id, appointment_date , location } = req.body;
    const result = await query('INSERT INTO appointments (client_id, lawyer_id, appointment_date,location) VALUES ($1, $2, $3, $4) RETURNING *', [client_id, lawyer_id, appointment_date, location]);
    res.status(201).send(result.rows[0]);
};

export const passLocationsFromEnum = async (req: Request, res: Response) : Promise<void> => {
    const locations = Object.values(Locations);
    res.status(200).send(locations);
};


export const getClientIdFromUserId = async (req: Request, res: Response) : Promise<void> => {
    const { user_id } = req.body;
    const result = await query(`
        SELECT clients.client_id 
        FROM clients 
        JOIN users ON clients.user_id = users.user_id 
        WHERE users.user_id = $1
    `, [user_id]);
    res.send(result.rows[0]);
};

export const getAppointmentsByUserId = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.body;
    try {
        const result = await query(
            `
            SELECT 
                a.*, 
                u.first_name AS user_name
            FROM 
                appointments a
            JOIN 
                clients c ON a.client_id = c.client_id
            JOIN 
                users u ON c.user_id = u.user_id
            WHERE 
                u.user_id = $1
            `,
            [user_id]
        );

        res.status(200).send(result.rows);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).send({ error: 'Failed to fetch appointments.' });
    }
};
