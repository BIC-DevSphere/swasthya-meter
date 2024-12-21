import dbConnect from "@/db/dbConnect";
import { Medicine } from "@/modals/medicineModal";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { dosage, frequency, time, startDate, endDate, notes, name } = await req.json();

        if (!dosage || !frequency || !time || !startDate || !endDate || !notes || !name) {
            return NextResponse.json(
                { error: "Please provide all the required fields." },
                { status: 400 }
            );
        }

        const token = await getToken({ req, secret: process.env.JWT_SECRET });
        if (!token) {
            return NextResponse.json(
                { error: "User is not authorized." },
                { status: 401 }
            );
        }

        await dbConnect();

        const medicine = await Medicine.create({
            dosage,
            frequency,
            time,
            startDate,
            endDate,
            notes,
            name,
            user: token.id
        });


        return NextResponse.json({ medicine });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Internal Server Error." },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        const token = await getToken({ req, secret: process.env.JWT_SECRET });
        if (!token) {
            return NextResponse.json(
                { error: "User is not authorized." },
                { status: 401 }
            );
        }

        await dbConnect();

        const medicines = await Medicine.find({ user: token.id });

        return NextResponse.json({ medicines });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Internal Server Error." },
            { status: 500 }
        );
    }
}