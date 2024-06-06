import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PostEntity from 'src/db/entities/post.entity';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/create-post.dto';
import UserEntity from 'src/db/entities/user.entity';
import UpdatePostDto from './dto/update-post.dto';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity) private PostRepository: Repository<PostEntity>,
        private commentService: CommentService
    ) { }

    async findOnePost(id: number) {
        const post = await this.PostRepository.findOne({ where: { id }, relations: ['user'] });
        if (!post) {
            throw new NotAcceptableException('Post not found');
        }
        return post
    }

    async findOnePostWithComments(id: number) {
        const post = await this.PostRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.comments', 'com')
            .leftJoinAndSelect('com.user', 'u')
            .where('post.id = :id', { id })
            .orderBy('com.order', 'ASC')
            .getOne();
        if (!post) {
            throw new NotAcceptableException('Post not found');
        }
        return post
    }

    async createPost(dto: CreatePostDto, user: UserEntity) {
        const dao = dto.toEntity(user);
        return this.PostRepository.insert(dao);
    }

    async UpdatePost(id: number, dto: UpdatePostDto, user: UserEntity) {
        const post = await this.findOnePost(id);
        this.verifyPostOwnership(user, post);
        return this.PostRepository.update({ id }, dto);
    }

    async DeletePost(id: number, user: UserEntity) {
        const post = await this.findOnePost(id);
        this.verifyPostOwnership(user, post);
        this.commentService.deleteAllCommentsFromPost(id);
        return this.PostRepository.delete({ id });
    }

    verifyPostOwnership(user: UserEntity, post: PostEntity) {
        if (user.id !== post.user.id) {
            throw new NotAcceptableException('Not allowed');
        }
    }
}
