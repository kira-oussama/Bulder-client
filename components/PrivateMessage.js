import soc from './Socket';
import axios from 'axios';

export default class PrivateMessage extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            sender: "",
            message:"",
            receiver: "",
            avatar: ""
        }
    }

    async componentDidMount() {
        const me = await JSON.parse(localStorage.getItem("userData"));
        await this.setState({sender: me.pseudoName, avatar: me.avatar, receiver: this.props.reciever});
        axios.post("https://bulderchat.herokuapp.com/user/messageseen",{sender: this.state.sender, receiver: this.state.receiver}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(response=> {

            axios.post("https://bulderchat.herokuapp.com/user/loadmsg",{sender: this.state.sender, receiver: this.state.receiver}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(response=> {
                console.log(response)
                this.props.addmessages(response.data);
                document.querySelector(".privateChatBoxBody").scrollTop = document.querySelector(".privateChatBoxBody").scrollHeight;
            });
            
        })
        
        .catch(err=>console.log(err))
    }


    hidePrivateMessageBox = (event)=>{
        document.querySelector(".privateChatBox").style.opacity = 0;
    }

    showPrivateMessageBox = (event)=>{
        document.querySelector(".privateChatBox").style.opacity = 1;
        this.props.setnewMsgRToFalse();
    }

    hidePrivateMessage=(event)=>{
        event.preventDefault();
        this.props.setpvDisplayNone(event);
    }

    messageHandler = (event)=>{
        this.setState({message: event.target.value});
    }

    addMessageToList = (obj)=>{
        this.props.addmessage(obj);
    }

    submitHandler = event=>{
        event.preventDefault();
        if(this.state.message != ""){

            
            //emit to the other person
            soc.emit('privateMessage',{
                sender: this.state.sender,
                receiver: this.state.receiver,
                message: this.state.message
            });
            
            const token = localStorage.getItem('token');
            const headers = {
                headers: {
                    Authorization : `bearer ${token}`
                }
            }
            const postData = {
                sender: this.state.sender,
                receiver: this.state.receiver,
                message: this.state.message
            }

            //save to db
            axios.post("https://bulderchat.herokuapp.com/user/message", postData, headers)
            .then(response=>{
                this.addMessageToList({
                    sender: response.data.sender,
                    receiver: response.data.receiver,
                    message: response.data.message
                });
                
                this.setState({message: ""}) 
                document.querySelector(".privateChatBoxBody").scrollTop = document.querySelector(".privateChatBoxBody").scrollHeight;
            })
            .catch(err=>{
                console.log(err);
            });

        }
    }

    sendscrolldown = ()=>{
        document.querySelector(".privateChatBoxBody").scrollTop = document.querySelector(".privateChatBoxBody").scrollHeight;
    }

    render(){
        return(
            <div className="privateMessage" style={{display: this.props.pvDisplay}}>
                <div className="privateChatBox">

                    <div className="privateChatBoxHeader">
                        <span className="usernameHader">{this.props.reciever}</span>
                        <button className="pvActionButton" id="closePrivateMessage" onClick={this.hidePrivateMessage}>x</button>
                        <button className="pvActionButton" id="hidePrivateMessage" onClick={this.hidePrivateMessageBox}>-</button>
                    </div>

                    <div className="privateChatBoxCore">
                        <div className="privateChatBoxBody">
                            <ul id="pmField">
                                {
                                    this.props.pmList.map((msg, index)=>{
                                        const item = this.state.sender === msg.sender ? <li className="myPm" key={index}><span> {msg.message} </span></li> : <li className="hisPm" key={index}><span> {msg.message} </span></li>;
                                        return (item);
                                    })
                                }
                            </ul>
                        </div>

                        <form className="privateChatboxForm" onSubmit={this.submitHandler}>
                            <input type="text" className="form-control" placeholder="Type message here..." value={this.state.message} onChange={this.messageHandler} onFocus={this.sendscrolldown}/>&nbsp;
                            <button type="submit" className="btn btn-primary">Send</button>
                        </form>
                    </div>


                </div>

                <div className="bullespv">
                    <img src={"https://bulderchat.herokuapp.com/"+this.state.avatar} className="bulle" onClick={this.showPrivateMessageBox} />
                </div>

            </div>
        );
    }
}