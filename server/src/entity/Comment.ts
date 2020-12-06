import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
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

  @Column('text')
  @Field()
  content: string;

  @Column({ default: 0 })
  @Field(() => Int)
  likes: number;

  @Column({ default: 0 })
  @Field(() => Int)
  dislikes: number;

  @ManyToMany(() => Profile, (profile) => profile.likedComments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @Field(() => [Profile], { nullable: true })
  likedBy: Profile[];

  @ManyToMany(() => Profile, (profile) => profile.dislikedComments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @Field(() => [Profile], { nullable: true })
  dislikedBy: Profile[];
}

export default Comment;
