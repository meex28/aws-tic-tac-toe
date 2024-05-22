import {useFetch} from "@vueuse/core";

export const usePostAuthorizationCode = (
  domain: string,
  clientId: string,
  code: string,
  redirectUri: string
) => useFetch(`https://${domain}/oauth2/token`).post(
  new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    code: code,
    redirect_uri: redirectUri
  })
).json()
