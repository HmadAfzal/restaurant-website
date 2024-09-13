const userTypeDefs = `#graphql
scalar DateTime
type User {
    id:ID!
    username: String!
    email: String!
    password:String!
    verificationCode: String!
    isVerified:       Boolean  !
    verifyCodeExpiry: DateTime!
  }

type Query {
    user:User!
}

type Mutation {
    signup(input:SignupInput):LoginResponse!
    verifyEmail(input:verifyEmailInput):User!
    login(input:LoginInput):User!
    logout:LogoutResponse!
}

input SignupInput {
    username: String!
    email: String!
    password:String! 
    confirmPassword:String!
}

input LoginInput {
    email: String!
    password:String!
}

input verifyEmailInput {
    email: String!
    verificationCode:String!
}

type LogoutResponse {
    message:String!
}
type LoginResponse {
    message:String!
}
`;

export default userTypeDefs;
