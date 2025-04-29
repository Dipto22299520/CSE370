import axios from 'axios'
import cors from 'cors'
import { createConnection } from 'mysql';
import express from 'express'

const app=express()
app.use(cors())
app.use(express.json())
console.log("Server is running on port 3000")
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rock_plot'
})
//let, const, var 
app.get('/',(req,res)=>{
    const q = 'select course_name from courses'
    connection.query(q, (err,results)=>{
        if (err) return res.json(err)
        return res.json(results)
    })
})
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const q = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const values = [name, email, password];
    connection.query(q, values, (err, results) => {
        if (err) return res.json(err);
        return res.json(results);
    });
})
app.post('/api/login', (req, res) => {
    const { email, password, domain } = req.body;
    let q = '';
    let values = [email, password];

    if (domain === "rockplot.ac.bd") {
        q = 'SELECT * FROM teacher WHERE email = ? AND password = ?';
    } else if (domain === "admin.rockplot.ac.bd") {
        q = 'SELECT * FROM admin WHERE email = ? AND password = ?';
    } else {
        q = 'SELECT * FROM users WHERE email = ? AND password = ?';
    }

    connection.query(q, values, (err, results) => {
        if (err) return res.json({ message: 'Database error', error: err });

        if (results.length > 0) {
            const name = results[0].name;
            return res.json({ message: 'Login successful', name: name, email: email, id: results[0].id });
        } else {
            return res.json({ message: 'Invalid email or password' });
        }
    });
});

app.post('/api/recording', (req, res) => {
    const {course,title,names}=req.body
    const q = 'Select * from playlist where course = ? and names = ?'
    const values = [course, names]
    connection.query(q,values,(err,results)=>{
        if (err) return res.json(err)
        return res.json(results)
    })
})
app.post('/api/postlink',(req, res)=>{
    const {id}=req.body
    const q = 'Select * from class_links where id = ? '
    const values = [id]
    connection.query(q,values,(err,results)=>{
        if (err) return res.json(err)
        return res.json(results)
    })
})

app.post('/api/meetlink', (req, res) => {
    const { id, name, course, section, link, description, classcontext } = req.body;
  
    const q = `
      UPDATE class_links 
      SET link = ?, info = ?, WSJTC = ?
      WHERE id = ? AND name = ? AND course = ? AND section = ?
    `;
    
    const values = [link, description, classcontext, id, name, course, section];
  
    connection.query(q, values, (err, results) => {
      if (err) {
        console.error('Error updating link:', err);
        return res.status(500).json({ success: false, message: 'Database error', error: err });
      }
      if (results.affectedRows === 0) {
        // No matching record found
        return res.status(404).json({ success: false, message: 'No matching class found to update' });
      }
      return res.status(200).json({ success: true, message: 'Link updated successfully!' });
    });
  });
app.post('/api/clearlinks', (req, res) => {
    const { id, name, course, section } = req.body;
  
    const q = `
      UPDATE class_links 
      SET link = '', info = '', WSJTC = ''
      WHERE id = ? AND name = ? AND course = ? AND section = ?
    `;
    const values = [id, name, course, section];
    connection.query(q, values, (err, results) => {
      if (err) {
        console.error('Error updating link:', err);
        return res.status(500).json({ success: false, message: 'Database error', error: err });
      }
      if (results.affectedRows === 0) {
        // No matching record found
        return res.status(404).json({ success: false, message: 'No matching class found to update' });
      }
      return res.status(200).json({ success: true, message: 'Link updated successfully!' });
    });});

  

const port = 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})



