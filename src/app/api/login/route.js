import {NextResponse} from "next/server"
import {connectDb, getDb} from '../../../components/lib/db'
import bcrypt from "bcryptjs"

export async function POST(req) {
  try{
    const { email, password } = await req.json();
    await new Promise((resolve, reject) => {
      connectDb((err) => {
        if (err) {
          reject('Error connecting to the database');
        } else {
          resolve();
        }
      });
    });

    const db = getDb();

    const user = await db.collection('user').findOne({email: email});
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid credentials' }, {status: 400});
    }
    
    return NextResponse.json({ message: 'Login success' }, {status: 201});
  } catch (error){
    return NextResponse.json({ message: error }, {status: 500});
  }
}