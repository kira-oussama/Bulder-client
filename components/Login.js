import Link from "next/link"
import axios from "axios"
import Router from "next/router"
import jwt from 'jsonwebtoken'
// import loading from "../images/loginload.gif"

export default class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            pseudoName: "",
            password: "",
            iswrong: false,
            isLoading: false
        }
    }

    pseudoNamehandler = (event) => {
        this.setState({pseudoName : event.target.value});
    }

    passwordhandler = (event) => {
        this.setState({password : event.target.value})
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.setState({isLoading: true});
        var info = {
            pseudoName: this.state.pseudoName,
            password: this.state.password
        }

        var headers = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        axios.post('https://bulderchat.herokuapp.com/user/login', info, headers)
        .then((response)=>{
            if(response.data.token){
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userData', JSON.stringify(jwt.decode(response.data.token)));
                Router.push('/chat');
                this.setState({isLoading: false});
            }else{
                this.setState({iswrong: true, pseudoName: "", password: ""});
                this.setState({isLoading: false});
            }
        })
        .catch((error)=>{
            console.log(error)
        });
    }

    render() {
        return(
            <div className="formContainer col-sm-12 col-md-6">
                <h1 className="text-primary loginSlogan">LOGIN</h1>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group col-sm-12">
                      <input type="text" className="form-control" id="loginPseudoName" placeholder="Pseudo" value={this.state.pseudoName} onChange={this.pseudoNamehandler} />
                    </div>
                    <div className="form-group col-sm-12">
                      <input type="password" className="form-control" id="loginPassword" placeholder="Password" value={this.state.password} onChange={this.passwordhandler} />
                    </div>
                    <div>
                        {this.state.iswrong ? <a className="text-danger changeForm">Wrong Credentials</a> : ""}
                    </div>
                    <div className="form-group col-sm-12">
                        <button type="submit" className="btn btn-primary">Login <img style={ { width: "1rem" }} src={this.state.isLoading ? "/loginload.gif" : ""} alt={this.state.isLoading ? "loading..." : ""} /> </button>
                    </div>
                </form>
    
                <Link href="/register">
                    <a className="text-primary changeForm">I don't have an account</a>
                </Link>
    
            </div>
        );
    }
}