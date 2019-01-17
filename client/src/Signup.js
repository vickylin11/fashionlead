import React,{Component} from 'react';
import Header from "./Header";

export default class Signup extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            "username": "",
            "email": "",
            "password":"",
            "address":"",
            "unameHelp":"",
            "emailHelp":"",
            "pwHelp":""
        };
    }
 

    // Use AJAX to check whether username is unique or not.    
    checkUsername() {
    var username = this.state.username;
    // Examine empty string. 
    if (username.trim().length == 0){
        this.setState(
                {unameHelp:'Username cannot be empty'}
            );
        return;
    }
    fetch('/checkUname/'+username,{
            method:'get',
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(data => {
            // If username is used, show the message in unameHelp state. 
            if(data.err_code == 1){
            this.setState({unameHelp:data.message})
        }else{
            // If usernmae is verified, set unameHelp to empty. 
            this.setState({unameHelp:''})
        }
        }); 

    }


    //Verify emial address. 
    checkEmail(){
    var email = this.state.email;
    var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (email.trim().length == 0){
        this.setState({
            emailHelp: '* must not be empty'
        })
    }else if (!emailReg.test(email)) {
            this.setState({emailHelp: 'Please enter a valid email address.'})
            return false;
        }else{
        this.setState({
            emailHelp:''
        })
    }
    }


    // Verify password.
    checkPw(){
    var pw = this.state.password;
    if (pw.trim().length == 0){
        this.setState({
            pwHelp: '* must not be empty'
        })
    }else{
        this.setState({
            pwHelp:''
        })
    }
    }
            
             

    handleSubmit(){   
        // post request to server side     
        fetch('/signup',{
            method:'post',
            body: JSON.stringify(this.state),
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
            
            if(responseJson.err_code === 0){
                // store username to local storage 
                localStorage.setItem("username", this.state.username.trim());
                window.location.href="/";
            }
            else if (responseJson.err_code === 1){
                alert(responseJson.message);
            }

        }).catch(function(e){
            console.log('Oops,error');
        })

    
    }



     render(){
        return(
            <div align="center">
                

                <div className="main">
                    <div className="header">

                        <h1>Sign Up</h1>
                    </div>
                    <form id="signup_form">
                        <div className="form-group">
                            <label htmlFor="email">Email: <span style={{color:"red"}}>* </span> </label>

                            <input type="email" className="form-control" id="email" name="email" style={{width: 300,height:40}} placeholder="Please enter an email"
                                   onChange={evt => this.setState({"email":evt.target.value})} onBlur={this.checkEmail.bind(this)}/>
                            <span className="help-block">{this.state.emailHelp}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username: <span style={{color:"red"}}>* </span> </label>
                            <input type="text" className="form-control" id="username" name="username" style={{width: 300,height:40}}
                                   placeholder="Please enter a username" onChange={evt => this.setState({"username":evt.target.value})} onBlur={this.checkUsername.bind(this)}/>
                            <span className="help-block">{this.state.unameHelp}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password: <span style={{color:"red"}}>* </span> </label>
                            <input type="password" className="form-control" id="password" name="password" style={{width: 300,height:40}}
                                   placeholder="Please enter a password" onChange={evt => this.setState({"password":evt.target.value})} onBlur={this.checkPw.bind(this)}/>
                            <span className="help-block">{this.state.pwHelp}</span>           
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address:  </label>
                            <input type="text" className="form-control" id="address" name="address" style={{width: 300,height:40}}
                                   placeholder="Please enter your address" onChange={evt => this.setState({"address":evt.target.value})}/>        
                        </div>

                        <button type="button" className="btn btn-dark" style={{width: 200,height:40}} onClick={this.handleSubmit.bind(this)}>Sign up</button>
                        </form>

                        <div className="message">
                        <p>Already Sign Up? <a href="/Login">Sign In here</a>.</p>
                        </div>
                </div>
            </div>
        );
    }
}

