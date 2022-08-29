
import pg from "pg"

const poll = new pg.Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: '5432',
    database: 'macprodanya'
})

export default poll