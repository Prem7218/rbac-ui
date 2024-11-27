import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "../api/users";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import "../App.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleAdd = async (user) => {
    try {
      await addUser(user);
      getUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEdit = async (id, user) => {
    try {
      await updateUser(id, user);
      getUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="bg-cover-custom py-12 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-white mb-12 drop-shadow-md animate-fade-in transition-transform duration-700">
          User Management System
        </h1>
        <UserForm onSubmit={handleAdd} />
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default UsersPage;
