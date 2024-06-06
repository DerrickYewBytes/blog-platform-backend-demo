import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CommentEntity from 'src/db/entities/comment.entity';
import UserEntity from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import CreateCommentDto from './dto/create-comment.dto';
import UpdateCommentDto from './dto/update-comment.dto copy';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
        private PostService: PostService
    ) { }

    async createComment(dto: CreateCommentDto, user: UserEntity) {
        const post = await this.PostService.findOnePost(dto.post_id);
        const dao = dto.toEntity(user, post);

        return this.commentRepository.insert(dao);
    }

    async updateComment(id: number, dto: UpdateCommentDto, user: UserEntity) {
        const comment = await this.findOneCommentFromOwner(id, user);
        return this.commentRepository.update({ id }, dto.toEntity());
    }

    async deleteComment(id: number, user: UserEntity) {
        const comment = await this.findOneCommentFromOwner(id, user);
        return this.commentRepository.delete({ id });
    }

    async findOneCommentFromOwner(id: number, user: UserEntity) {
        const comment = await this.commentRepository.findOne({ where: { id, user: { id: user.id } } });
        if (!comment) {
            throw new Error('comment not found');
        }
        return comment
    }

}
