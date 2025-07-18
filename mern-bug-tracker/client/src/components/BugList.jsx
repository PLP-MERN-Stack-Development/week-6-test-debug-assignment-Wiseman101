// import React from 'react';

// const BugList = ({ bugs }) => {
//   if (bugs.length === 0) return <p>No bugs reported yet.</p>;

//   return (
//     <div>
//       <h2>Reported Bugs</h2>
//       <ul>
//         {bugs.map((bug) => (
//           <li key={bug._id}>
//             <strong>{bug.title}</strong>: {bug.description} [{bug.status}]
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BugList;

import React from 'react';

const BugList = ({ bugs = [], handleDelete }) => {
  if (!Array.isArray(bugs)) return <p>No bugs to show.</p>;

  return (
    <div>
      <h2>Bug List</h2>
      {bugs.length === 0 ? (
        <p>No bugs reported.</p>
      ) : (
        <ul>
          {bugs.map((bug) => (
            <li key={bug._id} style={{ marginBottom: '10px' }}>
              <strong>{bug.title}</strong>: {bug.description}
              <button
                onClick={() => handleDelete(bug._id)}
                style={{ marginLeft: '10px', color: 'white', background: 'red', border: 'none', padding: '5px 10px' }}
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

export default BugList;
