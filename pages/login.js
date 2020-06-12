import Head from 'next/head'
import "../styles/bootstrap.min.css"
import "../styles/style.css"
import Login from '../components/Login' 
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {

  const Router = useRouter();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      Router.push('/chat');
    }
  })

  return (
    <div className="container">
      <Head>
        <title>BulderChat</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link> */}
      </Head>
      <h1 className="text-primary logo">BULDER</h1>
      <Login />
    </div>
  )
}
