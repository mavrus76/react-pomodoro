import { FC } from "react"
import styles from "./barchart.module.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { ITask } from "../../store/tasks/tasksSlice"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useConstants } from "../../hooks/useConstants"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const BarChart: FC = () => {
  const { tasks, selectedDates, currentTask } = useConstants()

  const filteredTasks = (arr: ITask[], date: string, done: boolean) => {
    return arr.filter((task) => {
      if (task.done === done) {
        return (
          date ===
          format(new Date(task.updatedAt!), "d/MM/yyyy", { locale: ru })
        )
      }
      return false
    })
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  }

  const labels = [...selectedDates].map((date) =>
    format(date, "d/MM/yyyy", { locale: ru }),
  )

  const data = {
    labels,
    datasets: [
      {
        label: "В процессе",
        data: labels.map((label) =>
          filteredTasks(tasks, label, false).reduce((acc, task) => {
            acc =
              (acc +
                task.timePomodoro * (currentTask?.currentPomodoro ?? 0) +
                task.timeBreak * ((currentTask?.qtyBreaks ?? 0) || 0) +
                task.timeBigBreak * ((currentTask?.qtyBigBreaks ?? 0) || 0)) /
              60

            return acc
          }, 0),
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Выполнено (в часах)",
        data: labels.map((label) =>
          filteredTasks(tasks, label, true).reduce((acc, task) => {
            acc =
              (acc +
                task.timePomodoro * task.qtyPomodoro +
                task.timeBreak * (task.qtyBreaks ?? 0) +
                task.timeBigBreak * (task.qtyBigBreaks ?? 0)) /
              60

            return acc
          }, 0),
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }
  return (
    <section className={styles.wrapper}>
      <Bar options={options} data={data} />
    </section>
  )
}
