import React from 'react';
import Avatar from 'react-avatar'; // Corrected import
import Urgent from '../assets/Urgent_Priority_Colour.svg';
import High from '../assets/highpriority.svg';
import Medium from '../assets/mediumpriority.svg';
import Low from '../assets/lowpriority.svg';
import None from '../assets/No-priority.svg';

const Card = ({ id, title, tag, userId, status, priority }) => {
  // Map priority levels to their respective SVG icons
  const priorityIcons = {
    4: Urgent,
    3: High,
    2: Medium,
    1: Low,
    0: None,
  };


  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{id}</span>
        <Avatar 
          name={`User ${userId}`} // Dynamic name based on userId
          size={40} // Avatar size
          round={true} // Round shape
          style={{ marginLeft: '8px' }} // Add some margin
        />
      </div>
      <div className="card-title">{title}</div>
      <div className="card-footer">
        <img 
            src={priorityIcons[priority]} 
            alt={`Priority ${priority}`} 
            className="priority-icon"
          />
        <div className="badge-box">
        <span 
            className="tag-indicator" 
            style={{ backgroundColor: '#808080' }} // Default gray color
          ></span>
          <span className="badge-text">{tag[0]}</span>
        </div>
      </div>

      {/* Styled JSX */}
      <style jsx>{`
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #ffffff;
          padding: 16px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          max-width: 460px; /* Increased max-width for wider cards */
          margin: 10px;
          width: 100%; /* Ensure full width within column */
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-id {
          font-weight: 400;
          color: #666;
        }

        .card-title {
          font-size: 18px;
          font-weight: 500;
          margin: 12px 0;
          color: #333;
          text-align: left;
        }

        .card-footer {
          display: flex;
          align-items: center;
        }

        .badge-box {
          display: flex;
          height: 25px;
          align-items: center;
          padding: 4px 8px;
          background-color: transparent;
          border-radius: 5px;
          border: 1px solid #e0e2e5;
        }

        .priority-icon {
          width: 20px; /* Adjust size as necessary */
          height: 20px;
          margin-right: 8px; /* Add space between icon and tag */
        }

        .badge-text {
          color: #555;
          font-size: 15px;
          padding-left: 4px; /* Add padding inside the badge text */
        }
          .tag-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%; /* Makes it a circle */
          background-color: #808080; /* Set to default gray */
          margin-right: 8px; /* Space between the circle and the tag name */
        }
      `}</style>
    </div>
  );
};

export default Card;