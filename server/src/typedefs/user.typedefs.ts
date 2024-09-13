const userTypeDefs = `#graphql
type User {
    id:ID!
    username: String!
    email: String!
    password:String!
    profilePicture:String
  }

type Query {
    user:User!
}

type Mutation {
    signup(input:SignupInput):User!
    login(input:LoginInput):User!
    logout:LogoutResponse!
}

input SignupInput {
    username: String!
    email: String!
    password:String! 
}

input LoginInput {
    email: String!
    password:String!
}

type LogoutResponse {
    message:String!
}
`;

export default userTypeDefs