import app from 'app-root-path';

export const schedule = process.env.DATABASE_BACKUP_SCHEDULE_CRON
export const dumpLocation = app.path + '/dump/';