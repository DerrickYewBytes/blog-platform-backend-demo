import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PostEntity from 'src/db/entities/post.entity';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/create-post.dto';
import UserEntity from 'src/db/entities/user.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity) private PostRepo: Repository<PostEntity>
    ) { }

    async getOnePost(id: number) {
        return { id: 123 }
    }

    async createPost(dto: CreatePostDto, user: UserEntity) {
        const newPost = this.PostRepo.create(dto);
        return await this.PostRepo.save(newPost);
    }

    async UpdatePost() { }

    async DeletePost() { }
}
