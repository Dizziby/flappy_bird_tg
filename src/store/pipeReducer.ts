type StoreType = {
  x: number
  pipes: any[]
  heightScreen: number
  widthScreen: number
}

const initialState = {
  x: 400,
  pipes: [],
  heightScreen: 512,
  widthScreen: 400,
}

export const pipeReducer = (state: StoreType = initialState, action: any): StoreType => {
  switch (action.type) {
    case 'START':
      return {...state, x: state.widthScreen}
    case 'RUNNING':
      if (!state.pipes.length) {
        return state
      }
      return {...state, x: state.x - 10}
    case 'GENERATE':
      let topHeight = Math.round(Math.random() * 200) + 40
      // if (topHeight > state.heightScreen) {
      //   topHeight = state.heightScreen - 200
      // }
      return {...state, pipes: [...state.pipes, {topHeight}]}
    case 'GAME_OVER':
      return {...state, pipes: []}
    case 'SET_WIDTH_SCREEN':
      return {...state, widthScreen: action.widthScreen}
    case 'SET_HEIGHT_SCREEN':
      return {...state, heightScreen: action.heightScreen}
    default:
      return state
  }
}

export const setWidthScreenAC = (widthScreen: number) => ({
  type: 'SET_WIDTH_SCREEN',
  widthScreen: widthScreen,
})

export const setHeightScreenAC = (heightScreen: number) => ({
  type: 'SET_HEIGHT_SCREEN',
  heightScreen: heightScreen,
})
