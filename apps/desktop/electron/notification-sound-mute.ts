import type { HermesNotification } from './notification-types'

// Mirrors HAPTICS_MUTED_STORAGE_KEY in src/store/haptics.ts.
export const SOUND_MUTED_STORAGE_KEY = 'hermes.desktop.hapticsMuted'

// The app-sounds toggle also silences OS notification sounds.
export function applySoundMute(payload: HermesNotification, storage: Pick<Storage, 'getItem'> | undefined) {
  let muted = false

  try {
    muted = storage?.getItem(SOUND_MUTED_STORAGE_KEY) === 'true'
  } catch {
    // Storage can throw in locked-down contexts; fall back to the payload.
  }

  return muted ? { ...payload, silent: true } : payload
}
