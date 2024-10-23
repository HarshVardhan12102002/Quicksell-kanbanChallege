import React, { useState } from 'react';
import Dropdown from './Dropdown';
import display from '../assets/Display.svg';
import down from '../assets/down.svg';
import up from '../assets/up.svg';

const DisplayDropdown = ({ groupBy, setGroupBy, orderBy, setOrderBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="display-dropdown">
      <div className="display-heading" onClick={toggleDropdown}>
        <img src={display} alt="Display Icon" className="display-icon" style={{ marginRight: '5px' }} />
        <span>Display</span>
        <img src={isOpen ? up : down} alt={isOpen ? 'up' : 'down'} style={{ width: '20px', height: '20px', marginBottom: '-4px', marginLeft: '-5px' }} />
      </div>
      {isOpen && (
       <div className="dropdown-content">
       <div className="dropdown-item">
         <label>Group By</label>
         <Dropdown 
           options={[
             { value: 'priority', label: 'Priority' },
             { value: 'status', label: 'Status' },
             { value: 'user', label: 'User' }
           ]} 
           selectedOption={groupBy}
           onChange={setGroupBy} 
         />
       </div>
       <div className="dropdown-item">
         <label>Order By</label>
         <Dropdown 
           options={[
             { value: 'priority', label: 'Priority' },
             { value: 'title', label: 'Title' }
           ]} 
           selectedOption={orderBy}
           onChange={setOrderBy} 
         />
       </div>
     </div>
      )}
      <style jsx>{`
  .display-dropdown {
    position: relative;
    cursor: pointer;
    border: 1px solid #e0e2e5;
    border-radius: 10px;
    padding: 10px;
    border-radius: 4px; 
  }

  .display-heading {
    display: flex; /* Use flexbox */
    align-items: center; /* Vertically center elements */
    cursor: pointer; /* Change cursor to pointer on hover */
  }

  .display-icon {
    /* You can also add styles specific to the display icon here if needed */
  }

  span {
    margin-right: 5px; /* Optional spacing between the text and the arrow */
  }

  .dropdown-content {
    position: absolute; 
    top: 100%; 
    left: 0; 
    z-index: 10; 
    border: 1px solid #ccc; 
    border-radius: 10px;
    padding: 10px;
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex; 
    flex-direction: column; 
    width: 200px; /* Set a fixed width for the dropdown */
    /* or use min-width: 200px; to make it at least this wide */
  }

  .dropdown-item {
    display: flex; /* This makes the label and dropdown in a row */
    align-items: center; /* Vertically centers the items */
    margin-bottom: 5px; /* Space between each dropdown item */
  }

  .dropdown-item label {
    margin-right: 10px; /* Space between the label and the dropdown */
  }
`}</style>
    </div>
  );
};

export default DisplayDropdown;