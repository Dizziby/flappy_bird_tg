type StoreType = {status: string; count: number}

const initialState = {
  status: '',
  count: 0,
}

export const gameReducer = (state: StoreType = initialState, {type}: any = {}): StoreType => {
  switch (type) {
    case 'START':
      return {...state, status: 'playing', count: 0}
    case 'GAME_OVER':
      return {...state, status: 'game-over'}
    case 'CHANGE_COUNT':
      return {...state, count: state.count + 1}
    default:
      return state
  }
}
