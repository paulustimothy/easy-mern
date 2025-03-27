import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import productRoutes from "./routes/product.route.js";

dotenv.config(); //loads environment variables from .env

const app = express(); // creates an express app

app.use(express.json()); // allows us to accept json data in the request body

const port = process.env.PORT || 3000; 

const __dirname = path.resolve(); // sets the current directory

app.use("/api/products", productRoutes); // routes for the products

// if we are in production, we need to serve the frontend
if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}
// connect to the database and start the server
app.listen(port, () => {
    connectDB();
    console.log("Server is running at http://localhost:" + port);
})
