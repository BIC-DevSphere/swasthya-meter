import { Report } from "@/modals/reportModal";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/db/dbConnect";

export async function POST(req) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
   
        if (!token) {
            return NextResponse.json(
                { error: "You need to be logged in to create a report" },
                { status: 401 }
            )
        }

        const { height, weight, metrics, category, bmi } = await req.json();

        if (!height || !weight || !metrics || !category || !bmi) {
            return NextResponse.json(
                { error: "Please fill all the fields" },
                { status: 400 }
            );
        }

        await dbConnect();

        const report = await Report.create({
            user: token.id,
            height,
            weight,
            bmi,
            reportType: category,
            healthMetrics: metrics,
        });

        const userReport = await Report.find({ user: token.id });


        return NextResponse.json(
            { message: "Report created successfully!", userReport },
            { status: 201 },
        );
    } catch (error) {
        console.error("Error creating report:", error);
        return NextResponse.json(
            { error: "An error occurred while creating the report" },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return NextResponse.json(
                { error: "You need to be logged in to view reports" },
                { status: 401 }
            );
        }

        await dbConnect();

        const reports = await Report.find({ user: token.id });

        return NextResponse.json({ reports });
    } catch (error) {
        console.error("Error fetching reports:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching reports" },
            { status: 500 }
        );
    }
}
