import {useApi} from "@/composables/useApi";
import type {GameResultResponse} from "@/model/game";

export const useFetchPlayerGames = () => useApi('/game').get().json<GameResultResponse[]>();