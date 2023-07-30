const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../untils/config");

const userController = {
    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(409).json({ message: "User already exists" })
            }

            const hashedPass = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPass
            })

            await newUser.save();
            res.status(200).json({ message: "User Created Successfully" })

        } catch (error) {
            console.error('Error signing up user', error)
            res.status(500).json({ message: "Internal Server Error" })
        }
    },

    getAllUsers: async (req, res) => {
        try {
            User.find({})
                .then((users) => {
                    res.status(200).json({ users: users })
                })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    },

    signin: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: "User does not exists" })
            }

            const passMatch = await bcrypt.compare(password, user.password)

            if (!passMatch) {
                return res.status(401).json({ message: "Wrong Credentials" })
            }

            const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, config.SECRET_KEY, { expiresIn: "1h" });

            res.json({ token })


        } catch (error) {
            console.error("Error signing In")
            res.status(500).json({ message: "Internal Server Error" })
        }
    },

    getProfile: async (req, res) => {
        try {
            const userId = req.userId;
            const user = await User.findById(userId, 'name email')
            res.json(user)
        } catch (error) {
            res.json({ message: "Server Error", error })
        }
    },

    editProfile: async (req, res) => {
        try {
            const userId = req.userId;
            const { name, email } = req.body;

            const user = await User.findByIdAndUpdate(
                userId,
                { name, email, updateAt: Date.now() },
                { new: true })

            res.json({ message: "User Updated Successfully" })

        } catch (error) {
            console.error("Error Updating profile")
            res.status(500).json({ message: "Internal Server Error" })
        }
    },

    deleteProfile: async (req, res) => {
        try {
            const userId = req.userId;
            await User.findByIdAndDelete(userId);
            res.json({ message: "User Deleted Successfully" })
        } catch (error) {
            console.error("Error Deleting profile")
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

}

module.exports = userController;