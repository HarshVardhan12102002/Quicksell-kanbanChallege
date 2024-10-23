import React from 'react';

const Dropdown = ({ label, options, selectedOption, onChange }) => {
  return (
    <div className="dropdown-container">
      <label className="dropdown-label">{label}</label>
      <select
        className="dropdown-select"
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Styled JSX */}
      <style jsx>{`
        .dropdown-container {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
        }

        .dropdown-label {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .dropdown-select {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .dropdown-select:focus {
          outline: none;
          border-color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default Dropdown;