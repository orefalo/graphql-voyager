import type { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import renderVoyagerPage, { MiddlewareOptions } from './render-voyager-page';

/*
import fastify from 'fastify'
import mercurius from 'mercurius'
// import GraphQLVoyagerFastify from "graphql-voyager-fastify-plugin";
import GraphQLVoyagerFastify from '../index'

const app = fastify({
  logger: {
    level: 'info',
  },
})

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`

const resolvers = {
  Query: {
    add: async (_: unknown, { x, y }: { x: number; y: number }) => x + y,
  },
}

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: false,
  ide: false,
  path: '/graphql',
})

app.register(GraphQLVoyagerFastify, {
   path: '/voyager',
   endpoint: '/graphql',
 })
 
app.listen(3000)
 */

export interface GraphQLVoyagerFastifyPluginOptions extends MiddlewareOptions {
  /**
   * Path in which GraphQL Voyager will be accesible.
   *
   * By default is `/voyager`
   */
  path?: string;
}

const graphqlVoyagerFasitfyPlugin: FastifyPluginCallback<GraphQLVoyagerFastifyPluginOptions> = (
  fastify,
  { path = '/voyager', endpoint = '/graphql', ...renderOptions } = {},
  done,
) => {
  // fastify.register(fastifyStatic, {
  //   //TODO
  //   root: '/dist',
  //   prefix: baseUrl,
  // })

  const voyagerPage = renderVoyagerPage({
    endpoint,
    ...renderOptions,
  });

  fastify.get(path, (_req, res) => {
    res.type('text/html').send(voyagerPage);
  });

  done();
};

export default fp(graphqlVoyagerFasitfyPlugin, {
  fastify: '>= 3.x',
  name: 'graphql-voyager-fastify-plugin',
});
