import db from "../config/db";

import { fetchLocationFromIp } from "./api";
interface IpApiResponse {
  city: string;
  country: string;
}

export const getAll = async (tableName: string) => {
  const [rows] = await db.query(`SELECT * FROM ${tableName}`);
  return rows;
};

export const getRange = async (
  tableName: string,
  start: number,
  end: number
) => {
  const [rows] = await db.query(
    `SELECT * FROM ${tableName} ORDER BY id LIMIT ?, ?`,
    [start, end - start]
  );
  return rows;
};

export const insert = async (
  table: string,
  data: Record<string, any>
): Promise<void> => {
  const keys = Object.keys(data).join(", ");
  const values = Object.values(data);
  const placeholders = values.map(() => "?").join(", ");

  const sql = `INSERT IGNORE INTO ${table} (${keys}) VALUES (${placeholders})`;

  const result = await db.query(sql, values);
};

export const updateById = async (
  tableName: string,
  id: number,
  data: Record<string, any>
) => {
  const keys = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(data);
  const sql = `UPDATE ${tableName} SET ${keys} WHERE id = ?`;
  const [results] = await db.query(sql, [...values, id]);
  return results;
};

export const deleteById = async (tableName: string, id: number) => {
  const [results] = await db.query(`DELETE FROM ${tableName} WHERE id = ?`, [
    id,
  ]);
  return results;
};

export const searchByField = async (
  tableName: string,
  fieldName: string,
  fieldValue: string,
  searchType: string
) => {
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

  const [results] = await db.query(query);
  return results;
};

export const getRowCount = async (tableName: string): Promise<number> => {
  const query = `SELECT COUNT(*) as count FROM ${tableName};`;
  const result: any = await db.query(query);
  return result[0][0].count;
};

export const updateAllUserLocations = async (): Promise<void> => {
  // First, get all users from the database
  const [users]: any[] = await db.query("SELECT id, ipAddress FROM users");
  for (const user of users) {
    // For each user, fetch their location from their IP address
    const location: IpApiResponse = await fetchLocationFromIp(user.ipAddress);
    // Then update the user's country and city in the database
    await db.query("UPDATE users SET country = ?, city = ? WHERE id = ?", [
      location.country,
      location.city,
      user.id,
    ]);
  }
};

export const isIdExists = async (
  tableName: string,
  id: number
): Promise<boolean> => {
  const [results]: any[] = await db.query(
    `SELECT COUNT(*) as count FROM ${tableName} WHERE id = ?`,
    [id]
  );
  console.log(results[0].count > 0);
  return results[0].count > 0;
};
