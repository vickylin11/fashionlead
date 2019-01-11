import React,{Component} from 'react';

export default class likeButton extends Component {
    constructor(props) {
        super(props);

     this.state = {
     	"likes": 0
     }
     

     increaseLikes() {
     	this.setState({
     		likes: ++ this.state.likes
     	});
     }

     render(){
       return(
       	<div>
       	<button type="button" onClick={this.increaseLikes.bind(this)}>
          👍 {this.state.likes}      	
         </button>
       	</div>

       	)

     }

}