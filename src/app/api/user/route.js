import dbConnect from "@/db/dbConnect";
import { Report } from "@/modals/reportModal";
import { User } from "@/modals/userModal";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function GET(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  if (!token) {
    return NextResponse.json(
        { error: "You need to be logged in to create a report" },
        { status: 401 }
    )
    }
    await dbConnect();

    const user = await User.findById(token.id).select("-password");
    const userReport = await Report.find({ user: token.id });
    if (!user) {
      return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
      );
    }
    return NextResponse.json({ user, userReport });
}

export async function POST(req) {
  const {suggestions} = await req.json()
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  if (!token) {
    return NextResponse.json(
        { error: "You need to be logged in to create a report" },
        { status: 401 }
    )
    }
    await dbConnect();

    const user = await User.findById(token.id).select("-password");
    if (!user) {
      return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
      );
    }
    user.healthSuggestions = suggestions;
    await user.save({validateBeforeSave: false});

    return NextResponse.json({ user });
}