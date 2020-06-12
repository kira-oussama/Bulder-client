import Head from 'next/head'
import "../styles/bootstrap.min.css"
import "../styles/style.css"
import Register from '../components/Register'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {

  const Router = useRouter();
  

  const redirectWhenCreated = ()=>{
    Router.push('/login');
  }

  return (
    <div className="container">
      <Head>
        <title>BulderChat</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link> */}
      </Head>
      <h1 className="text-primary logo">BULDER</h1>
      <Register redirectWhenCreated={redirectWhenCreated}/>
    </div>
  )
}
