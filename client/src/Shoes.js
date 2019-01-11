import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default class Shoes extends Component {
    constructor(props) {
        super(props);
        console.log(localStorage);

        this.toggle = this.toggle.bind(this);
        this.state = {
            "allshoes": [],
            "search": '',
            "dropdownOpen": false,
            "indication": ''
        }; 
        
   
        

        fetch('/api/shoes',{
            method:'get',
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
        console.log(responseJson);
        this.setState({
            "allshoes": responseJson,
        })

        })
    }

    toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

    sortByPriceAsc() {
    this.setState(prevState => {
      this.state.allshoes.sort((a, b) => (a.p_price - b.p_price));
      this.state.indication = "⬇️"
  });
    
  }

    sortByPriceDesc() {
    this.setState(prevState => {
      this.state.allshoes.sort((a, b) => (b.p_price - a.p_price));
      this.state.indication = "⬆️"
  });
  }

    filterList(){
    
    let updatedList = this.state.allshoes.filter((shoes)=>{
      return shoes.p_name.toLowerCase().indexOf(this.state.search.toLowerCase())!== -1 
      || shoes.p_describ.toLowerCase().indexOf(this.state.search.toLowerCase())!== -1
    })
    let shoeslist = updatedList.map((shoes,index,array)=>{
      return(
    
         
    <div style={{float :'left',border:2}} key={index}>
      <Card style={{height:350,width:300}}>
      <a href={"/ProductDetails/"+shoes._id}>
        <CardImg style={{height:200,width:200}} src={shoes.p_pic[0]} alt="product image" />
      </a>
        <CardBody>
      <a href={"/ProductDetails/"+shoes._id}>
          <CardTitle>{shoes.p_name}</CardTitle>
     </a>
          <CardSubtitle>AU${shoes.p_price}</CardSubtitle>
          <CardText>{shoes.p_describ}</CardText>
          
        </CardBody>
      </Card>
    </div>
      
          );

    })
    return shoeslist
  }

render(){
  
    return(
    	<div>
    
    <input placeholder="Search" style={{height:45,width:300, float: 'right'}} onChange={evt => this.setState({"search":evt.target.value})} value={this.state.search} type="text"/>

    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{float: 'left'}}>
        <DropdownToggle caret>
          Sort by {this.state.indication}
        </DropdownToggle>
        <DropdownMenu>
          
          <DropdownItem onClick={this.sortByPriceDesc.bind(this)}>Price high to low</DropdownItem>
          <DropdownItem onClick={this.sortByPriceAsc.bind(this)}>Price low to high</DropdownItem>
          
        </DropdownMenu>
      </Dropdown>

     <br />
     <br />  
        {this.filterList()}
        </div>
    	)
	

 }

}