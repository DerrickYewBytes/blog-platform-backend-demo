import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('post')
export class PostController {
    constructor() { }

    @Get()
    getOnePost() { }

    @Post()
    createPost() { }

    @Put()
    UpdatePost() { }

    @Delete()
    DeletePost() { }
}
