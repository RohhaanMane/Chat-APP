import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

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

        
        // await conversation.save();       this takes smoe more time
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]);    // this will run in parallel
        
        // SOCKET IO FUNCTIONALITY WILL BE HERE - send new message to selected User
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){

            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }



        res.status(201).json(newMessage);



    } catch (error) {
        console.log("Error in sendMessage controller : ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getMessage = async (req, res)=>{
    try {
        const {id: userToChatId} = req.params;
        const senderId =  req.user._id;

        const converation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId]},
        }).populate("messages");    // messages array contins references to the messages - populate method actual populates the array with actual messages.

        if(!converation) return res.status(200).json([]);

        const messages = converation.messages;
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in sendMessage controller : ", error.message);
        res.status(500).json({error: "Internal server error"});    
    }
}