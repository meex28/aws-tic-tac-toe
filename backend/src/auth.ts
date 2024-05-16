import {CognitoJwtVerifier} from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  // TODO: env vars
  userPoolId: "us-east-1_zdy7Xi5ey",
  tokenUse: "access",
  clientId: "n77jnmh7cfjt6jr47jfv4171i",
});

export const authorizeCognitoJwtToken = async (token: string) => {
  try {
    return await verifier.verify(token);
  } catch {
    // TODO: is this correct? What should I catch?
    throw new Error("Unauthorized");
  }
}