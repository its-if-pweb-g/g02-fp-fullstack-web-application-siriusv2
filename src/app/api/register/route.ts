import { NextResponse } from "next/server";
import { connectDb, getDb } from "../../../components/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
    try {
        const { username, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await new Promise((resolve: Function, reject: Function) => {
            connectDb((err) => {
                if (err) {
                    reject("Error connecting to the database");
                } else {
                    resolve();
                }
            });
        });

        const db = getDb();

        if (await db.collection("user").findOne({ email: email })) {
            return NextResponse.json(
                { message: "Email already registered" },
                { status: 400 }
            );
        }

        if(email === "c.nathanell05@gmail.com" || email === "daffa1mubarok@gmail.com" || email === "kl905577@gmail.com"){
            await db.collection("user").insertOne({
                username: username,
                email: email,
                password: hashedPassword,
                created_at: new Date(Date.now()).toISOString().split(".")[0] + "Z",
                role: "admin",
            });
        } else {
            await db.collection("user").insertOne({
                username: username,
                email: email,
                password: hashedPassword,
                created_at: new Date(Date.now()).toISOString().split(".")[0] + "Z",
                role: "user",
            });
        }

        return NextResponse.json(
            { message: "User registered" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
