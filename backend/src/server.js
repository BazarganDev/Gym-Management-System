// Moduels
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

// Import Database
import database from "./database/db.js";

// Import Models
import Member from "./models/membersModel.js";
import Locker from "./models/lockersModel.js";
import Membership from "./models/membershipsModel.js";
import Payment from "./models/paymentsModel.js";
import Attendance from "./models/attendancesModel.js";

// Load .env file
dotenv.config();

// Environment Variables
const backend_addr = process.env.BACKEND_ADDR;
const backend_port = process.env.BACKEND_PORT;
const frontend_addr_1 = process.env.FRONTEND_ADDR_1;
const frontend_addr_2 = process.env.FRONTEND_ADDR_2;

const server = express();

// Middlewares
server.use(express.json());
server.use(helmet());
server.use(
    cors({
        origin: [frontend_addr_1, frontend_addr_2],
    }),
);

// Health Check
server.get("/health", (req, res) => {
    try {
        //TODO: Perform full health check for the API later.
        res.status(200).send({
            status: "200",
            message: "Healthy",
            timestamp: new Date().toLocaleString(),
        });
    } catch (error) {
        res.status(500).send({
            status: "500",
            message: "❌ Internal Server Error",
        });
    }
});

// Start server
async function startServer() {
    try {
        await database.sync({ force: true });
        server.listen(backend_port, () => {
            console.log(
                `🚀 Server running at ${backend_addr}:${backend_port} ...`,
            );
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();
