"use strict";
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
exports.isIdExists = exports.updateAllUserLocations = exports.getRowCount = exports.searchByField = exports.deleteById = exports.updateById = exports.insert = exports.getRange = exports.getAll = void 0;
const db_1 = __importDefault(require("../config/db"));
const api_1 = require("./api");
const getAll = (tableName) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query(`SELECT * FROM ${tableName}`);
    return rows;
});
exports.getAll = getAll;
const getRange = (tableName, start, end) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query(`SELECT * FROM ${tableName} ORDER BY id LIMIT ?, ?`, [start, end - start]);
    return rows;
});
exports.getRange = getRange;
const insert = (table, data) => __awaiter(void 0, void 0, void 0, function* () {
    const keys = Object.keys(data).join(", ");
    const values = Object.values(data);
    const placeholders = values.map(() => "?").join(", ");
    const sql = `INSERT IGNORE INTO ${table} (${keys}) VALUES (${placeholders})`;
    const result = yield db_1.default.query(sql, values);
});
exports.insert = insert;
const updateById = (tableName, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const keys = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");
    const values = Object.values(data);
    const sql = `UPDATE ${tableName} SET ${keys} WHERE id = ?`;
    const [results] = yield db_1.default.query(sql, [...values, id]);
    return results;
});
exports.updateById = updateById;
const deleteById = (tableName, id) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.default.query(`DELETE FROM ${tableName} WHERE id = ?`, [
        id,
    ]);
    return results;
});
exports.deleteById = deleteById;
const searchByField = (tableName, fieldName, fieldValue, searchType) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    switch (searchType) {
        case "Include":
            query = `SELECT * FROM ${tableName} WHERE ${fieldName} LIKE '%${fieldValue}%'`;
            break;
        case "StartWith":
            query = `SELECT * FROM ${tableName} WHERE ${fieldName} LIKE '${fieldValue}%'`;
            break;
        case "EndWith":
            query = `SELECT * FROM ${tableName} WHERE ${fieldName} LIKE '%${fieldValue}'`;
            break;
        default:
            throw new Error("Invalid search type");
    }
    const [results] = yield db_1.default.query(query);
    return results;
});
exports.searchByField = searchByField;
const getRowCount = (tableName) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT COUNT(*) as count FROM ${tableName};`;
    const result = yield db_1.default.query(query);
    return result[0][0].count;
});
exports.getRowCount = getRowCount;
const updateAllUserLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    // First, get all users from the database
    const [users] = yield db_1.default.query("SELECT id, ipAddress FROM users");
    for (const user of users) {
        // For each user, fetch their location from their IP address
        const location = yield (0, api_1.fetchLocationFromIp)(user.ipAddress);
        // Then update the user's country and city in the database
        yield db_1.default.query("UPDATE users SET country = ?, city = ? WHERE id = ?", [
            location.country,
            location.city,
            user.id,
        ]);
    }
});
exports.updateAllUserLocations = updateAllUserLocations;
const isIdExists = (tableName, id) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.default.query(`SELECT COUNT(*) as count FROM ${tableName} WHERE id = ?`, [id]);
    console.log(results[0].count > 0);
    return results[0].count > 0;
});
exports.isIdExists = isIdExists;
