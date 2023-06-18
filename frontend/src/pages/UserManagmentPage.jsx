import React, { useEffect, useState } from "react";
import UserEditModal from "../components/UserEditModal";
import axiosInstance from "../utils/authInterceptor";

export default function UserManagmentPage(props) {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/api/users"
      );
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (username) => {
    try {
      await axiosInstance.delete(`http://localhost:8080/api/users/${username}`);
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const addUser = async (user) => {
    try {
      await axiosInstance.post("http://localhost:8080/api/users", user);
      closeModal();
      getUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (user) => {
    try {
      await axiosInstance.put(
        `http://localhost:8080/api/users/${user.username}`,
        user
      );
      closeModal();
      getUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const openModal = (state) => {
    setShowModal(state);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h2>User List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => {
                    setShowModal("EDIT");
                    setEditedUser(user);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user.username)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-primary"
        onClick={() => {
          openModal("CREATE");
        }}
      >
        Add User
      </button>
      {showModal &&
        (showModal === "CREATE" ? (
          <UserEditModal
            title="Add User"
            onSubmit={addUser}
            onClose={closeModal}
          />
        ) : (
          <UserEditModal
            title="Edit User"
            user={editedUser}
            onSubmit={updateUser}
            onClose={closeModal}
          />
        ))}
    </div>
  );
}
