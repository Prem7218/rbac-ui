import React, { useState } from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setFormData({ name: user.name, role: user.role });
  };

  const handleSaveClick = () => {
    onEdit(editingId, formData);
    setEditingId(null);
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setFormData({ name: "", role: "" });
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(deleteId);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-hidden">
      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by name or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md w-full py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200 text-gray-800">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">Name</th>
            <th className="px-6 py-4 text-left font-semibold">Role</th>
            <th className="px-6 py-4 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                } border-b transition duration-300 hover:bg-gray-200 transform hover:scale-95`}
              >
                {editingId === user.id ? (
                  <>
                    {/* Edit Mode */}
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="border border-gray-300 rounded-md w-full py-1 px-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        className="border border-gray-300 rounded-md w-full py-1 px-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                      />
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button
                        onClick={handleSaveClick}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded-md"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded-md"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    {/* Normal Mode */}
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="px-6 py-4 text-center text-gray-600 italic"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
