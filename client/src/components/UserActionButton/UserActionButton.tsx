import React from "react";
import "./UserActionButton.styles.css";

interface UserActionButtonProps {
  action: "Create" | "Update" | "Delete";
  userId: number;
  user: {
    fullName: string;
    id: number;
    phoneNumber: string;
    ipAddress: string;
    email: string;
  };
  handleUserAction: () => Promise<void>;
}

const UserActionButton: React.FC<UserActionButtonProps> = ({
  action,
  handleUserAction,
}) => {
  const handleAction = () => {
    switch (action) {
      case "Create":
      case "Update":
      case "Delete":
        if (handleUserAction) {
          handleUserAction();
        }
        break;
      default:
        break;
    }
  };

  return <button onClick={handleAction}>{action} User</button>;
};

export default UserActionButton;
