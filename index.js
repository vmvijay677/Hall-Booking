import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { roomsRouter } from "./routes/rooms.js";
import { roomsbookingRouter } from "./routes/roombooking.js";
import { bookedroomRouter } from "./routes/bookedroom.js";
import { bookedcustomersRouter } from "./routes/bookedcustomers.js";

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

const booking_data = [
    {
        "id": "100",
        "customer_name": "John",
        "date": "03/15/2022",
        "start_time": "9AM",
        "end_time": "12PM",
        "room_name": "Mercury"
    },
    {
        "id": "101",
        "customer_name": "Vijay",
        "date": "03/17/2022",
        "start_time": "10AM",
        "end_time": "3PM",
        "room_name": "Venus"
    },
    {
        "id": "102",
        "customer_name": "Jennifer",
        "date": "03/18/2022",
        "start_time": "10.30AM",
        "end_time": "5AM",
        "room_name": "Earth"
    },
    {
        "id": "103",
        "customer_name": "Francis",
        "date": "03/20/2022",
        "start_time": "5PM",
        "end_time": "10PM",
        "room_name": "Mars"
    },
    {
        "id": "104",
        "customer_name": "Charles",
        "date": "03/22/2022",
        "start_time": "9AM",
        "end_time": "11AM",
        "room_name": "Jupiter"
    }
]

const booked_data = [
    {
        "id": "100",
        "room_name": "Mercury",
        "booked_status": "Engaged",
        "customer_name": "John",
        "date": "03/15/2022",
        "start_time": "9AM",
        "end_time": "12PM"
    },
    {
        "id": "101",
        "room_name": "Venus",
        "booked_status": "Engaged",
        "customer_name": "Vijay",
        "date": "03/17/2022",
        "start_time": "10AM",
        "end_time": "3PM"
    },
    {
        "id": "102",
        "room_name": "Earth",
        "booked_status": "Engaged",
        "customer_name": "Jennifer",
        "date": "03/18/2022",
        "start_time": "10.30AM",
        "end_time": "5AM"
    },
    {
        "id": "103",
        "room_name": "Mars",
        "booked_status": "Engaged",
        "customer_name": "Francis",
        "date": "03/20/2022",
        "start_time": "5PM",
        "end_time": "10PM"
    },
    {
        "id": "104",
        "room_name": "Jupiter",
        "booked_status": "Engaged",
        "customer_name": "Charles",
        "date": "03/22/2022",
        "start_time": "9AM",
        "end_time": "11AM"
    }
]

const booked_customers = [
    {
        "id": "100",
        "customer_name": "John",
        "room_name": "Mercury",
        "date": "03/15/2022",
        "start_time": "9AM",
        "end_time": "12PM"
    },
    {
        "id": "101",
        "customer_name": "Vijay",
        "room_name": "Venus",
        "date": "03/17/2022",
        "start_time": "10AM",
        "end_time": "3PM"
    },
    {
        "id": "102",
        "customer_name": "Jennifer",
        "room_name": "Earth",
        "date": "03/18/2022",
        "start_time": "10.30AM",
        "end_time": "5AM"
    },
    {
        "id": "103",
        "customer_name": "Francis",
        "room_name": "Mars",
        "date": "03/20/2022",
        "start_time": "5PM",
        "end_time": "10PM"
    },
    {
        "id": "104",
        "customer_name": "Charles",
        "room_name": "Jupiter",
        "date": "03/22/2022",
        "start_time": "9AM",
        "end_time": "11AM"
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

app.get("/", function (req, res){
    res.send(
        "<h1>Hall Booking API</h1>\n<h3>1. For room details use, /rooms<h3>\n<h3>2. For specific room details use, /rooms/:room_name<h3>\n<h3>3. For room booking details use, /rooms-booking<h3>\n<h3>4. For specific room booking details use, /rooms-booking/:customer_name<h3>\n<h3>5. For booked room details use, /booked-rooms<h3>\n<h3>6. For specific booked room details use, /booked-rooms/:room_name<h3>\n<h3>7. For customer booked details use, /customers-booked-data<h3>\n<h3>8. For specific customer booked details use, /customers-booked-data/:customer_name<h3>"
        );
})

app.use("/rooms", roomsRouter);

app.use("/rooms-booking", roomsbookingRouter);

app.use("/booked-rooms", bookedroomRouter);

app.use("/customers-booked-data", bookedcustomersRouter);

app.listen(port, () => {
    console.log(`Server started in ${port}`);
});