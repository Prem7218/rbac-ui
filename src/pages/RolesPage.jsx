import { useState, useEffect } from "react";
import {
  fetchRoles,
  addRole,
  updateRole,
  deleteRole as apiDeleteRole,
} from "../api/roles";
import { fetchUsers } from "../api/users";
import RoleForm from "../components/RoleForm";
import Spinner from "../components/LoadingSpinner";
import "../App.css";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentRole, setCurrentRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortField, setSortField] = useState("user"); // Default sort field
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

  const getRolesAndUsers = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [rolesResponse, usersResponse] = await Promise.all([
        fetchRoles(),
        fetchUsers(),
      ]);
      setRoles(rolesResponse.data);
      setUsers(usersResponse.data);
    } catch (err) {
      setError("Failed to fetch roles or users. Please try again later.");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRolesAndUsers();
  }, []);

  // Sorting functionality
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sortedRoles = [...roles].sort((a, b) => {
      let aValue, bValue;

      if (field === "user") {
        const userA = users.find((user) => user.id === a.userId);
        const userB = users.find((user) => user.id === b.userId);
        aValue = userA?.name || "";
        bValue = userB?.name || "";
      } else {
        aValue = a[field];
        bValue = b[field];
      }

      if (typeof aValue === "string") {
        return order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return order === "asc" ? aValue - bValue : bValue - aValue;
    });

    setRoles(sortedRoles);
  };

  const handleAdd = async (role) => {
    try {
      await addRole(role);
      getRolesAndUsers();
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  const handleEdit = (role) => {
    setCurrentRole(role);
  };

  const handleSave = async (role, roleId) => {
    if (!selectedUser) {
      alert("Please select a user before creating the role.");
      return;
    }

    const existingRole = roles.find((r) => r.userId === selectedUser.id);

    try {
      if (existingRole) {
        await updateRole(existingRole.id, role);
        setRoles((prevRoles) =>
          prevRoles.map((r) =>
            r.userId === selectedUser.id ? { ...r, ...role } : r
          )
        );
      } else {
        await addRole({ ...role, userId: selectedUser.id });
      }
      getRolesAndUsers();
    } catch (error) {
      console.error("Error saving role:", error);
    }

    setCurrentRole(null);
    setSelectedUser(null);
  };

  const handleDelete = async (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await apiDeleteRole(roleId);
        setRoles(roles.filter((role) => role.id !== roleId));
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    }
  };

  return (
    <div className="p-6 space-y-8 bg-custom">
      <h2 className="text-3xl font-semibold text-center text-white">Manage Roles</h2>

      {isLoading && <Spinner />}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <RoleForm
          onSubmit={handleSave}
          initialData={currentRole}
          selectedUser={selectedUser}
          onUserSelect={setSelectedUser}
        />
      </div>

      <div className="my-6">
        <h3 className="text-2xl font-semibold text-white">Users</h3>
        <div className="mb-4">
          <label className="block text-lg font-medium text-white">Select User:</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md"
            value={selectedUser?.id || ""}
            onChange={(e) => {
              const userId = e.target.value;
              const user = users.find((user) => user.id === userId);
              setSelectedUser(user);
            }}
          >
            <option value="">-- Select a User --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="my-6 overflow-hidden">
        <h3 className="text-2xl font-semibold text-white">Current Roles</h3>
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md mt-4">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th
                  className="px-6 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("user")}
                >
                  User {sortField === "user" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Role {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("permissions")}
                >
                  Permissions {sortField === "permissions" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.length > 0 ? (
                roles.map((role) => {
                  const user = users.find((user) => user.id === role.userId);
                  return (
                    <tr key={role.id} className="hover:bg-gray-100 transition-all duration-300">
                      <td className="px-6 py-4">{user?.name || "Unknown User"}</td>
                      <td className="px-6 py-4">{role.name || "Unknown Role"}</td>
                      <td className="px-6 py-4">{role.permissions.join(", ")}</td>
                      <td className="px-6 py-4 space-x-4">
                        <button
                          onClick={() => handleEdit(role)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(role.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6">No roles found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RolesPage;
