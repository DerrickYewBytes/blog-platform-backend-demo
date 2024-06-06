import { plainToInstance } from "class-transformer"
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator"
import PostEntity from "src/db/entities/post.entity"
import UserEntity from "src/db/entities/user.entity"

export default class UpdatePostDto {
    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    content: string

    toEntity(user: UserEntity): PostEntity {
        const post = plainToInstance(PostEntity, this)

        return post
    }
}