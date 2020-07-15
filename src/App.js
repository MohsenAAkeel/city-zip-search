import React, {Component} from 'react';
import './App.css';
import {Input, Display} from './components';
const axios = require('axios');

class App extends Component {
    constructor(props){
	super(props);
	this.state = {
	    fxnRoute: {city: this.updateCity, zip: this.updateZip},
	    results: {zip:[], city:[]},
	    base_link_zip: 'http://ctp-zip-api.herokuapp.com/zip/',
	    base_link_city: 'http://ctp-zip-api.herokuapp.com/city/'
	};
    }
    

    /*
    Step 1 of update pathway - entry point for city input
      @params: val - city name
      @returns: none
      @post: a link to an API call using the city name is generated and passed
             to the updateData method
    */
    updateCity = async (val) => {
	if (val.length < 1) {
	    console.log("No input, City name");
	    return;
	}
	
	const link = this.state.base_link_city.concat(val.toUpperCase());
	await this.updateData(link, 'city');
    }

    
    /*
     Step 1 of update pathway - entry point for zip input
      @params: val - zip code
      @returns: none
      @post: a link to an API call using the zip code is generated and passed
             to the updateData method
    */
    updateZip = async (val) => {
	if (val.length < 5 || isNaN(val)) {
	    console.log("Please enter a valid zip code");
	    return;
	}

	const link = this.state.base_link_zip.concat(val);
	await this.updateData(link, 'zip');
    }

    /*
      Step 2 of update pathway - collect zip or city data
      @params: link - the full web address for the API request
               field - the field of data being retrieved 
      @post: the data from 'link' is collected, extracted and 
             passed to fillData()
    */
    updateData = async (link, field) => {
	//make the API call and process the results
	await axios.get(link)
	 .then( response => {
	     //Collect the data from the API call
	     return this.collectData(response);
	  })
	 .then( data => {
	     //data contains an array, each element a result
	     //in the query
	     //If there are no results, log and return
	     if(data.length < 1) {
	 	 console.log("No results");
	 	 return;
	     }
         
	     //can now fill the result array
	     this.fillData(data, field);
	 })
	 .catch(error => {
	     //this.handleSearchError(error);
	     console.log("Unable to load data");
	 });	
    }    
    
    
    /*
      Step 3 of update pathway - fill state with API results
      @params: data - the data of interest from the API call
               field - the field of data being retrieved 
      @post: the data from 'link' is parsed and loaded into
             an array that is then passed to 
             updateResultsState()
    */
    fillData = (data, field) => {
	let items = [];
	
	//Cycle through each item and pull data and store
	// it in the :results: value
	for (let i=0; i < data.length; i++) {
	    let item = [data[i].LocationText,
	                data[i].Long,
			data[i].Lat,
			data[i].EstimatedPopulation];
	    items.push(item);
	}

	//update :results: with the new data
	this.updateResultsState(items, field);
    }


    /*
      Step 4 of update pathway - setState
      @params: data - the full web address for the API request
               field - the field of data being retrieved 
      @post: the data array containing the API data is stored
             in the state container.
    */
    updateResultsState = async (data, field) => {
	await this.setState(prevState => {
	    let results = Object.assign({}, prevState.results);
	    results[field] = data;
	    return {results};
	});
	return;
    }

    //method for pulling the data value from
    //the axios payload
    collectData = async (response) => {
	let data = response.data;
	return data;
    }


    //Reset state.results when update cycle is complete
    resetResult = ()=> {
	Object.keys(this.state.results).forEach(function(key){ this.state.results[key] = []; });
    }

    componentDidUpdate(prevProps, prevState){
	if (prevState.results === this.state.results){
	    console.log("no change to fields");
	    return;
	}
	console.log('update');
	console.log("zip res: ", this.state.results['zip']);
	console.log("city res: ", this.state.results['city']);
	
    }

    render(){
	return (
	       <div className="App">
		<header className="App-header">
		</header>

		<div className="split left">
		 <div className="center">
		  <div className="inputfield zipIn">
	           <Input onSubmit={this.updateZip} fieldName='Zip'/>
   		  </div>
		  <div className="display">
		   <Display arr={this.state.results['zip']} field='zip'/>
		  </div>
		 </div>
		</div>

	    
	        <div className="split right">
		 <div className="center">
		  <div className="inputfield cityIn">
	           <Input onSubmit={this.updateCity} fieldName='City'/>
   		  </div>
		  <div className="display">
		   <Display arr={this.state.results['city']} field='city'/>
		  </div>
		 </div>
		</div>

	       </div>
	);
    }
}

export default App;
