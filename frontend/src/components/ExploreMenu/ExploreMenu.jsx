import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='Exploremenu' id='Exploremenu'>
      <h1> Explore Our Menu</h1>
      <p className='explore-menu-text'>
        Discover a world of flavors, where each dish tells a story and every bite is
        an experience. From timeless classics to bold new creations, our curated
        selection is designed to satisfy every craving.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div 
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
            key={index} 
            className='explore-menu-list-item'
          >
            <img 
              className={category === item.menu_name ? "active" : ""} 
              src={item.menu_image} 
              alt={item.menu_name} 
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
    </div>
  )
}

export default ExploreMenu
