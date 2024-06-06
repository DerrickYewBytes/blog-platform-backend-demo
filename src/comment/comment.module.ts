import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostEntity from 'src/db/entities/post.entity';
import UserEntity from 'src/db/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';
import CommentEntity from 'src/db/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PostEntity, CommentEntity]),
    AuthModule,
    UserModule,
    PostModule
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
