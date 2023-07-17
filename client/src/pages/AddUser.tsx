import React, { useState } from "react";
import UserForm from "../components/UserForm/UserForm";
import UserActionButton from "../components/UserActionButton/UserActionButton";
import ApiService from "../services/ApiService";
import HelperFunctions from "../utils/HelperFunctions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//I should have sent this interface as prop to use in userform
export interface User {
  fullName: string;
  id: number;
  phoneNumber: string;
  ipAddress: string;
  email: string;
}

const AddUser = () => {
  const [fullName, setFullName] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [ipAddress, setIpAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [userAdded, setUserAdded] = useState<boolean>(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const user = {
    fullName,
    id,
    phoneNumber,
    ipAddress,
    email,
  };

  const validateUser = (): boolean => {
    const validationResult = HelperFunctions.validateUserFields(
      fullName,
      id,
      phoneNumber,
      ipAddress,
      email
    );
    if (validationResult !== null) {
      toast.error(validationResult);
      return false;
    }
    return true;
  };

  const handleCreateUser = async () => {
    if (!validateUser()) return;

    // Check if a user with the same id already exists
    const userExists = await ApiService.checkIfUserExists(id);
    if (userExists) {
      // If the user already exists, show a toast notification and return
      toast.error("A user with this id already exists.");
      return;
    } else {
      await ApiService.createUser(user);
      toast.success("User Added Successfully");
      navigate("/all-users");
      setUserAdded(!userAdded);
    }
  };

  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="container">
            <h3 className="banner-style">Add Client </h3>
            <br />
            <UserForm
              fullName={fullName}
              id={id}
              phoneNumber={phoneNumber}
              ipAddress={ipAddress}
              email={email}
              setFullName={setFullName}
              setId={setId}
              setPhoneNumber={setPhoneNumber}
              setIpAddress={setIpAddress}
              setEmail={setEmail}
            />

            <br />

            <UserActionButton
              action="Create"
              userId={id}
              user={user}
              handleUserAction={handleCreateUser}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default AddUser;
// react-hook-form
