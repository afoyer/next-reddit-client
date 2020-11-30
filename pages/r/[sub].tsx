import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { getSession, signIn } from "next-auth/client";
import { GetServerSideProps } from "next";
import { Snoo } from "../../components/helper/Snoo";
import RPost from "../../components/RPost";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const sub: string = context.params.sub.toString();
  if (session) {
    // Create Snoowrap instance to get subreddit info
    try {
      const snoo = await Snoo(
        process.env.REDDIT_CLIENT_ID,
        process.env.REDDIT_CLIENT_SECRET,
        session.refreshToken
      );
      const subreddit = (await snoo.getSubreddit(sub).getHot()).map((post) => {
        // console.log(post);
        return {
          //Will provide more information as I need it.
          title: post.title,
          thumbnail: post.thumbnail,
          score: post.score,
          selftext: post.selftext,
          subreddit_name: post.subreddit.display_name,
          author: post.author.name,
          posturl: post.id,
        };
      });
      return {
        props: { data: subreddit, subreddit: "r/" + context.params.sub },
      };
    } catch (err) {
      //if subreddit is not found show 404
      return { props: { data: "Not Found" } };
    }
  }
  return {
    props: {
      data: session == null ? null : session.refreshToken,
      sub: context.params.sub,
    },
  };
};
export default function Sub({ data, subreddit }) {
  const initialData = data;
  if (!initialData) {
    return (
      <>
        <Head>
          <title>{subreddit}</title>
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
  return initialData.map((post) => {
    return (
      <>
        <Head>
          <title>{subreddit}</title>
        </Head>
        {/* RPost builds a card of the post including link to comments and the like. */}
        <RPost post={post} index={post} key={post.title} />
      </>
    );
  });
}
