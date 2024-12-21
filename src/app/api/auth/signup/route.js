import dbConnect from "@/db/dbConnect";
import { User } from "@/modals/userModal";
import { hashPassword } from "@/lib/password"; 
import { NextResponse } from 'next/server'


export async function POST(req, res) {
  const { email, password, fullName } =  await req.json();

  if (!email || !password || !fullName) {
    return NextResponse.json(
      { error: 'Please fill all the fields' },
      { status: 400 }
    )}

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User Already Exist', existingUser },
        { status: 400 }
      )}

    const hashedPassword = await hashPassword(password);

    const user = await User.create({ fullName, email, password: hashedPassword });
     
    return NextResponse.json(
      { success: 'User Created Successfully' },
      { status: 200 }
    )  } catch (error) {
    console.error("Error during sign-up:", error);
    return NextResponse.json(
      { error: 'Something went wrong ', error },
      { status: 500 }
    )  }
}
