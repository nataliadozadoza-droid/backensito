import { getDb } from "../../config/database";


export const searchProfiles = async (filters: any) => {
  const db = getDb();

  const query: any = {};

  // 🔎 Nombre
  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" };
  }

  // Email
  if (filters.email) {
    query.email = { $regex: filters.email, $options: "i" };
  }

  // 🛡 Rol
  if (filters.role) {
    query.role = filters.role;
  }

  // 🚫 Estado
  if (filters.active !== undefined) {
    query.active = filters.active === "true";
  }

  // 📅 Fechas
  if (filters.startDate || filters.endDate) {
    query.createdAt = {};

    if (filters.startDate) {
      query.createdAt.$gte = new Date(filters.startDate);
    }

    if (filters.endDate) {
      query.createdAt.$lte = new Date(filters.endDate);
    }
  }

  return await db.collection("users").find(query).toArray();
};