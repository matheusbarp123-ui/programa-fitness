'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  User, 
  Target, 
  Dumbbell, 
  Apple, 
  Droplets, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  Calendar,
  Activity,
  Heart,
  Moon,
  Info,
  ChefHat,
  PlayCircle,
  Scale,
  BarChart3,
  Sun,
  Trophy,
  Star,
  Award,
  Plus,
  Minus,
  Lock,
  AlertCircle,
  CreditCard,
  Sparkles,
  Zap,
  Crown,
  Mail,
  Send,
  Check
} from 'lucide-react'

interface UserInfo {
  name: string
  phone: string
  email: string
}

interface QuizData {
  age: string
  weight: string
  height: string
  activityLevel: string
  goal: string
  experience: string
  frequency: string
  timePerSession: string
  equipment: string
  dietaryRestrictions: string[]
  sleepHours: string
  currentWaterIntake: string
  bedTime: string
  wakeTime: string
}

interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
  muscle: string
  instructions: string
  technique: string
  progression: string
  imageUrl?: string
  load: string
  tempo: string
  rpe: string
  biomechanics: string
  commonMistakes: string[]
  modifications: string[]
}

interface DailyWorkout {
  day: string
  name: string
  exercises: Exercise[]
  duration: string
  warmup: string[]
  cooldown: string[]
  intensity: string
  focus: string
  totalVolume: string
  energySystemFocus: string
  recoveryNotes: string
}

interface WorkoutPlan {
  weeklyPlan: DailyWorkout[]
  frequency: string
  restDays: string[]
  periodization: string
  progressionPlan: string
  volumeProgression: string
  intensityProgression: string
  deloadWeek: string
  assessmentWeek: string
}

interface NutritionalInfo {
  calories: number
  protein: number
  carbs: number
  fats: number
  fiber: number
  sodium: number
  sugar: number
  saturatedFat: number
  cholesterol: number
  calcium: number
  iron: number
  vitaminC: number
}

interface Meal {
  name: string
  time: string
  foods: Array<{
    name: string
    quantity: string
    calories: number
    protein: number
    carbs: number
    fats: number
    glycemicIndex: number
    micronutrients: string[]
  }>
  preparation: string
  cookingTime: string
  difficulty: string
  nutritionalInfo: NutritionalInfo
  alternatives: string[]
  tips: string[]
  mealTiming: string
  digestibility: string
  satietyIndex: number
  antiInflammatory: boolean
  metabolicBenefit: string
}

interface DietPlan {
  calories: number
  protein: number
  carbs: number
  fats: number
  totalDailyCalories: number
  meals: Meal[]
  macroDistribution: {
    proteinPercent: number
    carbsPercent: number
    fatsPercent: number
  }
  supplementation: Array<{
    name: string
    dosage: string
    timing: string
    purpose: string
    evidence: string
  }>
  hydrationPlan: {
    baseWater: number
    preWorkout: number
    postWorkout: number
    withMeals: number
    electrolyteNeeds: string[]
  }
  mealTiming: {
    preWorkout: string
    postWorkout: string
    beforeBed: string
    intermittentFasting: string
  }
  micronutrientFocus: string[]
  foodSynergies: string[]
  metabolicOptimization: string
}

interface HydrationPlan {
  dailyGoal: number
  reminders: string[]
  electrolytes: string[]
  timing: string[]
}

interface MonthlyPlan {
  month: number
  workoutPlan: WorkoutPlan
  dietPlan: DietPlan
  hydrationPlan: HydrationPlan
  unlocked: boolean
  renewalDate?: string
  personalizedFeatures: string[]
}

interface Progress {
  workouts: number
  totalWorkouts: number
  dietAdherence: number
  waterIntake: number
  waterGoal: number
  date: string
  completedMeals: string[]
  completedWorkouts: string[]
  streakDays: number
  level: number
  totalPoints: number
  achievements: string[]
}

interface PersonalAssessment {
  imc: number
  imcCategory: string
  routineSummary: string
  recommendations: string[]
  sleepAnalysis: string
  scheduleRecommendations: string[]
}

interface AppState {
  quizCompleted: boolean
  subscriptionActive: boolean
  subscriptionExpired: boolean
  currentMonth: number
  subscriptionStartDate?: string
}

const questions = [
  {
    id: 'age',
    title: '🎂 Qual sua idade?',
    headline: "💡 Sua idade é fundamental!",
    message: "Cada faixa etária tem necessidades metabólicas específicas. Vamos personalizar seu plano baseado na ciência do envelhecimento saudável!",
    type: 'radio',
    options: [
      { value: '18-25', label: '🌟 18-25 anos (Jovem adulto)' },
      { value: '26-35', label: '💪 26-35 anos (Adulto ativo)' },
      { value: '36-45', label: '🎯 36-45 anos (Meia idade)' },
      { value: '46-55', label: '🏆 46-55 anos (Experiente)' },
      { value: '56+', label: '👑 56+ anos (Sênior ativo)' }
    ]
  },
  {
    id: 'weight',
    title: '⚖️ Qual seu peso atual?',
    headline: "🔥 Metabolismo em foco!",
    message: "Seu peso atual determina suas necessidades calóricas e estratégias de treino. Vamos calcular seu gasto energético ideal!",
    type: 'radio',
    options: [
      { value: '40-55', label: '🪶 40-55kg (Peso leve)' },
      { value: '56-70', label: '⚖️ 56-70kg (Peso médio)' },
      { value: '71-85', label: '💪 71-85kg (Peso moderado)' },
      { value: '86-100', label: '🏋️ 86-100kg (Peso alto)' },
      { value: '100+', label: '🦣 Mais de 100kg (Peso elevado)' }
    ]
  },
  {
    id: 'height',
    title: '📏 Qual sua altura?',
    headline: "📊 IMC científico!",
    message: "Altura + peso = seu IMC personalizado! Vamos calcular sua composição corporal ideal e definir metas realistas baseadas em ciência.",
    type: 'radio',
    options: [
      { value: '150-160', label: '🌸 150-160cm (Baixa estatura)' },
      { value: '161-170', label: '🌿 161-170cm (Estatura média-baixa)' },
      { value: '171-180', label: '🌳 171-180cm (Estatura média)' },
      { value: '181-190', label: '🏗️ 181-190cm (Estatura alta)' },
      { value: '190+', label: '🗼 Mais de 190cm (Estatura muito alta)' }
    ]
  },
  {
    id: 'activityLevel',
    title: '🏃‍♂️ Qual seu nível atual de atividade física?',
    headline: "⚡ Nível de energia detectado!",
    message: "Seu nível atual define o ponto de partida perfeito. Vamos criar uma progressão científica que respeita sua condição física atual!",
    type: 'radio',
    options: [
      { value: 'sedentary', label: '😴 Sedentário (pouco ou nenhum exercício)' },
      { value: 'light', label: '🚶‍♂️ Levemente ativo (exercício leve 1-3 dias/semana)' },
      { value: 'moderate', label: '🏃‍♂️ Moderadamente ativo (exercício moderado 3-5 dias/semana)' },
      { value: 'active', label: '💪 Muito ativo (exercício intenso 6-7 dias/semana)' }
    ]
  },
  {
    id: 'goal',
    title: '🎯 Qual seu principal objetivo?',
    headline: "🚀 Objetivo identificado!",
    message: "Perfeito! Agora vamos estruturar toda a periodização, nutrição e suplementação focada 100% no seu objetivo específico!",
    type: 'radio',
    options: [
      { value: 'weight-loss', label: '🔥 Perda de peso e definição' },
      { value: 'muscle-gain', label: '💪 Ganho de massa muscular' },
      { value: 'maintenance', label: '⚖️ Manutenção e saúde geral' },
      { value: 'endurance', label: '🏃‍♂️ Melhora do condicionamento físico' },
      { value: 'strength', label: '🏋️‍♂️ Aumento da força máxima' }
    ]
  },
  {
    id: 'experience',
    title: '📈 Qual seu nível de experiência com treinos?',
    headline: "🧠 Adaptação neuromuscular!",
    message: "Sua experiência determina a complexidade dos exercícios e velocidade de progressão. Vamos otimizar baseado na sua curva de aprendizado!",
    type: 'radio',
    options: [
      { value: 'beginner', label: '🌱 Iniciante (menos de 6 meses de treino)' },
      { value: 'intermediate', label: '📊 Intermediário (6 meses a 2 anos)' },
      { value: 'advanced', label: '🏆 Avançado (mais de 2 anos de treino)' }
    ]
  },
  {
    id: 'frequency',
    title: '📅 Quantas vezes por semana você pode treinar?',
    headline: "⏰ Frequência otimizada!",
    message: "Frequência perfeita identificada! Vamos distribuir o volume de treino de forma científica para máxima recuperação e resultados!",
    type: 'radio',
    options: [
      { value: '2', label: '2️⃣ 2 vezes por semana (Mínimo eficaz)' },
      { value: '3', label: '3️⃣ 3 vezes por semana (Ideal para iniciantes)' },
      { value: '4', label: '4️⃣ 4 vezes por semana (Ótima frequência)' },
      { value: '5', label: '5️⃣ 5 vezes por semana (Alta dedicação)' },
      { value: '6', label: '6️⃣ 6 vezes por semana (Atlético)' }
    ]
  },
  {
    id: 'timePerSession',
    title: '⏰ Quanto tempo você tem disponível por treino?',
    headline: "⚡ Densidade de treino!",
    message: "Tempo disponível mapeado! Vamos maximizar cada minuto com exercícios de alta eficiência e densidade de treino científica!",
    type: 'radio',
    options: [
      { value: '30', label: '⏱️ 30 minutos (Treino express)' },
      { value: '45', label: '⏰ 45 minutos (Treino eficiente)' },
      { value: '60', label: '🕐 1 hora (Treino completo)' },
      { value: '90', label: '🕐 1 hora e 30 minutos (Treino extenso)' },
      { value: '120', label: '🕑 2 horas (Treino profissional)' }
    ]
  },
  {
    id: 'equipment',
    title: '🏋️‍♂️ Onde você pretende treinar?',
    headline: "🎯 Ambiente de treino!",
    message: "Local identificado! Vamos adaptar todos os exercícios para seu ambiente, garantindo máxima eficácia com os recursos disponíveis!",
    type: 'radio',
    options: [
      { value: 'gym', label: '🏢 Academia (equipamentos completos)' },
      { value: 'home-basic', label: '🏠 Casa (equipamentos básicos)' },
      { value: 'home-none', label: '🏡 Casa (apenas peso corporal)' },
      { value: 'outdoor', label: '🌳 Ao ar livre (funcional)' }
    ]
  },
  {
    id: 'dietaryRestrictions',
    title: '🥗 Você tem alguma restrição alimentar ou preferência?',
    headline: "🍽️ Nutrição personalizada!",
    message: "Restrições mapeadas! Vamos criar um plano nutricional 100% adequado às suas necessidades, sem comprometer resultados!",
    type: 'checkbox',
    options: [
      { value: 'vegetarian', label: '🌱 Vegetariano' },
      { value: 'vegan', label: '🥬 Vegano' },
      { value: 'gluten-free', label: '🌾 Sem glúten' },
      { value: 'lactose-free', label: '🥛 Sem lactose' },
      { value: 'low-carb', label: '🥩 Low carb' },
      { value: 'none', label: '✅ Nenhuma restrição' }
    ]
  },
  {
    id: 'sleepHours',
    title: '😴 Quantas horas você dorme por noite em média?',
    headline: "🌙 Recuperação noturna!",
    message: "Padrão de sono identificado! O sono é quando acontece 80% da recuperação muscular. Vamos otimizar sua cronobiologia!",
    type: 'radio',
    options: [
      { value: '4-5', label: '😵 4-5 horas (Sono insuficiente)' },
      { value: '6-7', label: '😊 6-7 horas (Sono adequado)' },
      { value: '8-9', label: '😌 8-9 horas (Sono ideal)' },
      { value: '10+', label: '😴 10+ horas (Sono excessivo)' }
    ]
  },
  {
    id: 'bedTime',
    title: '🌙 Que horas você costuma dormir?',
    headline: "🕐 Cronobiologia detectada!",
    message: "Seu ritmo circadiano está mapeado! Vamos sincronizar treinos e refeições com seu relógio biológico natural!",
    type: 'radio',
    options: [
      { value: '21:00-22:00', label: '🌅 21:00-22:00 (Cronótipo matutino)' },
      { value: '22:00-23:00', label: '⏰ 22:00-23:00 (Horário ideal)' },
      { value: '23:00-00:00', label: '🌃 23:00-00:00 (Noturno moderado)' },
      { value: '00:00-01:00', label: '🦉 00:00-01:00 (Cronótipo noturno)' },
      { value: '01:00+', label: '🌌 Após 01:00 (Muito tardio)' }
    ]
  },
  {
    id: 'wakeTime',
    title: '☀️ Que horas você costuma acordar?',
    headline: "🌅 Janela metabólica!",
    message: "Horário de despertar mapeado! Vamos definir o timing perfeito para treinos, refeições e suplementação baseado no seu ritmo!",
    type: 'radio',
    options: [
      { value: '05:00-06:00', label: '🌅 05:00-06:00 (Madrugador)' },
      { value: '06:00-07:00', label: '☀️ 06:00-07:00 (Matutino)' },
      { value: '07:00-08:00', label: '🌞 07:00-08:00 (Padrão)' },
      { value: '08:00-09:00', label: '😊 08:00-09:00 (Tardio)' },
      { value: '09:00+', label: '😴 Após 09:00 (Muito tardio)' }
    ]
  },
  {
    id: 'currentWaterIntake',
    title: '💧 Quantos litros de água você bebe por dia atualmente?',
    headline: "💦 Hidratação estratégica!",
    message: "Nível de hidratação avaliado! Água é fundamental para performance, recuperação e metabolismo. Vamos otimizar sua hidratação!",
    type: 'radio',
    options: [
      { value: '0-1', label: '💧 Menos de 1 litro (Desidratado)' },
      { value: '1-2', label: '💧💧 1-2 litros (Abaixo do ideal)' },
      { value: '2-3', label: '💧💧💧 2-3 litros (Adequado)' },
      { value: '3+', label: '💧💧💧💧 Mais de 3 litros (Bem hidratado)' }
    ]
  }
]

const achievements = [
  { id: 'first-workout', name: 'Primeiro Treino', description: 'Complete seu primeiro treino', icon: '🏃‍♂️', points: 10 },
  { id: 'hydration-hero', name: 'Herói da Hidratação', description: 'Beba 2L de água em um dia', icon: '💧', points: 15 },
  { id: 'diet-master', name: 'Mestre da Dieta', description: 'Complete todas as refeições do dia', icon: '🥗', points: 20 },
  { id: 'week-warrior', name: 'Guerreiro da Semana', description: 'Complete 7 dias seguidos', icon: '🔥', points: 50 },
  { id: 'consistency-king', name: 'Rei da Consistência', description: 'Mantenha 14 dias de streak', icon: '👑', points: 100 },
  { id: 'fitness-legend', name: 'Lenda do Fitness', description: 'Alcance 30 dias de streak', icon: '🏆', points: 200 }
]

export default function FitnessApp() {
  const [currentStep, setCurrentStep] = useState(-1) // Começar em -1 para mostrar formulário de dados pessoais primeiro
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', phone: '', email: '' })
  const [quizData, setQuizData] = useState<Partial<QuizData>>({})
  const [monthlyPlans, setMonthlyPlans] = useState<MonthlyPlan[]>([])
  const [personalAssessment, setPersonalAssessment] = useState<PersonalAssessment | null>(null)
  const [progress, setProgress] = useState<Progress>({
    workouts: 0,
    totalWorkouts: 0,
    dietAdherence: 0,
    waterIntake: 0,
    waterGoal: 0,
    date: new Date().toISOString().split('T')[0],
    completedMeals: [],
    completedWorkouts: [],
    streakDays: 0,
    level: 1,
    totalPoints: 0,
    achievements: []
  })
  const [activeTab, setActiveTab] = useState('quiz')
  const [activeMonth, setActiveMonth] = useState(1)
  const [waterAmount, setWaterAmount] = useState(250)
  const [appState, setAppState] = useState<AppState>({
    quizCompleted: false,
    subscriptionActive: false,
    subscriptionExpired: false,
    currentMonth: 1
  })
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [showRenewalModal, setShowRenewalModal] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | null>(null)
  const [showPricingAfterQuiz, setShowPricingAfterQuiz] = useState(false)

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('fitness-progress')
      const savedPlans = localStorage.getItem('fitness-monthly-plans')
      const savedAssessment = localStorage.getItem('fitness-assessment')
      const savedAppState = localStorage.getItem('fitness-app-state')
      const savedUserInfo = localStorage.getItem('fitness-user-info')
      const savedTheme = localStorage.getItem('fitness-theme')
      
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress))
      }
      
      if (savedPlans) {
        setMonthlyPlans(JSON.parse(savedPlans))
      }

      if (savedAssessment) {
        setPersonalAssessment(JSON.parse(savedAssessment))
      }

      if (savedUserInfo) {
        setUserInfo(JSON.parse(savedUserInfo))
      }

      if (savedAppState) {
        const state = JSON.parse(savedAppState)
        setAppState(state)
        
        // Se quiz foi completado mas não tem assinatura ativa, mostrar pricing
        if (state.quizCompleted && !state.subscriptionActive) {
          setShowPricingAfterQuiz(true)
        } else if (state.quizCompleted && state.subscriptionActive) {
          setActiveTab('plans')
        }
      }

      if (savedTheme) {
        setIsDarkMode(JSON.parse(savedTheme))
      }
    } catch (error) {
      console.log('Erro ao carregar dados salvos:', error)
    }
  }, [])

  useEffect(() => {
    // Aplicar tema ao documento
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Salvar preferência
    localStorage.setItem('fitness-theme', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleUserInfoChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleQuizAnswer = (questionId: string, value: string | string[]) => {
    setQuizData(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const nextQuestion = () => {
    if (currentStep === -1) {
      // Salvar dados pessoais e ir para primeira pergunta
      localStorage.setItem('fitness-user-info', JSON.stringify(userInfo))
      setCurrentStep(0)
    } else if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      generatePlans()
    }
  }

  const calculateSleepWindow = (bedTime: string, wakeTime: string) => {
    if (!bedTime || !wakeTime) return { hours: 8, quality: 'normal' }
    
    // Parse the time ranges to get average times
    const parseBedTime = (timeRange: string) => {
      if (timeRange.includes('-')) {
        const [start] = timeRange.split('-')
        return parseInt(start.split(':')[0])
      }
      return 22 // default
    }
    
    const parseWakeTime = (timeRange: string) => {
      if (timeRange.includes('-')) {
        const [start] = timeRange.split('-')
        return parseInt(start.split(':')[0])
      }
      return 7 // default
    }
    
    const bedHour = parseBedTime(bedTime)
    const wakeHour = parseWakeTime(wakeTime)
    
    let sleepHours = wakeHour - bedHour
    if (sleepHours < 0) sleepHours += 24
    
    let quality = 'normal'
    if (sleepHours < 6) quality = 'poor'
    else if (sleepHours >= 7 && sleepHours <= 9) quality = 'good'
    else if (sleepHours > 9) quality = 'excessive'
    
    return { hours: sleepHours, quality }
  }

  const generatePersonalAssessment = (data: QuizData): PersonalAssessment => {
    // Parse weight and height from ranges
    const parseWeight = (weightRange: string) => {
      if (weightRange.includes('-')) {
        const [start, end] = weightRange.split('-').map(s => parseInt(s))
        return (start + end) / 2
      }
      return 100 // for 100+ range
    }
    
    const parseHeight = (heightRange: string) => {
      if (heightRange.includes('-')) {
        const [start, end] = heightRange.split('-').map(s => parseInt(s))
        return (start + end) / 2
      }
      return 190 // for 190+ range
    }
    
    const weight = parseWeight(data.weight)
    const height = parseHeight(data.height) / 100
    const imc = weight / (height * height)
    
    let imcCategory = ''
    if (imc < 18.5) imcCategory = 'Abaixo do peso'
    else if (imc < 25) imcCategory = 'Peso normal'
    else if (imc < 30) imcCategory = 'Sobrepeso'
    else imcCategory = 'Obesidade'

    const sleepData = calculateSleepWindow(data.bedTime, data.wakeTime)
    let sleepAnalysis = `Você dorme aproximadamente ${sleepData.hours} horas por noite (${data.bedTime} às ${data.wakeTime}). `
    
    switch (sleepData.quality) {
      case 'poor':
        sleepAnalysis += 'Isso é insuficiente para uma recuperação adequada. O ideal são 7-9 horas.'
        break
      case 'good':
        sleepAnalysis += 'Excelente! Você está dentro da faixa ideal de sono para adultos.'
        break
      case 'excessive':
        sleepAnalysis += 'Você dorme mais que o necessário. Isso pode indicar baixa qualidade do sono.'
        break
      default:
        sleepAnalysis += 'Sua quantidade de sono está na média.'
    }

    const activityLabels: Record<string, string> = {
      'sedentary': 'sedentário',
      'light': 'levemente ativo',
      'moderate': 'moderadamente ativo',
      'active': 'muito ativo'
    }

    const goalLabels: Record<string, string> = {
      'weight-loss': 'perda de peso',
      'muscle-gain': 'ganho de massa muscular',
      'maintenance': 'manutenção do peso',
      'endurance': 'melhora do condicionamento',
      'strength': 'aumento da força'
    }

    // Extrair apenas o primeiro nome
    const firstName = userInfo.name.split(' ')[0]

    const routineSummary = `${firstName}, você tem ${data.age} anos, pesa aproximadamente ${weight}kg e mede cerca de ${parseHeight(data.height)}cm. Atualmente você é ${activityLabels[data.activityLevel]} e seu objetivo principal é ${goalLabels[data.goal]}. Você dorme das ${data.bedTime} às ${data.wakeTime} (${sleepData.hours}h) e consome ${data.currentWaterIntake} litros de água por dia. Seu nível de experiência com treinos é ${data.experience === 'beginner' ? 'iniciante' : data.experience === 'intermediate' ? 'intermediário' : 'avançado'}.`

    const recommendations: string[] = []
    const scheduleRecommendations: string[] = []
    
    if (imc < 18.5) {
      recommendations.push('Considere focar no ganho de peso saudável com exercícios de força')
    } else if (imc > 25) {
      recommendations.push('Combine exercícios cardiovasculares com treino de força para otimizar a perda de peso')
    }

    if (sleepData.quality === 'poor') {
      recommendations.push('IMPORTANTE: Ajuste seu horário de sono para 22:00-06:00 (8 horas) para melhor recuperação')
      scheduleRecommendations.push('Recomendamos dormir às 22:00 e acordar às 06:00 para otimizar sua recuperação e energia')
    }

    if (data.currentWaterIntake === '0-1') {
      recommendations.push('Aumente gradualmente seu consumo de água para melhorar a hidratação')
    }

    if (data.activityLevel === 'sedentary') {
      recommendations.push('Comece com exercícios leves e aumente a intensidade progressivamente')
    }

    if (data.experience === 'beginner') {
      recommendations.push('Foque na técnica correta dos exercícios antes de aumentar a carga')
    }

    scheduleRecommendations.push('Treinos matinais (7h-8h) são ideais para maximizar energia e metabolismo')
    scheduleRecommendations.push('Evite treinos intensos após 19h para não prejudicar seu sono')

    return {
      imc: Math.round(imc * 10) / 10,
      imcCategory,
      routineSummary,
      recommendations,
      sleepAnalysis,
      scheduleRecommendations
    }
  }

  const generateWorkoutPlan = (data: QuizData, monthNumber: number): WorkoutPlan => {
    // Simplified workout plan generation
    return {
      weeklyPlan: [],
      frequency: data.frequency + ' vezes por semana',
      restDays: [],
      periodization: 'Periodização Linear',
      progressionPlan: 'Progressão gradual',
      volumeProgression: 'Volume crescente',
      intensityProgression: 'Intensidade progressiva',
      deloadWeek: 'Semana 4',
      assessmentWeek: 'Semana 5'
    }
  }

  const generateDietPlan = (data: QuizData, monthNumber: number): DietPlan => {
    // Simplified diet plan generation
    return {
      calories: 2000,
      protein: 150,
      carbs: 200,
      fats: 80,
      totalDailyCalories: 2000,
      meals: [],
      macroDistribution: {
        proteinPercent: 30,
        carbsPercent: 40,
        fatsPercent: 30
      },
      supplementation: [],
      hydrationPlan: {
        baseWater: 2500,
        preWorkout: 300,
        postWorkout: 500,
        withMeals: 200,
        electrolyteNeeds: []
      },
      mealTiming: {
        preWorkout: '',
        postWorkout: '',
        beforeBed: '',
        intermittentFasting: ''
      },
      micronutrientFocus: [],
      foodSynergies: [],
      metabolicOptimization: ''
    }
  }

  const generateHydrationPlan = (data: QuizData, monthNumber: number): HydrationPlan => {
    return {
      dailyGoal: 2.5,
      reminders: [],
      electrolytes: [],
      timing: []
    }
  }

  const generateMonthlyPlans = (data: QuizData): MonthlyPlan[] => {
    const plans: MonthlyPlan[] = []
    
    for (let month = 1; month <= 12; month++) {
      const workoutPlan = generateWorkoutPlan(data, month)
      const dietPlan = generateDietPlan(data, month)
      const hydrationPlan = generateHydrationPlan(data, month)
      
      plans.push({
        month,
        workoutPlan,
        dietPlan,
        hydrationPlan,
        unlocked: month === 1,
        personalizedFeatures: []
      })
    }
    
    return plans
  }

  const generatePlans = () => {
    try {
      const assessment = generatePersonalAssessment(quizData as QuizData)
      const monthlyPlans = generateMonthlyPlans(quizData as QuizData)
      
      setPersonalAssessment(assessment)
      setMonthlyPlans(monthlyPlans)
      
      localStorage.setItem('fitness-assessment', JSON.stringify(assessment))
      localStorage.setItem('fitness-monthly-plans', JSON.stringify(monthlyPlans))
      
      const newProgress = {
        ...progress,
        totalWorkouts: parseInt(quizData.frequency || '3') * 4,
        waterGoal: monthlyPlans[0].hydrationPlan.dailyGoal
      }
      setProgress(newProgress)
      localStorage.setItem('fitness-progress', JSON.stringify(newProgress))
      
      // Marcar quiz como completo e mostrar pricing
      const newAppState = {
        ...appState,
        quizCompleted: true
      }
      setAppState(newAppState)
      localStorage.setItem('fitness-app-state', JSON.stringify(newAppState))
      
      // Mostrar seção de pricing após completar o quiz
      setShowPricingAfterQuiz(true)
    } catch (error) {
      console.error('Erro ao gerar planos:', error)
    }
  }

  const handleSubscription = (plan: 'monthly' | 'annual') => {
    setSelectedPlan(plan)
    setShowSubscriptionModal(true)
  }

  const confirmSubscription = () => {
    const subscriptionDate = new Date().toISOString()
    const newAppState = {
      ...appState,
      subscriptionActive: true,
      subscriptionExpired: false,
      subscriptionStartDate: subscriptionDate
    }
    setAppState(newAppState)
    localStorage.setItem('fitness-app-state', JSON.stringify(newAppState))
    setShowSubscriptionModal(false)
    setShowPricingAfterQuiz(false)
    setActiveTab('plans')
    
    // Forçar atualização da página para garantir que o estado seja aplicado
    window.location.reload()
  }

  const handleMonthRenewal = (monthNumber: number) => {
    setShowRenewalModal(true)
    setActiveMonth(monthNumber)
  }

  const confirmRenewal = () => {
    // Desbloquear o próximo mês
    const updatedPlans = monthlyPlans.map(plan => 
      plan.month === activeMonth ? { ...plan, unlocked: true, renewalDate: new Date().toISOString() } : plan
    )
    
    setMonthlyPlans(updatedPlans)
    localStorage.setItem('fitness-monthly-plans', JSON.stringify(updatedPlans))
    
    const newAppState = {
      ...appState,
      currentMonth: activeMonth
    }
    setAppState(newAppState)
    localStorage.setItem('fitness-app-state', JSON.stringify(newAppState))
    
    setShowRenewalModal(false)
  }

  const handleTabChange = (value: string) => {
    // Verificar se pode acessar a aba
    if (value === 'plans' || value === 'progress') {
      if (!appState.quizCompleted) {
        return
      }
      if (!appState.subscriptionActive) {
        return
      }
    }
    setActiveTab(value)
  }

  const resetQuiz = () => {
    setCurrentStep(-1)
    setUserInfo({ name: '', phone: '', email: '' })
    setQuizData({})
    setMonthlyPlans([])
    setPersonalAssessment(null)
    setActiveTab('quiz')
    setShowPricingAfterQuiz(false)
    setAppState({
      quizCompleted: false,
      subscriptionActive: false,
      subscriptionExpired: false,
      currentMonth: 1
    })
    localStorage.removeItem('fitness-monthly-plans')
    localStorage.removeItem('fitness-progress')
    localStorage.removeItem('fitness-assessment')
    localStorage.removeItem('fitness-app-state')
    localStorage.removeItem('fitness-user-info')
  }

  const currentQuestion = currentStep >= 0 ? questions[currentStep] : null

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    } p-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <Dumbbell className="text-[#00A86B]" />
              FitPlan Pro
            </h1>
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className="backdrop-blur-sm bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 rounded-2xl"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Seu plano científico personalizado com evolução mensal baseada em evidências
          </p>
        </div>

        {/* Mostrar pricing após completar o quiz */}
        {showPricingAfterQuiz && (
          <div className="mb-8">
            <div className="space-y-8">
              {/* Header da seção de pricing */}
              <div className="text-center space-y-4">
                <div className="p-4 rounded-2xl backdrop-blur-md bg-gradient-to-r from-[#00A86B]/20 to-[#008A5A]/20 border border-[#00A86B]/30 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="h-6 w-6 text-[#00A86B]" />
                    <h2 className="text-2xl font-bold text-[#00A86B]">🎉 Parabéns! Seu plano está pronto!</h2>
                  </div>
                  <p className="text-[#00A86B] text-lg">
                    Agora escolha seu plano para desbloquear sua jornada de transformação científica
                  </p>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Escolha seu Plano Científico
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Planos personalizados com periodização científica, nutrição funcional e acompanhamento completo
                </p>
              </div>

              {/* Cards de Pricing */}
              <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                {/* Plano Mensal */}
                <Card className="relative backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#00A86B] to-[#008A5A] flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Plano Mensal
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Flexibilidade total para começar
                    </CardDescription>
                    <div className="mt-4">
                      <div className="text-4xl font-bold text-[#00A86B]">
                        R$ 97
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        por mês
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {[
                        'Periodização científica mensal',
                        'Treinos personalizados',
                        'Plano nutricional completo',
                        'Acompanhamento de progresso',
                        'Suporte por email',
                        'Relatórios detalhados'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#00A86B] flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => handleSubscription('monthly')}
                      className="w-full bg-gradient-to-r from-[#00A86B] to-[#008A5A] hover:from-[#008A5A] hover:to-[#007A4F] text-white font-semibold py-3 rounded-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      🚀 Começar Transformação
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Cancele a qualquer momento
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Plano Anual - Destacado */}
                <Card className="relative backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border-2 border-[#00A86B] shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                  {/* Badge de destaque */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#00A86B] to-[#008A5A] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      🔥 Mais Popular
                    </div>
                  </div>
                  
                  <CardHeader className="text-center pb-4 pt-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#00A86B] to-[#008A5A] flex items-center justify-center">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Plano Anual
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Melhor custo-benefício
                    </CardDescription>
                    <div className="mt-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-lg text-gray-400 line-through">
                          R$ 1.164
                        </div>
                        <div className="text-4xl font-bold text-[#00A86B]">
                          R$ 670
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        por ano (R$ 55,83/mês)
                      </div>
                      <div className="mt-2">
                        <Badge className="bg-gradient-to-r from-[#00A86B] to-[#008A5A] text-white">
                          💰 Economize R$ 494
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {[
                        'Tudo do plano mensal',
                        '12 meses de evolução científica',
                        'Periodização anual completa',
                        'Suporte prioritário',
                        'Consultoria nutricional',
                        'Relatórios mensais avançados',
                        'Acesso a webinars exclusivos',
                        'Comunidade VIP'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#00A86B] flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => handleSubscription('annual')}
                      className="w-full bg-gradient-to-r from-[#00A86B] to-[#008A5A] hover:from-[#008A5A] hover:to-[#007A4F] text-white font-semibold py-3 rounded-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      🎯 Garantir Desconto
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Garantia de 30 dias
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Seção de garantias e benefícios */}
              <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mt-12">
                <div className="text-center p-6 rounded-2xl backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#00A86B]/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-[#00A86B]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Garantia Total
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    30 dias para testar. Se não gostar, devolvemos 100% do valor.
                  </p>
                </div>

                <div className="text-center p-6 rounded-2xl backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#00A86B]/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[#00A86B]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Resultados Rápidos
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Metodologia científica comprovada com resultados em 30 dias.
                  </p>
                </div>

                <div className="text-center p-6 rounded-2xl backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#00A86B]/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#00A86B]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Suporte Completo
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Acompanhamento personalizado e suporte sempre que precisar.
                  </p>
                </div>
              </div>

              {/* Depoimentos */}
              <div className="max-w-4xl mx-auto mt-12">
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
                  O que nossos usuários dizem
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-6 rounded-2xl backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      "Perdi 8kg em 3 meses seguindo o plano científico. A periodização realmente funciona!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00A86B] flex items-center justify-center text-white font-bold">
                        M
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">Maria Silva</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Usuária há 6 meses</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      "O programa mais completo que já usei. Ganhou 5kg de massa muscular em 4 meses!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00A86B] flex items-center justify-center text-white font-bold">
                        J
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">João Santos</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Usuário há 1 ano</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 rounded-2xl">
            <TabsTrigger value="quiz" className="flex items-center gap-2 rounded-2xl">
              <User className="w-4 h-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger 
              value="plans" 
              disabled={!appState.quizCompleted || !appState.subscriptionActive}
              className={`flex items-center gap-2 rounded-2xl ${
                !appState.quizCompleted || !appState.subscriptionActive 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
            >
              {!appState.quizCompleted || !appState.subscriptionActive ? <Lock className="w-3 h-3" /> : null}
              <Target className="w-4 h-4" />
              <Lock className="w-3 h-3" />
              Treinos
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              disabled={!appState.quizCompleted || !appState.subscriptionActive}
              className={`flex items-center gap-2 rounded-2xl ${
                !appState.quizCompleted || !appState.subscriptionActive 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
            >
              {!appState.quizCompleted || !appState.subscriptionActive ? <Lock className="w-3 h-3" /> : null}
              <TrendingUp className="w-4 h-4" />
              <Lock className="w-3 h-3" />
              Progresso
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quiz">
            <div className="space-y-6">
              <Card className="w-full backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 shadow-2xl rounded-3xl">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                      {currentStep === -1 ? 'Dados Pessoais' : `Pergunta ${currentStep + 1} de ${questions.length}`}
                    </CardTitle>
                    {currentStep >= 0 && (
                      <Badge variant="outline" className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-full">
                        {Math.round(((currentStep + 1) / questions.length) * 100)}%
                      </Badge>
                    )}
                  </div>
                  {currentStep >= 0 && (
                    <Progress value={((currentStep + 1) / questions.length) * 100} className="w-full" />
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentStep === -1 ? (
                    // Formulário de dados pessoais
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                          👋 Vamos nos conhecer melhor!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Precisamos de algumas informações básicas para personalizar sua experiência
                        </p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nome completo *</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Digite seu nome completo"
                            value={userInfo.name}
                            onChange={(e) => handleUserInfoChange('name', e.target.value)}
                            className="backdrop-blur-sm bg-white/30 dark:bg-gray-700/30 border border-white/40 dark:border-gray-600/40 rounded-2xl"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Telefone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(11) 99999-9999"
                            value={userInfo.phone}
                            onChange={(e) => handleUserInfoChange('phone', e.target.value)}
                            className="backdrop-blur-sm bg-white/30 dark:bg-gray-700/30 border border-white/40 dark:border-gray-600/40 rounded-2xl"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={userInfo.email}
                          onChange={(e) => handleUserInfoChange('email', e.target.value)}
                          className="backdrop-blur-sm bg-white/30 dark:bg-gray-700/30 border border-white/40 dark:border-gray-600/40 rounded-2xl"
                          required
                        />
                      </div>

                      <div className="p-4 rounded-2xl backdrop-blur-sm bg-[#00A86B]/20 border border-[#00A86B]/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="h-4 w-4 text-[#00A86B]" />
                          <h4 className="font-semibold text-[#00A86B]">Seus dados estão seguros!</h4>
                        </div>
                        <p className="text-sm text-[#00A86B]">
                          Utilizamos suas informações apenas para personalizar seu plano de treino e nutrição. 
                          Seus dados não serão compartilhados com terceiros.
                        </p>
                      </div>
                    </div>
                  ) : currentQuestion ? (
                    // Perguntas do quiz
                    <>
                      <div className="p-4 rounded-2xl backdrop-blur-md bg-gradient-to-r from-[#00A86B]/20 to-[#008A5A]/20 border border-[#00A86B]/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-5 w-5 text-[#00A86B]" />
                          <h4 className="font-bold text-[#00A86B] text-lg">{currentQuestion.headline}</h4>
                        </div>
                        <p className="text-[#00A86B] text-sm">{currentQuestion.message}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{currentQuestion.title}</h3>
                        
                        {currentQuestion.type === 'radio' && (
                          <RadioGroup
                            value={quizData[currentQuestion.id as keyof QuizData] as string || ''}
                            onValueChange={(value) => handleQuizAnswer(currentQuestion.id, value)}
                          >
                            {currentQuestion.options?.map((option) => (
                              <div key={option.value} className="flex items-center space-x-2 p-3 rounded-2xl backdrop-blur-sm bg-white/20 dark:bg-gray-700/20 border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-600/30 transition-all duration-200 hover:scale-105">
                                <RadioGroupItem value={option.value} id={option.value} />
                                <Label htmlFor={option.value} className="cursor-pointer text-gray-700 dark:text-gray-300 flex-1">
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                        
                        {currentQuestion.type === 'checkbox' && (
                          <div className="space-y-2">
                            {currentQuestion.options?.map((option) => (
                              <div key={option.value} className="flex items-center space-x-2 p-3 rounded-2xl backdrop-blur-sm bg-white/20 dark:bg-gray-700/20 border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-600/30 transition-all duration-200 hover:scale-105">
                                <Checkbox
                                  id={option.value}
                                  checked={(quizData[currentQuestion.id as keyof QuizData] as string[] || []).includes(option.value)}
                                  onCheckedChange={(checked) => {
                                    const current = quizData[currentQuestion.id as keyof QuizData] as string[] || []
                                    if (checked) {
                                      handleQuizAnswer(currentQuestion.id, [...current, option.value])
                                    } else {
                                      handleQuizAnswer(currentQuestion.id, current.filter(v => v !== option.value))
                                    }
                                  }}
                                />
                                <Label htmlFor={option.value} className="cursor-pointer text-gray-700 dark:text-gray-300 flex-1">
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ) : null}
                  
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(Math.max(-1, currentStep - 1))}
                      disabled={currentStep === -1}
                      className="backdrop-blur-sm bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 rounded-2xl"
                    >
                      Anterior
                    </Button>
                    <Button
                      onClick={nextQuestion}
                      disabled={
                        currentStep === -1 
                          ? !userInfo.name || !userInfo.phone || !userInfo.email
                          : currentQuestion && !quizData[currentQuestion.id as keyof QuizData]
                      }
                      className="bg-[#00A86B] hover:bg-[#008A5A] rounded-2xl transform hover:scale-105 transition-all duration-200"
                    >
                      {currentStep === -1 
                        ? 'Começar Quiz 🚀' 
                        : currentStep === questions.length - 1 
                          ? 'Ver Planos 🎯' 
                          : 'Próxima 🚀'
                      }
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="plans">
            <div className="text-center py-12">
              <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Área Restrita
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                <Lock className="w-4 h-4 inline mr-2" />
                Complete o quiz e ative sua assinatura para acessar seus planos personalizados.
              </p>
              <Button 
                onClick={() => setActiveTab('quiz')}
                className="bg-[#00A86B] hover:bg-[#008A5A] rounded-2xl"
              >
                Fazer Quiz
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="text-center py-12">
              <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Área Restrita
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                <Lock className="w-4 h-4 inline mr-2" />
                Complete o quiz e ative sua assinatura para acompanhar seu progresso.
              </p>
              <Button 
                onClick={() => setActiveTab('quiz')}
                className="bg-[#00A86B] hover:bg-[#008A5A] rounded-2xl"
              >
                Fazer Quiz
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal de Confirmação de Assinatura */}
        <Dialog open={showSubscriptionModal} onOpenChange={setShowSubscriptionModal}>
          <DialogContent className="backdrop-blur-md bg-white/90 dark:bg-gray-800/90 border border-white/30 dark:border-gray-700/30 rounded-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <CreditCard className="w-5 h-5 text-[#00A86B]" />
                Confirmar Assinatura
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Você escolheu o plano {selectedPlan === 'monthly' ? 'Mensal (R$ 97/mês)' : 'Anual (R$ 670/ano)'}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl backdrop-blur-sm bg-[#00A86B]/20 border border-[#00A86B]/30">
                <h3 className="font-semibold mb-2 text-[#00A86B]">
                  {selectedPlan === 'monthly' ? 'Plano Mensal' : 'Plano Anual'}
                </h3>
                <ul className="text-sm space-y-1 text-[#00A86B]">
                  <li>✅ Acesso completo aos planos científicos</li>
                  <li>✅ Periodização personalizada</li>
                  <li>✅ Acompanhamento de progresso</li>
                  <li>✅ Suporte por email</li>
                  {selectedPlan === 'annual' && (
                    <>
                      <li>✅ Economia de R$ 494 por ano</li>
                      <li>✅ Suporte prioritário</li>
                      <li>✅ Consultoria nutricional</li>
                    </>
                  )}
                </ul>
              </div>
              <div className="flex gap-2">
                <Button onClick={confirmSubscription} className="flex-1 bg-[#00A86B] hover:bg-[#008A5A] rounded-2xl">
                  Confirmar Assinatura
                </Button>
                <Button onClick={() => setShowSubscriptionModal(false)} variant="outline" className="flex-1 backdrop-blur-sm bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 rounded-2xl">
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}