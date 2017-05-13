import React from 'react';

const RestaurantItem = ({restaurant, switchPages}) => (

    <div style={{cursor:'pointer', margin:'10px', fontSize:'20px'}} onClick={ () => {switchPages('Item',restaurant._id) }}>
      {restaurant.restName}
    </div>

)

export default RestaurantItem;
