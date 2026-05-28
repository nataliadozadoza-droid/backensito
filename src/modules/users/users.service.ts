import { ObjectId } from "mongodb";
import { hashPassword } from "../../libs/bcrypt";
import { UsersRepository } from "./users.repository";

export class UsersService {

    private repository = new UsersRepository();

    async register(data: any) {

        const exists =
            await this.repository.findByEmail(data.email);

        if (exists) {
            throw new Error("El usuario ya existe");
        }

        data.password =
            await hashPassword(data.password);

        data.role = "user";

        return await this.repository.create(data);
    }

    async findAllUsers() {

        const users =
            await this.repository.findAllUsers();

        return users.map((user: any) => {

            const { password, ...rest } = user;

            return rest;
        });
    }

    async findById(id: string) {

        if (!ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }

        const user =
            await this.repository.findById(id);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const { password, ...rest } = user;

        return rest;
    }

    async update(id: string, data: any) {

        if (!ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }

        delete data.password;
        delete data.role;

        await this.repository.update(id, data);

        return this.findById(id);
    }

    async remove(id: string) {

        if (!ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }

        const result =
            await this.repository.remove(id);

        if (result.deletedCount === 0) {
            throw new Error("Usuario no encontrado");
        }

        return {
            message: "Usuario eliminado",
        };
    }
}