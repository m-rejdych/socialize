import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import Post from './Post';
import Comment from './Comment';
import User from './User';

@Entity()
@ObjectType()
class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @OneToOne(() => User, (user) => user.profile, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => User)
  user: User;

  @OneToMany(() => Post, (post) => post.author, {
    cascade: ['insert', 'update'],
  })
  @Field(() => [Post], { nullable: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author, {
    cascade: ['insert', 'update'],
  })
  comments: Comment[];
}

export default Profile;
