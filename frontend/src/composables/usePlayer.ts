import {ref} from "vue";
import {v4 as uuid} from 'uuid';


const nickname = ref<string>('')
const id = ref<string>(uuid())

export const usePlayer = () => {
  return {nickname, id}
}