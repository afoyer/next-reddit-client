This is a work-in-progress Reddit client project using [`next-auth`](https://github.com/nextauthjs/next-auth), [`snoowrap`](https://github.com/not-an-aardvark/snoowrap) and [`next.js`](https://github.com/vercel/next.js/).

## A bit of information

### UPDATE: Working branch does not need what is below anymore. Check it out.

Currently, [`next-auth`](https://github.com/nextauthjs/next-auth) does not support Reddit authentication. I have fixed that by adding these lines on [callback.js](https://github.com/afoyer/next-auth/blob/1c052930ef9e6aaef93da7bcc36b87e7dcaed4b8/src/server/lib/oauth/callback.js):
```
//// Line 215
  if (provider.id === 'reddit') {
    headers.Authorization = 'Basic ' + Buffer.from((provider.clientId + ':' + provider.clientSecret)).toString('base64')
  }
```
Once done you can create your provider like I did: 
```
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
```
(change the scope to your liking)

Don't forget to also set your client and secret key somewhere safe.

This is still an early test and only shows top posts of a particular subreddit so we'll see where this goes.
