import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { roomsRouter } from "./rooms.js";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

const rooms = [
    {
        room_name: "Mercury",
        seats_available: "25",
        amenities: "Telephone With Direct Dial and Writing Table with Chair",
        price: "Rs.200 for 1 Hr"
    },
    {
        room_name: "Venus",
        seats_available: "50",
        amenities: "Telephone With Direct Dial, Writing Table with Chair, Table Lamp and Envelopes",
        price: "Rs.400 for 1 Hr"
    },
    {
        room_name: "Earth",
        seats_available: "75",
        amenities: "Telephone With Direct Dial, Writing Table with Chair, Table Lamp, Envelopes, Letter Head with Pen and High Speed Wireless Internet",
        price: "Rs.600 for 1 Hr"
    },
    {
        room_name: "Mars",
        seats_available: "100",
        amenities: "Telephone With Direct Dial, Writing Table with Chair, Table Lamp, Envelopes, Letter Head with Pen, High Speed Wireless Internet, LCD/LED Television with Satellite Channels and CD/DVD Player",
        price: "Rs.800 for 1 Hr"
    },
    {
        room_name: "Jupiter",
        seats_available: "125",
        amenities: "Telephone With Direct Dial, Writing Table with Chair, Table Lamp, Envelopes, Letter Head with Pen, High Speed Wireless Internet, LCD/LED Television with Satellite Channels, CD/DVD Player, Mobile USB Charging/ Media Hub with Bluetooth and iPod docking station with radio.",
        price: "Rs.1000 for 1 Hr"
    }
]

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected 👍");
    return client;
}
export const client = await createConnection();

app.use("/rooms", roomsRouter);

app.listen(port, () => {
    console.log(`Server started in ${port}`);
});