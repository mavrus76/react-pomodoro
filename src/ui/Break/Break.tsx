import React from "react"
import classNames from "classnames"
import styles from "./break.module.css"

type TBreakSize = 4 | 8 | 12 | 16 | 20
type TDisplay = "mobile" | "tablet" | "desktop"

interface IBreakProps {
  size: TBreakSize
  mobileSize?: TBreakSize
  tabletSize?: TBreakSize
  desktopSize?: TBreakSize
  inline?: boolean
  top?: boolean
}

export function Break(props: IBreakProps) {
  const {
    inline = false,
    top = false,
    size,
    mobileSize,
    tabletSize,
    desktopSize,
  } = props

  return (
    <div
      className={classNames(
        styles[`s${size}`],
        {
          [styles[`m${mobileSize}`]]: mobileSize,
        },
        {
          [styles[`t${tabletSize}`]]: tabletSize,
        },
        {
          [styles[`d${desktopSize}`]]: desktopSize,
        },
        { [styles.inline]: inline },
        { [styles.top]: top },
      )}
    />
  )
}

Break.defaultProps = {
  mobileSize: null,
  tabletSize: null,
  desktopSize: null,
  inline: false,
  top: false,
}
