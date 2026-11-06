import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { dailyActivities, sleepData, stressData, weeklySummaries } from '../data/garminData';

interface ChartSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartSection: React.FC<ChartSectionProps> = ({ title, children, className = '' }) => (
  <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 ${className}`}>
    <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-gray-300 text-sm font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ActivityChart: React.FC = () => {
  const data = dailyActivities.slice(-14).map(d => ({
    date: new Date(d.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }),
    passi: d.steps,
    distanza: d.distance,
    calorie: d.calories,
  }));

  return (
    <ChartSection title="📊 Attività Giornaliera (Ultimi 14 giorni)">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="passi" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Passi" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartSection>
  );
};

export const DistanceChart: React.FC = () => {
  const data = dailyActivities.slice(-14).map(d => ({
    date: new Date(d.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }),
    km: d.distance,
  }));

  return (
    <ChartSection title="🏃 Distanza Giornaliera (km)">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="km" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Distanza (km)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartSection>
  );
};

export const SleepChart: React.FC = () => {
  const data = sleepData.slice(-14).map(d => ({
    date: new Date(d.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }),
    sonnoProfondo: d.deepSleep,
    rem: d.remSleep,
    leggero: d.lightSleep,
    veglia: d.awake,
    score: d.sleepScore,
  }));

  return (
    <ChartSection title="😴 Qualità del Sonno (Ultimi 14 giorni)">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="sonnoProfondo" stackId="a" fill="#6366F1" name="Profondo (h)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="rem" stackId="a" fill="#8B5CF6" name="REM (h)" />
            <Bar dataKey="leggero" stackId="a" fill="#A78BFA" name="Leggero (h)" />
            <Bar dataKey="veglia" stackId="a" fill="#F59E0B" name="Veglia (h)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartSection>
  );
};

export const StressChart: React.FC = () => {
  const data = stressData.slice(-14).map(d => ({
    date: new Date(d.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }),
    stress: d.avgStress,
  }));

  return (
    <ChartSection title="😰 Livello Stress Medio">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 3 }} name="Stress Medio" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartSection>
  );
};

export const WeeklyTrendChart: React.FC = () => {
  return (
    <ChartSection title="📈 Trend Settimanale">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklySummaries} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="week" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="totalDistance" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 4 }} name="Distanza Totale (km)" />
            <Line type="monotone" dataKey="trainingLoad" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 4 }} name="Carico Allenamento" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartSection>
  );
};

export const HeartRateChart: React.FC = () => {
  const data = dailyActivities.slice(-14).map(d => ({
    date: new Date(d.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }),
    media: d.heartRateAvg,
    max: d.heartRateMax,
    min: d.heartRateMin,
  }));

  return (
    <ChartSection title="❤️ Frequenza Cardiaca (Ultimi 14 giorni)">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[40, 200]} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="max" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} name="Max (bpm)" />
            <Area type="monotone" dataKey="media" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.15} name="Media (bpm)" />
            <Area type="monotone" dataKey="min" stroke="#10B981" fill="#10B981" fillOpacity={0.1} name="Min (bpm)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartSection>
  );
};
