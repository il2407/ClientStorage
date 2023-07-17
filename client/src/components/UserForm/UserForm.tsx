import React from "react";
import "./UserForm.css";

interface UserFormProps {
  fullName: string;
  id: number;
  phoneNumber: string;
  ipAddress: string;
  email: string;

  setFullName: (value: string) => void;
  setId: (value: number) => void;
  setPhoneNumber: (value: string) => void;
  setIpAddress: (value: string) => void;
  setEmail: (value: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  fullName,
  id,
  phoneNumber,
  ipAddress,
  email,
  setFullName,
  setId,
  setPhoneNumber,
  setIpAddress,
  setEmail,
}) => (
  <>
    <form action="" className="row g-3">
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="number"
        placeholder="ID"
        value={id === 0 ? "" : id}
        onChange={(e) => setId(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="IP Address"
        value={ipAddress}
        onChange={(e) => setIpAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </form>
  </>
);

export default UserForm;
// react-hook-form
