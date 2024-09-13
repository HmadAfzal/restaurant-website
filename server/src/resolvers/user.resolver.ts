import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import genJwtToken from "../utils/genjJwtToken.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { GraphQLDateTime } from "graphql-scalars";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

interface DecodedToken extends JwtPayload {
  id: string;
}

const userResolvers = {
  DateTime: GraphQLDateTime,

  Query: {
    user: async (_, args, { req }) => {
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
    signup: async (_, { input }) => {
      try {
        const { username, email, password, confirmPassword } = input;
        if (!username || !email || !password || !confirmPassword) {
          throw new Error("Please fill all the required fields");
        }

        const existingUserByEmail = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUserByEmail && existingUserByEmail.isVerified) {
          throw new Error("User with this email already exists");
        }

        if (password !== confirmPassword) {
          throw new Error("Passwords don't match");
        }

        const verifyCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        const expiryDate = new Date(Date.now() + 3600000);

        let newUser;

        if (existingUserByEmail) {
          newUser = await prisma.user.update({
            where: { email },
            data: {
              password: await bcrypt.hash(password, 10),
              verificationCode: verifyCode,
              verifyCodeExpiry: expiryDate,
            },
          });
        } else {
          newUser = await prisma.user.create({
            data: {
              email,
              username,
              password: await bcrypt.hash(password, 10),
              verificationCode: verifyCode,
              verifyCodeExpiry: expiryDate,
            },
          });
        }
// console.log('sending email')
//         const emailResponse = await sendVerificationEmail(email, username, verifyCode);
//         if (!emailResponse.success) {
//           throw new Error("Error sending verification code");
//         }

        return {
          message: "User registered successfully. Please verify your account.",
        };
      } catch (error) {
        console.log("Signup error:", error);
        throw new Error(error.message || "Error signing up");
      }
    },

    verifyEmail: async (_, { input }, { req, res }) => {
     try {
       const { email, verificationCode } = input;
       if (!email || !verificationCode) {
         throw new Error("Missing required query parameters");
       }
 
       const user = await prisma.user.findUnique({ where: { email } });
       if (!user) {
         throw new Error("User not found");
       }
 
       const isCodeValid = user.verificationCode == verificationCode;
       const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
 
       if (isCodeValid && isCodeNotExpired) {
         const updatedUser = prisma.user.update({
           where: { email },
           data: {
             isVerified: true,
           },
         });
         genJwtToken(user.id,res)
         return updatedUser;
       } else {
         throw new Error("Error verifying user - please signup again");
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
        if(user.isVerified==false){
          throw new Error("Please verify your account first");
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
