import React,{Component} from 'react';
import Header from "./Header";

export default class Login extends Component {
    constructor(props) {
        super(props);
        // set state to empty at the begining 
        this.state = {
            "username": "",
            "password": "",
            isRemember: false,
            emptyHelp: ""
        };
    }

     handleCheckbox(e){
        let isChecked = e.target.checked;
        if(isChecked){
            this.setState({
                isRemember: true
            })
        }else{
            this.setState({
                isRemember: false
            })
        }
    }
    

    handleSubmit(){
        // veridate not empty string 
        if (this.state.username.trim().length === 0 || this.state.password.trim().length === 0){
            this.setState({emptyHelp:"* area can not be empty."})
            
        } else{

        this.setState({emptyHelp:""});

        if(this.state.isRemember === true){ 
                let loginData = {};
                loginData.username = this.state.username;
                loginData.userpassword = this.state.password;
                localStorage.setItem("loginInfor",loginData);
            }else{
                localStorage.removeItem("deleteLoginInfor");
            }
  
            // this.props.login(this.state.username,this.state.password);


        // post request to server side 
        fetch('/login',{
            method:'post',
            body: JSON.stringify(this.state),
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
               
            if(responseJson.err_code === 0){
                 
                // after log in successfully, set username to local storage
                localStorage.setItem("username", this.state.username.trim());
                localStorage.setItem("userId", responseJson.userId);
                window.location.href="/";
            }
            else{
                alert(responseJson.message);
            }

        }).catch(function(e){
            console.log('Oops,error');
        })
     }
    }

    render(){
        return(

            <div align="center">
               

                <div className="main">
                    <div className="header">

                        <h1>Log In</h1> 
                    </div>
                    <form id="login_form">
                        <div className="form-group">
                            <label htmlFor="">Username: <span style={{color:"red"}}>* </span></label>
                            <input type="username" className="form-control" id="username" name="username" style={{width: 300,height:40}} placeholder="Please enter your username"
                              value={this.state.username} onChange={evt => this.setState({"username":evt.target.value})}autoFocus/> 
                            <span className="help-block">{this.state.emptyHelp}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Password: <span style={{color:"red"}}>* </span></label>

                            <input type="password" className="form-control" id="password" name="password" style={{width: 300,height:40}} placeholder="Please enter your password"
                            value={this.state.password} onChange={evt => this.setState({"password":evt.target.value})}/>
                            <span className="help-block">{this.state.emptyHelp}</span>
                        </div>

                        <div className="checkbox">
                            <label>
                                <input type="checkbox" id="chk" checked={this.state.isRemember} onClick={this.handleCheckbox.bind(this)} onChange={evt => this.setState({})}/> Remember me?
                            </label>
                        </div>
                        

                        <button type="button" className="btn btn-dark" style={{width: 200,height:40}} onClick={this.handleSubmit.bind(this)}>Login</button>
                       
                    </form>
                    <div className="message">
                        <p>No account? <a href="/signup">Sign up here</a>.</p>
                    </div>
                </div>
            </div>
        );
    }
}