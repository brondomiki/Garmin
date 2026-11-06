import React from 'react';
import { Calendar, Target, Zap, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface TrainingDay {
  day: string;
  type: string;
  description: string;
  duration: string;
  intensity: 'Bassa' | 'Media' | 'Alta' | 'Recupero';
  notes: string;
  priority: 'high' | 'medium' | 'low';
}

const weeklyPlan: TrainingDay[] = [
  {
    day: 'Lunedì',
    type: '🏃 Corsa Aerobica',
    description: 'Corsa a ritmo conversazione in Zona 2',
    duration: '45-50 min',
    intensity: 'Media',
    notes: 'Mantieni FC sotto 145 bpm. Focus sulla cadenza (170-180 spm). Ottimo per costruire base aerobica.',
    priority: 'high',
  },
  {
    day: 'Martedì',
    type: '🏋️ Forza + Mobilità',
    description: 'Circuito funzionale con focus su core e gambe',
    duration: '50 min',
    intensity: 'Media',
    notes: 'Squat, affondi, plank, deadlift. 3 serie x 12 ripetizioni. Finisci con 10 min di stretching/foam roller.',
    priority: 'medium',
  },
  {
    day: 'Mercoledì',
    type: '⚡ Intervalli (Fartlek)',
    description: '8x400m a ritmo gara con recupero 90"',
    duration: '40 min',
    intensity: 'Alta',
    notes: 'Riscaldamento 15 min + 8 ripetute 400m a 4:10/km + recupero 90" camminando. Defaticamento 10 min. TE previsto: 3.8-4.2',
    priority: 'high',
  },
  {
    day: 'Giovedì',
    type: '🧘 Recupero Attivo',
    description: 'Yoga o camminata leggera + foam rolling',
    duration: '30-40 min',
    intensity: 'Recupero',
    notes: 'Sessione di recupero fondamentale. Priorità al sonno e idratazione. HRV target: >65ms',
    priority: 'medium',
  },
  {
    day: 'Venerdì',
    type: '🏃 Tempo Run',
    description: 'Corsa a ritmo soglia (tempo run)',
    duration: '35-40 min',
    intensity: 'Alta',
    notes: '5km a ritmo soglia (~4:30/km). FC target: 155-165 bpm. Questa sessione migliora la soglia anaerobica.',
    priority: 'high',
  },
  {
    day: 'Sabato',
    type: '🚴 Lungo in Bici',
    description: 'Uscita in bici a ritmo endurance',
    duration: '90-120 min',
    intensity: 'Media',
    notes: 'Percorso con dislivello moderato (300-500m). Mantieni Zona 2. Ottimo cross-training per la maratona.',
    priority: 'medium',
  },
  {
    day: 'Domenica',
    type: '🏃 Lungo Lento',
    description: 'Corsa lunga a ritmo facile',
    duration: '70-90 min',
    intensity: 'Bassa',
    notes: '12-15km a 5:30-5:45/km. Ogni 3 settimane aggiungi 2km (max 18km). Idratazione ogni 5km.',
    priority: 'high',
  },
];

const getIntensityColor = (intensity: string) => {
  switch (intensity) {
    case 'Alta': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'Media': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Bassa': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Recupero': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

export const TrainingPlan: React.FC = () => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Piano Settimanale Suggerito
        </h3>
        <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
          Basato sui tuoi dati Garmin
        </span>
      </div>
      
      <div className="space-y-3">
        {weeklyPlan.map((day, index) => (
          <div key={index} className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4 hover:border-blue-500/20 transition-all">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-white font-medium text-sm w-20">{day.day}</span>
                <span className="text-white font-semibold">{day.type}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getIntensityColor(day.intensity)}`}>
                {day.intensity}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-1">{day.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-blue-400 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" /> {day.duration}
              </span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-gray-400 text-xs">{day.notes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { Clock } from 'lucide-react';

export const TrainingInsights: React.FC = () => {
  const insights = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
      title: 'Base Aerobica Solida',
      description: 'Il 67% del tuo tempo in Zona 1-2 indica un\'ottima base aerobica. Continua così per migliorare l\'efficienza metabolica.',
      type: 'positive',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-400" />,
      title: 'VO2 Max in Crescita',
      description: 'Il tuo VO2 Max di 48.5 ml/kg/min è nella fascia "Superiore" per la tua età. Trend: +1.2 negli ultimi 3 mesi.',
      type: 'positive',
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
      title: 'Attenzione al Recupero',
      description: 'ACWR a 1.15 è nella zona ottimale ma al limite superiore. Considera una settimana di scarico ogni 3-4 settimane.',
      type: 'warning',
    },
    {
      icon: <Zap className="w-5 h-5 text-purple-400" />,
      title: 'Bilancio Anaerobico',
      description: 'Solo il 28% del carico è anaerobico. Per la mezza maratona, aumenta le sessioni sopra soglia al 30-35%.',
      type: 'suggestion',
    },
    {
      icon: <Target className="w-5 h-5 text-cyan-400" />,
      title: 'Obiettivo Mezza Maratona',
      description: 'Con il tuo ritmo attuale, un tempo di 1:45:00 è raggiungibile in 8-10 settimane con il giusto tapering.',
      type: 'goal',
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-orange-400" />,
      title: 'Sonno da Ottimizzare',
      description: 'Media sonno 7.2h - cerca di arrivare a 7.5-8h. Il sonno profondo è al 17%, target ideale: 20-25%.',
      type: 'warning',
    },
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5">
      <h3 className="text-white font-semibold text-lg mb-4">🧠 Analisi & Insights</h3>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/20">
            <div className="flex-shrink-0 mt-0.5">{insight.icon}</div>
            <div>
              <h4 className="text-white font-medium text-sm">{insight.title}</h4>
              <p className="text-gray-400 text-sm mt-0.5">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
