import { ClipboardList, Calendar, Flame, Salad } from "lucide-react";

interface Meal {
  name: string;
  servings: number;
  day: string;
  calories: number;
}

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center border-2 gap-4">
      <div className="bg-green/30 p-4 rounded-lg w-full sm:w-auto flex justify-center">
        <Salad className="w-8 h-8 text-green" />
      </div>
      <div className="flex-grow w-full">
        <h4 className="text-md font-semibold text-black">Comida</h4>
        <h3 className="text-sm font-semibold text-black/70 mb-2">{meal.name}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="flex items-center justify-center rounded-full bg-green/15 h-7 w-7 mr-2">
              <ClipboardList className="w-4 h-4 text-green" />
            </span>
            <span>Porciones: {meal.servings}</span>
          </div>
          <div className="flex items-center">
            <span className="flex items-center justify-center rounded-full bg-green/15 h-7 w-7 mr-2">
              <Calendar className="w-4 h-4 text-green" />
            </span>
            <span>Día: {meal.day}</span>
          </div>
          <div className="flex items-center col-span-1 sm:col-span-2 mt-1">
            <span className="flex items-center justify-center rounded-full bg-green/15 h-7 w-7 mr-2">
              <Flame className="w-4 h-4 text-green" />
            </span>
            <span>Calorías estimadas: {meal.calories} Kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;