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

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(`Error fetching user with id ${req.params.id}:`, error);
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

exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        // Validation
        if ((!name && !email) || (name && name.trim() === '') || (email && email.trim() === '')) {
            return res.status(400).json({ error: "Valid name or email is required" });
        }
        
        // Check if email already exists (if updating email)
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
            if (existingUser) {
                return res.status(409).json({ error: "Email already in use" });
            }
        }
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.json(user);
    } catch (error) {
        console.error(`Error updating user with id ${req.params.id}:`, error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(`Error deleting user with id ${req.params.id}:`, error);
        res.status(500).json({ error: error.message });
    }
};