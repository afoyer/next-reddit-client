import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {getSession, useSession } from 'next-auth/client'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { Snoo } from '../../components/Snoo';
export const getServerSideProps: GetServerSideProps = async(context) => {
    const session = await getSession(context)
    if(session){
    try {const snoo = Snoo(process.env.REDDIT_CLIENT_ID, process.env.REDDIT_CLIENT_SECRET, session.refreshToken)
    
    const subreddit = (await (await snoo).getSubreddit(context.params.sub).getHot()).map(post=> post.title)
    return { props:  {data: subreddit} }
    }
    catch(err){
        return {props:{data: '404'}}
    }
    }
    return { props:  {data: session == null ? null: session.refreshToken } }
  }

    
    
  
    
export default function Sub(props){
const initialData = props.data
if(!initialData) {
    return <h1 className={styles.title}>You must be logged in to see subreddits</h1>
}
if(initialData === '404'){
    return <h1 className={styles.title}>404</h1>
}
  return initialData.map(post => {
      return <h1>{post}</h1>
  })
}


