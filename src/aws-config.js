import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-south-1_qRrZaDFT9",
      userPoolClientId: "4cssj3k75li6q8b3v409vn64o7"
    }
  }
});