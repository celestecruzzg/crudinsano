import { CalendarDays, Clock, Repeat, Bike } from "lucide-react";


export interface Routine {
  id?: number;
  title: string;
  level: string;
  goal: string;
  description: string;
  startDate: string;
  duration: string;
  daysPerWeek: number;
}

const RoutineCard = ({
  title,
  level,
  goal,
  description,
  startDate,
  duration,
  daysPerWeek,
}: Omit<Routine, 'icon'>) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-md">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="bg-green/30 w-full sm:w-28 h-28 rounded-lg flex items-center justify-center flex-shrink-0">
          <Bike className="h-12 w-12 text-green" />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Título y Etiquetas */}
            <div className="flex flex-col sm:flex-row justify-between items-start">
              <h3 className="font-semibold text-black">{title}</h3>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <span className="text-xs font-medium bg-yellow/30 text-black/80 px-2.5 py-1 rounded-full">
                  {level}
                </span>
                <span className="text-xs font-medium bg-blue/50 text-black/80 px-2.5 py-1 rounded-full">
                  {goal}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-end justify-between mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600 mt-2 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center rounded-full bg-green/15 h-7 w-7">
                  <CalendarDays className="w-4 h-4 text-green" />
                </span>
                <span>Inicio: {startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center rounded-full bg-green/15 h-7 w-7">
                  <Repeat className="w-4 h-4 text-green" />
                </span>
                <span>Días: {daysPerWeek}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center rounded-full bg-green/15 h-7 w-7">
                  <Clock className="w-4 h-4 text-green" />
                </span>
                <span>Duración: {duration}</span>
              </div>
            </div>
            {/* <button className="text-sm font-semibold text-white bg-green h-9 w-full sm:w-44 rounded-lg hover:opacity-90 transition-colors mt-4 sm:mt-0">
              Ver más detalles
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineCard;