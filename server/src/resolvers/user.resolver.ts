import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import genJwtToken from "../utils/genjJwtToken.js";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
}

const userResolvers = {
  Query: {
    user: async (_, args, { req, res }) => {
      try {
        const token = req.cookies?.jwt;
        if (!token) {
          throw new Error("Unauthorized - No token found");
        }

        const decodedUser = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as DecodedToken;
        if (!decodedUser) {
          throw new Error("Unauthorized - Invalid Token");
        }

        const user = await prisma.user.findUnique({
          where: { id: decodedUser.id },
          select: { id: true, username: true, email: true },
        });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (error) {
        console.log("Error in  getting user", error.message);
        throw new Error(error);
      }
    },
  },
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
