import styles from './Foreground.module.css'

export const Foreground = () => {
  return (
    <div
      className={styles.foreground}
      style={{
        position: 'absolute',
        bottom: 0,
        width: "100%",
          // width: 306,
        height: 108,
        // background: `url(${FgImage})`,
      }}
    />
  )
}
