import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import snoowrap from 'snoowrap';

export default function Home() {
  const [ session, loading ] = useSession()
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      {!session && <>
      Not signed in <br/>
      <button onClick={signIn}>Sign in with Spotify</button>
      
      
    </>}
    {session && <>
      <p>Signed in as {session.user.name}</p>  <br/>
      <img src={session.user.image}/>
      <button onClick={signOut}>Sign out</button>
    </>}
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.ts!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
