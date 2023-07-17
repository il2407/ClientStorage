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
exports.createTables = void 0;
const db_1 = __importDefault(require("../config/db"));
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY,
      fullName  VARCHAR(255) NOT NULL,
      phoneNumber  VARCHAR(255) NOT NULL,
      ipAddress  VARCHAR(255) ,
      email  VARCHAR(255) NOT NULL,
      city  VARCHAR(255),
      country VARCHAR(255)
  )
      `);
        console.log("Tables created successfully!");
    }
    catch (error) {
        console.error("Error creating tables:", error);
    }
});
exports.createTables = createTables;
