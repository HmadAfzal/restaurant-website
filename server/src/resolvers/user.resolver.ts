import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import genJwtToken from "../utils/genjJwtToken.js";

const userResolvers = {
  Query: {},
  Mutation: {
    signup: async (_, { input }, { res }) => {
      try {
        const { username, email, password, confirmPassword } = input;

        if (!username || !email || !password || !confirmPassword) {
          throw new Error("Please fill all the required fields");
        }

        const emailexists = await prisma.user.findUnique({ where: { email } });
        if (emailexists) {
          throw new Error("User with this email already exists");
        }
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
          data: {
            email,
            username,
            password: hashedPassword,
          },
        });

        if (newUser) {
          await genJwtToken(newUser.id, res);

          return newUser;
        } else {
          throw new Error("Error signing up");
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    login: async (_, { input }, { res }) => {
      try {
        const { email, password } = input;
        if (!email || !password) {
          throw new Error("please fill all the required field");
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw new Error("Incorrect email");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        genJwtToken(user.id, res);
        return user;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    logout: async (_, args, { res }) => {
      try {
        res.cookie("jwt", "", { maxAge: 0 });
        return { message: "logged out successfully" };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
};

export default userResolvers;
