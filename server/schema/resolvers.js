const { MovieList, UserList } = require("../fakedata");
const _ = require("lodash");
const { isString, isNumber, update } = require("lodash");
const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = parseInt(args.id);
      const user = UserList.find(person => person.id === id);
      return user;
    },
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      console.log(args)
      const id = args.name;
      const movie = MovieList.find(movie => movie.name === args.name);
      return movie;
    }
  },
  User: {
    favouriteMovies: () => {
      const movie = MovieList.filter((movies) =>  movies.yearOfPublication > 2000 && movies.yearOfPublication < 2010);
      return movie;
    }
  },
  Mutation: {
    createUser: (parent, args) => {
      const {name, username, age, nationality} = args.input;
      const id = UserList[UserList.length - 1].id + 1;
      const newUser = {
        id,
        name,
        username,
        age,
        nationality
      }
      console.log(newUser);
      UserList.push(newUser);
      return newUser
    },
    updateUser: (parent, args) => {
      const { id, name, username, age, nationality } = args.input;
      let updatedUser;
      UserList.forEach(user => {
        if(user.id === Number(id)) {
          user.id = parseInt(id),
          user.name = name,
          user.username = username,
          user.age = age,
          user.nationality = nationality
          return updatedUser = user;
        }
      })
      console.log(updatedUser);
      return updatedUser;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      console.log(UserList);
      return UserList;
    }
  }
}

module.exports = { resolvers };