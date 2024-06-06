import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorator/user.decorator';
import CommentEntity from 'src/db/entities/comment.entity';
import UserEntity from 'src/db/entities/user.entity';
import { CommentService } from './comment.service';
import CreateCommentDto from './dto/create-comment.dto';
import { dot } from 'node:test/reporters';
import UpdateCommentDto from './dto/update-comment.dto copy';
import { LoginGuard } from 'src/auth/guard/login.guard';

@UseGuards(LoginGuard)
@Controller('comment')
export class CommentController {
    constructor(
        private commentService: CommentService
    ) { }

    @Post('create')
    createComment(@Body() dto: CreateCommentDto, @User() user: UserEntity) {
        const result = this.commentService.createComment(dto, user);
        return result
    }

    @Patch(':id')
    updateComment(@Param('id') id: number, @Body() dto: UpdateCommentDto, @User() user: UserEntity) {
        const result = this.commentService.updateComment(id, dto, user);
        return result
    }

    @Delete(':id')
    deleteComment(@Param('id') id: number, @User() user: UserEntity) {
        const result = this.commentService.deleteComment(id, user);
        return result
    }
}
