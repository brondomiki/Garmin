import React from 'react';
import { trainingStatus, heartRateZones, userProfile } from '../data/garminData';
import { Activity, Heart, TrendingUp, Gauge } from 'lucide-react';

export const TrainingStatusCard: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Peaking': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Productive': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'Maintaining': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Unproductive': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'Recovery': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30';
      case 'Strained': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'Detraining': return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'Productive': return 'Ti stai allenando in modo efficace e stai migliorando. Il carico di allenamento sta producendo adattamenti positivi.';
      default: return '';
    }
  };

  const loadPercentage = ((trainingStatus.trainingLoad - trainingStatus.optimalRange.min) / 
    (trainingStatus.optimalRange.max - trainingStatus.optimalRange.min)) * 100;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5">
      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
        <Gauge className="w-5 h-5 text-blue-400" />
        Stato Allenamento
      </h3>
      
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-4 py-2 rounded-xl text-sm font-bold border ${getStatusColor(trainingStatus.status)}`}>
          {trainingStatus.status.toUpperCase()}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-5">{getStatusDescription(trainingStatus.status)}</p>

      {/* Training Load Gauge */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">Carico Allenamento</span>
          <span className="text-white font-bold">{trainingStatus.trainingLoad}</span>
        </div>
        <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" 
               style={{ width: `${Math.min(loadPercentage, 100)}%` }} />
          <div className="absolute inset-y-0 border-r-2 border-dashed border-green-400/50" 
               style={{ left: '0%' }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-gray-500 text-xs">{trainingStatus.optimalRange.min}</span>
          <span className="text-green-400 text-xs">Range Ottimale</span>
          <span className="text-gray-500 text-xs">{trainingStatus.optimalRange.max}</span>
        </div>
      </div>

      {/* Load Focus */}
      <div className="mb-5">
        <span className="text-gray-400 text-sm mb-2 block">Focus Carico</span>
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-blue-400 text-xs">Aerobico</span>
              <span className="text-blue-400 text-xs font-medium">{trainingStatus.loadFocus.aerobic}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${trainingStatus.loadFocus.aerobic}%` }} />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-orange-400 text-xs">Anaerobico</span>
              <span className="text-orange-400 text-xs font-medium">{trainingStatus.loadFocus.anaerobic}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full">
              <div className="h-2 bg-orange-500 rounded-full" style={{ width: `${trainingStatus.loadFocus.anaerobic}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ACWR */}
      <div className="flex items-center justify-between p-3 bg-gray-800/40 rounded-xl">
        <span className="text-gray-400 text-sm">ACWR</span>
        <div className="text-right">
          <span className="text-white font-bold">{trainingStatus.acwr}</span>
          <span className="text-gray-500 text-xs ml-2">(0.8-1.3 ottimale)</span>
        </div>
      </div>
    </div>
  );
};

export const HeartRateZonesCard: React.FC = () => {
  const zoneColors = ['#22C55E', '#3B82F6', '#F59E0B', '#F97316', '#EF4444'];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5">
      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5 text-red-400" />
        Zone FC - Tempo Settimanale
      </h3>
      <div className="space-y-3">
        {heartRateZones.map((zone, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-300 text-sm">{zone.zone}</span>
              <span className="text-gray-400 text-xs">{zone.range}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${zone.percentage}%`, backgroundColor: zoneColors[index] }}
                />
              </div>
              <span className="text-gray-400 text-xs w-16 text-right">{zone.timeInZone} min</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProfileCard: React.FC = () => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5">
      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-green-400" />
        Profilo Atleta
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-800">
          <span className="text-gray-400 text-sm">VO2 Max</span>
          <span className="text-white font-bold">{userProfile.vo2max} ml/kg/min</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-800">
          <span className="text-gray-400 text-sm">FC Riposo</span>
          <span className="text-white font-bold">{userProfile.restingHR} bpm</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-800">
          <span className="text-gray-400 text-sm">HRV</span>
          <span className="text-white font-bold">{userProfile.hrv} ms</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-800">
          <span className="text-gray-400 text-sm">FTP Stimato</span>
          <span className="text-white font-bold">{userProfile.ftpEstimate} W</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-800">
          <span className="text-gray-400 text-sm">Età Allenamento</span>
          <span className="text-white font-bold">{userProfile.trainingAge}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-800">
          <span className="text-gray-400 text-sm">Obiettivo Gara</span>
          <span className="text-white font-bold text-sm">{userProfile.raceGoal}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-400 text-sm">Obiettivo Settimanale</span>
          <span className="text-white font-bold">{userProfile.weeklyGoal}</span>
        </div>
      </div>
    </div>
  );
};

export const BodyCompositionCard: React.FC = () => {
  const latestWeight = 73.6;
  const latestBmi = 22.8;
  const latestFat = 15.2;
  const latestMuscle = 35.8;
  const latestHydration = 55.8;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5">
      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-purple-400" />
        Composizione Corporea
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800/40 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs mb-1">Peso</p>
          <p className="text-white font-bold text-lg">{latestWeight} <span className="text-xs text-gray-400">kg</span></p>
          <p className="text-green-400 text-xs">-0.9 kg (30gg)</p>
        </div>
        <div className="bg-gray-800/40 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs mb-1">BMI</p>
          <p className="text-white font-bold text-lg">{latestBmi}</p>
          <p className="text-green-400 text-xs">Normopeso</p>
        </div>
        <div className="bg-gray-800/40 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs mb-1">Massa Grassa</p>
          <p className="text-white font-bold text-lg">{latestFat}<span className="text-xs text-gray-400">%</span></p>
          <p className="text-green-400 text-xs">-0.6% (30gg)</p>
        </div>
        <div className="bg-gray-800/40 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs mb-1">Massa Muscolare</p>
          <p className="text-white font-bold text-lg">{latestMuscle} <span className="text-xs text-gray-400">kg</span></p>
          <p className="text-green-400 text-xs">+0.6 kg (30gg)</p>
        </div>
      </div>
      <div className="mt-3 bg-gray-800/40 rounded-xl p-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Idratazione</span>
          <span className="text-white font-bold">{latestHydration}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full mt-2">
          <div className="h-2 bg-cyan-500 rounded-full" style={{ width: `${latestHydration}%` }} />
        </div>
        <p className="text-gray-500 text-xs mt-1">Target: 55-65%</p>
      </div>
    </div>
  );
};
