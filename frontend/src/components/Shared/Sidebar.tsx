import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'frontend/src/store';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const user = useAppSelector(state => state.user.currentUser);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={toggleSidebar} className="toggle-btn">
        {isOpen ? '<<' : '>>'}
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/applications">Applications</Link>
          </li>
          {user && user.role === 'Admin' && (
            <>
              <li>
                <Link to="/users">User Management</Link>
              </li>
              <li>
                <Link to="/webhooks">Webhook Configuration</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/documents">Document Viewer</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;