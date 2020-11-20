import snoowrap from "snoowrap";

export async function Snoo(
  id: string,
  secret: string,
  key: string
): Promise<snoowrap> {
  return new snoowrap({
    clientId: id,
    clientSecret: secret,
    refreshToken: key,
    userAgent: "web:testnextjs:alpha (by /u/lemimic)",
  });
}
