import React,{useState} from 'react';

const Categories = ({filterItems,categories}) => {
  return (
    <div className="btn-container">
      {categories.map((category,index)=>{
        return (
          <button className="filter-btn" key={index} onClick={()=>filterItems(category)}>
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
