import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

class LocalStorageMock implements Storage {
  private data = new Map<string, string>()

  get length() {
    return this.data.size
  }

  clear() {
    this.data.clear()
  }

  getItem(key: string) {
    return this.data.get(key) ?? null
  }

  key(index: number) {
    return [...this.data.keys()][index] ?? null
  }

  removeItem(key: string) {
    this.data.delete(key)
  }

  setItem(key: string, value: string) {
    this.data.set(key, String(value))
  }
}

const localStorageMock = new LocalStorageMock()
Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: localStorageMock,
})
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: localStorageMock,
})

afterEach(() => {
  cleanup()
})

beforeEach(() => {
  window.localStorage.clear()
  window.location.hash = ''
  window.scrollTo = vi.fn()
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
})
