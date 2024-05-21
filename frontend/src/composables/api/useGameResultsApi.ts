import {useApi} from "@/composables/api/useApi";
import type {GameResultResponse} from "@/model/game";

export const useFetchPlayerGamesResults = () => useApi('/game').get().json<GameResultResponse[]>();