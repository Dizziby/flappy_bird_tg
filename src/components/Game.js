import {useEffect, useRef} from 'react'
import {useAppSelector} from '../hooks/useAppSelector'
import {Foreground} from './Foreground'
import {useAppDispatch} from '../hooks/useAppDispatch'
import {Bird} from './Bird'
import {Pipe} from './Pipe'
import styles from './Game.module.css'

let gameLoop
let pipeGenerator

export const Game = () => {
  const status = useAppSelector((state) => state.game.status)
  const birdY = useAppSelector((state) => state.bird.y)
  const pipes = useAppSelector((state) => state.pipe.pipes)
  const x = useAppSelector((state) => state.pipe.x)

  const dispatch = useAppDispatch()

  if (status === 'game-over') {
    clearInterval(gameLoop)
    clearInterval(pipeGenerator)
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 32) {
        fly()
      }
      if (status !== 'playing') {
        start(status)
      }
    }
    document.addEventListener('keypress',handleKeyPress)
    return () => {
      document.removeEventListener('keypress',handleKeyPress)
    }
  }, [status])

  const birdYRef = useRef(null)
  const xRef = useRef(null)
  const pipesRef = useRef(null)

  useEffect(() => {
    birdYRef.current = birdY
  }, [birdY])

  useEffect(() => {
    xRef.current = x
  }, [x])

  useEffect(() => {
    pipesRef.current = pipes
  }, [pipes])

  const start = (status) => {
    if (status !== 'playing') {
       gameLoop = setInterval(() => {
        dispatch({type: 'FALL'})
        dispatch({type: 'RUNNING'})

        check(birdYRef.current, xRef.current, pipesRef.current)
      }, 200)

      pipeGenerator = setInterval(() => {
        dispatch({type: 'GENERATE'})
      }, 3000)

      dispatch({type: 'START'})
    }
  }

  const fly = () => {
    dispatch({type: 'FLY'})
  }

  const check = (birdY, x, pipes) => {
    const challenge = pipes
      .map(({topHeight}, i) => {
        return {
          x1: x + i * 200,
          y1: topHeight,
          x2: x + i * 200,
          y2: topHeight + 100,
        }
      })
      .filter(({x1}) => {
        if (x1 > 0 && x1 < 288) {
          return true
        }
      })

    if (birdY > 512 - 108 || birdY < 0) {
      dispatch({type: 'GAME_OVER'})
    }

    if (challenge.length) {
      const {x1, y1, x2, y2} = challenge[0]

      if ((x1 < 120 && 120 < x1 + 52 && birdY < y1) || (x2 < 120 && 120 < x2 + 52 && birdY > y2)) {
        dispatch({type: 'GAME_OVER'})
      }
    }
  }

  return (
    <div className={styles.game}>
      <Bird />
      <Pipe />
      <Foreground />
    </div>
  )
}
