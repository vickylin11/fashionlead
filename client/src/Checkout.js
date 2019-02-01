import React,{Component} from 'react';
import { Table } from 'reactstrap';


export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state={
        	"order": {},
          "order_items" : []
        };

   }
        
     componentWillMount() {
        fetch('/orderList/'+this.props.match.params.id,{
            method:'get',
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
             console.log(responseJson);
             this.setState({
              "order":responseJson[0],
              "order_items" : responseJson[0]['order_items']  
             })
        })
     }   
        

        showOrderedProducts(){
         
         let orderedProducts= this.state.order_items.map((orderedPro,index,arr)=>{
             
             return(
                      <tr>
                        <td><img style={{height:80,width:80}} src={orderedPro.pro_pic} alt= "product img" /></td>
                        <td>{orderedPro.pro_name}</td>
                        <td>Size: {orderedPro.pro_size}</td>
                        <td>Quan: {orderedPro.pro_quan} </td>
                        <td>Sub: ${orderedPro.pro_price} </td>
                      </tr>    
             
              );
          
         })
          return orderedProducts
      }

     render(){
        return(
        <div>
        <center>
            <h1>Thank you for your order!</h1>
        </center>
        <p> Order date: {this.state.order.order_date} </p>
        <Table bordered>
          <tbody>
        {this.showOrderedProducts()}
          </tbody>
        </Table>
        <h5 style={{textAlign: 'right'}}> Order Total: ${this.state.order.order_total} </h5> 
        </div>
        );

      
 }

}