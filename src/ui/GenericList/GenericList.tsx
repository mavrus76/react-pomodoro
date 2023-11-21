import React from "react"
import styles from "./genericlist.module.css"
import { noop } from "../../utils/js/noop"

export interface IItem {
  id: string
  text?: React.ReactNode
  onClick: (id: string) => void
  className?: string
  As?: "a" | "li" | "button" | "div"
  href?: string
  divider: boolean
  icon?: React.ReactNode
}

interface IGenericListProps {
  list: IItem[]
}

export function GenericList({ list }: IGenericListProps) {
  return (
    <>
      {list.map(
        ({
          As = "div",
          text,
          onClick = noop,
          className,
          id,
          href,
          divider = false,
          icon,
        }) => {
          return (
            <As
              className={className}
              onClick={() => onClick(id)}
              key={id}
              href={href}
            >
              {icon}
              <span>{text}</span>
              {divider && <span className={styles.genericlist__divider} />}
            </As>
          )
        },
      )}
    </>
  )
}
