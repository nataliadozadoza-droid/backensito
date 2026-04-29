
import { ObjectId } from "mongodb";
import { getDb } from "../../config/database";

const COLLECTION = "notifications";

export const createNotification = async (userId: string, message: string) => {
  const db = getDb();

  const result = await db.collection(COLLECTION).insertOne({
    userId,
    message,
    read: false,
    createdAt: new Date()
  });

  return result.insertedId;
};

export const getUserNotifications = async (userId: string) => {
  const db = getDb();

  return await db
    .collection(COLLECTION)
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
};

export const markAsRead = async (id: string) => {
  const db = getDb();

  return await db.collection(COLLECTION).findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { read: true } },
    { returnDocument: "after" }
  );
};

export const deleteNotification = async (id: string) => {
  const db = getDb();

  return await db.collection(COLLECTION).deleteOne({
    _id: new ObjectId(id)
  });
};