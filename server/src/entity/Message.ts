import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  BaseEntity,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => Profile, (profile) => profile.readMessages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @Field(() => [Profile])
  readBy: Profile[];

  @Column()
  @Field()
  content: string;
}

export default Message;
