import { plainToInstance } from "class-transformer";
import { IsDefined, IsEmail, IsString } from "class-validator";
import UserEntity from "src/db/entities/user.entity";

export class CreateUserDto {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    password: string;

    async toEntity(): Promise<UserEntity> {
        const user = plainToInstance( UserEntity, this);
        return user;
    }
}

