import React, {Component} from 'react';
import ZipColumn from './ZipColumn';
import ZipRow from './ZipRow';

class ZipTable extends Component {

    genTable = ()=> {
	let hold = [];
	let length = this.props.arr.length;
	let numCols = Math.ceil(length / 40);
	let count = 0;
	let items = [];
	
	if(length === 0){
	    console.log("empty array");
	    return [];
	}
	
	//collect the columns first
	items.push(this.getCols(numCols));

	for (;count < length; count++) {
	    if((count!==0 && count%40 === 0) || count === length-1) {
		    items.push(this.getRow(hold));
		    hold = [];
	    }

	    hold.push(this.props.arr[count]);
	}
	
	return items;
    }

    getCols = (val)=> {
	return (
	    <tr>
	     <ZipColumn count={val}/>
	    </tr>
	);
    }

    getRow = (arr) => {
	console.log("ARRAY: ", arr);
	return (
	    <tr>
		<ZipRow arr={arr} />
	    </tr>
	);
    }

    render(){
	return(
	    <table>
	    <tbody>
		{this.genTable()}
	    </tbody>
	    </table>
	);
    }
}

export default ZipTable;
