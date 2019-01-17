import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Nav, 
  NavItem, 
  NavLink,
  Navbar,
  NavbarToggler } from 'reactstrap';


import Login from './Login';
import Signup from './Signup';
import Shoppingcart from './Shoppingcart';
import Home from './Home';
import Designers from './Designers';
import Bags from './Bags';
import Shoes from './Shoes';
import ProductDetails from './ProductDetails';
import ProductsByDesigner from './ProductsByDesigner';
import Checkout from './Checkout';


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state={
          "isLoggedin": false,
          "username": ""
        }
        console.log(localStorage);
        console.log(this.state);
        //Check whether user logs in
        fetch('checkLogin',{
          method: 'get',
          headers: {"Content-Type":"application/json"}
        })
        .then(response=>response.json())
        .then(responseJson=>{
          console.log(responseJson)

          if (responseJson.err_code == 0){
            this.setState({
                // if user has loggin in, set username to State
                "isLoggedin": true,
                "username": "Welcome,"+localStorage.username
              }) 
              console.log(this.state);
            }else{
            this.setState({
                //if user has not logged in, set username to empty
                "isLoggedin": false,
                "username": ""
              }) 
              console.log(this.state);
            }
            console.log(this.state)
        })

     }


   // Only user who logs in can view his shoppingcart.
   handleShoppingCart(){
    if (localStorage.username.trim().length === 0){
        alert("Please login to browse your shopping cart.");
      }else{
        window.location.href="/Shoppingcart";
      }
   }
    

    // Clear user session and localstorage whe user logs out. 
    handleLogOut(){
      fetch('clearSession',{
            method:'delete',
            headers: {"Content-Type":"application/json"}
        })
        .then(response=>response.json())
        .then(responseJson => {
            if(responseJson.err_code == 0){
                 localStorage.username = "";
                 localStorage.userId = "";
                 window.location.href="/";
            }
        })
      
    }



   // Handle changes of Login and Logout button according to user status. 
    switchButton(){
      if (this.state.isLoggedin){
          return(
            <div>
            <button className="btn btn-dark" style={{color: 'white', height:40}} onClick = {() => this.handleLogOut()}>Logout </button>
            </div>
            )
        }else{
          return(
            <NavLink className="btn btn-dark" style={{color: 'white',height:40}} href='/login' >Login</NavLink>
            )
        }         
    }


    
    render(){
      return(

<div>  
<div className="WebName"> <b>Fashion Lead </b></div>
<div>

<Navbar color="light" light expand="md">
<Nav className="ml-auto" navbar>
              <p className="text-dark"> {this.state.username} </p>
              <NavItem>
                <button className="btn btn-dark" style={{color: 'white', height:40, marginRight:10}} onClick = {() => this.handleShoppingCart()}>ShoppingCart </button>
              </NavItem>
              <NavItem>
              {this.switchButton()}
              </NavItem>
             
              <NavItem>
                <NavLink className="btn btn-dark" style={{color: 'white',height:40, marginLeft:3}} href="/Signup">Signup</NavLink>
              </NavItem>
</Nav>              
</Navbar>
</div>
 
 <div>
          <Nav tabs>
          <NavItem>
            <NavLink className="text-dark" href="/" active>Home</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink className="text-dark" href="/Designers">Designers</NavLink>
          </NavItem>
           <NavItem>
            <NavLink className="text-dark" href="/Shoes">Shoes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-dark" href="/Bags">Bages</NavLink>
          </NavItem>          

          </Nav>
  </div>
 

  {/* Set routes and their corresponding components. */}
  <Router>  
      <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/Designers" component={Designers} />
      <Route exact path="/Bags" component={Bags} />
      <Route exact path="/Shoes" component={Shoes} />
      <Route path="/Login" component={Login} />
      <Route path="/Signup" component={Signup} />
      <Route path="/Shoppingcart" component={Shoppingcart} />
      <Route path="/ProductDetails/:id" component={ProductDetails}/>
      <Route path="/ProductsByDesigner/:id" component={ProductsByDesigner}/>
      <Route path="/Checkout/:id" component={Checkout}/>
      </div>

  </Router>
  </div>
)


    }

    }


