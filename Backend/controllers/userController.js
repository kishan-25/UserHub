const User = require("../models/User");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        console.log("Received data:", req.body);
        const { name, email } = req.body;
        
        // Better validation
        if (!name || !email || name.trim() === '' || email.trim() === '') {
            return res.status(400).json({ error: "Name and email are required" });
        }
        
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already in use" });
        }
        
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: error.message });
    }
};