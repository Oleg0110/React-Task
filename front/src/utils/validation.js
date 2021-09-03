export const TITLE_VALIDATION = {
   required: "Can't be Empty max: 25 Symbols",
   maxLength: {
      value: 25,
      message: "Too Long"
   }

}

export const TASKS_CONTENT_VALIDATION = {
   required: "Can't be Empty",
}

export const CREATE_CONTENT_VALIDATION = {
   required: "Can't be Empty and min: 15 Symbols",
   minLength: {
      value: 15,
      message: "Too Short min: 15 Symbols"
   }
}


