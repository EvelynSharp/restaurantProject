import React from 'react';

class IndividualRest extends React.Component {
  state = {
      restName:'',
      cuisine:'',
      aveRating:null,
      ratings:[]
    }

  componentDidMount() {
      let restaurants = this.props.restaurants;
      let restaurantId = this.props.restaurantId;
      let restaurant = restaurants.filter(r => r._id === restaurantId);
      let {restName, cuisine, ratings} = restaurant[0];
      let aveRating = (ratings.reduce( (total, rating) => {return total + rating}, 0) / ratings.length).toFixed(2);
      this.setState({restName,cuisine,aveRating,ratings});
    }


  submitUpdates = (e) => {
    e.preventDefault();
    let {restName,cuisine,ratings} = this.state;
    let updateRestList = this.props.updateRestList;
    fetch(`api/restaurants/${this.props.restaurantId}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({
        restName,
        cuisine,
        ratings
      })
    }).then( res => res.json())
      .then( updatedRest => updateRestList(updatedRest) )
      .then( this.refs.rating.value = null)
  }

  updateRest = (e) => {
    let { target: {value, id}} = e;
    this.setState( {[id] : value});

  }

  changeArray = (e) =>{
    e.preventDefault();
    let newRating = this.refs.rating.value;
    let {ratings} = this.state;
    let updatedRatings = [...ratings,parseFloat(newRating)];
    this.setState({ratings:updatedRatings});
    let newAveRating = (updatedRatings.reduce( (total, rating) => {return total + rating}, 0) / ratings.length).toFixed(2);
    this.setState({aveRating:newAveRating});
  }

  render() {
    let {restName, cuisine, aveRating} = this.state;
    let switchPages = this.props.switchPages;

    return(
      <div className="container">
        <form onSubmit={this.submitUpdates}>
          <input className="center" value={restName} id="restName" onChange={this.updateRest} />
          <input className="center" value={cuisine} id="cuisine" onChange={this.updateRest} />
          <input className="center" type="number" value={aveRating} id="aveRating" />

          <label htmlFor="rating">Rate This Restaurant</label>
          <input className="center" ref="rating" min="1" step=".5" max="5" type="number" id="rating" />
          <button  style={{margin:'10px'}} className="btn" type="button" onClick={this.changeArray}>Submit Rating</button>

          <button style={{margin:'10px'}} className="btn">Update</button>
          <button  style={{margin:'10px'}} className="btn pink lighten-3" type="button" >Delete</button>

        </form>


        <button style={{margin:'10px'}} className="btn blue lighten-3"  type="button" onClick={() => switchPages('Main')}>Back</button>

      </div>
    )
  }


}

export default IndividualRest;
