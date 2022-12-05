import pgPromise from 'pg-promise';
const pg = pgPromise({});
export const db = pg('postgres://losh:password@localhost:5432/postgres');
