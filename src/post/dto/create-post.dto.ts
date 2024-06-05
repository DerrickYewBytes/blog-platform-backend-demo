import { plainToInstance } from "class-transformer"
import { IsDefined, IsString } from "class-validator"
import PostEntity from "src/db/entities/post.entity"

export default class CreatePostDto {
    @IsDefined()
    @IsString()
    title: string

    @IsDefined()
    @IsString()
    content: string

    toEntity(): PostEntity {
        return plainToInstance(PostEntity, this)
    }
}