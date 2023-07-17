import { Request, Response } from "express";
import * as User from "../models/users";
import { validateUserFields } from "../db/dbValdiation";
import csv from "csv-parser";
import fs from "fs";
import { fetchLocationFromIp } from "../models/api";

export const uploadCSV = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).send({ message: "No file uploaded." });
      return;
    }

    const results: any[] = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        // Load the CSV data into the database here
        for (let row of results) {
          // const ipAddress = row['IP'];
          //  const locationData = await fetchLocationFromIp(ipAddress);
          const user = {
            id: row["ID"],
            email: row["Email"],
            fullName: row["Name"],
            phoneNumber: row["Phone"],
            ipAddress: row["IP"],
          };

          await User.insert("users", user);
        }

        res.status(200).send({ message: "CSV uploaded successfully!" });
      });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.getAll("users");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUsersInRange = async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res
        .status(400)
        .json({ message: "Start and end parameters are required" });
    }

    const users = await User.getRange("users", Number(start), Number(end));
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id, fullName, ipAddress, phoneNumber, email } = req.body;

    const validationError = validateUserFields(
      id,
      fullName,
      phoneNumber,
      ipAddress,
      email
    );
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // Fetch user location using IP address
    const location = await fetchLocationFromIp(ipAddress);

    // Include city and country in the data to be inserted
    const result = await User.insert("users", {
      id,
      fullName,
      ipAddress,
      phoneNumber,
      email,
      country: location.country,
      city: location.city,
    });

    res.status(201).send({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fullName, ipAddress, phoneNumber, email } = req.body;

    const validationError = validateUserFields(
      id,
      fullName,
      phoneNumber,
      ipAddress,
      email
    );
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    await User.updateById("users", Number(id), {
      fullName,
      phoneNumber,
      ipAddress,
      email,
    });

    res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const searchByFieldInclude = async (req: Request, res: Response) => {
  try {
    const { fieldName, fieldValue } = req.body;

    const users = await User.searchByField(
      "users",
      fieldName,
      fieldValue,
      "Include"
    );
    res.status(200).send({ message: "User Found successfully!", users: users });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const searchByFieldStartWith = async (req: Request, res: Response) => {
  try {
    const { fieldName, fieldValue } = req.body;

    const users = await User.searchByField(
      "users",
      fieldName,
      fieldValue,
      "StartWith"
    );
    res.status(200).send({ message: "User Found successfully!", users: users });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const searchByFieldEndWith = async (req: Request, res: Response) => {
  try {
    const { fieldName, fieldValue } = req.body;

    const users = await User.searchByField(
      "users",
      fieldName,
      fieldValue,
      "EndWith"
    );
    res.status(200).send({ message: "User Found successfully!", users: users });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await User.deleteById("users", Number(id));

    res.status(200).send({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getUserCount = async (req: Request, res: Response) => {
  try {
    const count = await User.getRowCount("users");
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateAllUserLocations = async (req: Request, res: Response) => {
  try {
    const failedUpdates = await User.updateAllUserLocations();
    res.status(200).json({ message: "Location update started", failedUpdates });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const checkIfUserExists = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userExists = await User.isIdExists("users", Number(id));
    if (userExists) {
      res.status(200).json({ message: `User with ID ${id} exists.` });
    } else {
      res.status(201).json({ message: `User with ID ${id} does not exist.` });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
