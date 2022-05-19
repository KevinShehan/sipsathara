const admin = require('firebase-admin')
const serviceAccount = require('./service_account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'kevin-c039c.firebaseapp.com'
})

const db = admin.firestore();
module.exports = { admin, db };