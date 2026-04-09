import { getDb } from "../../config/database";
import { Profile } from "./profile.model";
import { ObjectId } from "mongodb";

const collectionName = "profiles";

export const createProfile = async (data: Profile) => {
  const db = getDb();
  const result = await db.collection(collectionName).insertOne(data);
  return result;
};

export const getProfiles = async () => {
  const db = getDb();
  return await db.collection(collectionName).find().toArray();
};

export const getProfileById = async (id: string) => {
  const db = getDb();
  return await db.collection(collectionName).findOne({
    _id: new ObjectId(id),
  });
};

export const updateProfile = async (id: string, data: Partial<Profile>) => {
  const db = getDb();
  return await db.collection(collectionName).updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
};

export const deleteProfile = async (id: string) => {
  const db = getDb();
  return await db.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
  });
};