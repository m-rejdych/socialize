import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, ID, Root } from 'type-graphql';

import Profile from './Profile';

@Entity()
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  password: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Field()
  fullName(@Root() root: User): string {
    return `${root.firstName} ${root.lastName}`;
  }

  @Column({ default: false })
  @Field()
  isAdmin: boolean;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: ['insert', 'update'],
  })
  @Field(() => Profile)
  profile: Profile;
}

export default User;
