import { Chance } from 'chance';
import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { env } from '../../src/env';

const chance = new Chance();

export async function a_random_user(): Promise<RandomUser> {
  const firstName = chance.first({ nationality: 'en' });
  const lastName = chance.first({ nationality: 'en' });
  const suffix = chance.string({
    length: 4,
    pool: 'abcdefghijklmnopqrstuvwxyz',
  });
  const name = `${firstName} ${lastName} ${suffix}`;
  const password = 'A' + chance.string({ length: 8 }) + 'a' + '!' + '1';

  return {
    name,
    email: chance.email(),
    password,
  };
}

export async function an_authenticated_user(): Promise<AuthenticatedUser> {
  const user = await a_random_user();
  const client = new CognitoIdentityProviderClient();
  const username = user.email;
  await client.send(
    new AdminCreateUserCommand({
      Username: username,
      TemporaryPassword: user.password,
      // ClientId: env.CognitoUserPoolWebClientId,
      UserPoolId: env.COGNITO_USER_POOL_ID,
      MessageAction: 'SUPPRESS',
      UserAttributes: [
        { Name: 'name', Value: user.name },
        { Name: 'email', Value: user.email },
      ],
    }),
  );
  await client.send(
    new AdminSetUserPasswordCommand({
      UserPoolId: env.COGNITO_USER_POOL_ID,
      Username: username,
      Password: user.password,
      Permanent: true,
    }),
  );
  const auth = await client.send(
    new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: env.COGNITO_USER_POOL_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: user.password,
      },
    }),
  );
  const [_, payloadInBase64] =
    auth.AuthenticationResult!.AccessToken!.split('.');
  const payload = Buffer.from(payloadInBase64, 'base64').toString();
  const { sub } = JSON.parse(payload);
  return {
    username: user.email,
    email: user.email,
    sub,
    idToken: auth.AuthenticationResult!.IdToken!,
    accessToken: auth.AuthenticationResult!.AccessToken!,
  };
}

export interface RandomUser {
  name: string;
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  username: string;
  email: string;
  sub: string;
  idToken: string;
  accessToken: string;
}
