import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';


export default class ProductDetails extends Component {
    constructor(props) {
        super(props);
        console.log(localStorage);
        this.state = {
        	"proId": this.props.match.params.id,
            "userId": localStorage.userId,
            "selectedQuan": 1,
            "selectedSize":'',
            "product": '',
            "stocks": [],
            "pics": []
          
        }; 
    
    // Get request with specific product id as parameter to get the corresponding product.    
    fetch('/productDetail/'+this.props.match.params.id,{
            method:'get',
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
            
             this.setState({
             	"product":responseJson[0],
             	"stocks": responseJson[0].p_stock,
             	"pics": responseJson[0].p_pic,
              "selectedSize": responseJson[0].p_stock[0].size

             })
        })
     
    }


    
    handleSubmit(){
      // Make sure user logs in before adding product to cart. 
      if (localStorage.username.trim().length === 0){
        alert("Please login before you shop.");
      }
      // Post request of the selected items
      else{
        fetch('/shoppingCart',{
            method:'post',
            body: JSON.stringify(this.state),
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
             console.log(responseJson);

            if(responseJson.err_code === 0){
               
                  window.location.href="/Shoppingcart"
               
            }
            else if(responseJson.err_code === 1){
                alert(responseJson.message);
            }else if(responseJson.err_code === 2){
                    alert(responseJson.message);
                    
                }   

        })

    }}


    // List different sizes of one product. 
    listSize(){
    	
    	var sizeList = this.state.stocks.map((stock,index,array)=>{
                 return(
                 <option key={index}>{stock.size}</option>
                      
      	         )  
     })
    	return sizeList
    }

    

render(){
       
   
       return(
       <div className="row">
       
        <div className="col">
        <img style={{height:400,width:400}} src={this.state.pics[0]} alt="product image" />
        </div>

        <div style={{width: 500}} className="float-right"> 
        <h2> {this.state.product.p_name} </h2>
        <p> {this.state.product.p_describ} </p>
        <p> AU${this.state.product.p_price} </p>

        <div>
        <FormGroup>
          <Label for="exampleSelect">Size:</Label>
          <Input type="select" name="size" id="size" style={{width: 100,height:40}} 
                 onChange={evt => this.setState({"selectedSize":evt.target.value})}>
              {this.listSize()}  
          </Input>
        </FormGroup>
        

        <FormGroup>
          <Label for="exampleSelect">Quantity:</Label>
          <Input type="select" name="quantity" id="quantity" style={{width: 100,height:40}} 
                 onChange={evt => this.setState({"selectedQuan":evt.target.value})}>
             
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        </div>

        <button type="button" className="btn btn-dark" style={{width: 200,height:40}} onClick={this.handleSubmit.bind(this)}>Add to Shopping Cart</button>
        </div>

      </div>
        );
 }

}