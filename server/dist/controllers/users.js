"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserExists = exports.updateAllUserLocations = exports.getUserCount = exports.deleteUser = exports.searchByFieldEndWith = exports.searchByFieldStartWith = exports.searchByFieldInclude = exports.updateUser = exports.createUser = exports.getUsersInRange = exports.getAllUsers = exports.uploadCSV = void 0;
const User = __importStar(require("../models/users"));
const dbValdiation_1 = require("../db/dbValdiation");
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const api_1 = require("../models/api");
const uploadCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).send({ message: "No file uploaded." });
            return;
        }
        const results = [];
        fs_1.default.createReadStream(req.file.path)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => results.push(data))
            .on("end", () => __awaiter(void 0, void 0, void 0, function* () {
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
                yield User.insert("users", user);
            }
            res.status(200).send({ message: "CSV uploaded successfully!" });
        }));
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.uploadCSV = uploadCSV;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.getAll("users");
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.getAllUsers = getAllUsers;
const getUsersInRange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { start, end } = req.query;
        if (!start || !end) {
            return res
                .status(400)
                .json({ message: "Start and end parameters are required" });
        }
        const users = yield User.getRange("users", Number(start), Number(end));
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.getUsersInRange = getUsersInRange;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, fullName, ipAddress, phoneNumber, email } = req.body;
        const validationError = (0, dbValdiation_1.validateUserFields)(id, fullName, phoneNumber, ipAddress, email);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        // Fetch user location using IP address
        const location = yield (0, api_1.fetchLocationFromIp)(ipAddress);
        // Include city and country in the data to be inserted
        const result = yield User.insert("users", {
            id,
            fullName,
            ipAddress,
            phoneNumber,
            email,
            country: location.country,
            city: location.city,
        });
        res.status(201).send({ message: "User created successfully!" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { fullName, ipAddress, phoneNumber, email } = req.body;
        const validationError = (0, dbValdiation_1.validateUserFields)(id, fullName, phoneNumber, ipAddress, email);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }
        yield User.updateById("users", Number(id), {
            fullName,
            phoneNumber,
            ipAddress,
            email,
        });
        res.status(200).json({ message: "User updated successfully!" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.updateUser = updateUser;
const searchByFieldInclude = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fieldName, fieldValue } = req.body;
        const users = yield User.searchByField("users", fieldName, fieldValue, "Include");
        res.status(200).send({ message: "User Found successfully!", users: users });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.searchByFieldInclude = searchByFieldInclude;
const searchByFieldStartWith = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fieldName, fieldValue } = req.body;
        const users = yield User.searchByField("users", fieldName, fieldValue, "StartWith");
        res.status(200).send({ message: "User Found successfully!", users: users });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.searchByFieldStartWith = searchByFieldStartWith;
const searchByFieldEndWith = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fieldName, fieldValue } = req.body;
        const users = yield User.searchByField("users", fieldName, fieldValue, "EndWith");
        res.status(200).send({ message: "User Found successfully!", users: users });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.searchByFieldEndWith = searchByFieldEndWith;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield User.deleteById("users", Number(id));
        res.status(200).send({ message: "User deleted successfully!" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.deleteUser = deleteUser;
const getUserCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield User.getRowCount("users");
        res.json({ count });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.getUserCount = getUserCount;
const updateAllUserLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const failedUpdates = yield User.updateAllUserLocations();
        res.status(200).json({ message: "Location update started", failedUpdates });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.updateAllUserLocations = updateAllUserLocations;
const checkIfUserExists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userExists = yield User.isIdExists("users", Number(id));
        if (userExists) {
            res.status(200).json({ message: `User with ID ${id} exists.` });
        }
        else {
            res.status(201).json({ message: `User with ID ${id} does not exist.` });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.checkIfUserExists = checkIfUserExists;
