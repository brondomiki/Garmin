import React, { useState } from 'react';
import { 
  Activity, Footprints, Flame, Moon, Heart, 
  BarChart3, Calendar, Brain, User, TrendingUp,
  ChevronRight, Zap, Timer
} from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { ActivityChart, DistanceChart, SleepChart, StressChart, WeeklyTrendChart, HeartRateChart } from './components/Charts';
import { WorkoutList } from './components/WorkoutList';
import { TrainingPlan, TrainingInsights } from './components/TrainingPlan';
import { TrainingStatusCard, HeartRateZonesCard, ProfileCard, BodyCompositionCard } from './components/AnalysisCards';
import { dailyActivities, sleepData, userProfile } from './data/garminData';

type TabType = 'dashboard' | 'analysis' | 'training' | 'profile';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Calculate summary metrics
  const lastActivity = dailyActivities[dailyActivities.length - 1];
  const avgSteps7d = Math.round(dailyActivities.slice(-7).reduce((acc, d) => acc + d.steps, 0) / 7);
  const prevAvgSteps7d = Math.round(dailyActivities.slice(-14, -7).reduce((acc, d) => acc + d.steps, 0) / 7);
  const stepsChange = Math.round(((avgSteps7d - prevAvgSteps7d) / prevAvgSteps7d) * 100);

  const avgSleep7d = +(sleepData.slice(-7).reduce((acc, d) => acc + d.duration, 0) / 7).toFixed(1);
  const prevAvgSleep7d = +(sleepData.slice(-14, -7).reduce((acc, d) => acc + d.duration, 0) / 7).toFixed(1);
  const sleepChange = Math.round(((avgSleep7d - prevAvgSleep7d) / prevAvgSleep7d) * 100);

  const totalDistance7d = +dailyActivities.slice(-7).reduce((acc, d) => acc + d.distance, 0).toFixed(1);
  const prevTotalDistance7d = +dailyActivities.slice(-14, -7).reduce((acc, d) => acc + d.distance, 0).toFixed(1);
  const distanceChange = Math.round(((totalDistance7d - prevTotalDistance7d) / prevTotalDistance7d) * 100);

  const avgCalories7d = Math.round(dailyActivities.slice(-7).reduce((acc, d) => acc + d.calories, 0) / 7);
  const prevAvgCalories7d = Math.round(dailyActivities.slice(-14, -7).reduce((acc, d) => acc + d.calories, 0) / 7);
  const caloriesChange = Math.round(((avgCalories7d - prevAvgCalories7d) / prevAvgCalories7d) * 100);

  const avgSleepScore = Math.round(sleepData.slice(-7).reduce((acc, d) => acc + d.sleepScore, 0) / 7);

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'analysis' as TabType, label: 'Analisi', icon: <Brain className="w-4 h-4" /> },
    { id: 'training' as TabType, label: 'Training', icon: <Calendar className="w-4 h-4" /> },
    { id: 'profile' as TabType, label: 'Profilo', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Garmin Connect</h1>
                <p className="text-xs text-gray-400">Dashboard Analisi & Training</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-gray-800/50 rounded-full px-3 py-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-300">Sincronizzato</span>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-[73px] z-40 bg-gray-950/60 backdrop-blur-lg border-b border-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <MetricCard
                title="Passi Oggi"
                value={lastActivity.steps.toLocaleString()}
                change={stepsChange}
                changeLabel="vs media 7gg"
                icon={<Footprints className="w-5 h-5 text-white" />}
                color="bg-blue-500/20"
                subtitle={`Media 7gg: ${avgSteps7d.toLocaleString()}`}
              />
              <MetricCard
                title="Distanza 7gg"
                value={totalDistance7d}
                unit="km"
                change={distanceChange}
                changeLabel="vs sett. prec."
                icon={<TrendingUp className="w-5 h-5 text-white" />}
                color="bg-green-500/20"
              />
              <MetricCard
                title="Calorie Medie"
                value={avgCalories7d.toLocaleString()}
                unit="kcal"
                change={caloriesChange}
                icon={<Flame className="w-5 h-5 text-white" />}
                color="bg-orange-500/20"
                subtitle="Media 7 giorni"
              />
              <MetricCard
                title="Sonno Medio"
                value={avgSleep7d}
                unit="ore"
                change={sleepChange}
                icon={<Moon className="w-5 h-5 text-white" />}
                color="bg-indigo-500/20"
                subtitle={`Score: ${avgSleepScore}/100`}
              />
              <MetricCard
                title="FC Riposo"
                value={userProfile.restingHR}
                unit="bpm"
                icon={<Heart className="w-5 h-5 text-white" />}
                color="bg-red-500/20"
                subtitle="Eccellente"
              />
              <MetricCard
                title="VO2 Max"
                value={userProfile.vo2max}
                unit="ml/kg/min"
                icon={<Zap className="w-5 h-5 text-white" />}
                color="bg-purple-500/20"
                subtitle="Superiore"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityChart />
              <DistanceChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SleepChart />
              <HeartRateChart />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5">
                <h4 className="text-gray-400 text-sm font-medium mb-3 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-cyan-400" />
                  Minuti Attivi (7gg)
                </h4>
                <p className="text-3xl font-bold text-white">
                  {dailyActivities.slice(-7).reduce((acc, d) => acc + d.activeMinutes, 0)}
                  <span className="text-gray-400 text-lg ml-1">min</span>
                </p>
                <p className="text-green-400 text-sm mt-1">✅ Obiettivo 150min raggiunto</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5">
                <h4 className="text-gray-400 text-sm font-medium mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  Allenamenti (7gg)
                </h4>
                <p className="text-3xl font-bold text-white">
                  5
                  <span className="text-gray-400 text-lg ml-1">sessioni</span>
                </p>
                <p className="text-blue-400 text-sm mt-1">🎯 Target: 4-5/settimana</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5">
                <h4 className="text-gray-400 text-sm font-medium mb-3 flex items-center gap-2">
                  <Moon className="w-4 h-4 text-indigo-400" />
                  Body Battery
                </h4>
                <p className="text-3xl font-bold text-white">
                  72
                  <span className="text-gray-400 text-lg ml-1">/100</span>
                </p>
                <p className="text-yellow-400 text-sm mt-1">⚡ Buono - pronto per allenarti</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrainingInsights />
              <TrainingStatusCard />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HeartRateZonesCard />
              <BodyCompositionCard />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StressChart />
              <WeeklyTrendChart />
            </div>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Piano Personalizzato</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Questo piano è generato in base ai tuoi dati Garmin: VO2 Max 48.5, FC riposo 52 bpm, 
                    storico allenamenti e obiettivo mezza maratona in 1:45:00. Periodizzazione: 4 settimane 
                    di carico + 1 settimana di scarico.
                  </p>
                </div>
              </div>
            </div>
            <TrainingPlan />
            <WorkoutList />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProfileCard />
              <BodyCompositionCard />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrainingStatusCard />
              <HeartRateZonesCard />
            </div>
            
            {/* Goals */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5">
              <h3 className="text-white font-semibold text-lg mb-4">🎯 Obiettivi & Progressi</h3>
              <div className="space-y-4">
                <div className="bg-gray-800/40 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Mezza Maratona - Sub 1:45</span>
                    <span className="text-blue-400 text-sm font-medium">In preparazione</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: '65%' }} />
                  </div>
                  <p className="text-gray-400 text-xs mt-2">Gara target: tra 8 settimane. Pace target: 4:58/km</p>
                </div>
                <div className="bg-gray-800/40 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">VO2 Max → 50</span>
                    <span className="text-green-400 text-sm font-medium">48.5 / 50</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: '97%' }} />
                  </div>
                  <p className="text-gray-400 text-xs mt-2">Mancano solo 1.5 punti! Continua con gli intervalli.</p>
                </div>
                <div className="bg-gray-800/40 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Peso Forma → 72 kg</span>
                    <span className="text-yellow-400 text-sm font-medium">73.6 / 72</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-2 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <p className="text-gray-400 text-xs mt-2">Trend positivo: -0.9 kg nell'ultimo mese</p>
                </div>
                <div className="bg-gray-800/40 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Chilometri Settimanali → 55 km</span>
                    <span className="text-purple-400 text-sm font-medium">52.1 / 55</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full" style={{ width: '95%' }} />
                  </div>
                  <p className="text-gray-400 text-xs mt-2">Quasi al target! Aggiungi 1-2 km al lungo domenicale.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              Garmin Connect Dashboard • Dati simulati per demo
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-xs">Ultima sincronizzazione: oggi, 08:42</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-green-400 text-xs">Online</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
