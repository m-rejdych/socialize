import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int, ID } from 'type-graphql';

import Profile from './Profile';
import Comment from './Comment';

@Entity()
@ObjectType()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @ManyToOne(() => Profile, (profile) => profile.posts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Profile)
  author: Profile;

  @Column('text')
  @Field()
  content: string;

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: ['insert', 'update'],
  })
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  @Column({ default: 0 })
  @Field(() => Int)
  likes: number;

  @Column({ default: 0 })
  @Field(() => Int)
  dislikes: number;
}

export default Post;
