const host = 'host-url ex> localhost';
const user = 'user-name ex> root'
const password = 'user-password'

export let databases = [
    {
        connection:{
            host:host,
            user:user,
            password:password,
            databases:'database name'
        },
        dumpToFile:'aa-dump.sql'
    }
]