import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, ID, Field, Int } from 'type-graphql';

import Post from './Post';
import Profile from './Profile';

@Entity()
@ObjectType()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @ManyToOne(() => Profile, (profile) => profile.comments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Profile)
  author: Profile;

  @ManyToOne(() => Post, (post) => post.comments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Post)
  post: Post;

  @Column()
  @Field()
  content: string;

  @Column({ default: 0 })
  @Field(() => Int)
  likes: number;

  @Column({ default: 0 })
  @Field(() => Int)
  dislikes: number;
}

export default Comment;
