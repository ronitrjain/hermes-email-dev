import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/src/models/User";
import { MongoClient } from "mongodb";
import bcrypt from 'bcryptjs'; // Import bcrypt library




export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
    
        if (credentials == null) return null;
        const { email, password } = credentials;

        let user = null;
        let client = null;

        try{
          client = await MongoClient.connect('mongodb://127.0.0.1:27017/hermes-email',  { useNewUrlParser: true, useUnifiedTopology: true })
          const users =  client.db().collection('users');
          user = await users.findOne({
                    email:email
                });
        }
        catch(err){
          console.log(err)
        }
      

        if (!user) {
          throw new Error("Invalid Email");
        }

        console.log(user)
        const isMatch =  await bcrypt.compare(password, user.password);
        if (!isMatch) {

          throw new Error("Invalid Password");
        }

 


        return user;
      },
    }),
  ],
  secret: "secret",
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if(trigger==="update"){
        token.username = session.user.username;
        token.email = session.user.email;
        token.id = session.user.id;
        token.key = session.user.key;
        token.org = session.user.organization;
        token.org_email = session.user.organization_email;
        token.corporation_password = session.user.corporation_password;
        return token;
      }
      if (user) {
        token.id = user._id.toString(); // Convert ObjectID to string
        token.username = user.username;
        token.email = user.email;
        token.key = user.key;
        token.org = user.organization;
        token.org_email = user.org_email;
        token.corporation_password = user.corporation_password;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user = { id: token.id, username: token.username, email: token.email, key: token.key, organization: token.org, organization_email: token.org_email, corporation_password: token.corporation_password};
      }
      return session;
    }
    
  }
    
});