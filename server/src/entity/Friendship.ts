import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import Profile from './Profile';

@Entity()
@ObjectType()
class Friendship {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => Profile, (profile) => profile.requestedFriendships, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Profile)
  requestedBy: Profile;

  @ManyToOne(() => Profile, (profile) => profile.receivedFriendships, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Profile)
  addressedTo: Profile;

  @Column({ default: false })
  @Field()
  isAccepted: boolean;

  @UpdateDateColumn()
  @Field()
  friendsFrom: Date;
}

export default Friendship;
