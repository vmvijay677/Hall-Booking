import express from "express";

const router = express.Router();

router.get("/rooms-data", async function (req, res) {
    const rooms = await client
        .db("b30wd")
        .collection("rooms")
        .find({})
        .toArray();
    res.send(rooms);
});

router.get("/rooms-data/:id", async function (req, res) {
    const { id } = req.params;
    const rooms = await client
        .db("b30wd")
        .collection("rooms")
        .findOne({ room_name: id });
    rooms ? res.send(rooms) : res.status(404).send({ message: "Invalid room name" });
});

router.post("/rooms-data", async function (req, res) {
    const data = req.body;
    const result = await client
        .db("b30wd")
        .collection("rooms")
        .insertMany(data);
    res.send(result);
});

router.put("/rooms-data/:id", async function (req, res) {
    const { id } = req.params;
    const updatedRoom = req.body;
    const result = await client
        .db("b30wd")
        .collection("rooms")
        .updateOne({ room_name: id }, { $set: updatedRoom });
    res.send(result);
});

router.delete("/rooms-data/:id", async function (req, res) {
    const { id } = req.params;
    const result = await client
        .db("b30wd")
        .collection("rooms")
        .deleteOne({ room_name: id });
    res.send(result);
});

export const roomsDataRouter = router;