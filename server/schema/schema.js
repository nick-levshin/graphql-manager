const {
  projectsData: projects,
  clientsData: clients,
} = require('../sampleData');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent) =>
        clients.find((client) => client.id === parent.clientId),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve: () => clients,
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) =>
        clients.find((client) => client.id === args.id),
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => projects,
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) =>
        projects.find((project) => project.id === args.id),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
