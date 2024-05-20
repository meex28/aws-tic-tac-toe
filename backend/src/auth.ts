import {CognitoJwtVerifier} from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  // TODO: env vars
  userPoolId: "us-east-1_8OC2DPj9E",
  tokenUse: "access",
  clientId: "2jbpf4smqhtoklvduiat62vjs8",
});

export const authorizeCognitoJwtToken = async (token: string) => {
  return await verifier.verify(token);
}