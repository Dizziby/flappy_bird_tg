import {configureStore, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit'
import {gameReducer} from "./gameReducer";
import {pipeReducer} from "./pipeReducer";
import {birdReducer} from "./birdReducer";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    bird: birdReducer,
    pipe: pipeReducer,
  },
})

export type AppStateType = ReturnType<typeof store.getState>
export type AppRootActionsType = any

export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AppRootActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppRootActionsType>
