import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import PostEntity from "./post.entity";

@Entity('comment')
export default class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "text",
        nullable: false
    })
    comment: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ type: "timestamp", default: () => "ON UPDATE CURRENT_TIMESTAMP" })
    updatedAt: Date

    @ManyToOne(() => PostEntity, (post) => post.comments)
    @JoinColumn({ name: "post" })
    post: PostEntity
}