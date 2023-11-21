export function unlockAudioContext(audioCtx: AudioContext) {
  if (audioCtx.state !== "suspended") return
  const BODY = document.body
  const events = ["touchstart", "touchend", "mousedown", "keydown"]
  events.forEach((e) => BODY.addEventListener(e, unlock, false))
  function unlock() {
    audioCtx.resume().then(clean)
  }
  function clean() {
    events.forEach((e) => BODY.removeEventListener(e, unlock))
  }
}

export const audioCtx = new (window.AudioContext ||
  (window as any).webkitAudioContext)()
