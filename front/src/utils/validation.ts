export const TITLE_VALIDATION = {
  required: "Can't be Empty max: 25 Symbols",
  maxLength: {
    value: 25,
    message: 'Too Long',
  },
}

export const TASKS_CONTENT_VALIDATION = {
  required: "Can't be Empty",
  minLength: 1,
}

export const CREATE_CONTENT_VALIDATION = {
  required: "Can't be Empty and min: 15 Symbols",
  minLength: {
    value: 15,
    message: 'Too Short min: 15 Symbols',
  },
}

export const PASSWORD_VALIDATION = {
  required: "Can't be Empty min: 8 Symbols",
  minLength: {
    value: 8,
    message: 'Too Short',
  },
}

export const EMAIL_VALIDATION = {
  required: "Can't be Empty",
}

export const NO_EMPTY_VALIDATION = {
  required: "Can't be Empty",
  minLength: 1,
}
