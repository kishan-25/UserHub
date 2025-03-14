const User = require("../models/User");

exports.getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try{
       const { name, email } = req.body;
       if( !name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
       }

       const user = await User.create({ name, email });
       res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};