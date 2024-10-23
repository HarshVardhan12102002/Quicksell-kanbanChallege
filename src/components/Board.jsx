import React, { useState, useEffect } from 'react';
import Column from './Column';
import Card from './Card';
import DisplayDropdown from './DisplayDropdown';
import Modal from './Modal';  // Import the Modal component

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('priority');
  const [orderBy, setOrderBy] = useState('priority');
  const [isModalOpen, setIsModalOpen] = useState(false);  // State for modal visibility

  // Fetching the API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment'); // Replace with your actual API URL
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // List of all statuses to ensure columns always show, even if empty
  const allStatuses = ['Todo', 'In Progress', 'Backlog', 'Cancelled', 'Done'];

  // Normalize the status to handle any casing or spacing issues
  const normalizeStatus = (status) => {
    return status.toLowerCase().replace(/\s+/g, '');
  };

  // Group tickets based on the groupBy state
  const groupTickets = (tickets) => {
    switch (groupBy) {
      case 'priority':
        return {
          Urgent: tickets.filter(ticket => ticket.priority === 4),
          High: tickets.filter(ticket => ticket.priority === 3),
          Medium: tickets.filter(ticket => ticket.priority === 2),
          Low: tickets.filter(ticket => ticket.priority === 1),
          None: tickets.filter(ticket => ticket.priority === 0)
        };
      case 'status':
        const groupedByStatus = {};
        allStatuses.forEach(status => {
          groupedByStatus[status] = tickets.filter(ticket => normalizeStatus(ticket.status) === normalizeStatus(status));
        });
        return groupedByStatus;
      case 'user':
        const userTickets = {};
        users.forEach(user => {
          userTickets[user.name] = tickets.filter(ticket => ticket.userId === user.id);
        });
        return userTickets;
      default:
        return {};
    }
  };

  // Order tickets based on the orderBy state
  const orderTickets = (tickets) => {
    if (orderBy === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (orderBy === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupedTickets = groupTickets(tickets);

  // Function to add a new card
  const handleAddCard = (newCard) => {
    setTickets((prevTickets) => [...prevTickets, newCard]);
  };

  return (
    <div className="board-container">
      {/* Title Bar Section */}
      <div className="title-bar">
        <DisplayDropdown 
          groupBy={groupBy} 
          setGroupBy={setGroupBy} 
          orderBy={orderBy} 
          setOrderBy={setOrderBy} 
        />
        {/* Add Card Button */}
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          Add Card
        </button>
      </div>

      {/* Body Section */}
      <div className="board-body">
        <div className="columns">
          {Object.keys(groupedTickets).map(group => (
            <Column key={group} title={group} isUserGroup={groupBy === 'user'} users={users} onAddCard={handleAddCard}>
              {orderTickets(groupedTickets[group]).length > 0 ? (
                orderTickets(groupedTickets[group]).map(ticket => (
                  <Card
                    key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    tag={ticket.tag}
                    userId={ticket.userId}
                    status={ticket.status}
                    priority={ticket.priority}
                  />
                ))
              ) : (
                <div className="empty-message">No tickets available</div>
              )}
            </Column>
          ))}
        </div>
      </div>

      {/* Modal for adding new cards */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(newCard) => {
          handleAddCard(newCard);
          setIsModalOpen(false);
        }}
      />

      {/* Styled JSX */}
      <style jsx>{`
        .board-container {
          display: flex;
          flex-direction: column;
          height: 100vh; /* Take full viewport height */
        }

        /* Title Bar Styling */
        .title-bar {
          padding: 20px;
          background-color: #ffffff;
          border-bottom: 1px solid #ddd;
          display: flex;
          justify-content: space-between;
          align-items: center; /* Vertically center the dropdown */
        }

        .add-button {
          padding: 10px 20px;
          background-color: transparent;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .add-button:hover {
          background-color: #0056b3;
        }

        /* Board Body Styling */
        .board-body {
          flex: 1;
          background-color: #f0f0f0;
          overflow-y: auto; /* Make the body scrollable if content overflows */
          padding: 20px;
        }

        .columns {
          display: flex;
          justify-content: space-between;
        }

        .empty-message {
          text-align: center;
          color: #888;
          font-size: 14px;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default Board;
