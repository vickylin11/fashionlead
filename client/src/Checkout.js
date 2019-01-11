import React,{Component} from 'react';
import { Table } from 'reactstrap';


export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state={
        	"order": {}
        };

        fetch('/orderList/'+this.props.match.params.id,{
            method:'get',
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
             console.log(responseJson);
             this.setState({
             	"order":responseJson    
             })
        })
     }

        showOrder(){

      //   <Table bordered>
        
      //   <tbody>
      //     <tr>
      //       <th scope="row">1</th>
      //       <td>pro_pic</td>
      //       <td>pro_name</td>
      //       <td>pro_size</td>
      //       <td> pro_quan </td>
      //       <td> pro_price </td>
      //     </tr>
          
      //   </tbody>
      // </Table>
      }

     render(){
        return(
        <div>
        <center>
            <h1>Thank you for your order!</h1>
        </center>
        {this.showOrder()}
        </div>
        );

      
 }

}