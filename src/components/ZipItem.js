import React, {Component} from 'react';
import './ZipItem.css';

class ZipItem extends Component {

    render() {
	return (
	<table id="item">
	<tbody>
	   <tr>
	    <th scope="row">Location</th>
	    <td>{this.props.loc}</td>
           </tr>
           <tr>
	    <th scope="row">Longitude</th>
	    <td>{this.props.long}</td>
	   </tr>
           <tr>
	    <th scope="row">Latitude</th>
            <td>{this.props.lat}</td>
	   </tr>
           <tr>
	    <th scope="row">Population</th>
	    <td>{this.props.pop}</td>
	   </tr>
	</tbody>
	</table>
         );	    
    }
}

export default ZipItem;
