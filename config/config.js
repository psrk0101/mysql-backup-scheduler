const host = process.env.DATABASE_HOST;
const user = process.env.DATABASE_USER
const password = process.env.DATABASE_PASSWORD;

export let databases = [
    {
        connection:{
            host:host,
            user:user,
            password:password,
            database:'blueprints-point'
        },
        dumpFileName:'blueprints-point-dump.sql'
    }
]

export const schedule = '0 * * * * *'