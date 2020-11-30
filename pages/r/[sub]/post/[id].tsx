import Head from "next/head";
import styles from "../../../../styles/Home.module.css";
import { getSession, signIn } from "next-auth/client";
import { GetServerSideProps } from "next";
import { Snoo } from "../../../../components/helper/Snoo";
import CommentParser from "./../../../../components/helper/CommentParser";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const post: string = context.params.id.toString();
  if (session) {
    // Create Snoowrap instance to get subreddit info
    try {
      const snoo = await Snoo(
        process.env.REDDIT_CLIENT_ID,
        process.env.REDDIT_CLIENT_SECRET,
        session.refreshToken
      );
      const subreddit = snoo
        .getSubmission(post)
        .fetch()
        .then((post) => {
          return {
            title: post.title,
            thumbnail: post.thumbnail,
            score: post.score,
            selftext: post.selftext,
            author: post.author.name,
          };
        });
      return {
        props: { comments: subreddit, subreddit: "r/" + context.params.sub },
      };
    } catch (err) {
      //if subreddit is not found show 404
      return { props: { data: "Not Found" } };
    }
  }
  return null;
};
export default function Post({ data, subreddit }) {
  const initialData = data;
  if (!initialData) {
    return (
      <>
        <Head>
          <title>{"error"}</title>
        </Head>
        <h1 key={subreddit + "error"} className={styles.title}>
          You must be logged in to see subreddits
        </h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            signIn("reddit");
          }}
        >
          Sign in with Reddit
        </button>
      </>
    );
  }
  if (initialData === "Not Found") {
    return (
      <h1 key={subreddit + "404"} className={styles.title}>
        404
      </h1>
    );
  }
  return <></>;
}
