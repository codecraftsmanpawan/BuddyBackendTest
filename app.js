require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');

const FcmToken = require('./routes/fcmToken');
const QuizRoutes = require('./routes/quizRoutes');
const Register = require('./routes/register');
const Login = require('./routes/login');
const Profile = require('./routes/userProfile');
const OfferRide = require('./routes/offerRide');
const BookRide = require('./routes/bookRide');
const Wallet = require('./routes/wallet');
const Vehical = require('./routes/vehicle');
const Emergency = require('./routes/emergencyContacts');
const Verification = require('./routes/verification');
const Message = require('./routes/message');
const Community = require('./routes/community');
const Banners = require('./routes/banner');

 
const app = express();

// Apply CORS middleware
app.use(cors()); 
44
app.use(express.json());
// app.use(cookieparser())

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', FcmToken);
app.use('/api', QuizRoutes);
app.use('/api', Register);
app.use('/api', Login);
app.use('/api', Profile);
app.use('/api', OfferRide);
app.use('/api', BookRide);
app.use('/api', Wallet);
app.use('/api', Vehical);
app.use('/api', Emergency);
app.use('/api', Verification);
app.use('/api', Message);
app.use('/api', Community);
app.use('/api', Banners);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
