import * as yup from "yup"

export const schema = yup.object({
  title: yup
    .string()
    .min(2, "Минимальная длина 2 символа")
    .max(50, "Максимальная длина 100 символов")
    .required(),
  timePomodoro: yup
    .number()
    .positive()
    .integer()
    .min(25, "Минимальное время 25 минут")
    .max(50, "Максимальное время 50 минут")
    .required(),
  qtyPomodoro: yup
    .number()
    .positive()
    .integer()
    .min(1, "Минимальное число 1 pomodoro")
    .max(10, "Максимальное число 10 pomodoro")
    .required(),
  timeBreak: yup
    .number()
    .positive()
    .integer()
    .min(5, "Минимальное время 5 минут")
    .max(10, "Максимальное время 10 минут")
    .required(),
  timeBigBreak: yup
    .number()
    .positive()
    .integer()
    .min(15, "Минимальное время 15 минут")
    .max(30, "Максимальное время 30 минут")
    .required(),
})
