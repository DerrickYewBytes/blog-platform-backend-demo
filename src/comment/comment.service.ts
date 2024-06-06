import { Inject, Injectable, NotAcceptableException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CommentEntity from 'src/db/entities/comment.entity';
import UserEntity from 'src/db/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import CreateCommentDto from './dto/create-comment.dto';
import UpdateCommentDto from './dto/update-comment.dto copy';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
        @Inject(forwardRef(() => PostService)) private PostService: PostService,
        private dataSource: DataSource
    ) { }

    async createComment(dto: CreateCommentDto, user: UserEntity) {
        const post = await this.PostService.findOnePostWithComments(dto.post_id);
        const last_comment_order = post.comments.length > 0 ? post.comments[post.comments.length - 1].order : 0;
        const order = last_comment_order + 1;
        const dao = dto.toEntity(user, post, order);

        return this.commentRepository.insert(dao);
    }

    async updateComment(id: number, dto: UpdateCommentDto, user: UserEntity) {
        const comment = await this.findOneCommentFromOwner(id, user);
        return this.commentRepository.update({ id }, dto.toEntity());
    }

    async deleteOneComment(id: number, user: UserEntity) {
        const comment = await this.findOneCommentFromOwner(id, user);
        const result = await this.dataSource.transaction(async manager => {
            const result = await manager.delete(CommentEntity,{ id });
            this.reorderComments(comment.post.id);
            return result
        })
        return result
    }

    async findOneCommentFromOwner(id: number, user: UserEntity) {
        const comment = await this.commentRepository.findOne({ where: { id, user: { id: user.id } }, relations: ['post'] });
        if (!comment) {
            throw new NotAcceptableException('comment not found');
        }
        return comment
    }

    async deleteAllCommentsFromPost(id: number) {
        return this.commentRepository.delete({ post: { id } });
    }

    async reorderComments(post_id: number) {
        const result = await this.dataSource.transaction(async manager => {
            const comments = await manager.find(CommentEntity,{ where: { post: { id: post_id } }, order: { order: 'ASC' } });
            comments.forEach((comment, index) => comment.order = index);
            return manager.save(comments);
        })

        return result
    }

}
