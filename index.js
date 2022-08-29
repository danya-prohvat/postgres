import express from 'express'
import { Router } from 'express'
import db from './db.js'

const PORT = 4000
const app = express()
const router = new Router()

app.use(express.json())
app.use('/api', router)

router.get('/users', async (req, res) => {
    const {rows:users} = await db.query('SELECT * FROM person')
    
    res.status(200).json(users)
})     
router.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const {rows:users} = await db.query('SELECT * FROM person where id = $1', [id])
    
    res.status(200).json(users)
})
router.post('/users', async (req, res) => {
    const {name, surname} = req.body
    const {rows:users} = await db.query('INSERT INTO person (name, surname) values ($1, $2) RETURNING *', [name, surname])
    
    res.status(200).json(users)
})
router.patch('/users', async (req, res) => {
    const {id, name, surname} = req.body
    const {rows:users} = await db.query('UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *', [name, surname, id])
    
    res.status(200).json(users)
})
router.delete('/users/:id', async (req, res) => {
    const id = req.params.id
    const {rows:users} = await db.query('DELETE FROM person where id = $1', [id])
    
    res.status(200).json(users)
})

const start = async () => {
    try {
        app.listen(PORT, () => console.log('Server started on PORT:' + PORT))
    } catch (e) {
        console.log(e); 
    }
}

start() 