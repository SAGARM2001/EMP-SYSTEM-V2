const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyparser.json());

// Creating a mysql database connection:-
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sagar@2001',
    database: 'emp2system',
});

// CONNECTION
db.connect((err) => {
    if (err) {
        console.error("Database connection error", err);
    } else {
        console.log("Connected to the database");
    }
});

app.use('/home', (req, res) => {
    res.json("Hi, this is done");
});


// ADDING DATA TO DATABASE
app.post('/api/add', (req, res) => {
    const { firstName, lastName, contact, email, dob, address } = req.body;
    const sql = 'INSERT INTO employees (fname, lname, contact, email, dob, address) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [firstName, lastName, contact, email, dob, address];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error Adding Data:', err);
            res.status(500).json({ message: 'Error Adding Data' });
        }
        else {
            console.error('Data Added Successfully:', err);
            res.status(200).json({ message: 'Data Added Successfully' });
        }
    })
})


// GET EMPLOYEES DATA
app.get('/api/getdata', (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, result) => {
        if (err) {
            console.log('Error while retrieving data:', err);
            res.status(500).json({ message: 'Error retrieving data' });
        }
        else {
            console.log('Data retrieved successfully');
            res.status(200).json({ data: result });
        }
    })
})

// UPDATE EMPLOYEE DATA
app.put('/api/empupdate/:empId', (req, res) => {
    const empId = req.params.empId;
    const { firstName, lastName, contact, email, dob, address } = req.body;
    const sql = `UPDATE employees SET fname = ?, lname = ?, contact = ?, email = ?, dob = ?, address = ? WHERE emp_id = ?`;
    const values = [firstName, lastName, contact, email, dob, address, empId]; // Include empId in the values array

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({
                message: 'Error updating data'
            });
        } else {
            if (result.affectedRows === 1) {
                res.status(200).json({
                    message: 'Employee Updated Successfully!'
                });
            } else {
                res.status(404).json({
                    message: 'Employee not found'
                });
            }
        }
    });
});


// DELETE EMPLOYEE DATA
app.delete('/api/delemp/:empId', (req, res) => {
    const empId = req.params.empId;
    const sql = 'Delete from employees where emp_id = ?';
    db.query(sql, [empId], (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err)
            res.status(500).json({ message: 'Error deleting employee' });
        }
        else {
            if (result.affectedRows === 1) {
                res.status(200).json({ message: 'Employee Deleted Successfully!' });
            }
            else {
                res.status(404).json({ message: 'Employee not found' });
            }
        }
    });
})

// Secret key for signing and verifying tokens 
const secretKey = 'my_secret_key';

// LOGIN & TOKEN GENERATION FOR EMPLOYEE
app.post('/api/login', (req, res) => {
    const { userName, password } = req.body;

    //console.log to see the received data from the frontend
    console.log('Received data from frontend:', userName, password);

    const sql = 'SELECT * FROM employees WHERE fname = ? AND dob = ?';
    const values = [userName, password];

    //console.log to see the SQL query and values being used
    console.log('Executing SQL query:', sql, values);

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).json({ message: 'Error during login' });
        } else {
            if (results.length === 1) {
                const user = results[0];

                // Generate the JWT token
                jwt.sign({ user }, secretKey, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        console.error('Error generating JWT token:', err);
                        res.status(500).json({ message: 'Error during login' });
                    } else {
                        // Send the JWT token along with the user data
                        res.status(200).json({ message: 'Login successful', user, token });
                        console.log(userName, password);
                    }
                });
            } else {
                // Username and password don't match
                res.status(401).json({ message: 'Invalid username or password' });
            }
        }
    });
})

// Middleware to verify JWT token before accessing protected routes
function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Error verifying JWT token:', err);
            return res.status(401).json({ message: 'Access denied, invalid token' });
        }

        req.user = decoded.user;
        next();
    });
}

// Example of using the verifyToken middleware for protected routes
app.get('/api/protected-route', verifyToken, (req, res) => {
    // Access granted if the token is valid
    res.status(200).json({ message: 'Access granted', user: req.user });
});


// LISTENING ON PORT 3000
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
