import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  user_name: varchar("user_name", { length: 50 }).notNull().unique(),
  correo: varchar("correo", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 500 }).notNull(),
  clerk_user_id: varchar("clerk_user_id", { length: 255 }).notNull().unique(),
});
