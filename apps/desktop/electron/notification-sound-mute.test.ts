import { describe, expect, it } from 'vitest'

import { applySoundMute, SOUND_MUTED_STORAGE_KEY } from './notification-sound-mute'

const storage = (value: null | string) => ({ getItem: (key: string) => (key === SOUND_MUTED_STORAGE_KEY ? value : null) })

describe('applySoundMute', () => {
  it('forces silent while app sounds are muted', () => {
    expect(applySoundMute({ title: 'Done' }, storage('true'))).toEqual({ title: 'Done', silent: true })
  })

  it('leaves the payload alone when not muted', () => {
    const payload = { title: 'Done' }

    expect(applySoundMute(payload, storage('false'))).toBe(payload)
    expect(applySoundMute(payload, storage(null))).toBe(payload)
    expect(applySoundMute(payload, undefined)).toBe(payload)
  })

  it('falls back to the payload when storage throws', () => {
    const payload = { title: 'Done', silent: false }

    expect(
      applySoundMute(payload, {
        getItem: () => {
          throw new Error('denied')
        }
      })
    ).toBe(payload)
  })
})
