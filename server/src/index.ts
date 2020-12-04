import express from 'express';
import cors from 'cors';
import jwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import resolvers from './modules';
import ExtendedRequest from './types/ExtendedRequest';
import authChecker from './util/authChecker';
import { PORT, API_URI, TOKEN_SECRET } from './config';

const main = async (): Promise<void> => {
  await createConnection();

  const schema = await buildSchema({ resolvers, authChecker });

  const app = express();
  app.use(cors());
  app.use(
    API_URI as string,
    jwt({
      secret: TOKEN_SECRET as string,
      credentialsRequired: false,
      algorithms: ['HS256'],
    }),
  );

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ userId: (req as ExtendedRequest).user?.userId }),
  });
  server.applyMiddleware({ app, cors: false });

  app.listen({ path: API_URI, port: PORT }, () =>
    console.log(`Server started at http://localhost:${PORT}${API_URI}`),
  );
};

main();
