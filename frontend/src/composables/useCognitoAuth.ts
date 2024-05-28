// TODO: env vars?
import {useRouter} from "vue-router";
import {useStorage} from "@vueuse/core";
import {CognitoRefreshToken, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import {onMounted, ref} from "vue";
import {usePostAuthorizationCode} from "@/composables/api/useCognitoApi";

const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const region = import.meta.env.VITE_AWS_REGION;
const domain = `tic-tac-toe-app.auth.${region}.amazoncognito.com`;
const url = window.location.origin;
const redirectUri = `${url}/callback/`;
const logoutUri = `${url}/`;
const authUrl = `https://${domain}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid+profile+email`;
const logoutUrl = `https://${domain}/logout?client_id=${clientId}&logout_uri=${logoutUri}&redirect_uri=${logoutUri}`;
const poolData = {
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: clientId
};
const userPool = new CognitoUserPool(poolData);

const refreshIntervalId = ref<number>();

export const useCognitoAuth = () => {
  const router = useRouter();
  const accessToken = useStorage<string>('access_token', "");
  const idToken = useStorage<string>('id_token', "");
  const refreshToken = useStorage<string>('refresh_token', "");
  // TODO: scope?

  const signIn = () => {
    window.location.href = authUrl;
  }

  const onCallback = async () => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) {
      console.error('No code found in URL');
      return;
    }
    const {data, error} = await usePostAuthorizationCode(domain, clientId, code, redirectUri);
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
      Username: username,
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