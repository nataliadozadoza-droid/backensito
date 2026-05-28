import { ObjectId } from "mongodb";
import { getDb } from "../../config/database";

export class AuthRepository {

    private collection() {
        return getDb().collection("users");
    }

    async findEmail(email: string) {
        return this.collection().findOne({ email });
    }

    async create(user: any) {

        const result = await this.collection().insertOne(user);

        return {
            _id: result.insertedId,
            ...user,
        };
    }

    async findAll() {
        return this.collection().find().toArray();
    }

    async findById(id: string) {
        return this.collection().findOne({
            _id: new ObjectId(id),
        });
    }

    async update(id: string, data: any) {

        await this.collection().updateOne(
            {
                _id: new ObjectId(id),
            },
            {
                $set: data,
            }
        );

        return this.findById(id);
    }

    async remove(id: string) {
        return this.collection().deleteOne({
            _id: new ObjectId(id),
        });
    }
}