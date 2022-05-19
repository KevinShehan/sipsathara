const express = require('express');
const app = express();

const userRouter = require('./routes/users')
app.use(express.json());

app.get('/', (req, res) => res.send("Hello from Sipsathara"))
app.use('/users', userRouter);

app.listen(5000, () => {
    console.log(`Server is listening to port: ${5000}`);
});