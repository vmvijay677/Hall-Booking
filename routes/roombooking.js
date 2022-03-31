import express from "express";
import { client } from "../index.js"

const router = express.Router();

router.get("/", async function (req, res) {
    const rooms = await client
        .db("b30wd")
        .collection("roombooking")
        .find({})
        .toArray();
    res.send(rooms);
});

router.get("/:id", async function (req, res) {
    const { id } = req.params;
    const rooms = await client
        .db("b30wd")
        .collection("roombooking")
        .findOne({ customer_name: id });
    rooms ? res.send(rooms) : res.status(404).send({ message: "Booking data not found" });
});

router.post("/", async function (req, res) {
    const data = req.body;
    const result = await client
        .db("b30wd")
        .collection("roombooking")
        .insertMany(data);
    res.send(result);
});

router.put("/:id", async function (req, res) {
    const { id } = req.params;
    const updatedRoom = req.body;
    const result = await client
        .db("b30wd")
        .collection("roombooking")
        .updateOne({ customer_name: id }, { $set: updatedRoom });
    res.send(result);
});

router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    const result = await client
        .db("b30wd")
        .collection("roombooking")
        .deleteOne({ customer_name: id });
    res.send(result);
});

export const roomsbookingRouter = router;