

import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = ({ onSelect }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/connected");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // initial load
    const interval = setInterval(fetchUsers, 5000); // refresh every 5s
    return () => clearInterval(interval); // cleanup
  }, []);

  const filteredUsers = users.filter((user) =>
    (user.username + user.nickname)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-4 h-full overflow-y-auto">
      <input
        className="w-full p-2 mb-4 border rounded"
        placeholder="Search by username/nickname"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div className="text-gray-500">Loading users...</div>
      ) : (
        <ul className="space-y-2">
          {filteredUsers.length === 0 ? (
            <li className="text-gray-500">No users found</li>
          ) : (
            filteredUsers.map((user, i) => (
              <li
                key={user.id || i}
                onClick={() => onSelect(user)}
                className="p-2 cursor-pointer border rounded hover:bg-gray-100"
              >
                <div className="font-medium">{user.username}</div>
                <div className="text-sm text-gray-500">{user.nickname}</div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default UserList;
