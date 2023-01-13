const host = 'localhost'
const user = 'root'
const password = 'qwer1234'

export const schedule = '0 * * * * *'
export const databases = [
    {
        connection:{
            host:host,
            user:user,
            password:password,
            database:'dev-schema'
        },
        dumpFileName: 'dev-dump.sql'
    }, {
        connection:{
            host:host,
            user:user,
            password:password,
            database:'live-schema'
        },
        dumpFileName: 'live-dump.sql'
    }
]
