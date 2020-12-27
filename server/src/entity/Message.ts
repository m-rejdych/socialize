import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import Chat from './Chat';
import Profile from './Profile';

@Entity()
@ObjectType()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @ManyToOne(() => Profile, (profile) => profile.messages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Profile)
  author: Profile;

  @ManyToOne(() => Chat, (chat) => chat.messages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Chat)
  chat: Chat;

  @Column()
  @Field()
  content: string;
}

export default Message;
