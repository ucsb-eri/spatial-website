const { AuthenticationError } = require('apollo-server-express');
const { People, Projects, AdminProfile} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    people: async () => {
      return People.find();
    },
    projects: async () => {
      return Projects.find();
    },
    // admin: async (parent, { profileId }) => {
    //   return AdminProfile.findOne({ _id: profileId });
    // },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    // me: async (parent, args, context) => {
    //   if (context.user) { // context comes from our App.js and is our authenticated user 
    //     return Profile.findOne({ _id: context.user._id });
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },

  Mutation: {
    addProject: async (parent, {name, description, image}, context) => {
      if (context.user) {
        console.log(name)
        const project = await Projects.create({name, description, image})
        return project
      }
    },
    editProject: async (parent, {id, name, description, image}, context) => {
      if (context.user) {
        const updateProject = await Projects.findByIdAndUpdate(
          {_id: id},
          {name, description, image},
          {new: true}
          )
        return updateProject
      } 
    },
    deleteProject: async (parent, {id}, context) => {
      if (context.user) {
        const deletedProject = await Projects.deleteOne({_id: id})
        const projects = await Projects.find()
        return projects
      }
    },
    adminSignOn: async (parent, {email, password}) => {
      const admin = await AdminProfile.findOne({ email })
      if (!admin) {
        throw new AuthenticationError("incorrect credentials");
      }
      try {
        const correctPw = await admin.isCorrectPassword(password)
        if (!correctPw) {
          throw new AuthenticationError("incorrect credentials");
        }
        const token = signToken(admin);
        console.log(token)
        console.log("admin signed in");
        return {token, admin}
      } catch (err) {
        console.error("Error trying to login", err)
      }
      
    }
  }
  // Mutation: {
  //   addProfile: async (parent, { name, email, password }) => {
  //     const profile = await Profile.create({ name, email, password });
  //     const token = signToken(profile);

  //     return { token, profile };
  //   },
  //   login: async (parent, { email, password }) => {
  //     const profile = await Profile.findOne({ email });

  //     if (!profile) {
  //       throw new AuthenticationError('No profile with this email found!');
  //     }

  //     const correctPw = await profile.isCorrectPassword(password);

  //     if (!correctPw) {
  //       throw new AuthenticationError('Incorrect password!');
  //     }

  //     const token = signToken(profile);
  //     return { token, profile };
  //   },

  //   // Add a third argument to the resolver to access data in our `context`
  //   addSkill: async (parent, { profileId, skill }, context) => {
  //     // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
  //     if (context.user) {
  //       return Profile.findOneAndUpdate(
  //         { _id: profileId },
  //         {
  //           $addToSet: { skills: skill },
  //         },
  //         {
  //           new: true,
  //           runValidators: true,
  //         }
  //       );
  //     }
  //     // If user attempts to execute this mutation and isn't logged in, throw an error
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  //   // Set up mutation so a logged in user can only remove their profile and no one else's
  //   removeProfile: async (parent, args, context) => {
  //     if (context.user) {
  //       return Profile.findOneAndDelete({ _id: context.user._id });
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  //   // Make it so a logged in user can only remove a skill from their own profile
  //   removeSkill: async (parent, { skill }, context) => {
  //     if (context.user) {
  //       return Profile.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $pull: { skills: skill } },
  //         { new: true }
  //       );
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  // },
};

module.exports = resolvers;
