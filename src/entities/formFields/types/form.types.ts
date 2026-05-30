export interface Form {
  fields: FormField[]
}

export interface FormField {
  type: "text" | "email" | "password" | "select" | "checkbox" | string
  label: string
  model: string
  required: boolean
  minLength?: number
  options?: string[]
}