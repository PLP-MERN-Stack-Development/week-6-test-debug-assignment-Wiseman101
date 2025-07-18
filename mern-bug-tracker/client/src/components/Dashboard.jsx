import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BugForm from './BugForm';

const Dashboard = () => {
  const [bugs, setBugs] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch Bugs
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await fetch('/api/bugs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setBugs(data);
      } catch (err) {
        console.error('Failed to load bugs:', err);
      }
    };

    fetchBugs();
  }, []);

  // ✅ Add New Bug
  const handleAddBug = async (newBug) => {
    try {
      const res = await fetch('/api/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newBug),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Bug added successfully');
        setBugs((prev) => [...prev, data]);
      } else {
        alert(data.message || 'Error adding bug');
      }
    } catch (err) {
      console.error('Add bug error:', err);
    }
  };

  // ✅ Delete Bug
  const handleDeleteBug = async (bugId) => {
    try {
      const res = await fetch(`/api/bugs/${bugId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await res.json();
      if (res.ok) {
        setBugs((prev) => prev.filter((bug) => bug._id !== bugId));
        alert('Bug deleted successfully');
      } else {
        alert(result.message || 'Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bug Tracker Dashboard</h1>
      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
        Logout
      </button>

      <BugForm onAddBug={handleAddBug} />

      <h2>Reported Bugs</h2>
      {bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        <ul>
          {bugs.map((bug) => (
            <li key={bug._id} style={{ marginBottom: '10px' }}>
              <strong>{bug.title}</strong>: {bug.description}
              <button
                onClick={() => handleDeleteBug(bug._id)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
