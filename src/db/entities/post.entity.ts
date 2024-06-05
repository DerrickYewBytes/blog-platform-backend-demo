import { Column, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CommentEntity from "./comment.entity";
import UserEntity from "./user.entity";

export default class PostEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "text",
        nullable: false
    })
    title: string

    @Column({
        type: "text",
        nullable: false
    })
    content: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ type: "timestamp", default: () => "ON UPDATE CURRENT_TIMESTAMP" })
    updatedAt: Date

    @ManyToOne(() => UserEntity, user => user.posts)
    @JoinColumn({ name: "user" })
    user: UserEntity

    @OneToMany(() => CommentEntity, comment => comment.post)
    comments: CommentEntity[]
}