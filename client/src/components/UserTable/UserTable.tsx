import React, { useState } from "react";
import DeleteUserButton from "../DeleteUserButton/DeleteUserButton";
import "./UserTable.scss";
import IPButton from "../IPButton/IPButton";
import { toast } from "react-toastify";

export interface User {
  fullName: string;
  id: number;
  phoneNumber: string;
  ipAddress: string;
  email: string;
}
interface UserTableProps {
  users: User[];
  handleDeleteUser: (userId: number) => Promise<void>;
  handleEditUser: (userId: number, updatedUser: User) => Promise<void>;
}

const UsersTable: React.FC<UserTableProps> = ({
  users,
  handleDeleteUser,
  handleEditUser,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setUpdatedUser(user);
  };

  const handleSave = async () => {
    if (updatedUser) {
      try {
        await handleEditUser(updatedUser.id, updatedUser);
        setEditingId(null);
        setUpdatedUser(null);
      } catch (error) {
        toast.error("Error updating user:" + error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setUpdatedUser(null);
  };

  const isEditing = (user: User) => user.id === editingId;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    const { value } = e.target;
    if (updatedUser) {
      setUpdatedUser(
        (prevUser) =>
          ({
            ...prevUser!,
            [field]: value,
          } as User | null)
      );
    }
  };

  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>ID</th>
            <th>Phone Number</th>
            <th>IP Address</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {isEditing(user) ? (
                  <input
                    type="text"
                    className="text-center"
                    value={updatedUser?.fullName || ""}
                    onChange={(e) => handleChange(e, "fullName")}
                  />
                ) : (
                  user.fullName
                )}
              </td>
              <td>{user.id}</td>
              <td>
                {isEditing(user) ? (
                  <input
                    type="text"
                    className="text-center"
                    value={updatedUser?.phoneNumber || ""}
                    onChange={(e) => handleChange(e, "phoneNumber")}
                  />
                ) : (
                  user.phoneNumber
                )}
              </td>
              <td>
                {isEditing(user) ? (
                  <input
                    type="text"
                    className="text-center"
                    value={updatedUser?.ipAddress || ""}
                    onChange={(e) => handleChange(e, "ipAddress")}
                  />
                ) : (
                  <span>
                    <IPButton ipAddress={user.ipAddress} />
                  </span>
                )}
              </td>
              <td>
                {isEditing(user) ? (
                  <input
                    type="text"
                    className="text-center"
                    value={updatedUser?.email || ""}
                    onChange={(e) => handleChange(e, "email")}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {isEditing(user) ? (
                  <>
                    <button className="btn btn-primary" onClick={handleSave}>
                      Save
                    </button>
                    <button className="btn btn-primary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                )}
                <DeleteUserButton
                  userId={user.id}
                  handleDeleteUser={handleDeleteUser}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

//tenstack table
