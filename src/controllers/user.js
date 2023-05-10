import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Controller for user registration
const userAddController = async (req, res) => {
  try {
    console.log(req.body)

    const { email, password, firstName, lastName, role } = req.body;

    // Check if the user is an admin and only admins can add admins
    if (role === 'admin' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can add admins.' });
    }

    // Check if the user is trying to create an admin
    if (role === 'admin') {
      // Perform admin-specific registration logic here, e.g., additional checks or validations
      // ...

      // Create the admin user
      const hashedPassword = await bcrypt.hash(password, 10);
      const adminUser = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'admin',
      });

      return res.status(201).json({ message: 'Admin user created successfully.', user: adminUser });
    }

    // Create a regular user or technician user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    });

    return res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export { userAddController};
