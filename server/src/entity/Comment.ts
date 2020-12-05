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
import User from './User';

@Entity()
@ObjectType()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  @Field(() => User)
  author: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @Field(() => Post)
  post: Post;

  @Column()
  @Field()
  content: string;

  @Column()
  @Field(() => Int)
  likes: number;

  @Column()
  @Field(() => Int)
  dislikes: number;
}

export default Comment;
