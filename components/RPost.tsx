import styles from "../styles/Home.module.css";
import Image from "next/image";
export default function RPost({ post, index }) {
  return (
    <div key={index} className={styles.card}>
      <h3>
        <a href={post.subreddit_name + "/post/" + post.posturl}>{post.title}</a>
      </h3>
      {post.thumbnail !== "self" && <img src={post.thumbnail} />}
    </div>
  );
}
