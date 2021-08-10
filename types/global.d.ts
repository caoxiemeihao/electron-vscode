export { }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [k: string]: string | undefined
      NODE_ENV: 'development' | 'production'
      PORT: string | number
    }
  }
}
