import React from 'react';
import './Search.css';



function Search() {
  return (
   <>
<div className='searchbody'>
<div className="container">
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="Search..." />
                <button className="search-button">Search</button>
            </div>
        </div>
        <div className="search-form">
            <div className="input-group">
                <label >Genre</label>
                <select >
                    <option value="ALL">ALL</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Horror">Horror</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Action">Action</option>
                </select>
            </div>
            <div className="input-group">
                <label >Page Count</label>
                <select >
                    <option value="ALL">ALL</option>
                    <option value="50">Less than 50</option>
                    <option value="100">Less than 100</option>
                    <option value="200">Less than 200</option>
                    <option value="300">Less than 300</option>
                    <option value="500">Less than 500</option>
                    
                </select>
            </div>
            <div className="input-group">
                <label >Price</label>
                <select >
                    <option value="ALL">ALL</option>
                    <option value="100">Less Than 100</option>
                    <option value="300">Less Than 300</option>
                    <option value="500">Less Than 500</option>
                    <option value="1000">Less Than 1000</option>
                    <option value="2000">Less Than 2000</option>
                </select>
            </div>
            <div className="input-group">
                <label >Rating</label>
                <select >
                    <option value="ALL">ALL</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>


        </div>
   </>
  );
}

export default Search;