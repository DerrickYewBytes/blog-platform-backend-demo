import { Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

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
    createPost() { }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    UpdatePost() { }
    
    @UseGuards(AuthGuard('jwt'))
    @Delete()
    DeletePost() { }
}
