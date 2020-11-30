import { Listing } from "snoowrap";

//Comment parser for submissions.
export default function CommentParser(list: Listing<any>) {
  return list.map((comment) => {
    return {
      body: comment.body,
      author: comment.author,
      score: comment.score,
      timecreated: comment.created_utc,
    };
  });
}
