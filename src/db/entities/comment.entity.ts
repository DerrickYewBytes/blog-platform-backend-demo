import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import PostEntity from "./post.entity";
import UserEntity from "./user.entity";

@Entity('comment')
export default class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "text",
        nullable: false
    })
    comment: string

    @Column({ type: 'int', nullable: false, default: 1 })
    order: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ type: "timestamp", onUpdate: 'current_timestamp()', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date

    @ManyToOne(() => PostEntity, (post) => post.comments)
    @JoinColumn({ name: "post" })
    post: PostEntity

    @ManyToOne(() => UserEntity, (user) => user.comments, { nullable: false })
    @JoinColumn({ name: "user" })
    user: UserEntity
}