import Link from 'next/link'
import axios from 'axios'
import { Router } from 'next/router';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pseudoName: "",
            password: "",
            sexe: "male",
            isLoading: false,
            created: false
        }
    }

    pseudoNamehandler = (event) => {
        this.setState({pseudoName : event.target.value});
    }

    passwordhandler = (event) => {
        this.setState({password : event.target.value})
    }

    sexehandler = (event) => {
        this.setState({sexe : event.target.value})
    }

    // avatarChangeHandler = (event)=>{
    //     this.setState({avatar: event.target.files[0]})
    // }

    submitHandler = (event) =>{
        event.preventDefault();
        this.setState({isLoading: true});
        var info = new FormData();
        info.append('pseudoName', this.state.pseudoName);
        info.append('password', this.state.password);
        info.append('sexe', this.state.sexe);
        // if(this.state.avatar != ""){
        //     info.append('avatarImg', this.state.avatar);
        // }
        var headers = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post('https://bulderchat.herokuapp.com/user/register', info, headers)
        .then((response)=>{
            if(response.status === 201){
                this.setState({created: true})
                this.props.redirectWhenCreated();
            }
            this.setState({isLoading: false})
        })
        .catch((error)=>{
            console.log(error)
            this.setState({isLoading: false})
        });
    }

    render(){
        return(
            <div className="formContainer col-sm-12 col-md-6">
                <h1 className="text-primary loginSlogan">REGISTER</h1>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group col-sm-12">
                    <input type="file" className="form-control-file" id="avatar" placeholder="Upload an avatar" />
                    </div>

                    <div className="form-group col-sm-12">
                    <input type="text" className="form-control" id="loginPseudoName" placeholder="Pseudo" value={this.state.pseudoName} onChange={this.pseudoNamehandler} />
                    </div>
                    <div className="form-group col-sm-12">
                    <input type="password" className="form-control" id="loginPassword" placeholder="Password" value={this.state.password} onChange={this.passwordhandler} />
                    </div>
                    <div className="form-group col-sm-12">
                    <select className="form-control" id="sexe" value={this.state.sexe} onChange={this.sexehandler}>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    </div>
                    {/* <p>{this.state.created ? "your account is created you can login" : ""}</p> */}
                    <div className="form-group col-sm-12">
                        <button type="submit" className="btn btn-primary col-sm-6">Register<img style={ { width: "1rem" }} src={this.state.isLoading ? "/loginload.gif" : ""} alt={this.state.isLoading ? "loading..." : ""} /></button>
                    </div>
                </form>

                <Link href="/">
                    <a className="text-primary changeForm">Already have an account</a>
                </Link>
            </div>
        );
    }
}