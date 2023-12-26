export interface User {
  id: number
  displayName: string
  username: string
  avatar: string
  status: "online" | "offline"
  isSentFR?: boolean
  isAcceptFR?: boolean
}
