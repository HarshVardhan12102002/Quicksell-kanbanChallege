import React, { useState } from 'react';
import Avatar from 'react-avatar';
import Modal from './Modal'; // Import the Modal component
import Urgent from '../assets/Urgent_Priority_Colour.svg';
import High from '../assets/highpriority.svg';
import Medium from '../assets/mediumpriority.svg';
import Low from '../assets/lowpriority.svg';
import None from '../assets/No-priority.svg';
import Cancelled from '../assets/Cancelled.svg';
import Done from '../assets/Done.svg';
import InProgress from '../assets/in-progress.svg';
import Todo from '../assets/To-do.svg';
import Backlog from '../assets/Backlog.svg';
import dots from '../assets/dots.svg';
import add from '../assets/add.svg';

const Column = ({ title, children, isUserGroup, users, onAddCard }) => {
  const [isModalOpen, setModalOpen] = useState(false); // Modal state

  const titleToIconMap = {
    'Urgent': Urgent,
    'High': High,
    'Medium': Medium,
    'Low': Low,
    'None': None,
    'Cancelled': Cancelled,
    'Done': Done,
    'In progress': InProgress,
    'Todo': Todo,
    'Backlog': Backlog,
  };

  const user = isUserGroup ? users.find(u => u.name === title) : null;
  const taskCount = children.length;

  const handleAddCard = (newCardData) => {
    onAddCard(newCardData, title); // Pass the new card data and the column title (status) to the parent
  };

  return (
    <div className="column">
      <div className="column-header">
        {isUserGroup && user ? (
          <Avatar name={user.name} size={40} round={true} style={{ marginRight: '5px' }} />
        ) : (
          <img src={titleToIconMap[title]} alt={`${title} Icon`} className="column-icon" />
        )}
        <h2 className="column-title">{title}</h2>
        <span className="task-count">{taskCount}</span>
        <button className="add-button" onClick={() => setModalOpen(true)}>
          <img src={add} alt="Add Icon" className="icon" />
        </button>
        <button className="dots-button">
          <img src={dots} alt="Dots Icon" className="icon" />
        </button>
      </div>

      <div className="column-content">
        {taskCount > 0 ? children : <div className="empty-column">No tickets available</div>}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddCard}
      />

      <style jsx>{`
        .column {
          flex: 1;
          margin: 0 30px;
          padding: 10px;
          border-radius: 8px;
        }
        .column-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          margin-left: 18px;
        }
        .column-icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
        .column-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-right: 10px;
        }
        .task-count {
          font-size: 14px;
          color: #888;
          margin-right: auto;
        }
        .icon {
          width: 18px;
          height: 18px;
        }
        .add-button, .dots-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          margin-left: 5px;
        }
        .add-button:hover, .dots-button:hover {
          opacity: 0.2;
        }
        .column-content {
          min-height: 200px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .empty-column {
          font-size: 14px;
          color: #888;
          text-align: center;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default Column;