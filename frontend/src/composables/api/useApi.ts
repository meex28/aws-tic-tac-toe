import {createFetch} from "@vueuse/core";
import {useCognitoAuth} from "@/composables/useCognitoAuth";

const backendUrl = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_API_URL : 'http://localhost:3001/api'

export const useApi = createFetch({
  baseUrl: backendUrl,
  options: {
    async beforeFetch({options}) {
      // TODO: add some refreshing in case of non-existing token? or sth
      const {accessToken} = useCognitoAuth()
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken.value}`
      }
    }
  },
  fetchOptions: {
    mode: 'cors',
  },
})
