import RoutinesSection from "../../../components/plans/routines/RoutinesSection";
import MealsSection from "../../../components/plans/meals/MealsSection";

export default function HealthPage() {
  return (
    <div className="flex justify-between transform -translate-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full p-4 md:p-8 min-h-full">
        <RoutinesSection />
        <MealsSection />
      </div>
    </div>
  );
}
