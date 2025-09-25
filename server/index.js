import "dotenv/config.js";
import express from 'express';
import connectDB from './DB/db.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors';
import session from 'express-session';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(
    session({
      secret: "your-secret-key", 
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, 
      },
    })
  );
app.use("/",userRoutes);
app.use('/admin', adminRoutes);

connectDB();


app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:8080');
});