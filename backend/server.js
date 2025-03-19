import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept json data in the request body

const port = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(port, () => {
    connectDB();
    console.log("Server is running at http://localhost:" + port);
})
