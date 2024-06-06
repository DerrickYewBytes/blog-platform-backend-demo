import { plainToInstance } from "class-transformer";
import { IsDefined, IsNumber, IsString } from "class-validator";
import CommentEntity from "src/db/entities/comment.entity";
import UserEntity from "src/db/entities/user.entity";

export default class UpdateCommentDto {
    @IsDefined()
    @IsString()
    comment: string

    toEntity(): CommentEntity {
        const comment = plainToInstance(CommentEntity, this);
        return comment;
    }
}