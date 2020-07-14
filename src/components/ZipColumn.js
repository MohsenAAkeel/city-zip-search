import React, {Component} from 'react';

class ZipColumn extends Component {
    columnGen = () => {
	let columns = [];
	for(let i=0; i < this.props.count; i++) {
	    columns.push(<th>{i}</th>);
	}
	return columns;
    }
    
    render() {
	return (<>{this.columnGen()}</>);
    }
}
export default ZipColumn;
