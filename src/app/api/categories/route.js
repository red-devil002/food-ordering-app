import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import { Category } from "@/app/models/Category";

import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {name, discription} = await req.json();
    const categoryDoc = await Category.create({name, discription});
    return Response.json(categoryDoc);
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {_id, name, discription} = await req.json();
    if (await isAdmin()) {
      await Category.updateOne({_id}, {name, discription});
    }
    return Response.json(true);
  }


export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
      await Category.find()
    );
  }