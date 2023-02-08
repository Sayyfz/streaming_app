import client from '../database';

interface Movie {
    id?: number;
    name: string;
    release_date: Date;
}

export class MovieStore {
    async index(): Promise<Movie[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM movies';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get movies ${err}`);
        }
    }
}
