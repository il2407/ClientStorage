import React, { useState } from "react";
import ApiService from "../../services/ApiService";
import "./FileUploadButton.css";
import { toast } from "react-toastify";

const FileUploadButton: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const onFileUpload = async () => {
    if (file) {
      setIsLoading(true); // Start the loading indicator
      try {
        await ApiService.uploadCsvFile(file);
        toast.success("File Uploaded Successfully.");

        // Now update the user locations
        await ApiService.updateUserLocations();
        toast.success("User locations updated successfully.");
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false); // Stop the loading indicator
      }
    } else {
      toast.error("No File Selected.");
    }
  };

  return (
    <>
      <div className="text-center">
        <input
          className="w-50"
          style={{ margin: "0 auto" }}
          type="file"
          onChange={onFileChange}
        />
        {!isLoading && (
          <button className="mt-3" onClick={onFileUpload}>
            Upload and Update Locations
          </button>
        )}
      </div>
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default FileUploadButton;
