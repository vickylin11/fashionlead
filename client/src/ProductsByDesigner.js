import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class ProductsByDesigner extends Component {
    constructor(props){
       super(props);
       this.state = {
            "designerDetails":'',
            "products":[]
        }
    
    // Get designer details 
    fetch('/designer/'+this.props.match.params.id,{
            method:'get',
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
             console.log(responseJson);
             this.setState({
             	"designerDetails":responseJson[0]
             })
        })
    
    // Get Products under a specific designer        
    fetch('/designerPro/'+this.props.match.params.id,{
            method:'get',
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
             console.log(responseJson);
             this.setState({
             	"products":responseJson
             })
        })

    }


    // List all products under a requested designer.
    listProductsByDesigner(){
    	let list = this.state.products.map((pro,index,array)=>{
      return(
    
         
    <div className="float-left" style={{border:2}} key={index}>
      <Card style={{height:350,width:300}}>
      <a href={"/ProductDetails/"+pro._id}>
        <CardImg style={{height:200,width:200}} src={pro.p_pic[0]} alt="product image" />
      </a>
        <CardBody>
      <a href={"/ProductDetails/"+pro._id}>
          <CardTitle>{pro.p_name}</CardTitle>
     </a>
          <CardSubtitle>AU${pro.p_price}</CardSubtitle>
          <CardText>{pro.p_describ}</CardText>
          
        </CardBody>
      </Card>
    </div>
      
          );

    })
    return list
    }
    
    


    render(){

    	return(
      <div>

      <div>
    	 <center className="text-white bg-dark" style={{fontSize:30}}> {this.state.designerDetails.d_name} </center>
      </div>

      <div className="row" >
         <div className="col-sm-6">
         <p className="font-italic float-left" style={{width: 500, height: 350, fontWeight:'bold'}}> {this.state.designerDetails.d_desc} </p>
         </div>
         <div className="col-sm-6">
         <img className="float-sm-right" style={{width: 700, height: 350}} src={this.state.designerDetails.d_pic} alt="designerpic"/>
        </div>
      </div> 

      <div>
         {this.listProductsByDesigner()}
      </div>

      </div>
    		);
    }


}