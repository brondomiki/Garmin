import React from 'react';
import { workoutData } from '../data/garminData';
import { Activity, Clock, Flame, Heart, Mountain, Zap } from 'lucide-react';

const getSportIcon = (type: string) => {
  switch (type) {
    case 'Running': return '🏃';
    case 'Cycling': return '🚴';
    case 'Swimming': return '🏊';
    case 'Strength Training': return '🏋️';
    case 'HIIT': return '⚡';
    case 'Yoga': return '🧘';
    default: return '🏅';
  }
};

const getTrainingEffectColor = (te: number) => {
  if (te >= 4) return 'text-red-400 bg-red-400/10';
  if (te >= 3) return 'text-orange-400 bg-orange-400/10';
  if (te >= 2) return 'text-yellow-400 bg-yellow-400/10';
  return 'text-green-400 bg-green-400/10';
};

export const WorkoutList: React.FC = () => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5">
      <h3 className="text-white font-semibold text-lg mb-4">🏅 Ultimi Allenamenti</h3>
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {workoutData.slice().reverse().map((workout, index) => (
          <div key={index} className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-200">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getSportIcon(workout.type)}</span>
                <div>
                  <h4 className="text-white font-medium">{workout.type}</h4>
                  <p className="text-gray-400 text-sm">
                    {new Date(workout.date).toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>
              {workout.trainingEffect && (
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getTrainingEffectColor(workout.trainingEffect)}`}>
                  TE {workout.trainingEffect}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-gray-300 text-sm">{workout.duration} min</span>
              </div>
              {workout.distance && (
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-gray-300 text-sm">{workout.distance} km</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-gray-300 text-sm">{workout.calories} kcal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-400" />
                <span className="text-gray-300 text-sm">{workout.avgHeartRate} bpm</span>
              </div>
            </div>
            {(workout.avgPace || workout.elevationGain) && (
              <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-700/30">
                {workout.avgPace && (
                  <span className="text-gray-400 text-xs">⚡ Pace: {workout.avgPace} /km</span>
                )}
                {workout.elevationGain && (
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <Mountain className="w-3 h-3" /> D+ {workout.elevationGain}m
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
