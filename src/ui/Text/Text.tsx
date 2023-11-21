import React from "react"
import classNames from "classnames"
import styles from "./text.module.css"
import { EColors } from "../../types/enums"

type TSizes = 10 | 12 | 14 | 16 | 20 | 28

interface ITextProps {
  As?: "span" | "h1" | "h2" | "h3" | "h4" | "div" | "p"
  children?: React.ReactNode
  size: TSizes
  mobileSize?: TSizes
  tabletSize?: TSizes
  desktopSize?: TSizes
  color?: EColors
  bold?: boolean
}

export function Text(props: ITextProps) {
  const {
    As = "span",
    children,
    size,
    bold = false,
    mobileSize,
    tabletSize,
    desktopSize,
    color = EColors.black,
  } = props

  const classes = classNames(
    styles[`s${size}`],
    { [styles.bold]: bold },
    {
      [styles[`m${mobileSize}`]]: mobileSize,
    },
    {
      [styles[`t${tabletSize}`]]: tabletSize,
    },
    {
      [styles[`d${desktopSize}`]]: desktopSize,
    },
    styles[color],
  )

  return <As className={classes}>{children}</As>
}

Text.defaultProps = {
  As: "span",
  children: null,
  mobileSize: null,
  tabletSize: null,
  desktopSize: null,
  color: null,
  bold: false,
}
