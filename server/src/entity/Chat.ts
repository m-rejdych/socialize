import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import Profile from './Profile';
import Message from './Message';

@Entity()
@ObjectType()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @ManyToMany(() => Profile, (profile) => profile.chats, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @Field(() => [Profile])
  members: Profile[];

  @OneToMany(() => Message, (message) => message.chat, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  @Field(() => [Message], { nullable: true })
  messages: Message[];
}

export default Chat;
