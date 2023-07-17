import db from "../config/db";

export const createTables = async (): Promise<void> => {
  try {
    await db.execute(`
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
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
