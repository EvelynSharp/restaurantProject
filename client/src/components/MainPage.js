import React from 'react';
import RestaurantItem from './RestaurantItem';

class MainPage extends React.Component {
  state ={cuisine:'', filter: false, filteredRest: []};
  // other search
  // do lowercase function on the search

  enterSearch = (e) => {
    let {value, id} = e.target;
    this.setState( {[id] : value});
    if (value === '')
      this.setState({filter:false});
  }

  searchRest = (e) => {
    e.preventDefault();
    let {cuisine} = this.state;
    let restaurants = this.props.restaurants;
    let filteredRest = restaurants.filter( r =>  r.cuisine === cuisine);
    this.setState({filter: true, filteredRest});
    if (cuisine === '')
      this.setState({filter:false});

    }

  render() {
    let {restaurants, switchPages} = this.props;
    let {filteredRest, filter} = this.state;
    return(
      <div className="container">

        <form onSubmit={this.searchRest}>
          <label htmlFor="searchBar" style={{fontSize:'16px'}}>Search By Cuisine</label>
          <input className="center" style={{fontSize:'16px'}} value={this.state.cuisine} onChange={this.enterSearch} name="cuisine" id="cuisine"/>
          <button className="btn " style={{marginBottom:'20px'}}>Search</button>
        </form>
        <h5 style={{color:'#ab47bc', fontWeight:'bold'}}> Restaurant Names</h5>
        <div>
          {filter ?
            <div>
              {filteredRest.map( r => (<RestaurantItem key={r._id} restaurant={r} switchPages={switchPages} />))}
            </div>
          :
            <div>
              {restaurants.map( r => (<RestaurantItem key={r._id} restaurant={r}  switchPages={switchPages} />)) }
            </div>

          }
        </div>
      </div>
    )
  }
}

export default MainPage;
