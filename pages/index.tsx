//this is the home page. 
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Dragonpunk</title>
        <meta name="description" content="A Hobby Shop with Games and Music." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className = "splash-page">
        <div className = "splash-page-hero">
          <h1>Dragonpunk</h1>
        </div> 
      </div>
    </>
  )
}

