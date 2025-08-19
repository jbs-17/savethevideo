import userService from '../services/user.service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userController = {
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
      }
      res.status(200).json({ message: 'Pengguna berhasil dihapus.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.getUserByEmail(email);

      if (!user) {
        return res.status(400).json({ message: 'Email atau password salah.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Email atau password salah.' });
      }

      // Buat token JWT
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token kadaluarsa dalam 1 jam
      );

      res.status(200).json({
        message: 'Login berhasil.',
        token,
        userId: user._id,
        userName: user.name
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
};

export default userController;