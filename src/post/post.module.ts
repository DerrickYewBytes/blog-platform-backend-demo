import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostEntity from 'src/db/entities/post.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), AuthModule, UserModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule { }
