import React,{Component} from 'react';


export default class Designers extends Component {
    constructor(props){
       super(props);
       this.state = {
            "alldesigners": []
        }

    // Get designer from database 
    fetch('/alldesigners',{
            method:'get',
            headers: {"Content-Type":"application/json"},
        })
        .then(response=>response.json())
        .then(responseJson => {
        console.log(responseJson);
        this.setState({
            "alldesigners": responseJson,
        })

        })

    }
    
    listDesigners(){
      // List designers in alphabetical order
    	let sortDesigners = this.state.alldesigners.sort(function(a,b){

          var desA = a.d_name.toUpperCase();
          var desB = b.d_name.toUpperCase();
      
           if (desA < desB) {return -1;}
          
    	})
     
    	let designerList = sortDesigners.map((designer,index,array)=>{
      return(
      	<a className="text-dark" href={"/ProductsByDesigner/"+designer._id}>
      	<center key={index}> {designer.d_name}</center>
      	</a>
      	);	
    }) 
        return designerList

     }
   

render(){


        return(

        <div> 
        <center className="text-white bg-dark" style={{fontSize:30}}> All Designers </center>
         {this.listDesigners()}
        </div>

        );
 }

}