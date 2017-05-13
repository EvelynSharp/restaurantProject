import React, { Component } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import NewRestForm from './components/NewRestForm';
import IndividualRest from './components/IndividualRest';


class App extends Component {
  state = {restaurants : [], pageSwitch: 'Main', restaurantId:null}

  componentDidMount(){
    fetch('api/restaurants')
      .then( res => res.json())
      .then( restaurants => this.setState({restaurants}))
  }

  updateRestList = (updatedRest) => {
    let {restaurants} = this.state;
    let newRestList = restaurants.map( r => {
      if (r._id === updatedRest._id) {
        return updatedRest;
      } else {
        return r;
      }
    }) ;
    this.setState({restaurants:newRestList});
  }

  addNewRest = () => {
    this.setState({pageSwitch:'Add'});
  }

  switchPages = (whichPage, restaurantId) => {
    this.setState({pageSwitch:whichPage});
    if (whichPage === 'Item'){
      this.setState({restaurantId:restaurantId});
    }
  }

  addNewRestToState = (restaurant) => {
    let{restaurants} = this.state;
    this.setState({restaurants: [ ...restaurants, restaurant]})
    //potential issue when calcing average rating leter
    //problem with array vs number
  }



  render() {
    let {restaurants, pageSwitch,restaurantId} = this.state;
    let finalDisplay;
    if (pageSwitch === 'Main'){
      finalDisplay = (
          <div>
            <h2  style={{marginBottom:'30px', fontWeight:'bold', color:'#8e24aa'}} >Restaurant Project</h2>
            <button style={{marginBottom:'40px'}} className="btn" type="button" onClick={this.addNewRest}>Add New Restaurant</button>
            <MainPage switchPages={this.switchPages} restaurants={restaurants} />
          </div>
        )
    } else if (pageSwitch ==='Add') {
        finalDisplay= (<NewRestForm addNewRestToState={this.addNewRestToState} restaurants={restaurants} switchPages={this.switchPages}/>)
    } else if (pageSwitch ==='Item') {
        finalDisplay = (
          <IndividualRest updateRestList={this.updateRestList} switchPages={this.switchPages} restaurants={restaurants} restaurantId={restaurantId} />
        )
    }

    return (
      <div className="App">
        <div classNAme="container">
          {finalDisplay}
        </div>
      </div>
    );
  }
}

export default App;
