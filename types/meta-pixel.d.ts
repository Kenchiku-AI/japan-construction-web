declare global {
  interface Window {
    fbq: (
      command: string,
      eventName?: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export { };