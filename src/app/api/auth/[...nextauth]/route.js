import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  // WAJIB di production
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        // ⚠️ CONTOH LOGIN SEDERHANA
        // GANTI dengan database jika perlu

        if (
          credentials.email === "admin@example.com" &&
          credentials.password === "123456"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
          }
        }

        // Login gagal
        return null
      },
    }),
  ],

  pages: {
    signIn: "/login", // optional
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
