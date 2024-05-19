import {computed, ref} from "vue";
import {v4 as uuid} from 'uuid';
import {useCognitoAuth} from "@/composables/useCognitoAuth";

const id = ref<string>(uuid())

export const usePlayer = () => {
  const {idToken} = useCognitoAuth();

  const nickname = computed(() => {
    if (!idToken.value) return '';
    const userInfo = JSON.parse(atob(idToken.value.split('.')[1])); // Decode JWT payload
    return userInfo['cognito:username'];
  })

  const isAuthorized = computed(() => !!idToken.value);

  return {nickname, id, isAuthorized}
}