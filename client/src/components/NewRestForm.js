import React from 'react';

class NewRestForm extends React.Component {
  state = {
    restName: '',
    cuisine: '',
    rating: '',
  }

  onChange = (e) =>{
    let { target: {value, id}} = e;
    this.setState( {[id] : value});
  }

  newRestSubmit = (e) => {
    e.preventDefault();
    let {restName, cuisine, rating} = this.state;
    let ratings = [parseFloat(rating)];
    let addNewRestToState = this.props.addNewRestToState;
    fetch('/api/restaurants', {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify ({
        restName,
        cuisine,
        ratings
      })
    }).then( res => res.json())
      .then( restaurant => addNewRestToState(restaurant))
      .then( () => { this.setState({
        restName: '',
        cuisine: '',
        rating: ''
      }) })

  }

  render() {
    let switchPages = this.props.switchPages;
    let {restName, cuisine, rating} = this.state;
    return(
      <div className="container">
        <form  onSubmit ={this.newRestSubmit}>
          <label htmlFor="restName" >Restaurant Name</label>
          <input className="center" onChange={this.onChange} value={restName} name="restName" id="restName" required />

          <label htmlFor="cuisine" >Cuisine Type</label>
          <input className="center" onChange={this.onChange} value={cuisine}  name="cuisine" id="cuisine" required />

          <label htmlFor="rating" >Rating</label>
          <input className="center" type="number" min="1" step=".5" max="5" onChange={this.onChange}  value={rating}  name="rating" id="rating" required />

          <button style={{margin:'10px'}} className="btn">Add</button>
        </form>
        <button style={{margin:'10px'}} className="btn blue lighten-3"  type="button" onClick={() => switchPages('Main')}>Back</button>
      </div>
    )
  }


}

export default NewRestForm;
