import { InputType, Field, Int, ID } from 'type-graphql';
import { IsInt, IsAlpha, Min, IsUUID } from 'class-validator';

@InputType()
class UpdateProfileInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => Int, { nullable: true })
  @IsInt({ message: 'Phone number must be an integer!' })
  @Min(100000, { message: 'Number should be at least 6 characters long' })
  phoneNumber: number;

  @Field({ nullable: true })
  @IsAlpha(undefined, { message: 'Country can contain only letters!' })
  country: string;

  @Field({ nullable: true })
  @IsAlpha(undefined, { message: 'City can contain only letters!' })
  city: string;

  @Field({ nullable: true })
  @IsAlpha(undefined, { message: 'Relationship can contain only letters!' })
  relationship: string;
}

export default UpdateProfileInput;
