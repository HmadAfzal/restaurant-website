import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signup($input: SignupInput!) {
    signup(input: $input) {
      message
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($input: verifyEmailInput!) {
    verifyEmail(input: $input) {
      id
      email
      username
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      id
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout {
      message
    }
  }
`;
