import { Resolver, Mutation, Query } from 'type-graphql';

@Resolver()
class TestResolver {
  @Query()
  testQuery(): string {
    return 'Hello query!';
  }

  @Mutation()
  testMutation(): string {
    return 'Hello mutation!';
  }
}

export default TestResolver;
