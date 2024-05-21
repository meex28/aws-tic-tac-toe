import {useFetch} from "@vueuse/core";

export const usePostAuthorizationCode = (
  domain: string,
  clientId: string,
  code: string,
  redirectUri: string
) => useFetch(`https://${domain}/oauth2/token`, {beforeFetch}).post(
  new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    code: code,
    redirect_uri: redirectUri
  })
).json()

export const useRefreshToken = (
  domain: string,
  clientId: string,
  code: string,
  redirectUri: string
) => useFetch(`https://${domain}/oauth2/token`, {beforeFetch}).post(
  new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    code: code,
    redirect_uri: redirectUri
  })
).json()

const beforeFetch = (ctx: any) => {
  ctx.options.headers = {
    ...ctx.options.headers,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}