import ProgressChart from "../../../components/ProgressChart"
import MealsSection from "../../../components/MealsSection"
import ExercisePlans from "../../../components/ExercisePlans"

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Columna izquierda */}
      <div className="flex flex-col gap-6">
        <ProgressChart />
        <MealsSection />
      </div>

      {/* Columna derecha - con contenedor que toma toda la altura */}
      <div className="flex flex-col">
        <div className="flex-1">
          <ExercisePlans />
        </div>
      </div>
    </div>
  )
}