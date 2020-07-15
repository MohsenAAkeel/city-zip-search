import React, {Component} from 'react';
import ZipItem from './ZipItem';
import ZipTable from './ZipTable';
import './Display.css';

class Display extends Component {
    constructor(props){
	super(props);
	this.state = {
	    rend: {
		   'zip':this.renderZip,
		   'city':this.renderCity
		  }
	};
    }
    

    /*
      Function for displaying Zip API search results
      @params(secondary): this.props.arr - an array of arrays containing zip data 
      @post: An array of ZipItem components is filled using the this.props.arr elements
      @returns: An array of ZipItem components
    */
    renderZip = () => {
	var items = this.props.arr.map(function(item, i) {
	    return (
		    <ZipItem loc={item[0]} long={item[1]} lat={item[2]} pop={item[3]} index={i}/>
	    );});
	return items;
    }

    
    /*
      Function for displaying City API search results
      @params(secondary): this.props.arr - an array of arrays containing city data 
      @post: An array of ZipTable components is filled using the this.props.arr elements
      @returns: An array of ZipTable components
    */
    renderCity = () => {
	return <ZipTable arr={this.props.arr} />;
    }

    
    render() {
	let items = this.state.rend[this.props.field]();
	
	return (
	    <div className="DISPLAY">
		{items}
	    </div>
	);
    };
}

export default Display;


