// TODO: env vars?
import {useRouter} from "vue-router";
import {useFetch, useStorage} from "@vueuse/core";
import {CognitoRefreshToken, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import {onMounted, ref} from "vue";

const clientId = '2jbpf4smqhtoklvduiat62vjs8';
const region = 'us-east-1';
const domain = `tic-tac-toe-app.auth.${region}.amazoncognito.com`;
const redirectUri = 'http://localhost:5173/callback/';
const logoutUri = 'http://localhost:5173/';

const poolData = {
  UserPoolId: "us-east-1_8OC2DPj9E",
  ClientId: "2jbpf4smqhtoklvduiat62vjs8"
};
const userPool = new CognitoUserPool(poolData);

const refreshIntervalId = ref<number>();

export const useCognitoAuth = () => {
  const router = useRouter();
  const accessToken = useStorage<string>('access_token', "");
  const idToken = useStorage<string>('id_token', "");
  const refreshToken = useStorage<string>('refresh_token', "");
  // TODO: scope?
  const authUrl = `https://${domain}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid+profile+email`;
  const logoutUrl = `https://${domain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;

  const signIn = () => {
    window.location.href = authUrl;
  }

  const onCallback = async () => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) {
      console.error('No code found in URL');
      return;
    }
    const {data, error} = await useFetch(`https://${domain}/oauth2/token`, {
      beforeFetch(ctx) {
        ctx.options.headers = {
          ...ctx.options.headers,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
    }).post(new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      code: code,
      redirect_uri: redirectUri
    })).json();
    if (error.value) {
      console.error(`Error exchanging code for token: ${error.value}`);
      return;
    }
    accessToken.value = data.value.access_token;
    idToken.value = data.value.id_token;
    refreshToken.value = data.value.refresh_token;
    await router.push('/');
  }

  const signOut = () => {
    window.location.href = logoutUrl;
    accessToken.value = "";
    idToken.value = "";
    refreshToken.value = "";
  }

  onMounted(() => {
    if (!refreshIntervalId.value) {
      refreshIntervalId.value = setInterval(async () => {
        if (!accessToken.value) return;
        const expired = JSON.parse(atob(accessToken.value.split('.')[1]))["exp"];
        if (expired < (Date.now() - 60 * 1000) / 1000) {
          console.log("Token expired, refreshing...");
          await refresh();
        }
      }, 10000)
    }
  })

  const refresh = async () => {
    const username = JSON.parse(atob(idToken.value.split('.')[1]))["cognito:username"];
    const cognitoUser = new CognitoUser({
      Username: username, // Replace with username
      Pool: userPool
    });
    const refreshTokenObject = new CognitoRefreshToken({RefreshToken: refreshToken.value});
    cognitoUser.refreshSession(refreshTokenObject, (err, session) => {
      if (err) {
        console.error('Error refreshing token:', err);
      } else {
        console.log('Access token refreshed successfully!');
        accessToken.value = session.getAccessToken().getJwtToken();
        idToken.value = session.getIdToken().getJwtToken();
        refreshToken.value = session.getRefreshToken().getToken();
      }
    });
  }

  return {
    signIn,
    onCallback,
    signOut,
    accessToken,
    idToken,
    refreshToken
  }
}