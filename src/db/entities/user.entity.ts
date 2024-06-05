import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CommentEntity from './comment.entity';
import PostEntity from './post.entity';

@Entity('user')
export default class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'varchar' })
    email: string

    @Column({ type: 'varchar' })
    password: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: () => 'ON UPDATE CURRENT_TIMESTAMP' })
    updatedAt: Date

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[]

    @OneToMany(() => CommentEntity, (comment) => comment.post)
    comments: CommentEntity[]
}