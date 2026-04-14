import { Router, Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const createUser = async (req: Request, res: Response) => {
    try{
        const { name, surname, username, email, password } = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message: 'E-posta zaten mevcut.'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            surname,
            username,
            email,
            password: hashedPassword,

        });

        const token = jwt.sign(
           { id: user._id },
           process.env.JWT_SECRET as string,
           {expiresIn: "1d"}
        );

        return res.status(201).json({
            token,
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                surname:user.surname,
                name: user.name
            }
        });


    }catch(error){
        return res.status(500).json({message:'Server error'})
    }
}

export const loginUser =  async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        surname:user.surname,
        name: user.name
      },
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

