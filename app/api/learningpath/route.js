import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongose";
import User from "@/models/User";
import LearningPath from "@/models/LearningPath";

export async function POST(req) {
    try {
        const body = await req.json();

        if (!body.title || !body.nodes) {
            return NextResponse.json(
                { error: "Learning tree is missing required fields" },
                { status: 400 }
            );
        }

        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Not authorized" },
                { status: 401 }
            );
        }

        await connectMongo();

        const user = await User.findById(session.user.id);

        const learningPath = await LearningPath.create({
            ...body,
            userID: user._id,
        });

        user.learningPaths.push(learningPath._id);
        await user.save();

        return NextResponse.json(learningPath, { status: 201 });

    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}