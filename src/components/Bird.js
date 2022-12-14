import React from 'react'
import {useAppSelector} from '../hooks/useAppSelector'
import styles from './Bird.module.css'

export const Bird = () => {
  const y = useAppSelector((state) => state.bird.y)
  const r = useAppSelector((state) => state.bird.r)

  return (
    <div
      className={styles.bird}
      style={{
        position: 'absolute',
        top: y,
        left: 120,
        width: 38,
        height: 26,
        // background: `url(${BirdImage})`,
        transform: `rotate(${r}deg)`,
        transition: 'transform 100ms, top 300ms',
      }}
    />
  )
}
