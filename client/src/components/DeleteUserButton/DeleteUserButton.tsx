import React from "react";

interface DeleteUserButtonProps {
  userId: number;
  handleDeleteUser: (userId: number) => Promise<void>;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  userId,
  handleDeleteUser,
}) => {
  const handleClick = () => {
    handleDeleteUser(userId);
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Delete
    </button>
  );
};

export default DeleteUserButton;
