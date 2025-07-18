// import React, { useEffect, useState } from 'react';
// import BugForm from './components/BugForm';
// import BugList from './components/BugList';
// import './index.css';


// const App = () => {
//   const [bugs, setBugs] = useState([]);

//   // fetch all bugs
// const fetchBugs = async () => {
//   try {
//     const res = await fetch('/api/bugs'); // ✅ RELATIVE path
//     const data = await res.json();
//     setBugs(data);
//   } catch (err) {
//     console.error('Error fetching bugs:', err);
//   }
// };

// // post new bug
// const handleAddBug = async (bug) => {
//   try {
//     const res = await fetch('/api/bugs', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(bug),
//     });
//     const data = await res.json(); // ⛔️ will fail if response isn't JSON
//     setBugs([...bugs, data]);
//   } catch (err) {
//     console.error('Error adding bug:', err);
//   }
// };


//   useEffect(() => {
//     fetchBugs();
//   }, []);

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
//       <h1>🐞 Bug Tracker</h1>
//       <BugForm onAddBug={handleAddBug} />
//       <hr />
//       <BugList bugs={bugs} />
//     </div>
//   );
// };

// export default App;

// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import BugForm from './components/BugForm';
// import BugList from './components/BugList';
// import Login from './components/Login';
// import Register from './components/Register';
// import Dashboard from './components/Dashboard';
// import PrivateRoute from './components/PrivateRoute';
// import './index.css';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/login" element={<Login />} /> */}
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/bugs"
//           element={
//             <PrivateRoute>
//               <>
//                 <h1>🐞 Bug Tracker</h1>
//                 <BugForm />
//                 <hr />
//                 <BugList />
//               </>
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/bugs"
          element={
            <PrivateRoute>
              <>
                <h1>🐞 Bug Tracker</h1>
                <BugForm />
                <hr />
                <BugList />
              </>
            </PrivateRoute>
          }
        />

        {/* 🔁 Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

