import React from "react"
import classNames from "classnames"
import styles from "./icon.module.css"
import { EIcons } from "../../types/enums"
import {
  IconAnon,
  IconArrowDown,
  IconArrowUp,
  IconComments,
  IconComplain,
  IconHide,
  IconMenuDots,
  IconSave,
  IconSaveLight,
  IconShare,
  IconShareLight,
} from "../icons"

type TSizes = 10 | 12 | 14 | 16 | 20 | 28 | 50

interface IIconProps {
  size?: TSizes
  mobileSize?: TSizes
  tabletSize?: TSizes
  desktopSize?: TSizes
  name: EIcons
}

interface IconMap {
  [key: string]: React.ReactNode
}

const icons: IconMap = {
  [EIcons.hide]: <IconHide />,
  [EIcons.comments]: <IconComments />,
  [EIcons.save]: <IconSave />,
  [EIcons.saveLight]: <IconSaveLight />,
  [EIcons.share]: <IconShare />,
  [EIcons.shareLight]: <IconShareLight />,
  [EIcons.complain]: <IconComplain />,
  [EIcons.menuDots]: <IconMenuDots />,
  [EIcons.anon]: <IconAnon />,
  [EIcons.arrowDown]: <IconArrowDown />,
  [EIcons.arrowUp]: <IconArrowUp />,
}

function getIcon(key: string | undefined): React.ReactNode {
  if (key === undefined) {
    return undefined
  }
  return icons[key]
}

export function Icon(props: IIconProps) {
  const {
    size,
    mobileSize,
    tabletSize,
    desktopSize,
    name = EIcons.hide,
  } = props

  const classes = classNames(
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
  )

  return <span className={classes}>{getIcon(name)}</span>
}

Icon.defaultProps = {
  size: null,
  mobileSize: null,
  tabletSize: null,
  desktopSize: null,
}
