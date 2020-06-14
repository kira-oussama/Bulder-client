import soc from './Socket'
import Router from "next/router";

export default class extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            me : "",
            avatar: ""
        }
    }
    
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('userData'));
        this.setState({me: user.pseudoName});
        //emit the pseudoname to make an array socketId: username
        soc.emit('username', {pseudoName: user.pseudoName, avatar: user.avatar});
        //filter our names from an array
        soc.on('usersOnline', username=>{
            username = username.filter(function( obj ) {
                return obj.username !== user.pseudoName;
              });
            this.setState({users: username})
        });
    }

    openPrivateChat = (event, reciever, img)=>{
        event.preventDefault();
        this.props.isChatting(event, reciever, "flex", img);
        this.props.setnewMsgRToFalse();  
    }

    disconnect = ()=>{
        localStorage.clear();
        Router.push('/')
    }

    render(){
        return (
            <div className="onlineUsers col-sm-10 col-md-2">
                <button type="button" className="btn btn-primary col-sm-12" onClick={this.disconnect} >Disconnect</button>
                <h3>Online Users</h3>
                <ul>
                    {this.state.users.map((user,index)=>{
                        return(
                            <li key={index} onClick={(event)=>this.openPrivateChat(event, user.username, user.avatar)}> {user.username} {this.props.newMsgR.newMsgSender === user.username && this.props.newMsgR.newMsg ? <p id="newMessageCircle"></p> : ""} </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}