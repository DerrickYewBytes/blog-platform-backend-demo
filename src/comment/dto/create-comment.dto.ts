import { plainToInstance } from "class-transformer";
import { IsDefined, IsNumber, IsString } from "class-validator";
import CommentEntity from "src/db/entities/comment.entity";
import PostEntity from "src/db/entities/post.entity";
import UserEntity from "src/db/entities/user.entity";

export default class CreateCommentDto {
    @IsDefined()
    @IsNumber()
    post_id: number;

    @IsDefined()
    @IsString()
    comment: string

    toEntity(user: UserEntity, post: PostEntity): CommentEntity {
        const comment = plainToInstance(CommentEntity, this);
        comment.user = user;
        comment.post = post;
        return comment;
    }
}