type StoreType = {status: string}

const initialState = {
  status: ''
}

export const gameReducer = (state: StoreType = initialState, {type}: any = {}) => {
  switch (type) {
    case 'START':
      return {...state, status: 'playing'}
    case 'GAME_OVER':
      return {...state, status: 'game-over'}
    default:
      return state
  }
}
