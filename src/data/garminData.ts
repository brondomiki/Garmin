// Simulated Garmin Connect data based on realistic athlete metrics

export interface DailyActivity {
  date: string;
  steps: number;
  distance: number; // km
  calories: number;
  activeMinutes: number;
  floorsClimbed: number;
  heartRateAvg: number;
  heartRateMin: number;
  heartRateMax: number;
}

export interface SleepData {
  date: string;
  duration: number; // hours
  deepSleep: number; // hours
  lightSleep: number; // hours
  remSleep: number; // hours;
  awake: number; // hours
  sleepScore: number;
}

export interface WorkoutData {
  date: string;
  type: string;
  duration: number; // minutes
  distance?: number; // km
  calories: number;
  avgHeartRate: number;
  maxHeartRate: number;
  avgPace?: string; // min/km
  elevationGain?: number; // meters
  trainingEffect?: number;
  vo2max?: number;
}

export interface StressData {
  date: string;
  avgStress: number;
  highStress: number; // minutes
  mediumStress: number;
  lowStress: number;
  restful: number;
}

export interface BodyComposition {
  date: string;
  weight: number; // kg
  bmi: number;
  bodyFat: number; // %
  muscleMass: number; // kg
  hydration: number; // %
}

export interface TrainingStatus {
  status: 'Peaking' | 'Productive' | 'Maintaining' | 'Unproductive' | 'Recovery' | 'Strained' | 'Detraining';
  loadFocus: {
    aerobic: number;
    anaerobic: number;
  };
  trainingLoad: number;
  optimalRange: { min: number; max: number };
  acwr: number; // Acute:Chronic Workload Ratio
}

export interface WeeklySummary {
  week: string;
  totalDistance: number;
  totalDuration: number;
  totalCalories: number;
  avgSteps: number;
  avgSleep: number;
  avgHeartRate: number;
  workouts: number;
  trainingLoad: number;
}

// Generate last 30 days of activity data
export const dailyActivities: DailyActivity[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const isRestDay = i === 7 || i === 14 || i === 21; // Rest days
  
  return {
    date: date.toISOString().split('T')[0],
    steps: isRestDay ? Math.floor(4000 + Math.random() * 3000) : Math.floor(8000 + Math.random() * 7000),
    distance: isRestDay ? +(2 + Math.random() * 2).toFixed(1) : +(5 + Math.random() * 8).toFixed(1),
    calories: isRestDay ? Math.floor(1800 + Math.random() * 400) : Math.floor(2200 + Math.random() * 800),
    activeMinutes: isRestDay ? Math.floor(20 + Math.random() * 30) : Math.floor(60 + Math.random() * 90),
    floorsClimbed: Math.floor(5 + Math.random() * 25),
    heartRateAvg: Math.floor(68 + Math.random() * 12),
    heartRateMin: Math.floor(48 + Math.random() * 8),
    heartRateMax: Math.floor(140 + Math.random() * 40),
  };
});

export const sleepData: SleepData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const duration = +(6 + Math.random() * 2.5).toFixed(1);
  const deepSleep = +(duration * (0.15 + Math.random() * 0.1)).toFixed(1);
  const remSleep = +(duration * (0.2 + Math.random() * 0.05)).toFixed(1);
  const awake = +(0.2 + Math.random() * 0.4).toFixed(1);
  const lightSleep = +(duration - deepSleep - remSleep - awake).toFixed(1);
  
  return {
    date: date.toISOString().split('T')[0],
    duration,
    deepSleep,
    lightSleep,
    remSleep,
    awake,
    sleepScore: Math.floor(60 + Math.random() * 35),
  };
});

export const workoutData: WorkoutData[] = [
  { date: '2025-01-02', type: 'Running', duration: 45, distance: 8.2, calories: 620, avgHeartRate: 152, maxHeartRate: 178, avgPace: '5:29', elevationGain: 85, trainingEffect: 3.2 },
  { date: '2025-01-04', type: 'Cycling', duration: 90, distance: 35.4, calories: 850, avgHeartRate: 138, maxHeartRate: 165, elevationGain: 420, trainingEffect: 3.5 },
  { date: '2025-01-06', type: 'Strength Training', duration: 50, calories: 380, avgHeartRate: 118, maxHeartRate: 155, trainingEffect: 2.1 },
  { date: '2025-01-08', type: 'Running', duration: 35, distance: 6.0, calories: 480, avgHeartRate: 145, maxHeartRate: 170, avgPace: '5:50', elevationGain: 45, trainingEffect: 2.8 },
  { date: '2025-01-10', type: 'Swimming', duration: 40, distance: 1.8, calories: 420, avgHeartRate: 135, maxHeartRate: 162, trainingEffect: 2.5 },
  { date: '2025-01-12', type: 'Running', duration: 60, distance: 12.5, calories: 920, avgHeartRate: 148, maxHeartRate: 172, avgPace: '4:48', elevationGain: 120, trainingEffect: 3.8 },
  { date: '2025-01-15', type: 'HIIT', duration: 30, calories: 380, avgHeartRate: 158, maxHeartRate: 185, trainingEffect: 3.4 },
  { date: '2025-01-17', type: 'Cycling', duration: 75, distance: 28.6, calories: 720, avgHeartRate: 132, maxHeartRate: 158, elevationGain: 350, trainingEffect: 3.0 },
  { date: '2025-01-19', type: 'Running', duration: 40, distance: 7.5, calories: 560, avgHeartRate: 142, maxHeartRate: 168, avgPace: '5:20', elevationGain: 60, trainingEffect: 2.9 },
  { date: '2025-01-21', type: 'Strength Training', duration: 55, calories: 400, avgHeartRate: 122, maxHeartRate: 158, trainingEffect: 2.3 },
  { date: '2025-01-23', type: 'Running', duration: 50, distance: 10.0, calories: 750, avgHeartRate: 150, maxHeartRate: 175, avgPace: '5:00', elevationGain: 95, trainingEffect: 3.5 },
  { date: '2025-01-25', type: 'Yoga', duration: 45, calories: 180, avgHeartRate: 85, maxHeartRate: 110, trainingEffect: 1.2 },
  { date: '2025-01-27', type: 'Running', duration: 30, distance: 5.5, calories: 420, avgHeartRate: 140, maxHeartRate: 165, avgPace: '5:27', elevationGain: 30, trainingEffect: 2.4 },
  { date: '2025-01-29', type: 'Cycling', duration: 60, distance: 22.0, calories: 580, avgHeartRate: 128, maxHeartRate: 152, elevationGain: 280, trainingEffect: 2.7 },
];

export const stressData: StressData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const isWorkoutDay = [1, 3, 5, 7, 9, 11, 14, 16, 18, 20, 22, 24, 26, 28].includes(i);
  
  return {
    date: date.toISOString().split('T')[0],
    avgStress: isWorkoutDay ? Math.floor(45 + Math.random() * 20) : Math.floor(30 + Math.random() * 15),
    highStress: isWorkoutDay ? Math.floor(30 + Math.random() * 40) : Math.floor(10 + Math.random() * 20),
    mediumStress: Math.floor(60 + Math.random() * 80),
    lowStress: Math.floor(120 + Math.random() * 100),
    restful: Math.floor(300 + Math.random() * 200),
  };
});

export const bodyComposition: BodyComposition[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const weightBase = 74.5 - (i * 0.03);
  
  return {
    date: date.toISOString().split('T')[0],
    weight: +(weightBase + (Math.random() - 0.5) * 0.4).toFixed(1),
    bmi: +(23.2 - (i * 0.01) + (Math.random() - 0.5) * 0.1).toFixed(1),
    bodyFat: +(15.8 - (i * 0.05) + (Math.random() - 0.5) * 0.3).toFixed(1),
    muscleMass: +(35.2 + (i * 0.02) + (Math.random() - 0.5) * 0.2).toFixed(1),
    hydration: +(54 + Math.random() * 4).toFixed(1),
  };
});

export const weeklySummaries: WeeklySummary[] = [
  { week: 'Sett 1', totalDistance: 42.5, totalDuration: 380, totalCalories: 3850, avgSteps: 11200, avgSleep: 7.2, avgHeartRate: 72, workouts: 4, trainingLoad: 680 },
  { week: 'Sett 2', totalDistance: 48.2, totalDuration: 420, totalCalories: 4200, avgSteps: 12100, avgSleep: 7.5, avgHeartRate: 70, workouts: 5, trainingLoad: 750 },
  { week: 'Sett 3', totalDistance: 38.8, totalDuration: 350, totalCalories: 3500, avgSteps: 10800, avgSleep: 7.8, avgHeartRate: 68, workouts: 3, trainingLoad: 580 },
  { week: 'Sett 4', totalDistance: 52.1, totalDuration: 450, totalCalories: 4600, avgSteps: 12800, avgSleep: 7.1, avgHeartRate: 73, workouts: 5, trainingLoad: 820 },
];

export const trainingStatus: TrainingStatus = {
  status: 'Productive',
  loadFocus: {
    aerobic: 72,
    anaerobic: 28,
  },
  trainingLoad: 780,
  optimalRange: { min: 650, max: 900 },
  acwr: 1.15,
};

export const userProfile = {
  name: 'Atleta',
  age: 32,
  vo2max: 48.5,
  ftpEstimate: 245,
  restingHR: 52,
  hrv: 62,
  trainingAge: '3 anni',
  weeklyGoal: '4-5 allenamenti',
  raceGoal: 'Mezza Maratona - 1:45:00',
};

export const heartRateZones = [
  { zone: 'Zona 1 (Riscaldamento)', range: '98-117 bpm', timeInZone: 420, percentage: 35 },
  { zone: 'Zona 2 (Aerobico)', range: '118-137 bpm', timeInZone: 380, percentage: 32 },
  { zone: 'Zona 3 (Tempo)', range: '138-152 bpm', timeInZone: 180, percentage: 15 },
  { zone: 'Zona 4 (Soglia)', range: '153-167 bpm', timeInZone: 120, percentage: 10 },
  { zone: 'Zona 5 (Massimo)', range: '168-185 bpm', timeInZone: 60, percentage: 8 },
];
