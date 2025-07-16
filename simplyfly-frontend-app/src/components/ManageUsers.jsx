import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/adminService";
import Layout from "./Layout";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      console.log("Fetched users:", data);
      setUsers(data);
    } catch (err) {
      toast.error("Error fetching users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      toast.success("User deleted.");
      fetchUsers();
    } catch (err) {
      toast.error("Error deleting user.");
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="container p-3">
        <h2>Manage Users</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Gender</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.userId}>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.contactNumber}</td>
                      <td>{user.gender}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(user.userId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ManageUsers;
