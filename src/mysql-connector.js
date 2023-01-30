import mysql from 'mysql2';

const connection = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD
})

const sys_schemas = ['sys', 'information_schema', 'mysql', 'performance_schema']

export function getDatabases(){
    return new Promise((resolve, reject) => {
        connection.query('show databases', (err, rows) => {
            if(err) throw err;
            resolve(rows.filter(x => !sys_schemas.includes(x.Database)))
        })
    })
}