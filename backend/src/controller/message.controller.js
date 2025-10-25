import cloudinary from "../lib/cloudinary.js";
import { sender } from "../lib/resend.js";
import Message from "../models/message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    //all users excluding us
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    //findall messages between me and the receiver
    const message = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    });
    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required." });
    }
    if (senderId.equals(receiverId)) {
      return res
        .status(400)
        .json({ message: "Cannot send messages to yourself." });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }
    let imageUrl;
    if (image) {
      //upload to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = Message({
      senderId,
      receiverId,
      text,
      imageUrl,
    });

    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    //find all the messages where the loggedinUser is either sender or reveicer
    const messages = await Message.find({
      $or: [
        {
          senderId: loggedInUserId,
        },
        {
          senderId: loggedInUserId,
        },
      ],
    });

    //get reciver if if i am not the logged in uer or else get the logged in users id
    //new set creates a set and removes duplicates
    //we convert it to array to store multiple messages and also spread  it so that we can add new messages
    const chatPartnerId = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnerId },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};
