const {
  projectsData: projects,
  clientsData: clients,
} = require('../sampleData');

const Project = require('../models/Project');
const Client = require('../models/Client');

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
      resolve: (parent) => Client.findById(parent.clientId),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve: () => Client.find(),
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) => Client.findById(args.id),
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => Project.find(),
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) => Project.findById(args.id),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
