import "./header.css"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import { NavLink } from "react-router-dom"
import { useActions } from "../../hooks/useActions"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useConstants } from "../../hooks/useConstants"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"

export function Header() {
  const { selectedHome, dark, runningTimer } = useConstants()
  const {
    setSelectedHome,
    setCurrentTask,
    setCurrentTimer,
    setModeDark,
    setRunningTimer,
  } = useActions()
  let location = useLocation()
  let pathname = location.pathname

  const handleClick = () => {
    setSelectedHome(!selectedHome)
  }

  const handleModeDark = () => {
    setModeDark(true)
    document.body.classList.add("dark")
  }

  const handleModeLight = () => {
    setModeDark(false)
    document.body.classList.remove("dark")
  }

  useEffect(() => {
    if (pathname === "/stats") {
      setSelectedHome(false)
    } else if (pathname === "/") {
      setSelectedHome(true)
    }
    if (dark) {
      handleModeDark()
    }
    setCurrentTask(null)
    setCurrentTimer(null)
    if (!runningTimer) {
      setRunningTimer(false)
    }
  }, [])

  return (
    <header className="bg-slate-400 lg:py-4 py-2">
      <div className="container mx-auto lg:px-14 px-4 flex items-center justify-between">
        <picture>
          <source
            srcSet="/logo-desktop.png"
            type="image/png"
            media="(min-width: 1024px)"
          />
          <source
            srcSet="/logo-mobile.png"
            type="image/png"
            media="(min-width: 320px)"
          />
          <img className="inline-block" src="/logo-mobile.png" alt="logo" />
        </picture>
        <div className="flex items-center">
          <nav className="mr-4">
            {!selectedHome && (
              <NavLink
                className="group flex header__link"
                id="home"
                to="/"
                onClick={handleClick}
              >
                <HomeOutlinedIcon className="me-1 header__icon" />
                Home
              </NavLink>
            )}
            {selectedHome && (
              <NavLink
                className="group flex header__link"
                id="stats"
                to="/stats"
                onClick={handleClick}
              >
                <QueryStatsOutlinedIcon className="me-1 header__icon" />
                Stats
              </NavLink>
            )}
          </nav>
          {dark ? (
            <LightModeIcon
              className="cursor-pointer"
              fontSize="large"
              onClick={handleModeLight}
            />
          ) : (
            <DarkModeIcon
              className="cursor-pointer"
              fontSize="large"
              onClick={handleModeDark}
            />
          )}
        </div>
      </div>
    </header>
  )
}
