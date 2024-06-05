import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import CreatePostDto from './dto/create-post.dto';
import UserEntity from 'src/db/entities/user.entity';

@Controller('post')
export class PostController {
    constructor(
        private PostService: PostService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getOnePost(@Param('id') id: number) {
        const result = this.PostService.getOnePost(id);
        return result
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createPost(@Body() dto: CreatePostDto, user: UserEntity) {
        const result = this.PostService.createPost(dto, user);
        return result

    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    UpdatePost() { }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    DeletePost() { }
}
