import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userService = {
    async createUser(userData) {
        // Hash password sebelum disimpan
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        const newUser = new User({ ...userData, 
        password: hashedPassword 
        });
        return await newUser.save();
    },

    async getAllUsers() {
        return await User.find();
    },

    async getUserById(id) {
        return await User.findById(id);
    },

    async updateUser(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    },

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    },
    
    async getUserByEmail(email) {
    return await User.findOne({ email });
  },
  
};

export default userService;
