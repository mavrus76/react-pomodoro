import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useAppDispatch } from "../store/hooks"
import { rootActions } from "../store/rootActions"

export function useActions() {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
