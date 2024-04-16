import {useWebSocket} from "@vueuse/core";
import type {BaseMessage} from "@/model/message";
import {computed} from "vue";

const prodBackendUrl = window.location.href.replace('http://', 'ws://').replace('https://', 'wss://')
const backendUrl = import.meta.env.PROD ? `${prodBackendUrl}/ws` : 'ws://localhost:3000'
const {send, data} = useWebSocket(backendUrl)

// TODO: add validation if we can connect to websocket
export const useGameWebSocket = () => {
  const sendGameMessage = (message: BaseMessage & { body: any }) =>
    send(JSON.stringify(message));
  const receivedMessage = computed(() =>
    data.value ? JSON.parse(data.value) as BaseMessage : undefined
  );
  return {sendGameMessage, receivedMessage}
}