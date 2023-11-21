import React, { useEffect, useState } from "react"
import styles from "./dropdown.module.css"
import { noop } from "../../utils/js/noop"

interface IDropdownProps {
  button: React.ReactNode
  children: React.ReactNode
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export function Dropdown({
  button,
  children,
  isOpen,
  onClose = noop,
  onOpen = noop,
}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen)
  useEffect(() => setIsDropdownOpen(isOpen), [isOpen])
  useEffect(
    () => (isDropdownOpen ? onOpen() : onClose()),
    [isDropdownOpen, onClose, onOpen],
  )

  const handleOpen = () => {
    if (isOpen !== undefined) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  return (
    <div className={styles.dropdown__container}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            handleOpen()
          }
        }}
      >
        {button}
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdown__listContainer}>
          <div
            role="menuitem"
            className={styles.dropdown__list}
            onClick={() => setIsDropdownOpen(false)}
            onKeyDown={(event) => {
              if (event.key === "Escape" || event.key === "Tab") {
                setIsDropdownOpen(false)
              }
            }}
            tabIndex={0}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

Dropdown.defaultProps = {
  isOpen: false,
  onOpen: noop,
  onClose: noop,
}
