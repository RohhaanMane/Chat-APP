import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) =>{
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const  senderId  = req.user._id;              // got from middlerware

        // find conversation between these two
        let conversation =  await Conversation.findOne({
            participants : { $all: [senderId, receiverId]},     // find a conversation where participants array equals all these fields
        })

        // if conversation is not present - create one
        if(!conversation)
        {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        // create message that is comming from user
        const newMessage =new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // SOCKET IO FUNCTIONALITY WILL BE HERE

        // await conversation.save();       this takes smoe more time
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]);    // this will run in parallel

        res.status(201).json(newMessage);



    } catch (error) {
        console.log("Error in sendMessage controller : ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}