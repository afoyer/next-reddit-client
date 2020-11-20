import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { signIn } from "next-auth/client";

const options = {
  // debug: true,
  providers: [
    Providers.Twitch({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
    }),
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
    {
      id: "reddit",
      name: "Reddit",
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      type: "oauth",
      version: "2.0",
      scope: "identity mysubreddits read",
      params: { grant_type: "authorization_code" },
      accessTokenUrl: " https://www.reddit.com/api/v1/access_token",
      authorizationUrl:
        "https://www.reddit.com/api/v1/authorize?response_type=code&duration=permanent",
      profileUrl: "https://oauth.reddit.com/api/v1/me",
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.name,
          email: null,
        };
      },
    },
  ],
  callbacks: {
    // signIn: async (user, account) => {
    //   user.accessToken = account.accessToken;
    //   user.refreshToken = account.refreshToken;
    //   return Promise.resolve(user);
    // },
    jwt: async (token, user, account) => {
      if (account) {
        token.accessToken = account.accessToken;
        token.refreshToken = account.refreshToken;
      }

      return Promise.resolve(token);
    },

    session: async (session, token) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return Promise.resolve(session);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
