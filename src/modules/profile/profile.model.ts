import { ObjectId } from "mongodb";

export interface Profile {
  _id?: ObjectId;
  userId: ObjectId;
  name: string;
  phone: string;
  address: string;
  birthDate: string;
}