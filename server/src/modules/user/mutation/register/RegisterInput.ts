import { InputType, Field } from 'type-graphql';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

@InputType()
class RegisterInput {
  @Field()
  @IsEmail(undefined, { message: 'Enter a valid email!' })
  email: string;

  @Field()
  @Matches(/^(?=.*\d).{4,8}$/, {
    message:
      'Password must be 4 to 8 characters long and contain at least one digit!',
  })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'First name can not be empty!' })
  firstName: string;

  @Field()
  @IsNotEmpty({ message: 'Last name can not be empty!' })
  lastName: string;
}

export default RegisterInput;
