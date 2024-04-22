import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'
import connectToMongodb from './db/connectToMongodb.js';


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000 ;

// root route http://localhost:5000/
app.get("/", (req, res)=>{
    res.send("Hello Rohan");
})

app.use("/api/auth", authRoutes);

app.listen(PORT, ()=>{
    connectToMongodb();
    console.log(`Server is running on Port ${PORT}`)
});