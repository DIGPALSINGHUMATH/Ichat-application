import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = ({ onSelect }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = () => {
    axios.get("http://localhost:8080/users/connected").then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    fetchUsers(); // initial
    const interval = setInterval(fetchUsers, 5000); // refresh every 5s
    return () => clearInterval(interval); // cleanup
  }, []);

  const filtered = users.filter((user) =>
    (user.username + user.nickname).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        className="w-full p-2 mb-4 border rounded"
        placeholder="Search by username/nickname"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map((user, i) => (
          <li
            key={i}
            onClick={() => onSelect(user)}
            className="p-2 cursor-pointer hover:bg-gray-200"
          >
            {user.username} ({user.nickname})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
