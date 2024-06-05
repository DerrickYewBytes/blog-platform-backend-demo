import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) { }

    async register(email: string, password: string): Promise<UserEntity> {
        const existingUser = await this.findByEmail(email);

        if (existingUser) {
            throw new ConflictException('Username already exists');
        }

        const user = new UserEntity();
        user.email = email;
        user.password = password; // hash password before store

        return this.usersRepository.save(user);
    }

    async validateUser(email: string, password: string): Promise<UserEntity> {
        const user = await this.findByEmail(email);

        if (!user || user.password !== password) { // compare the hashed values
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    async create(dto: CreateUserDto): Promise<UserEntity> {
        const user = await dto.toEntity()

        return this.usersRepository.save(user);
    }

    findByEmail(email: string): Promise<UserEntity> {
        return this.usersRepository.findOne({ where: { email } });
    }
}
