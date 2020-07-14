import React, {Component} from 'react';

class ZipRow extends Component {
    
    rowGen = ()=> {
	let rows = [];
	
	for(let i=0; i<this.props.arr.length; i++) {
	    rows.push(<td>{this.props.arr[i]}</td>);
	}
	return rows;
    }

    render(){
	return (
	    <>
		{this.rowGen()}
	    </>
	);
    }
}

export default ZipRow;
