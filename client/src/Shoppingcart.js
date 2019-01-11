import React,{Component} from 'react';
import { Button, Input } from 'reactstrap';



export default class Shoppingcart extends Component {
     constructor(props) {
        super(props);
        this.state = {
        	"cartProducts": [],
        	"subtotal": " ",
        	"total" : 0,
        	"checkedItems": []

        };
    fetch('/cartList',{
            method:'get',
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
        if(responseJson.err_code ==1){
        	window.location.href = "./Login";
        }
        this.setState({
            "cartProducts": responseJson,
        })
           console.log(responseJson)
        })

    }
    

    
    

    increaseQuan(index){
    	
    	var currentQuan = this.state.cartProducts[index].pro_quan + 1;
    	var currentCartProducts = this.state.cartProducts;
    	currentCartProducts[index].pro_quan = currentQuan;
    	console.log(currentQuan);
    	this.setState({
    		cartProducts: currentCartProducts
    	})
    	console.log(this.state.quan)
    	this.handleQuanChange(index)
    }

    decreaseQuan(index){
    	var currentCartProducts = this.state.cartProducts
    	var currentQuan = currentCartProducts[index].pro_quan - 1;
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
   
    handleQuanChange(index){
    	console.log(this.state)
    	var quan = {"pro_quan":this.state.cartProducts[index].pro_quan};
        fetch('/updateQuantity/'+this.state.cartProducts[index]._id,{
            method:'put',
            body: JSON.stringify(quan),
            headers: {"Content-Type":"application/json"}
        })
        .then(response=>response.json())
        .then(responseJson => {
            //window.location.href="/Shoppingcart";
        })
    }

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
    

   handleCheckbox(index){
   	  
   	  var cartIndex = this.state.checkedItems.indexOf(index);
   	  var originalCheckItems = this.state.checkedItems;

   	  if(cartIndex>-1){
   	  	originalCheckItems.splice(cartIndex,1);
   	  	this.setState({checkedItems:originalCheckItems});
   	  }else{
   	  	originalCheckItems.unshift(index)
   	  	this.setState({checkedItems:originalCheckItems})
   	  }
      console.log(this.state.checkedItems);
   }

    handleCheckout(){
    	var i;
    	var items = [];
    	var checkedProTotal = 0;
    	var userid = this.state.cartProducts[0].user_id;
    	var date = new Date();
    	var carts = [];
    	console.log(this.state.checkedItems)
    	console.log(this.state.cartProducts)
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
            console.log(items)
            console.log(cartProduct)
            checkedProTotal += items[i].pro_price;
        }
        var order={
        	user_id: userid,
        	order_date: date,
        	order_items: items,
        	order_total: checkedProTotal,
        	cart_ids : carts
        }
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