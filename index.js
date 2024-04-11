const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user = require('./router/User');
const admin = require('./router/Admin');

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('MongoDB connected');
}).catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/api/user', user);
app.use('/api/admin', admin);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}   );
