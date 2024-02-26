import { User } from "/src/app/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const pass = body.password;
    if (pass?.length || pass.length < 8 ){
        new Error('Password must be at least 8 characters');
    }
    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);
    const createUser = await User.create(body);
    return Response.json(createUser);
}