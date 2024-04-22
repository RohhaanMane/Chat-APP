import mongoose from "mongoose";

const conversateionSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        }
    ],
}, {timestamps: true});

const conversation = mongoose.model("Conversation", conversateionSchema);

export default conversation;