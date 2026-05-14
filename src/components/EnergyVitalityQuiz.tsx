import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronRight, Activity, Check, Share2, ShoppingCart,
  Shield, Droplets, Moon, Zap, Heart, AlertTriangle, Star,
  MessageSquare, ArrowLeft, Flame
} from 'lucide-react';

interface EnergyVitalityQuizProps {
  isOpen: boolean;
  onClose: () => void;
  productColor: string;
}

type Step = 'intro' | 'quiz' | 'result' | 'checkout' | 'whatsapp_sent';

// ─── 11 preguntas (no diagnóstico, lenguaje preventivo) ─────────────────────
const questions = [
  {
    id: 'age',
    icon: <Star size={20} />,
    text: '¿Qué edad tienes?',
    options: ['18–29', '30–39', '40–49', '50+'],
    scores: [0, 1, 2, 3],
  },
  {
    id: 'energy',
    icon: <Zap size={20} />,
    text: '¿Cómo describirías tu nivel de energía durante el día?',
    options: ['Alta y constante', 'Algunos bajones', 'Frecuente cansancio', 'Agotamiento constante'],
    scores: [0, 1, 2, 3],
  },
  {
    id: 'sleep',
    icon: <Moon size={20} />,
    text: '¿Cómo es la calidad de tu sueño?',
    options: ['Profundo y reparador', 'Me despierto ocasionalmente', 'Me despierto varias veces', 'Dificultad para conciliar'],
    scores: [0, 1, 2, 3],
  },
  {
    id: 'bathroom_night',
    icon: <Droplets size={20} />,
    text: '¿Con qué frecuencia te despiertas para ir al baño durante la noche?',
    options: ['Nunca o casi nunca', '1 vez por noche', '2–3 veces por noche', 'Más de 3 veces'],
    scores: [0, 1, 2, 3],
  },
  {
    id: 'bathroom_day',
    icon: <Droplets size={20} />,
    text: 'Durante el día, ¿sientes que tu flujo urinario es?',
    options: ['Normal y completo', 'Lento o débil', 'Interrumpido con sensación de no vaciar', 'Con urgencia o goteo'],
    scores: [0, 1, 2, 3],
  },
  {
    id: 'stress',
    icon: <Flame size={20} />,
    text: '¿Cuál es tu nivel de estrés diario?',
    options: ['Bajo', 'Moderado', 'Alto', 'Muy alto'],
    scores: [0, 1, 2, 3],
  },
  {
    id: 'abdominal',
    icon: <Activity size={20} />,
    text: '¿Notas acumulación de grasa en la zona abdominal?',
    options: ['No', 'Leve', 'Moderada', 'Pronunciada'],
    scores: [0, 1, 2, 3],
  },
  {
    id: 'exercise',
    icon: <Heart size={20} />,
    text: '¿Con qué frecuencia realizas actividad física?',
    options: ['5+ veces/semana', '3–4 veces/semana', '1–2 veces/semana', 'Ninguna'],
    scores: [0, 1, 2, 3],
  },
  {
    id: 'libido',
    icon: <Flame size={20} />,
    text: '¿Has notado cambios en tu vitalidad y rendimiento en general este último año?',
    options: ['Todo excelente', 'Ligeros bajones ocasionales', 'Disminución notable', 'Cambios significativos'],
    scores: [0, 1, 2, 3],
  },
  {
    id: 'mood',
    icon: <Star size={20} />,
    text: '¿Cómo calificarías tu estado de ánimo y motivación general?',
    options: ['Siempre motivado', 'Varía según el día', 'Con frecuencia bajo', 'Muy bajo constantemente'],
    scores: [0, 1, 2, 3],
  },
  {
    id: 'diet',
    icon: <Shield size={20} />,
    text: '¿Cómo describirías tu alimentación habitual?',
    options: ['Equilibrada y variada', 'Alta en carbohidratos', 'Rica en grasas procesadas', 'Irregular y desordenada'],
    scores: [0, 1, 2, 3],
  },
];

// ─── Nivel de resultado según puntaje ───────────────────────────────────────
const getLevel = (score: number) => {
  const max = questions.length * 3;
  const pct = score / max;
  if (pct <= 0.3) return 'alto';
  if (pct <= 0.6) return 'medio';
  return 'bajo';
};

const levelConfig = {
  alto: {
    label: '¡Óptimo!',
    sublabel: 'Nivel de Vitalidad Alto',
    color: '#00f2ff',
    bg: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/40',
    description:
      'Tu perfil de energía y bienestar está en muy buena forma. Mantener los hábitos actuales es clave. TestoMax puede ayudarte a sostener este nivel y potenciar tu rendimiento a largo plazo.',
    supplements: ['Ginseng Coreano', 'Zinc + Magnesio', 'Maca Peruana'],
    icon: <Star size={40} />,
  },
  medio: {
    label: 'En Proceso',
    sublabel: 'Nivel de Vitalidad Medio',
    color: '#f59e0b',
    bg: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/40',
    description:
      'Detectamos algunas áreas de oportunidad en tu bienestar masculino. Tu cuerpo está enviando señales que conviene atender. TestoMax está formulado para apoyar la recuperación hormonal y el bienestar prostático de forma natural.',
    supplements: ['Saw Palmetto', 'Ginseng Coreano', 'Zinc', 'Maca'],
    icon: <Activity size={40} />,
  },
  bajo: {
    label: 'Atención',
    sublabel: 'Tu cuerpo pide apoyo',
    color: '#ff3e3e',
    bg: 'from-red-500/20 to-orange-500/10',
    border: 'border-red-500/40',
    description:
      'Tu perfil muestra señales claras de desgaste en varios aspectos del bienestar masculino, incluyendo energía, descanso y función urinaria. TestoMax ofrece un protocolo de restauración con ingredientes naturales que apoyan la vitalidad y el equilibrio prostático.',
    supplements: ['Saw Palmetto', 'Zinc Alto', 'Maca Peruana', 'Ginseng', 'Omega-3'],
    icon: <AlertTriangle size={40} />,
  },
};

// ─────────────────────────────────────────────────────────────────────────────

export const EnergyVitalityQuiz = ({ isOpen, onClose, productColor }: EnergyVitalityQuizProps) => {
  const [step, setStep] = useState<Step>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('intro');
        setCurrentIdx(0);
        setScore(0);
        setSelectedOption(null);
      }, 300);
    }
  }, [isOpen]);

  const handleAnswer = (optionIdx: number) => {
    setSelectedOption(optionIdx);
    const questionScore = questions[currentIdx].scores[optionIdx];
    setTimeout(() => {
      const newScore = score + questionScore;
      setScore(newScore);
      setSelectedOption(null);
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setStep('result');
      }
    }, 350);
  };

  const handleWhatsApp = () => {
    const level = getLevel(score);
    const cfg = levelConfig[level];
    const msg = `Hola! Acabo de completar el Perfil de Energía y Vitalidad Masculina de XNutra. Mi resultado fue: "${cfg.label}" - ${cfg.sublabel}. Me interesa conocer más sobre TestoMax para mejorar mi vitalidad y bienestar. ¿Pueden asesorarme?`;
    window.open(`https://wa.me/59170049398?text=${encodeURIComponent(msg)}`, '_blank');
    setStep('whatsapp_sent');
  };

  const handleBuyNow = () => {
    setStep('checkout');
  };

  if (!isOpen) return null;

  const progress = step === 'quiz' ? ((currentIdx + 1) / questions.length) * 100 : 0;
  const level = getLevel(score);
  const cfg = levelConfig[level];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] rounded-full blur-[140px]"
            style={{ background: `${productColor}18` }}
          />
          <div
            className="absolute bottom-1/4 -right-1/4 w-[40vw] h-[40vw] rounded-full blur-[140px]"
            style={{ background: `${productColor}0d` }}
          />
        </div>

        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0d0d0f] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.8)] max-h-[90vh] flex flex-col"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-50 p-2.5 bg-white/5 rounded-full text-white/40 hover:text-white hover:bg-white/15 transition-all border border-white/5"
          >
            <X size={20} />
          </button>

          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <AnimatePresence mode="wait">

              {/* ─── INTRO ──────────────────────────────────────────────── */}
              {step === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="p-8 md:p-12 flex flex-col items-center text-center"
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border"
                    style={{ background: `${productColor}18`, borderColor: `${productColor}40` }}
                  >
                    <Shield size={36} style={{ color: productColor }} />
                  </div>
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.5em] mb-3"
                    style={{ color: productColor }}
                  >
                    Evaluación Preventiva de Bienestar
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tight leading-tight mb-4">
                    Perfil de Energía<br />y Vitalidad Masculina
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed max-w-md mb-8">
                    11 preguntas para conocer tu estado actual de energía, descanso, bienestar urinario y vitalidad general. Recibe recomendaciones naturales personalizadas.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <button
                      onClick={() => setStep('quiz')}
                      className="flex-1 text-black py-4 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl"
                      style={{ background: productColor }}
                    >
                      Iniciar Evaluación <ChevronRight size={18} />
                    </button>
                  </div>
                  <p className="text-white/20 text-[10px] mt-6 uppercase tracking-widest">
                    No es diagnóstico médico · Solo orientación de bienestar
                  </p>
                </motion.div>
              )}

              {/* ─── QUIZ ───────────────────────────────────────────────── */}
              {step === 'quiz' && (
                <motion.div
                  key={`q-${currentIdx}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  className="p-8 md:p-12"
                >
                  {/* Progress */}
                  <div className="mb-8">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">
                      <span>Pregunta {currentIdx + 1} de {questions.length}</span>
                      <span style={{ color: productColor }}>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: productColor }}
                        initial={{ width: `${((currentIdx) / questions.length) * 100}%` }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  {/* Icon + Question */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 border text-[10px] font-black uppercase tracking-widest"
                    style={{ color: productColor, borderColor: `${productColor}30`, background: `${productColor}12` }}
                  >
                    {questions[currentIdx].icon}
                    {questions[currentIdx].id === 'bathroom_night' || questions[currentIdx].id === 'bathroom_day'
                      ? 'Bienestar Urinario'
                      : 'Vitalidad'}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-6 leading-snug">
                    {questions[currentIdx].text}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {questions[currentIdx].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(i)}
                        className={`w-full text-left px-5 py-4 rounded-2xl border transition-all font-semibold text-sm ${
                          selectedOption === i
                            ? 'border-white/60 bg-white/15 text-white'
                            : 'border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.08] hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <span
                          className="inline-flex w-6 h-6 rounded-full items-center justify-center text-[10px] font-black mr-3 shrink-0"
                          style={{ background: selectedOption === i ? productColor : 'rgba(255,255,255,0.1)', color: selectedOption === i ? '#000' : 'rgba(255,255,255,0.5)' }}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </motion.button>
                    ))}
                  </div>

                  {/* Back button */}
                  {currentIdx > 0 && (
                    <button
                      onClick={() => setCurrentIdx(currentIdx - 1)}
                      className="mt-6 flex items-center gap-2 text-white/30 hover:text-white/60 text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      <ArrowLeft size={14} /> Volver
                    </button>
                  )}
                </motion.div>
              )}

              {/* ─── RESULT ─────────────────────────────────────────────── */}
              {step === 'result' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 md:p-12"
                >
                  {/* Result Badge */}
                  <div className={`bg-gradient-to-br ${cfg.bg} border ${cfg.border} rounded-3xl p-6 mb-6 flex flex-col sm:flex-row items-center gap-4`}>
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `${cfg.color}20`, color: cfg.color }}
                    >
                      {cfg.icon}
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 mb-1">
                        <Check size={14} style={{ color: cfg.color }} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Evaluación Completa</span>
                      </div>
                      <h2 className="text-2xl font-black text-white leading-none">{cfg.label}</h2>
                      <p className="text-sm font-bold mt-0.5" style={{ color: cfg.color }}>{cfg.sublabel}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{cfg.description}</p>

                  {/* Supplements */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">Ingredientes recomendados en TestoMax para tu perfil</p>
                    <div className="flex flex-wrap gap-2">
                      {cfg.supplements.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1.5 rounded-full text-xs font-black border"
                          style={{ borderColor: `${cfg.color}40`, color: cfg.color, background: `${cfg.color}12` }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons — TODOS FUNCIONALES */}
                  <div className="space-y-3">
                    {/* Comprar ahora */}
                    <button
                      onClick={handleBuyNow}
                      className="w-full text-black py-4 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl"
                      style={{ background: productColor }}
                    >
                      <ShoppingCart size={18} /> Quiero mejorar mi energía y vitalidad
                    </button>

                    {/* WhatsApp */}
                    <button
                      onClick={handleWhatsApp}
                      className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-[#128C7E] active:scale-95 transition-all"
                    >
                      <MessageSquare size={18} /> Quiero asesoría personalizada
                    </button>

                    {/* Compartir resultado */}
                    <button
                      onClick={() => {
                        const text = `Hice el Perfil de Energía y Vitalidad Masculina de XNutra y mi resultado fue: "${cfg.label}" – ${cfg.sublabel}. ¡Descúbrelo tú también!`;
                        if (navigator.share) {
                          navigator.share({ title: 'Mi resultado XNutra', text });
                        } else {
                          navigator.clipboard.writeText(text);
                          alert('Resultado copiado al portapapeles 📋');
                        }
                      }}
                      className="w-full bg-white/5 border border-white/10 text-white/60 py-4 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white active:scale-95 transition-all"
                    >
                      <Share2 size={18} /> Compartir mi resultado
                    </button>
                  </div>

                  <p className="text-white/20 text-[10px] mt-4 text-center uppercase tracking-widest">
                    Este cuestionario es orientativo · No reemplaza la consulta médica profesional
                  </p>
                </motion.div>
              )}

              {/* ─── CHECKOUT ───────────────────────────────────────────── */}
              {step === 'checkout' && (
                <motion.div
                  key="checkout"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 md:p-12 flex flex-col items-center text-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border"
                    style={{ background: `${productColor}18`, borderColor: `${productColor}40` }}
                  >
                    <ShoppingCart size={28} style={{ color: productColor }} />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-2">¡Excelente decisión!</h2>
                  <p className="text-white/50 text-sm mb-8 max-w-sm">
                    Estás a un paso de comenzar tu protocolo de recuperación hormonal y bienestar prostático con TestoMax.
                  </p>

                  <div className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6 text-left space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <div>
                        <p className="text-white font-black text-lg">TestoMax</p>
                        <p className="text-white/40 text-xs uppercase tracking-widest">Protocolo de Vitalidad Masculina</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-black text-xl" style={{ color: productColor }}>399 Bs</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-white/60">
                      {['Fórmula de 800mg de alta pureza', 'Envío incluido en Bolivia', 'Garantía de satisfacción 30 días', 'Asesoría de seguimiento'].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check size={14} style={{ color: productColor }} /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full space-y-3">
                    <button
                      onClick={handleWhatsApp}
                      className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-[#128C7E] active:scale-95 transition-all"
                    >
                      <MessageSquare size={18} /> Pedir vía WhatsApp
                    </button>
                    <button
                      onClick={() => {
                        (window as any).openCheckout?.({ id: 'testomax', name: 'TestoMax' });
                        onClose();
                      }}
                      className="w-full text-black py-4 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                      style={{ background: productColor }}
                    >
                      <ShoppingCart size={18} /> Continuar con la compra
                    </button>
                    <button
                      onClick={() => setStep('result')}
                      className="w-full text-white/30 hover:text-white/60 text-xs font-bold uppercase tracking-widest py-2 transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={14} /> Volver a mi resultado
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─── WHATSAPP SENT ──────────────────────────────────────── */}
              {step === 'whatsapp_sent' && (
                <motion.div
                  key="wa_sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 md:p-12 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center mb-6">
                    <MessageSquare size={36} className="text-[#25D366]" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-2">¡Mensaje enviado!</h2>
                  <p className="text-white/50 text-sm mb-8 max-w-sm">
                    Tu perfil y consulta fueron enviados a nuestro equipo vía WhatsApp. Te responderemos en breve para asesorarte de forma personalizada.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                    <button
                      onClick={onClose}
                      className="flex-1 bg-white/10 border border-white/10 text-white py-3 rounded-2xl font-black text-sm uppercase hover:bg-white/20 active:scale-95 transition-all"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="flex-1 bg-[#25D366] text-white py-3 rounded-2xl font-black text-sm uppercase hover:bg-[#128C7E] active:scale-95 transition-all"
                    >
                      Reintentar
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
