import Room from "../models/Room.js";

export const createRoom = async (req, res, next) => {
    const RoomId = req.params.RoomId;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Room.findByIdAndUpdate(RoomId, { $push: { rooms: savedRoom.id } })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err)
    }
}


export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(
            req.params.id);
        try {
            await Hotel.findByIdAndDelete(hotelId, {
                $pull: { rooms: req.params.id},
            });
        } catch (err) {
            next(err);
}
    res.statis(200).json("room has been deleted");
    } catch(err) {
        next(err)
    }
};

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(
            req.params.id
        );
        res.status(200).json(room);
    } catch (err) {
        next(err)
    }
}

export const getRooms = async (req, res, next) => {
    const failed = true;

    try {
        const Rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err)
    }
}
