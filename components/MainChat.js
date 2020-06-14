import Head from 'next/head'
import Router from "next/router"
import io from 'socket.io-client'
import soc from './Socket'
import ReactEmoji from 'react-emoji';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messages: [],
            me:''
        }
    }


    componentDidMount() {
        const me = JSON.parse(localStorage.getItem('userData'));
        this.setState({me: me.pseudoName})
        soc.on('newPublicMessage', message=>{
            const newMessagesArray = this.state.messages;
            newMessagesArray.push(message)
            this.setState({messages: newMessagesArray})
            document.querySelector('.messagesField').scrollTop = document.querySelector('.messagesField').scrollHeight;
        });
    }
    
    messageHandler = (event)=>{
        this.setState({message: event.target.value});
    }
    
    
    submitHandler=(event)=>{
        event.preventDefault()
        const sender = JSON.parse(localStorage.getItem('userData'));
        if(this.state.message != ""){
            soc.emit('newPublicMessage', {message: this.state.message, sender: sender.pseudoName,avatar: sender.avatar })   
            this.setState({message: ''})
        }
    }
    
    render(){
        return(
            <div className="col-sm-12 col-md-8 messagesForm">
                <div className="messagesField">
                    <ul>
                        <p className="welcomeMsg">Welcome to Bulder chat {this.state.me}</p>
                        {
                            this.state.messages.map((msg,index)=>{
                                
                                const item = this.state.me === msg.sender ? <li key={index} className="iamSender"><span><img src={'https://bulderchat.herokuapp.com/' + msg.avatar} />{ReactEmoji.emojify(msg.message)}</span><span className="personName">{msg.sender}</span></li> 
                                                                          : <li key={index} className="otherSender"><span className="personName">{msg.sender}</span><span>{ReactEmoji.emojify(msg.message)} <img src={'https://bulderchat.herokuapp.com/' + msg.avatar} /></span></li>;
                                return(item)
                            })
                        }
                    </ul>
                </div>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group col-sm-12">
                        <input className="form-control" autoComplete="off" id="message" value={this.state.message} onChange={this.messageHandler}></input>
                    </div>

                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary col-sm-12">Send</button>
                    </div>    
                </form>
            </div>
        );
    }
}