import AppConfig from "../config/AppConfig";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  fullName: string;
  id: number;
  phoneNumber: string;
  ipAddress: string;
  email: string;
}

const ApiService = {
  fetchUsers: async (): Promise<User[]> => {
    try {
      const response = await axios.get(AppConfig.apiUrl + "users");
      return response.data as User[];
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  fetchUsersInRange: async (start: number, end: number): Promise<User[]> => {
    try {
      const response = await axios.get(
        AppConfig.apiUrl + `users/range?start=${start}&end=${end}`
      );
      return response.data as User[];
    } catch (error) {
      toast.error("Error fetching users in range:" + error);
      throw error;
    }
  },

  createUser: async (user: User): Promise<User> => {
    try {
      const response = await axios.post(AppConfig.apiUrl + "users", user);
      return response.data as User;
    } catch (error) {
      toast.error("Error creating user:" + error);
      throw error;
    }
  },

  updateUser: async (userId: number, updatedUser: User): Promise<User> => {
    try {
      const response = await axios.put(
        AppConfig.apiUrl + `users/${userId}`,
        updatedUser
      );

      return response.data as User;
    } catch (error: any) {
      toast.error("Error updating user:" + error.message);
      throw error;
    }
  },

  deleteUser: async (userId: number): Promise<void> => {
    try {
      await axios.delete(AppConfig.apiUrl + `users/${userId}`);
    } catch (error) {
      toast.error("Error deleting user:" + error);
      throw error;
    }
  },

  getIpInfo: async (ip: string): Promise<any> => {
    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      return response.data;
    } catch (error) {
      toast.error("Error fetching IP info:" + error);
      throw error;
    }
  },

  searchByFieldStartWith: async (
    fieldName: string,
    fieldValue: string
  ): Promise<User[]> => {
    try {
      const response = await axios.post(
        AppConfig.apiUrl + "users/search/start",
        {
          fieldName: fieldName,
          fieldValue: fieldValue,
        }
      );
      return response.data.users as User[];
    } catch (error) {
      toast.error("Error fetching users starting with value:" + error);
      throw error;
    }
  },

  searchByFieldInclude: async (
    fieldName: string,
    fieldValue: string
  ): Promise<User[]> => {
    try {
      const response = await axios.post(
        AppConfig.apiUrl + "users/search/include",
        {
          fieldName: fieldName,
          fieldValue: fieldValue,
        }
      );
      return response.data.users as User[];
    } catch (error) {
      toast.error("Error fetching users starting with value:" + error);
      throw error;
    }
  },

  searchByFieldEndWith: async (
    fieldName: string,
    fieldValue: string
  ): Promise<User[]> => {
    try {
      const response = await axios.post(AppConfig.apiUrl + "users/search/end", {
        fieldName: fieldName,
        fieldValue: fieldValue,
      });
      return response.data.users as User[];
    } catch (error) {
      toast.error("Error fetching users starting with value:" + error);
      throw error;
    }
  },

  uploadCsvFile: async (file: File): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        AppConfig.apiUrl + "users/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error("Error uploading CSV file:" + error);
      throw error;
    }
  },

  getUserCount: async (): Promise<number> => {
    try {
      const response = await axios.get(AppConfig.apiUrl + "users/count");
      return response.data;
    } catch (error) {
      toast.error("Error fetching user count:" + error);
      throw error;
    }
  },
  updateUserLocations: async (): Promise<void> => {
    try {
      await axios.post(AppConfig.apiUrl + "users/updateLocations");
      toast.success("User locations updated successfully.");
    } catch (error) {
      toast.error("Error updating user locations:");
      toast.error(
        "File is larger than 45 users , ip-API free service is limited for 45 requests per minute."
      );

      throw error;
    }
  },

  checkIfUserExists: async (id: number): Promise<boolean> => {
    try {
      const response = await axios.get(AppConfig.apiUrl + `users/check/${id}`);
      if (response.request.status === 200) return true;
      else return false;
    } catch (error) {
      toast.error("Error checking user existence:" + error);
      throw error;
    }
  },
};
export default ApiService;
