import React, {Component} from 'react';

class Input extends Component{
    constructor(props) {
	super(props);
	this.state = {
	    val: ''
	};
    }

    onChange = (e) => {
	this.setState({val:e.target.value});
	//e.preventDefault();
    }
    
    handleClick = (e) => {
	this.props.onSubmit(this.state.val);
	e.preventDefault();
    }
    
    render(){
        return (
            <form onSubmit={this.handleClick}>
		<label>{this.props.fieldName} Code: 
		<input id="inputbox"
	               type="text"
	               onChange={this.onChange}
	      />
	     </label>
	     <input type="submit" value="Search" />
	    </form>
	    
	);
    }
}


export default Input;
