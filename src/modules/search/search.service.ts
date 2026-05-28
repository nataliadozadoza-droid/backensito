import { ObjectId } from "mongodb";
import { getDb } from "../../config/database";

const COLLECTION = "users";

export const createProfile = async (data: any) => {

  const db = getDb();

  const result = await db.collection(COLLECTION).insertOne({
    ...data,
    active: true,
    createdAt: new Date(),
  });

  return {
    _id: result.insertedId,
    ...data,
  };
};

export const searchProfiles = async (filters: any) => {

  const db = getDb();

  const query: any = {};

  if (filters.name) {
    query.name = {
      $regex: filters.name,
      $options: "i",
    };
  }

  if (filters.email) {
    query.email = {
      $regex: filters.email,
      $options: "i",
    };
  }

  if (filters.role) {
    query.role = filters.role;
  }

  if (filters.active !== undefined) {
    query.active = filters.active === "true";
  }

  if (filters.startDate || filters.endDate) {

    query.createdAt = {};

    if (filters.startDate) {
      query.createdAt.$gte = new Date(filters.startDate);
    }

    if (filters.endDate) {
      query.createdAt.$lte = new Date(filters.endDate);
    }
  }

  return await db.collection(COLLECTION)
    .find(query)
    .toArray();
};

export const getProfileById = async (id: string) => {

  const db = getDb();

  if (!ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  return await db.collection(COLLECTION).findOne({
    _id: new ObjectId(id),
  });
};

export const updateProfile = async (
  id: string,
  data: any
) => {

  const db = getDb();

  if (!ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  await db.collection(COLLECTION).updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: data,
    }
  );

  return await getProfileById(id);
};

export const deleteProfile = async (
  id: string
) => {

  const db = getDb();

  if (!ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  return await db.collection(COLLECTION).deleteOne({
    _id: new ObjectId(id),
  });
};