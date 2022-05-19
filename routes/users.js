const express = require('express');
const router = express.Router();
const { db } = require('../database/firebase');
const { uuid } = require('uuidv4');
const md5 = require('md5');

router.get('/', (req, res) => res.status(400).json({ message: "Bad request" }))

router.post('/register', async (req, res) => {
    try {
        let body = req.body;
        let email = body.email ? body.email : null;
        let password = body.password ? body.password : null;

        if (email.trim() === "" || email === undefined || email == null) res.send({ success: false, message: "Invalid email address" })
        if (password.trim() === "" || password === undefined || password == null) res.send({ success: false, message: "Invalid password" })

        let document = await db.collection("users").doc(email).get();

        if (document && document.exists) {
            res.send({ success: false, message: "User already registered" })
        }
        else {
            let id = uuid();
            await db.collection('users').doc(email).set({ id: id, password: md5(password), userRole: "student" });
            let regUser = (await db.collection("users").doc(email).get()).data();
            res.send({ success: true, message: "User successfully registered", data: { id: id, email: email, userRole: regUser.userRole } })
        }

    } catch (error) {
        console.log(error)
    }
});
router.post('/login', async (req, res) => {
    try {
        let body = req.body;
        let email = body.email ? body.email : null;
        let password = body.password ? body.password : null;

        if (email.trim() === "" || email === undefined || email == null) res.send({ success: false, message: "Invalid email address" })
        if (password.trim() === "" || password === undefined || password == null) res.send({ success: false, message: "Invalid password" })

        let document = await db.collection("users").doc(email).get();

        if (document && document.exists) {
            let data = document.data();
            if (data.password === md5(password)) res.send({ success: true, data: { id: data.id, userRole: data.userRole } });
            else {
                res.send({ success: false, message: "Invalid password" })
            }
        }
        else {
            res.send({ success: false, message: "User does not exist" })
        }

    } catch (error) {
        console.log(error)
    }
});


module.exports = router