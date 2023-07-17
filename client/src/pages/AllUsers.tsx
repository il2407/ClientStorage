import React, { useState, useEffect } from "react";
import UsersTable from "../components/UserTable/UserTable";
import ApiService from "../services/ApiService";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { toast } from "react-toastify";
import HelperFunctions from "../utils/HelperFunctions";

//should have put this interface in higher level and pass as prop to all components

export interface User {
  fullName: string;
  id: number;
  phoneNumber: string;
  ipAddress: string;
  email: string;
}

const AllUsers = () => {
  //Generlized states with custom hooks
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [userAdded, setUserAdded] = useState<boolean>(false);
  const [searchMode, setSearchMode] = useState<string>("startWith");
  const [searchField, setSearchField] = useState<string>("fullName");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, lastUpdated]);
  //check how to do paginations
  const fetchUsers = async () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const fetchedUsers = await ApiService.fetchUsersInRange(start, end);
    setUsers(fetchedUsers);

    setIsLastPage(fetchedUsers.length < itemsPerPage);
  };

  const handleEditUser = async (userId: number, updatedUser: User) => {
    const { fullName, id, phoneNumber, ipAddress, email } = updatedUser;

    //use the interface that will be imported
    const validationResult: string | null = HelperFunctions.validateUserFields(
      fullName,
      id,
      phoneNumber,
      ipAddress,
      email
    );

    if (validationResult !== null) {
      toast.error(validationResult);
      return;
    }

    await ApiService.updateUser(userId, updatedUser);
    toast.success("Data Edited Successfully.");
    fetchUsers();
    setUserAdded(!userAdded);
  };

  const handleDeleteUser = async (userId: number) => {
    await ApiService.deleteUser(userId);
    toast.success("Data Deleted Successfully");
    fetchUsers();
    setUserAdded(!userAdded);
  };

  const handleSearch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let searchedUsers;
    switch (searchMode) {
      case "startWith":
        searchedUsers = await ApiService.searchByFieldStartWith(
          searchField,
          searchValue
        );
        break;
      case "include":
        searchedUsers = await ApiService.searchByFieldInclude(
          searchField,
          searchValue
        );
        break;
      case "endWith":
        searchedUsers = await ApiService.searchByFieldEndWith(
          searchField,
          searchValue
        );
        break;
      default:
        break;
    }
    if (searchedUsers) {
      setUsers(searchedUsers);
    } else {
      console.log("No users found");
    }
  };

  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="container">
            <h3 className="banner-style">All Clients</h3>
            <br />
            <form className="row g-3 search-form">
              <div className="col-md-3">
                <select
                  value={searchMode}
                  className="form-select"
                  onChange={(e) => setSearchMode(e.target.value)}
                >
                  <option value="startWith">Start with</option>
                  <option value="include">Include</option>
                  <option value="endWith">End with</option>
                </select>
              </div>

              <div className="col-md-3">
                <select
                  className="form-select"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                >
                  <option value="fullName">Full name</option>
                  <option value="id">ID</option>
                  <option value="phoneNumber">Phone number</option>
                  <option value="ipAddress">IP Address</option>
                  <option value="country">Country</option>
                  <option value="city">City</option>
                </select>
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="select-search form-control"
                  placeholder="search text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <button
                  className="w-100 btn btn-primary"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </form>
            <UsersTable
              users={users}
              handleDeleteUser={handleDeleteUser}
              handleEditUser={handleEditUser}
            />
            <div className="pagination">
              <div className="pagination__page-number">
                <span>Page: {currentPage}</span>
              </div>

              <div className="pagination__buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                  disabled={currentPage === 1}
                >
                  <AiFillCaretLeft />
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                  disabled={isLastPage}
                >
                  <AiFillCaretRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      ;
    </>
  );
};

export default AllUsers;
