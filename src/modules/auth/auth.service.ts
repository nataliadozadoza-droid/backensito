import { AuthRepository } from "./auth.repository";
import { hashPassword, comparePassword } from "../../libs/bcrypt";
import { signToken } from "../../libs/jwt";

export class AuthService {

    private repository = new AuthRepository();

    async register(user: any) {

        const exists = await this.repository.findEmail(user.email);

        if (exists) {
            throw new Error("El usuario ya existe");
        }

        const hashedPassword = await hashPassword(user.password);

        user.password = hashedPassword;
        user.role = "user";

        const result = await this.repository.create(user);

        const token = signToken({
            sub: result._id.toString(),
            email: result.email,
            role: result.role,
        });

        return {
            user: {
                id: result._id,
                name: result.name,
                email: result.email,
                role: result.role,
            },
            token,
        };
    }

    async login(data: any) {

        const user = await this.repository.findEmail(data.email);

        if (!user) {
            throw new Error("Usuario no existe");
        }

        const isValidPassword = await comparePassword(
            data.password,
            user.password
        );

        if (!isValidPassword) {
            throw new Error("Credenciales inválidas");
        }

        const token = signToken({
            sub: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }

    async findAll() {

        const users = await this.repository.findAll();

        return users.map((user: any) => {
            const { password, ...userWithoutPassword } = user;

            return userWithoutPassword;
        });
    }

    async findById(id: string) {

        const user = await this.repository.findById(id);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    async update(id: string, data: any) {

        delete data.role;

        if (data.email) {

            const exists = await this.repository.findEmail(data.email);

            if (exists && exists._id.toString() !== id) {
                throw new Error("El email ya está en uso");
            }
        }

        if (data.password) {
            data.password = await hashPassword(data.password);
        }

        const user = await this.repository.update(id, data);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    async remove(id: string) {

        const result = await this.repository.remove(id);

        if (result.deletedCount === 0) {
            throw new Error("Usuario no encontrado");
        }

        return {
            message: "Usuario eliminado correctamente",
        };
    }
}