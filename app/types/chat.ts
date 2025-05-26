export type MessageType = "agent" | "user" | "options" | "annotation" | "supplementary"
export type InputType = "button" | "text" | "file" | "radio" | "none"

export interface Message {
  id: number
  type: MessageType
  content: string
  inputType?: InputType
  options?: string[]
  annotation?: string
  supplementary?: string
  additionalContent?: string
  validation?: (value: string) => boolean
  color?: string
  autoFill?: boolean
  buttonTextColor?: string
  timestamp?: number
} 