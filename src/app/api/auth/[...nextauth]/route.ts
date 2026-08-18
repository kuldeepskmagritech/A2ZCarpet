import NextAuth from "next-auth"

export const dynamic = "force-dynamic"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@a2zcarpet.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        })

        // In a real app, you would hash the incoming password and compare it
        // For this demo, we'll accept any password if the user exists
        if (user) {
          return { id: user.id, name: user.name, email: user.email, role: user.role }
        }
        
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development"
})

export { handler as GET, handler as POST }
