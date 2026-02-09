import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ArrowRight, CheckCircle2, FlaskConical, Target, Brain, Zap, AlertTriangle, MessageSquare, Heart, Pill, Stethoscope, Info, ShieldCheck } from 'lucide-react';
import { products } from '../data/products';

interface Question {
    id: number;
    text: string;
    subtext: string;
    didacticNote: string;
    type: 'goal' | 'health' | 'medication';
    options: {
        id: string;
        label: string;
        icon: any;
        isRisk?: boolean;
    }[];
}

const questions: Question[] = [
    {
        id: 1,
        text: "Edad y Biología",
        subtext: "Para calibrar la respuesta metabólica.",
        didacticNote: "La eficiencia del eje hormonal varía significativamente con el tiempo. XNutra ajusta la biodisponibilidad a tu rango de edad.",
        type: 'health',
        options: [
            { id: 'age_1', label: '18 - 30 Años', icon: Activity },
            { id: 'age_2', label: '31 - 50 Años', icon: Zap },
            { id: 'age_3', label: '50+ Años', icon: Target },
        ]
    },
    {
        id: 2,
        text: "Estatus Cardiovascular",
        subtext: "¿Padece hipertensión arterial moderada o severa?",
        didacticNote: "Nuestras fórmulas activan el óxido nítrico. Si hay tensión alta pre-existente, la dilatación debe ser monitorizada.",
        type: 'health',
        options: [
            { id: 'hyp_yes', label: 'Sí, soy hipertenso', icon: AlertTriangle, isRisk: true },
            { id: 'hyp_no', label: 'Presión Arterial Normal', icon: CheckCircle2 },
        ]
    },
    {
        id: 3,
        text: "Antecedentes Críticos",
        subtext: "¿Ha sufrido infartos, arritmias o cirugías cardíacas?",
        didacticNote: "Seguridad Primero: Los extractos naturales potentes pueden alterar el ritmo cardíaco en corazones con patologías previas.",
        type: 'health',
        options: [
            { id: 'heart_yes', label: 'Sí, tengo antecedentes', icon: Heart, isRisk: true },
            { id: 'heart_no', label: 'Sin antecedentes cardíacos', icon: ShieldCheck },
        ]
    },
    {
        id: 4,
        text: "Soporte Farmacológico",
        subtext: "¿Toma anticoagulantes o fármacos para el corazón?",
        didacticNote: "Evitamos la 'Sinergia Química cruzada'. No mezclamos suplementos de alta dosis con medicación de control crítico.",
        type: 'medication',
        options: [
            { id: 'med_yes', label: 'Sí, uso medicación cardíaca', icon: Pill, isRisk: true },
            { id: 'med_no', label: 'No uso fármacos críticos', icon: CheckCircle2 },
        ]
    },
    {
        id: 5,
        text: "Salud Metabólica",
        subtext: "¿Tiene diagnóstico de Diabetes (Tipo 1 o 2)?",
        didacticNote: "Muchos extractos mejoran la sensibilidad a la insulina. En diabéticos, esto puede requerir ajuste de su dosis de insulina por su médico.",
        type: 'health',
        options: [
            { id: 'diab_yes', label: 'Sí, soy diabético', icon: FlaskConical },
            { id: 'diab_no', label: 'No padezco diabetes', icon: CheckCircle2 },
        ]
    },
    {
        id: 6,
        text: "Función Renal y Hepática",
        subtext: "¿Padece insuficiencia renal o hepática?",
        didacticNote: "El riñón y el hígado procesan los nutrientes. En casos de insuficiencia, no recomendamos altas concentraciones de extractos.",
        type: 'health',
        options: [
            { id: 'ren_yes', label: 'Sí, tengo insuficiencia', icon: AlertTriangle, isRisk: true },
            { id: 'ren_no', label: 'Función Orgánica Óptima', icon: CheckCircle2 },
        ]
    },
    {
        id: 7,
        text: "Condición Biológica Actual",
        subtext: "¿Se encuentra en estado de embarazo o lactancia?",
        didacticNote: "Durante la gestación, el equilibrio hormonal es sagrado. No se deben introducir estimulantes externos.",
        type: 'health',
        options: [
            { id: 'preg_yes', label: 'Sí, estoy en este estado', icon: AlertTriangle, isRisk: true },
            { id: 'preg_no', label: 'No / No aplica', icon: CheckCircle2 },
        ]
    },
    {
        id: 8,
        text: "Equilibrio Emocional",
        subtext: "¿Usa antidepresivos o ansiolíticos?",
        didacticNote: "Extractos como la Maca o Fenogreco actúan sobre neurotransmisores. Buscamos evitar interferencias con su tratamiento psiquiátrico.",
        type: 'medication',
        options: [
            { id: 'psy_yes', label: 'Sí, bajo medicación', icon: Brain },
            { id: 'psy_no', label: 'Sin medicación emocional', icon: CheckCircle2 },
        ]
    },
    {
        id: 9,
        text: "Sensibilidad Neuronal",
        subtext: "¿Es usted extremadamente sensible a la cafeína?",
        didacticNote: "Nuestras fórmulas de energía son potentes. Si eres sensible, ajustaremos la dosis a 'media cápsula' o fórmulas sin estimulantes.",
        type: 'health',
        options: [
            { id: 'caf_yes', label: 'Sí, muy sensible', icon: Zap },
            { id: 'caf_no', label: 'Tolerancia Normal', icon: CheckCircle2 },
        ]
    },
    {
        id: 10,
        text: "Historial de Sangrados",
        subtext: "¿Ha tenido cirugías o hemorragias en los últimos 3 meses?",
        didacticNote: "La vasodilatación puede retrasar la coagulación. Por precaución post-operatoria, esperamos una recuperación total.",
        type: 'health',
        options: [
            { id: 'surg_yes', label: 'Sí, cirugía reciente', icon: AlertTriangle, isRisk: true },
            { id: 'surg_no', label: 'Sin eventos recientes', icon: CheckCircle2 },
        ]
    },
    {
        id: 11,
        text: "Migrañas y Cefaleas",
        subtext: "¿Sufre de migrañas crónicas frecuentes?",
        didacticNote: "El aumento del flujo sanguíneo cerebral puede ser un disparador o un alivio; necesitamos identificar tu perfil.",
        type: 'health',
        options: [
            { id: 'mig_yes', label: 'Sí, padezco migrañas', icon: Brain },
            { id: 'mig_no', label: 'No tengo migrañas', icon: CheckCircle2 },
        ]
    },
    {
        id: 12,
        text: "Enfermedades Autoinmunes",
        subtext: "¿Padece Lupus, Artritis Reumatoide o similares?",
        didacticNote: "Los activadores naturales pueden estimular el sistema inmune. En patologías autoinmunes, esto requiere cautela.",
        type: 'health',
        options: [
            { id: 'auto_yes', label: 'Sí, tengo autoinmunidad', icon: Stethoscope },
            { id: 'auto_no', label: 'Sin autoinmunidad', icon: CheckCircle2 },
        ]
    },
    {
        id: 13,
        text: "Alergias Conocidas",
        subtext: "¿Tiene alergias severas a plantas o alimentos?",
        didacticNote: "Nuestros extractos son 100% naturales. Identificar alergias previene cualquier reacción adversa botánica.",
        type: 'health',
        options: [
            { id: 'alg_yes', label: 'Sí, tengo alergias', icon: AlertTriangle },
            { id: 'alg_no', label: 'Sin alergias conocidas', icon: CheckCircle2 },
        ]
    },
    {
        id: 14,
        text: "Calidad del Descanso",
        subtext: "¿Sufre de insomnio o sueño fragmentado?",
        didacticNote: "La recuperación ocurre en el sueño profundo. Si no duermes, el suplemento no podrá reparar tus tejidos correctamente.",
        type: 'health',
        options: [
            { id: 'ins_yes', label: 'Sí, duermo mal', icon: Brain },
            { id: 'ins_no', label: 'Sueño Reparador', icon: CheckCircle2 },
        ]
    },
    {
        id: 15,
        text: "Régimen de Actividad",
        subtext: "¿Cuántas veces entrena por semana?",
        didacticNote: "A mayor gasto energético, mayor demanda de micro-nutrientes. Esto define si necesitas fórmulas de rendimiento o mantenimiento.",
        type: 'goal',
        options: [
            { id: 'act_low', label: '0 - 2 Días (Bajo)', icon: Target },
            { id: 'act_med', label: '3 - 5 Días (Medio)', icon: Activity },
            { id: 'act_high', label: '6+ Días (Atleta)', icon: Zap },
        ]
    },
    {
        id: 16,
        text: "Nivel de Estrés Diario",
        subtext: "¿Cómo califica su nivel de estrés?",
        didacticNote: "El cortisol elevado bloquea la testosterona y la quema de grasa. Usamos adaptógenos para contrarrestar este efecto.",
        type: 'goal',
        options: [
            { id: 'str_low', label: 'Bajo / Controlado', icon: CheckCircle2 },
            { id: 'str_high', label: 'Alto / Agotador', icon: Target },
        ]
    },
    {
        id: 17,
        text: "Consumo de Sustancias",
        subtext: "¿Consume alcohol o tabaco regularmente?",
        didacticNote: "Estas sustancias aumentan el estrés oxidativo. Necesitarás una mayor carga de antioxidantes en tu fórmula.",
        type: 'health',
        options: [
            { id: 'tox_yes', label: 'Sí, consumo regular', icon: Activity },
            { id: 'tox_no', label: 'Estilo de vida limpio', icon: CheckCircle2 },
        ]
    },
    {
        id: 18,
        text: "Síntomas de Vitalidad",
        subtext: "¿Siente fatiga injustificada durante el día?",
        didacticNote: "La fatiga suele ser una falla en la absorción de hierro o magnesio. Identificamos el eslabón perdido en tu energía.",
        type: 'goal',
        options: [
            { id: 'fat_yes', label: 'Sí, siempre cansado', icon: Zap },
            { id: 'fat_no', label: 'Energía Estable', icon: CheckCircle2 },
        ]
    },
    {
        id: 19,
        text: "Objetivo Metabólico",
        subtext: "¿Qué desea lograr prioritariamente?",
        didacticNote: "Este es el eje de tu recomendación. Seleccionamos el extracto con mayor afinidad a tu meta principal.",
        type: 'goal',
        options: [
            { id: 'perf', label: 'Fuerza & Masa Muscular', icon: Activity },
            { id: 'lean', label: 'Quema de Grasa & Corte', icon: Target },
            { id: 'vital', label: 'Vitalidad & Libido', icon: Heart },
        ]
    },
    {
        id: 20,
        text: "Compromiso XNutra",
        subtext: "¿Acepta regirse por resultados comprobados?",
        didacticNote: "XNutra no es solo una empresa de suplementos; somos una comunidad de resultados. Nuestra confianza se basa en el cambio real de nuestros clientes.",
        type: 'goal',
        options: [
            { id: 'final_yes', label: 'Acepto el Reto XNutra', icon: CheckCircle2 },
        ]
    }
];

export const MedMatch = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showResult, setShowResult] = useState(false);
    const [isRiskDetected, setIsRiskDetected] = useState(false);
    const [started, setStarted] = useState(false);

    const handleAnswer = (questionId: number, optionId: string, isRisk?: boolean) => {
        if (isRisk) {
            setIsRiskDetected(true);
            setShowResult(true);
            return;
        }

        setAnswers({ ...answers, [questionId]: optionId });
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setShowResult(true);
        }
    };

    const getRecommendation = () => {
        const goal = answers[19];
        if (goal === 'perf') return products.find(p => p.id === 'v-24');
        if (goal === 'lean') return products.find(p => p.id === 'pills-fitness');
        if (goal === 'vital') return products.find(p => p.id === 'testomax' || p.id === 'libifem');
        return products[0];
    };

    const recommendation = getRecommendation();

    if (!started) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-32 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Brain className="text-xnutra-neon mx-auto mb-10" size={80} />
                    <h1 className="text-6xl font-black italic mb-8 text-[var(--text-color)] uppercase tracking-tighter">PROTOCOLO DE <br /><span className="text-xnutra-neon uppercase">CONFIANZA TOTAL</span></h1>
                    <div className="glass-panel p-10 rounded-[3rem] border-[var(--border-color)] mb-12 text-left relative overflow-hidden">
                        <div className="absolute -right-20 -bottom-20 opacity-5">
                            <ShieldCheck size={300} />
                        </div>
                        <p className="text-[var(--text-color)] text-xl leading-relaxed font-bold mb-6 italic">
                            "En XNutra Solutions, no vendemos productos; entregamos resultados comprobados."
                        </p>
                        <p className="text-[var(--text-color)]/70 text-lg leading-relaxed mb-6 font-medium">
                            Somos una empresa de extractos naturales premium que opera bajo un régimen de transparencia absoluta. Nuestra estrategia no es el permiso burocrático, sino la generación de confianza mediante la transformación real de nuestros clientes.
                        </p>
                        <ul className="space-y-4 text-[var(--text-color)]/90 font-bold mb-10">
                            <li className="flex items-center gap-3"><CheckCircle2 className="text-xnutra-neon" size={20} /> Fórmulas Actualizadas 2026</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="text-xnutra-neon" size={20} /> Sin necesidad de recetas (100% Extracto Natural)</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="text-xnutra-neon" size={20} /> Sinergias para Resultados Comprobados</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => setStarted(true)}
                        className="bg-xnutra-neon text-black px-16 py-7 rounded-[2rem] font-black text-2xl uppercase hover:scale-105 transition-all shadow-[0_0_50px_rgba(0,242,255,0.4)]"
                    >
                        Iniciar Cribado Médico (20 Puntos)
                    </button>
                    <p className="mt-8 text-[var(--text-color)]/30 text-xs font-black uppercase tracking-widest">Tiempo estimado: 4 minutos</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-20 min-h-[800px] flex flex-col items-center">
            <AnimatePresence mode="wait">
                {!showResult ? (
                    <motion.div
                        key="questionnaire"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10"
                    >
                        {/* Panel Izquierdo: Didáctico */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="flex items-center gap-4 mb-8">
                                <Brain className="text-xnutra-neon" size={48} />
                                <div className="text-left">
                                    <h2 className="text-3xl font-black italic tracking-tighter text-[var(--text-color)]">MEDMATCH <span className="text-xnutra-neon">IA</span></h2>
                                    <p className="text-[10px] text-[var(--text-color)]/50 font-black tracking-[0.3em] uppercase">Cribado de Bio-Seguridad</p>
                                </div>
                            </div>

                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-panel p-8 rounded-[2rem] border-xnutra-neon/20 bg-xnutra-neon/5 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Stethoscope size={80} className="text-xnutra-neon" />
                                </div>
                                <h4 className="text-xnutra-neon font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                                    <Info size={16} /> Importancia Científica
                                </h4>
                                <p className="text-[var(--text-color)] text-base leading-relaxed font-medium">
                                    {questions[step].didacticNote}
                                </p>
                            </motion.div>

                            <div className="p-6 text-[var(--text-color)]/40 text-[11px] font-black uppercase tracking-widest leading-loose bg-[var(--panel-bg)] rounded-3xl border border-[var(--border-color)]">
                                <span className="text-xnutra-neon">98.4% de Pureza</span> garantizada en todos nuestros procesos de extracción molecular.
                            </div>
                        </div>

                        {/* Panel Derecho: Cuestionario */}
                        <div className="lg:col-span-8">
                            <div className="glass-panel p-10 md:p-14 rounded-[3rem] border-[var(--border-color)] relative overflow-hidden shadow-2xl bg-[var(--panel-bg)]">
                                <div className="absolute top-0 left-0 h-2 bg-xnutra-neon shadow-[0_0_20px_#00f2ff] transition-all duration-700"
                                    style={{ width: `${((step + 1) / questions.length) * 100}%` }} />

                                <div className="mb-12">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-[var(--text-color)]/40 font-mono text-xs font-black tracking-widest uppercase">Protocolo {step + 1} de {questions.length}</span>
                                        <div className="h-6 w-12 rounded-full bg-[var(--text-color)]/10 flex items-center justify-center text-[10px] font-black text-[var(--text-color)]">{Math.round(((step + 1) / questions.length) * 100)}%</div>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black mt-2 leading-[1.1] text-[var(--text-color)] mb-6 italic">{questions[step].text}</h3>
                                    <p className="text-[var(--text-color)]/70 text-lg max-w-2xl leading-relaxed font-medium">{questions[step].subtext}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {questions[step].options.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => handleAnswer(questions[step].id, opt.id, opt.isRisk)}
                                            className="p-10 rounded-[2rem] bg-[var(--panel-bg)] border border-[var(--border-color)] hover:border-xnutra-neon hover:bg-xnutra-neon/10 transition-all text-left flex flex-col gap-6 group relative"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-[var(--panel-bg)] flex items-center justify-center shrink-0 group-hover:bg-xnutra-neon group-hover:text-black transition-all">
                                                <opt.icon size={36} />
                                            </div>
                                            <div>
                                                <span className="font-black text-2xl block mb-2 group-hover:text-xnutra-neon transition-colors leading-tight uppercase italic">{opt.label}</span>
                                                <span className="text-[10px] text-[var(--text-color)]/30 group-hover:text-xnutra-neon transition-colors font-black tracking-[0.2em] uppercase">Confirmar Selección</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : isRiskDetected ? (
                    <motion.div
                        key="risk"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center max-w-3xl"
                    >
                        <div className="w-32 h-32 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-10 border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                            <AlertTriangle className="text-red-500" size={64} />
                        </div>
                        <h2 className="text-5xl font-black mb-8 italic text-[var(--text-color)] uppercase tracking-tighter leading-none">BLOQUEO DE SEGURIDAD <br /><span className="text-red-500 italic uppercase">CRIBADO BIO-MÉDICO</span></h2>
                        <div className="glass-panel p-10 rounded-[3rem] border-red-500/30 bg-red-500/5 text-center mb-10 shadow-2xl">
                            <p className="text-[var(--text-color)] text-xl mb-10 leading-loose font-bold italic">
                                Tu perfil clínico indica condiciones que requieren una supervisión directa. <span className="text-red-400 underline decoration-red-500/50">XNutra prioriza tu integridad</span> antes que una recomendación automatizada.
                            </p>
                            <p className="text-[var(--text-color)]/50 text-base mb-12 font-medium max-w-xl mx-auto">
                                Nuestro equipo evaluará tu caso de forma personalizada para encontrar la dosificación segura o el extracto adecuado para tu metabolismo.
                            </p>
                            <button className="w-full bg-white text-black py-7 rounded-[2rem] font-black text-xl uppercase flex items-center justify-center gap-4 hover:bg-xnutra-neon transition-all shadow-2xl">
                                <MessageSquare size={28} />
                                Hablar con un Bio-Asesor Especialista
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center w-full max-w-5xl"
                    >
                        <div className="w-24 h-24 rounded-full bg-xnutra-neon/20 flex items-center justify-center mx-auto mb-10 border border-xnutra-neon/30">
                            <CheckCircle2 className="text-xnutra-neon" size={48} />
                        </div>
                        <h2 className="text-6xl font-black mb-6 italic uppercase tracking-tighter text-[var(--text-color)]">RECOMENDACIÓN <span className="text-xnutra-neon">XNUTRA</span></h2>
                        <p className="text-[var(--text-color)]/60 text-xl mb-16 max-w-2xl mx-auto leading-relaxed font-medium italic">
                            Evaluación de 20 puntos completada exitosamente. Tu perfil es apto para la suplementación de alta concentración.
                        </p>

                        <div className="glass-panel p-12 lg:p-16 rounded-[4rem] border-xnutra-neon/30 text-left mb-12 relative overflow-hidden shadow-[0_0_80px_rgba(0,242,255,0.1)]">
                            <div className="absolute top-0 right-0 p-10 opacity-5">
                                <Activity size={250} />
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-16">
                                <div className="w-64 h-64 relative shrink-0">
                                    <div className="absolute inset-0 bg-xnutra-neon/30 blur-[60px] rounded-full" />
                                    <img src={recommendation?.image} alt={recommendation?.name} className="relative z-10 w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]" />
                                    <div className="absolute bottom-0 right-0 bg-[var(--text-color)] text-[var(--bg-color)] px-4 py-2 rounded-xl font-black text-xs shadow-xl">850 MG</div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Zap className="text-xnutra-neon" size={20} />
                                        <h4 className="text-xnutra-neon font-black font-mono text-sm uppercase tracking-[0.4em]">Solución Molecular</h4>
                                    </div>
                                    <div className="text-7xl font-black italic mb-4 tracking-tighter text-[var(--text-color)] uppercase leading-none">{recommendation?.name}</div>
                                    <p className="text-[var(--text-color)] text-2xl font-black mb-8 italic uppercase text-[var(--text-color)]/80 underline decoration-xnutra-neon underline-offset-8">{recommendation?.tagline}</p>

                                    <div className="bg-[var(--panel-bg)] border border-[var(--border-color)] p-8 rounded-3xl mb-10">
                                        <p className="text-[var(--text-color)]/80 text-xl leading-relaxed font-bold italic">
                                            Tu metabolismo es compatible con la dosis de <span className="text-xnutra-neon font-black">850mg por cápsula</span>. Este extracto optimizará tu eje hormonal y de rendimiento en los primeros 14 días.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button className="bg-[var(--text-color)] text-[var(--bg-color)] px-12 py-7 rounded-[2.5rem] font-black uppercase text-lg hover:bg-xnutra-neon hover:text-black transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95">
                                            Adquirir este Producto <ArrowRight size={24} />
                                        </button>
                                        <button className="bg-[var(--panel-bg)] border border-[var(--border-color)] text-[var(--text-color)] px-10 py-7 rounded-[2.5rem] font-black uppercase text-lg hover:bg-white/10 transition-all italic">
                                            Ver Ficha Clínica
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 text-[var(--text-color)]/30 text-sm font-black italic uppercase tracking-widest leading-loose">
                            * Empresa de suplementos de extractos naturales. Nuestra garantía radica en la confianza y resultados de nuestros clientes, no en sellos administrativos.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
