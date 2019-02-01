import React,{Component} from 'react';
import { Button, Input } from 'reactstrap';



export default class Shoppingcart extends Component {
     constructor(props) {
        super(props);
        this.state = {
        	"cartProducts": [],
          "stockAvailable": " ",
        	"subtotal": " ",
        	"total" : 0,
        	"checkedItems": []

        };
    // Get request to get the cart list of a specific user.     
    fetch('/cartList',{
            method:'get',
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
        if(responseJson.err_code ==1){
          // If user does not log in, redirect to Login page. 
        	window.location.href = "./Login";
        }
        this.setState({
            "cartProducts": responseJson,
        })
           console.log(responseJson)
        })

    }
    

    // Handle increase in quantity of a specific item in cart. 
    increaseQuan(index){
    	
    	var currentQuan = this.state.cartProducts[index].pro_quan + 1;
    	var currentCartProducts = this.state.cartProducts;
    	currentCartProducts[index].pro_quan = currentQuan;
    	this.setState({
    		cartProducts: currentCartProducts
    	})
    	this.handleQuanChange(index)
     
    }


    // Handle decrease in quantity of a specific item in cart. 
    decreaseQuan(index){
    	var currentCartProducts = this.state.cartProducts
    	var currentQuan = currentCartProducts[index].pro_quan - 1;
    	// Make sure quantity is not less than 1. 
      if (currentQuan < 1 ){
           alert ("The minimum quantity is 1");     
        }else{
            currentCartProducts[index].pro_quan = currentQuan;
            this.setState({
    		      cartProducts: currentCartProducts
    	     })
            this.handleQuanChange(index)
        }
    }
    
    
    // Put request to update quantity change in database. 
    handleQuanChange(index){
    	
    	var quan = {"pro_quan":this.state.cartProducts[index].pro_quan};
        fetch('/updateQuantity/'+this.state.cartProducts[index]._id,{
            method:'put',
            body: JSON.stringify(quan),
            headers: {"Content-Type":"application/json"}
        })
        .then(response=>response.json())
        .then(responseJson => {
            if(responseJson.err_code ==1){
               alert (responseJson.message);
            }
        })
    }


    //Handel item removed from cart and delete corresponding item in database. 
    handleRemove(index){
        console.log(index);
        var cart_id = this.state.cartProducts[index]._id
        if (window.confirm("Are you sure to remove this item from your cart?")) {
        fetch('/removeItem/'+cart_id,{
            method:'delete'
            
        })
        .then(response=>response.json())
        .then(responseJson => {
             window.location.href="/Shoppingcart";
            
        })
        } 
    }


    // Calculate the total price of cart products. 
    caculateTotal(){
       var total = this.state.total;
       var i;
       var subtotal;
       for(i=0; i<this.state.cartProducts.length; i++ ){
       	subtotal = this.state.cartProducts[i].pro_price * this.state.cartProducts[i].pro_quan;
       	total = total + subtotal;
       }
       return total
    }
    

   // Handle checkbox. 
    handleCheckbox(index){
      // Create an array called checkedItems to store index of checked cart products.   
   	  var cartIndex = this.state.checkedItems.indexOf(index);
   	  var originalCheckItems = this.state.checkedItems;
      // If cart index already existed in the array, take it off when checkbox is clicked. 
   	  if(cartIndex>-1){
   	  	originalCheckItems.splice(cartIndex,1);
   	  	this.setState({checkedItems:originalCheckItems});
   	  }else{
       // If cart index is not existed in the array, put it into the array when checkbox is clicked.    
   	  	originalCheckItems.unshift(index)
   	  	this.setState({checkedItems:originalCheckItems})
   	  }

    }


    
    handleCheckout(){    
    	var i;
    	var items = [];
    	var checkedProTotal = 0;
    	var userid = this.state.cartProducts[0].user_id;
    	var date = new Date();
    	var carts = [];
        // If there is index in the array of checkedItems, it means there is item checked, then get the details of the checked item. 
        for(i=0; i < this.state.checkedItems.length; i ++){

            var cartProduct = this.state.cartProducts[this.state.checkedItems[i]];
            var item ={
            	pro_id : cartProduct.pro_id,
                pro_name : cartProduct.pro_name,
        	    pro_pic : cartProduct.pro_pic,
        	    pro_quan : cartProduct.pro_quan,
        	    pro_size : cartProduct.pro_size,
        	    pro_price : cartProduct.pro_price * cartProduct.pro_quan
            };
            items[i] = item;
            carts[i] = cartProduct._id;
           
            checkedProTotal += items[i].pro_price;
        }

        // Organize the order details which is going to store in database. 
        var order={
        	user_id: userid,
        	order_date: date,
        	order_items: items,
        	order_total: checkedProTotal,
        	cart_ids : carts
        }
        // Make sure checkout items are checked. 
         if(this.state.checkedItems.length == 0){
        alert("Please select your checkout item.");
      } else {
        fetch('/order',{
            method:'post',
            body: JSON.stringify(order),
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
               
            if(responseJson.err_code === 0){               
                window.location.href="/Checkout/"+responseJson.orderId;
            }
        })
      }  
    }
    


    showCartProducts(){
    	let cartProducts = this.state.cartProducts.map((cartPro,index,array)=>{
    		
      return(
      	<div key={cartPro._id}>
          <div className="row">
          <div name="checkbox" className="col-sm-1">
            <Input type="checkbox"  onClick={this.handleCheckbox.bind(this,index)}/>{' '}
          </div>

          <div name="proImage" className="col-sm-3">
          <a href = {"/ProductDetails/"+cartPro.pro_id}>
          <img className="image" style={{height:100,width:100}} src={cartPro.pro_pic} alt="product image" />
          </a>
          </div>
       
          <div className="col">
          <div name="proDescrib" className="description" >
           <a href = {"/ProductDetails/"+cartPro.pro_id}>
           <span>{cartPro.pro_name}</span>
           </a>
           <span>{cartPro.pro_size}</span>
          </div>
          </div>
          
          <div className="col">
          <div name="proQuan" className="quantity" >
           <button className="quan-button" type="button" name="increasebutton" onClick={this.increaseQuan.bind(this,index)}>
           +
           </button>
           <input type="text" id={"quantity_"+index} name="quantity" value={cartPro.pro_quan} onChange={evt => this.setState({})}/>
           <button className="quan-button" type="button" name="decreasebutton" onClick= {this.decreaseQuan.bind(this,index)}>
           -
           </button>
          </div>
          </div>
          
          <div className="col">
          <div name="subtotalPrice" className="total-price">
           <span>$ {cartPro.pro_price*cartPro.pro_quan}</span>
          </div>
          </div>

          <div className="col">
          <div>
           <button type="button" name="removeButton" className="btn btn-dark" onClick={this.handleRemove.bind(this,index)}>
           Remove
           </button>
          </div>
          </div>
        
         
        </div>
        <hr />
        </div>
          )

    })
    return cartProducts
    }
    


render(){

        return(
        <div>
          <center name="cart">
            <h1>My Cart</h1>
          </center>
         
          <div name="productList"  className="container">
          {this.showCartProducts()}

        <div className="row">
        <p name="totalPrice" style={{marginLeft:900}}>
        Total: {this.caculateTotal()}
        </p>
        </div>

        
        <div className="row">
           <button type="button" name="checkoutButton" className="btn btn-dark" style={{marginLeft:900}} onClick={this.handleCheckout.bind(this)}>
           Checkout
           </button>
        </div>

        </div>
        </div>      

        );
 }

}