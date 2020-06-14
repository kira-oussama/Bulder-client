import Head from "next/head"
import MainChat from "../components/MainChat"
import OnlineUsers from "../components/OnlineUsers"
import "../styles/bootstrap.min.css"
import '../styles/style.css'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import PrivateMessage from "../components/PrivateMessage"
import soc from "./../components/Socket";

export default function(){

    const [pvChatting, setPvChatting] = useState(false);
    const [pvDisplay, setpvDisplay] = useState("none");
    const [pmReciever, setpmReciever] = useState("");
    const [pmRecieverimg, setpmRecieverimg] = useState("");
    const [pmList, setpmList] = useState([]);
    const [newMsgR, setnewMsgR] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const Router = useRouter();

    useEffect(()=>{
        
        soc.on('privateMessage', answer=>{
            setpmList([...pmList, answer]);
            setnewMsgR({newMsg: true, newMsgSender: answer.sender});
        })
        if(!localStorage.getItem('token')){
            setRedirect(true);
        }
    });


    const openPrivateChat = (event, reciever, display, img)=>{
        event.preventDefault();
        setPvChatting(true);
        setpvDisplay(display);
        setpmReciever(reciever);
        setpmRecieverimg(img);
    }

    const addmessage = (obj)=>{
        setpmList([...pmList, obj]);
    }
    
    const addmessages = (objList)=>{
        var newArray = objList;
        objList.forEach(obj => {
            newArray.push(obj)
            setpmList(newArray);
        });
    }

    const setpvDisplayNone = (event)=>{
        event.preventDefault();
        setpvDisplay("none");
    } 

    const setnewMsgRToFalse = ()=>{
        setnewMsgR({...newMsgR, newMsg: false});
    }
    
    return(
        <div>
            <Head>
                <title>Chat</title>
                <link rel="icon" href="/favicon.ico" />
                {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link> */}
            </Head>
            <h1 className="text-primary logo">BULDER</h1>
            <div className="chatPage row">
                <OnlineUsers 
                    isChatting={openPrivateChat} 
                    pmList={pmList} 
                    newMsgR={newMsgR}
                    setnewMsgRToFalse={setnewMsgRToFalse}
                    />
                
                <MainChat />
                {pvChatting ? <PrivateMessage 
                    pvDisplay={pvDisplay} 
                    setpvDisplayNone={setpvDisplayNone} 
                    reciever={pmReciever} 
                    recieverimg={pmRecieverimg}
                    pmList={pmList} 
                    addmessage={addmessage}
                    addmessages={addmessages}
                    /> : ""}
            </div>
        </div>
    );
}