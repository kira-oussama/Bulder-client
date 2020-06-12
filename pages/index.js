import chat from "./chat";
import Login from "../components/Login";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Index() {


  const Router = useRouter();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      Router.push('/chat');
    }else{
      Router.push('/login');
    }
  });

  return(<div></div>);


}