import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    tag: '',
    userId: '',
    status: 'Todo',
    priority: 1
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data to the parent for adding a new card
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Card</h2>
        <form onSubmit={handleSubmit}>
          <label>
            ID:
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Tag:
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            User ID:
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Todo">Todo</option>
              <option value="In progress">In Progress</option>
              <option value="Done">Done</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
          <label>
            Priority:
            <input
              type="number"
              name="priority"
              value={formData.priority}
              min={1}
              max={5}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Add Card</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 10px;
        }
        input, select {
          margin-top: 5px;
          padding: 8px;
          font-size: 16px;
        }
        button {
          margin-top: 10px;
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Modal;