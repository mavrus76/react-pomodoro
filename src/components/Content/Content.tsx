import React from "react"
import styles from "./content.module.css"
import classNames from "classnames"

interface IContentProps {
  children?: React.ReactNode
}

export function Content({ children }: IContentProps) {
  return <main className={classNames(styles.wrapper)}>{children}</main>
}

Content.defaultProps = {
  children: null,
}
