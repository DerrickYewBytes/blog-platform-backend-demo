import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PostEntity from 'src/db/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity) private PostRepo: Repository<PostEntity>
    ) { }

    async getOnePost(id: number) {
        return {id: 123}
    }

    async createPost() { }

    async UpdatePost() { }

    async DeletePost() { }
}
