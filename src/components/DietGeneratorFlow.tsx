import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Activity, Zap, RefreshCw, ShoppingCart, Check, Share2, Download } from 'lucide-react';

interface DietGeneratorFlowProps {
    isOpen: boolean;
    onClose: () => void;
    productColor: string;
}

type Step = 'intro' | 'calc_peso' | 'quiz' | 'generating' | 'result';

interface Question {
    id: string;
    text: string;
    options: string[];
    allowOther: boolean;
}

const questions: Question[] = [
    { id: 'meals', text: '¿Cuántas veces al día prefieres comer?', options: ['2 veces', '3 veces', '4 veces', '5 veces'], allowOther: true },
    { id: 'goal', text: '¿Cuál es tu objetivo principal?', options: ['Pérdida de peso rápida', 'Pérdida de peso gradual', 'Recomposición corporal', 'Salud digestiva'], allowOther: true },
    { id: 'diet_type', text: '¿Tienes alguna preferencia alimenticia?', options: ['Ninguna (Como de todo)', 'Vegetariano', 'Vegano', 'Keto', 'Ayuno Intermitente'], allowOther: true },
    { id: 'allergies', text: '¿Tienes alguna alergia o intolerancia?', options: ['Ninguna', 'Lactosa', 'Gluten', 'Mariscos', 'Frutos secos'], allowOther: true },
    { id: 'activity', text: '¿Cómo describirías tu nivel de actividad física?', options: ['Sedentaria (Trabajo de oficina)', 'Ligera (Caminatas)', 'Moderada (Ejercicio 3x semana)', 'Intensa (Deporte diario)'], allowOther: true },
    { id: 'meds', text: '¿Tomas algún tipo de medicación regular?', options: ['No', 'Sí (Horarios fijos)', 'Sí (Solo ocasional)'], allowOther: true },
    { id: 'schedule', text: '¿Cuáles son tus horarios de trabajo / actividad?', options: ['Mañana (Oficina)', 'Tarde', 'Nocturno', 'Rotativo'], allowOther: true },
    { id: 'dislikes', text: '¿Qué alimentos NO te gustan?', options: ['Ninguno', 'Verduras amargas', 'Pescado/Mariscos', 'Carnes rojas'], allowOther: true },
    { id: 'stress', text: '¿Cuál es tu nivel de estrés diario promedio?', options: ['Bajo', 'Medio', 'Alto', 'Muy Alto'], allowOther: false },
    { id: 'water', text: '¿Cuánta agua bebes al día aprox.?', options: ['Menos de 1L', '1 a 2L', 'Más de 2L', 'No mido mi consumo'], allowOther: false }
];

const mealPool = {
    breakfast: ['Huevos revueltos con avena y una fruta', 'Yogurt natural con avena y manzana', 'Tortilla de huevo con espinaca y plátano', 'Avena cocida con leche y papaya picada', 'Dos huevos cocidos con una porción de fruta de temporada'],
    lunch: ['Filete de pollo a la plancha con arroz y ensalada mixta', 'Bife de vaca a la plancha con ensalada y papa cocida', 'Pescado al horno con arroz y vegetales frescos', 'Pollo al horno con verduras y una porción de arroz', 'Guiso ligero de carne de res con verduras y arroz'],
    dinner: ['Pechuga de pollo picada con verduras salteadas', 'Sopa de verduras con pollo desmenuzado', 'Pescado a la plancha con ensalada verde', 'Ensalada fresca con carne de vaca en tiras', 'Filete de pollo a la plancha con tomate y lechuga'],
    snack: ['Un vaso de yogurt con una fruta', 'Gelatina dietética con trozos de fruta', 'Una porción de plátano o manzana', 'Un puñado de nueces o almendras con yogurt', 'Yogurt natural bebible']
};

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const DietGeneratorFlow = ({ isOpen, onClose, productColor }: DietGeneratorFlowProps) => {
    const [step, setStep] = useState<Step>('intro');
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [otherText, setOtherText] = useState('');
    const [calcData, setCalcData] = useState({ gender: 'Hombre', age: '', height: '' });
    const [idealWeightResult, setIdealWeightResult] = useState<number | null>(null);
    
    // Meal State
    const [weeklyPlan, setWeeklyPlan] = useState<any[]>([]);

    useEffect(() => {
        if (!isOpen) {
            // Reset state when closed
            setTimeout(() => {
                setStep('intro');
                setCurrentQuestionIdx(0);
                setAnswers({});
                setOtherText('');
                setCalcData({ gender: 'Hombre', age: '', height: '' });
                setIdealWeightResult(null);
            }, 500);
        }
    }, [isOpen]);

    const handleAnswer = (answer: string) => {
        const q = questions[currentQuestionIdx];
        if (answer === 'Otro') {
            if (!otherText.trim()) return; // Don't proceed if empty
            setAnswers({ ...answers, [q.id]: otherText });
            setOtherText('');
        } else {
            setAnswers({ ...answers, [q.id]: answer });
        }

        if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        } else {
            startGeneration();
        }
    };

    const startGeneration = () => {
        setStep('generating');
        
        // Generate initial mock plan
        const initialPlan = daysOfWeek.map(day => ({
            day,
            meals: {
                breakfast: mealPool.breakfast[Math.floor(Math.random() * mealPool.breakfast.length)],
                lunch: mealPool.lunch[Math.floor(Math.random() * mealPool.lunch.length)],
                snack: mealPool.snack[Math.floor(Math.random() * mealPool.snack.length)],
                dinner: mealPool.dinner[Math.floor(Math.random() * mealPool.dinner.length)],
            }
        }));
        setWeeklyPlan(initialPlan);

        // Simulate AI processing time
        setTimeout(() => {
            setStep('result');
        }, 4000);
    };

    const regenerateMeal = (dayIdx: number, mealType: 'breakfast'|'lunch'|'snack'|'dinner') => {
        const newPlan = [...weeklyPlan];
        const pool = mealPool[mealType];
        let newMeal = newPlan[dayIdx].meals[mealType];
        // Ensure it picks a different one if possible
        while (newMeal === newPlan[dayIdx].meals[mealType]) {
            newMeal = pool[Math.floor(Math.random() * pool.length)];
        }
        newPlan[dayIdx].meals[mealType] = newMeal;
        setWeeklyPlan(newPlan);
    };

    const sharePlanToWhatsApp = () => {
        let text = "🥗 *Mi Plan Nutricional XNutra - Siluetta* 🥗\n\n";
        text += "*MENÚ SEMANAL*\n";
        weeklyPlan.forEach(day => {
            text += `\n📅 *${day.day}*\n`;
            text += `🌅 Desayuno: ${day.meals.breakfast}\n`;
            text += `☀️ Almuerzo: ${day.meals.lunch}\n`;
            text += `🍏 Snack: ${day.meals.snack}\n`;
            text += `🌙 Cena: ${day.meals.dinner}\n`;
        });
        text += "\n🛒 *LISTA DE COMPRAS (Cantidades Semanales)*\n";
        text += "- Pollo (Pechuga/Filete): 1.5kg\n";
        text += "- Carne de Vaca magra: 1kg\n";
        text += "- Pescado fresco: 1kg\n";
        text += "- Huevos: 2 docenas\n";
        text += "- Yogurt natural: 2 litros\n";
        text += "- Frutas de temporada: Aprox. 3kg combinados\n";
        text += "- Verduras ensalada: 2 cabezas lechuga, 1kg tomate, 1kg zanahoria\n";
        text += "- Verduras cocidas: 2 amarros espinaca, 1 brócoli\n";
        text += "- Verduras para guisos: 1kg cebolla, 3 pimientos\n";
        text += "- Arroz común/integral: 1kg\n";
        text += "- Avena en hojuelas: 500g\n";
        text += "- Papas medianas: 2kg\n";
        text += "- Gelatina dietética: 4 sobres\n";
        
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-[var(--siluetta-color)]/10 rounded-full blur-[120px]" style={{ '--siluetta-color': productColor } as any} />
                    <div className="absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-xnutra-neon/10 rounded-full blur-[120px]" />
                </div>

                <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="relative w-full max-w-5xl bg-[var(--bg-color)] border border-[var(--border-color)] rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] max-h-[90vh] flex flex-col"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 p-3 bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-white/20 transition-all border border-white/5"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex-1 overflow-y-auto p-8 md:p-16 hide-scrollbar">
                        <AnimatePresence mode="wait">
                            {/* INTRO STEP */}
                            {step === 'intro' && (
                                <motion.div
                                    key="intro"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col items-center justify-center min-h-[50vh] text-center"
                                >
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_50px_rgba(212,62,255,0.2)]">
                                        <Activity size={48} color={productColor} />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-[0.4em] mb-4" style={{ color: productColor }}>Protocolo Nutricional Personalizado</span>
                                    <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
                                        Generador de <br />Dietas Inteligente
                                    </h2>
                                    <p className="text-white/60 max-w-2xl text-lg font-bold italic mb-12">
                                        Maximiza los resultados de Siluetta con un plan de alimentación diseñado específicamente para tu metabolismo, preferencias y estilo de vida.
                                    </p>
                                    <button
                                        onClick={() => setStep('calc_peso')}
                                        className="bg-white text-black px-12 py-5 rounded-full font-black text-lg uppercase flex items-center gap-4 hover:scale-105 transition-all shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                    >
                                        Comenzar Evaluación <ChevronRight size={24} />
                                    </button>
                                </motion.div>
                            )}

                            {/* CALC PESO STEP */}
                            {step === 'calc_peso' && (
                                <motion.div
                                    key="calc_peso"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col max-w-3xl mx-auto w-full min-h-[60vh] justify-center"
                                >
                                    <div className="mb-12 text-center">
                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                                            <Activity size={32} color={productColor} />
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tight mb-4 leading-tight">
                                            Cálculo de Peso Ideal
                                        </h3>
                                        <p className="text-white/60 font-bold italic text-lg">
                                            Ingresa tus datos biométricos para establecer tu objetivo.
                                        </p>
                                    </div>

                                    <div className="space-y-6 bg-white/5 p-8 rounded-[3rem] border border-white/10 mb-10">
                                        <div>
                                            <label className="block text-white/50 text-xs font-black uppercase tracking-widest mb-4">Sexo Biológico</label>
                                            <div className="flex gap-4">
                                                <button 
                                                    onClick={() => setCalcData({...calcData, gender: 'Hombre'})}
                                                    className={`flex-1 py-5 rounded-2xl font-black uppercase text-sm tracking-wider transition-all border ${calcData.gender === 'Hombre' ? 'bg-white/20 border-white/50 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-white/5 border-white/10 text-white/50'}`}
                                                >
                                                    Hombre
                                                </button>
                                                <button 
                                                    onClick={() => setCalcData({...calcData, gender: 'Mujer'})}
                                                    className={`flex-1 py-5 rounded-2xl font-black uppercase text-sm tracking-wider transition-all border ${calcData.gender === 'Mujer' ? 'bg-white/20 border-white/50 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-white/5 border-white/10 text-white/50'}`}
                                                >
                                                    Mujer
                                                </button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-white/50 text-xs font-black uppercase tracking-widest mb-4">Edad (años)</label>
                                                <input 
                                                    type="number"
                                                    value={calcData.age}
                                                    onChange={(e) => setCalcData({...calcData, age: e.target.value})}
                                                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-5 text-white font-black text-xl outline-none focus:border-white/40 transition-colors"
                                                    placeholder="Ej. 30"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-white/50 text-xs font-black uppercase tracking-widest mb-4">Altura (cm)</label>
                                                <input 
                                                    type="number"
                                                    value={calcData.height}
                                                    onChange={(e) => setCalcData({...calcData, height: e.target.value})}
                                                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-5 text-white font-black text-xl outline-none focus:border-white/40 transition-colors"
                                                    placeholder="Ej. 170"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            const h = parseFloat(calcData.height);
                                            if (h > 0) {
                                                const iw = calcData.gender === 'Hombre' ? 50 + 0.9 * (h - 152) : 45.5 + 0.9 * (h - 152);
                                                setIdealWeightResult(Math.max(0, Math.round(iw * 10) / 10));
                                            }
                                            setStep('quiz');
                                        }}
                                        disabled={!calcData.age || !calcData.height}
                                        className="w-full bg-white text-black py-6 rounded-full font-black text-lg uppercase flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        Continuar a la Evaluación <ChevronRight size={24} />
                                    </button>
                                </motion.div>
                            )}

                            {/* QUIZ STEP */}
                            {step === 'quiz' && (
                                <motion.div
                                    key="quiz"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col max-w-3xl mx-auto w-full min-h-[60vh] justify-center"
                                >
                                    <div className="mb-12">
                                        <div className="flex justify-between text-xs font-black uppercase tracking-widest text-white/40 mb-4">
                                            <span>Fase de Análisis</span>
                                            <span style={{ color: productColor }}>{currentQuestionIdx + 1} / {questions.length}</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: productColor }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tight mb-12 leading-tight">
                                        {questions[currentQuestionIdx].text}
                                    </h3>

                                    <div className="space-y-4">
                                        {questions[currentQuestionIdx].options.map((opt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleAnswer(opt)}
                                                className="w-full text-left p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all font-bold text-lg text-white/90"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                        
                                        {questions[currentQuestionIdx].allowOther && (
                                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                                <input 
                                                    type="text" 
                                                    placeholder="Otra opción..."
                                                    value={otherText}
                                                    onChange={(e) => setOtherText(e.target.value)}
                                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-white/40 transition-colors"
                                                />
                                                <button
                                                    onClick={() => handleAnswer('Otro')}
                                                    disabled={!otherText.trim()}
                                                    className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all whitespace-nowrap"
                                                >
                                                    Siguiente
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* GENERATING STEP */}
                            {step === 'generating' && (
                                <motion.div
                                    key="generating"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center min-h-[60vh] text-center"
                                >
                                    <div className="relative mb-12">
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="w-32 h-32 rounded-full border-4 border-white/10 border-t-[var(--siluetta-color)]"
                                            style={{ '--siluetta-color': productColor } as any}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Zap size={40} color={productColor} className="animate-pulse" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-4">
                                        Sintetizando Plan Nutricional
                                    </h3>
                                    <div className="space-y-2 text-white/50 font-bold text-sm uppercase tracking-widest">
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Analizando metabolismo y hábitos...</motion.p>
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Calculando deficiencias calóricas...</motion.p>
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>Emparejando ingredientes óptimos...</motion.p>
                                    </div>
                                </motion.div>
                            )}

                            {/* RESULT STEP */}
                            {step === 'result' && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col w-full"
                                >
                                    <div className="text-center mb-16">
                                        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-8">
                                            <Check size={16} color={productColor} />
                                            <span className="text-xs font-black uppercase tracking-widest text-white">Plan Generado con Éxito</span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
                                            Tu Protocolo <br /><span style={{ color: productColor }}>Metabólico</span>
                                        </h2>

                                        {idealWeightResult && (
                                            <div className="mb-10 p-6 bg-white/5 border border-white/10 rounded-[2rem] max-w-sm mx-auto relative overflow-hidden group shadow-2xl">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                                <span className="text-white/50 text-[10px] font-black uppercase tracking-widest block mb-2">Análisis Biométrico</span>
                                                <div className="flex items-end justify-center gap-3">
                                                    <span className="text-6xl font-black italic text-white leading-none tracking-tighter">{idealWeightResult}</span>
                                                    <span className="text-xl font-bold text-white/50 mb-1">KG</span>
                                                </div>
                                                <span className="text-sm font-black uppercase tracking-widest italic block mt-3" style={{ color: productColor }}>Peso Ideal Estimado</span>
                                            </div>
                                        )}

                                        <p className="text-white/60 max-w-2xl mx-auto text-base font-bold italic">
                                            Si alguna comida no te convence, presiona el botón de recarga junto a ella para generar una nueva alternativa.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        {/* Weekly Plan */}
                                        <div className="lg:col-span-2 space-y-6">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: productColor }} />
                                                <h3 className="text-2xl font-black text-white uppercase italic">Menú Semanal</h3>
                                            </div>

                                            {weeklyPlan.map((dayPlan, dayIdx) => (
                                                <div key={dayPlan.day} className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 overflow-hidden relative">
                                                    <h4 className="text-xl font-black text-white uppercase tracking-widest mb-6 opacity-80">{dayPlan.day}</h4>
                                                    
                                                    <div className="space-y-4 relative z-10">
                                                        {(['breakfast', 'lunch', 'snack', 'dinner'] as const).map((mealType) => (
                                                            <div key={mealType} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-2xl gap-4 group">
                                                                <div>
                                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1">
                                                                        {mealType === 'breakfast' && 'Desayuno'}
                                                                        {mealType === 'lunch' && 'Almuerzo'}
                                                                        {mealType === 'snack' && 'Snack'}
                                                                        {mealType === 'dinner' && 'Cena'}
                                                                    </span>
                                                                    <span className="text-white font-bold text-sm">{dayPlan.meals[mealType]}</span>
                                                                </div>
                                                                <button
                                                                    onClick={() => regenerateMeal(dayIdx, mealType)}
                                                                    className="shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/20 transition-all self-end sm:self-auto"
                                                                    title="Regenerar alternativa"
                                                                >
                                                                    <RefreshCw size={16} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Shopping List Sidebar */}
                                        <div className="lg:col-span-1">
                                            <div className="sticky top-0 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                                        <ShoppingCart size={24} className="text-white" />
                                                    </div>
                                                    <h3 className="text-2xl font-black text-white uppercase italic">Lista de Compras</h3>
                                                </div>
                                                
                                                <div className="space-y-6 text-sm">
                                                    <div className="mb-4 text-white/50 text-xs uppercase tracking-widest font-black">Proteínas y Lácteos</div>
                                                    <ul className="space-y-3 text-white/80 font-medium">
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Carne de Pollo (Pechuga o filete) (1.5kg)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Carne de Vaca magra (1kg)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Pescado fresco (1kg)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Huevos (2 docenas)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Yogurt natural (2 litros)</li>
                                                    </ul>

                                                    <div className="mb-4 mt-6 text-white/50 text-xs uppercase tracking-widest font-black">Vegetales y Frutas</div>
                                                    <ul className="space-y-3 text-white/80 font-medium">
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Frutas de temporada (Aprox. 3kg combinados)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Lechuga, Tomate y Zanahorias (2 cabezas, 1kg, 1kg)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Espinaca y Brócoli frescos (2 amarros, 1 unidad grande)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Cebolla y Pimiento para guisos (1kg, 3 unidades)</li>
                                                    </ul>

                                                    <div className="mb-4 mt-6 text-white/50 text-xs uppercase tracking-widest font-black">Abarrotes y Otros</div>
                                                    <ul className="space-y-3 text-white/80 font-medium">
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Arroz común o integral (1kg)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Avena en hojuelas (500g)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Papas medianas (2kg)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Gelatina dietética (4 sobres)</li>
                                                    </ul>
                                                </div>

                                                <div className="mt-10 space-y-4">
                                                    <button
                                                        onClick={() => window.print()}
                                                        className="w-full bg-white text-black py-4 rounded-full font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-gray-200 transition-all shadow-xl"
                                                    >
                                                        <Download size={18} /> Descargar PDF / Imprimir
                                                    </button>
                                                    <button
                                                        onClick={sharePlanToWhatsApp}
                                                        className="w-full bg-[#25D366] text-white py-4 rounded-full font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all shadow-xl"
                                                    >
                                                        <Share2 size={18} /> Compartir en WhatsApp
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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
