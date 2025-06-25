export type FormSelectOption<Value extends string = string> = {
  name: string
  value: Value
}

export type FormInputProps = {
  isError?: boolean
}

export type FormSelectProps = {
  options: FormSelectOption[]
  placeholder?: string
  isClearable?: boolean
} & FormInputProps
