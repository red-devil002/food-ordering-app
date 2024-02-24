import { User } from "/src/app/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const handler = NextAuth({
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          id: 'credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Email", type: "email", placeholder: "abc@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)
            const email = credentials?.email;
            const password = credentials?.password;
            
            mongoose.connect(process.env.MONGO_URL);
            const user = User.findOne({email});
            const passwordOk = user && bcrypt.compareSync(password, user.password);

            if (passwordOk) {
                return user;
            }

            // Return null if user data could not be retrieved
            return null
          }
        })
    ],
})

export { handler as GET, handler as POST }