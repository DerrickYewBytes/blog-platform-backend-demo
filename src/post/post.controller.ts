import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import CreatePostDto from './dto/create-post.dto';
import UserEntity from 'src/db/entities/user.entity';
import { LoginGuard } from '../auth/guard/login.guard';
import { User } from 'src/common/decorator/user.decorator';
import UpdatePostDto from './dto/update-post.dto';

@UseGuards(LoginGuard)
@Controller('post')
export class PostController {
    constructor(
        private PostService: PostService
    ) { }

    @Get('getOne/:id')
    getOnePost(@Param('id') id: number, @User() user: UserEntity) {
        const result = this.PostService.findOnePostAndComments(id);
        return result
    }

    @Get('all')
    getAllPosts(@User() user: UserEntity) {
        const result = this.PostService.findAllPostsAndComments();
        return result
    }

    @Post('create')
    createPost(@Body() dto: CreatePostDto, @User() user: UserEntity) {
        const result = this.PostService.createPost(dto, user);
        return result

    }

    @Patch(':id')
    UpdatePost(@Param('id') id: number, @Body() dto: UpdatePostDto, @User() user: UserEntity) {
        const result = this.PostService.UpdatePost(id, dto, user);
        return result
    }


    @Delete(':id')
    DeletePost(@Param('id') id: number, @User() user: UserEntity) {
        const result = this.PostService.DeletePost(id, user);
        return result
    }


}
