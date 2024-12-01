import {NextResponse} from "next/server"
import {connectDb, getDb} from '../../../components/lib/db'
import bcrypt from "bcryptjs"

export async function POST(req) {
  try{
    const { username, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await new Promise((resolve, reject) => {
      connectDb((err) => {
        if (err) {
          reject('Error connecting to the database');
        } else {
          resolve();
        }
      });
    });

    const db = getDb()
    if (await db.collection('user').findOne({email: email})) {
      return NextResponse.json({ message: 'Email already registered' }, {status: 400});
    }

    await db.collection('user')
      .insertOne({
        username: username,
        email: email,
        password: hashedPassword,
        created_at: new Date(Date.now()).toISOString().split('.')[0] + 'Z'
      })
    
    return NextResponse.json({ message: 'User registered' }, {status: 201});
  } catch (error){
    return NextResponse.json({ message: error }, {status: 500});
  }
}