import React from 'react';
import './Search.css';
import { CiSearch } from "react-icons/ci";

const Search = ({OffSearch}) => {
  return (
<>

<div className="inputBox_container">
<CiSearch className='search_icon' onClick={OffSearch}/>
  <input className="inputBox" id="inputBox" type="text" placeholder="Search For Products"/>
</div>
    </>
  );
};

export default Search;
