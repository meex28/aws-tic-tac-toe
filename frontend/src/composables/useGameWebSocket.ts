import {useWebSocket} from "@vueuse/core";
import type {BaseMessage} from "@/model/message";
import {computed, ref, watchEffect} from "vue";
import {useCognitoAuth} from "@/composables/useCognitoAuth";

const prodBackendUrl = window.location.href.replace('http://', 'ws://').replace('https://', 'wss://')
const backendUrl = import.meta.env.PROD ? `${prodBackendUrl}/ws` : 'ws://localhost:3000'
const backendUrlWithToken = ref(backendUrl)
const {send, data, open} = useWebSocket(backendUrlWithToken, {immediate: false})

export const useGameWebSocket = () => {
  const sendGameMessage = (message: BaseMessage & { body: any }) =>
    send(JSON.stringify(message));
  const receivedMessage = computed(() =>
    data.value ? JSON.parse(data.value) as BaseMessage : undefined
  );

  const {accessToken} = useCognitoAuth();
  watchEffect(() => {
    // open connection if user is authenticated
    if (accessToken.value) {
      backendUrlWithToken.value = `${backendUrl}?token=${accessToken.value}`
      open();
    }
  })

  return {sendGameMessage, receivedMessage}
}