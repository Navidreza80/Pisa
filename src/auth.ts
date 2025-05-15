// Dependencies
import NextAuth from "next-auth"
import Github from "next-auth/providers/github"

// Next auth handler with github
export const {auth, handlers, signIn, signOut} = NextAuth({
    providers: [Github]
})