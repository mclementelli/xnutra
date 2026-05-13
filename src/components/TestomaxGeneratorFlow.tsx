import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Activity, RefreshCw, ShoppingCart, Check, Share2, Download, Shield } from 'lucide-react';

interface TestomaxGeneratorFlowProps {
    isOpen: boolean;
    onClose: () => void;
    productColor: string;
}

type Step = 'intro' | 'quiz' | 'generating' | 'result';

interface Question {
    id: string;
    text: string;
    options: string[];
    allowOther: boolean;
}

const questions: Question[] = [
    { id: 'energy', text: '¿Cómo calificarías tus niveles de energía a lo largo del día?', options: ['Constante y alta', 'Bajones fuertes a media tarde', 'Fatiga desde que me levanto', 'Agotamiento extremo'], allowOther: false },
    { id: 'sleep', text: '¿Cómo es tu calidad de sueño?', options: ['Duermo profundo 7-8 hrs', 'Me despierto varias veces', 'Insomnio frecuente', 'Duermo poco por trabajo'], allowOther: false },
    { id: 'stress', text: '¿Cuál es tu nivel de estrés diario?', options: ['Bajo', 'Moderado', 'Alto (Constante presión)', 'Muy Alto (Siento que no puedo más)'], allowOther: false },
    { id: 'prostate', text: '¿Experimentas alguna de estas molestias?', options: ['Ninguna molestia', 'Ganas frecuentes de orinar de noche', 'Sensación de no vaciar la vejiga', 'Flujo débil'], allowOther: true },
    { id: 'exercise', text: '¿Cuánta actividad física realizas a la semana?', options: ['Sedentario', '1-2 días (ligero)', '3-4 días (moderado)', '5+ días (intenso)'], allowOther: false },
    { id: 'libido', text: '¿Has notado cambios en tu vitalidad o rendimiento íntimo en el último año?', options: ['No, todo excelente', 'Ligeros bajones ocasionales', 'Sí, una disminución notable', 'Prefiero no responder'], allowOther: false },
    { id: 'diet_type', text: '¿Tienes alguna preferencia o restricción alimenticia?', options: ['Ninguna (Como de todo)', 'Intolerante a la lactosa', 'Evito el gluten', 'Sin mariscos'], allowOther: true }
];

const mealPool = {
    breakfast: [
        'Huevos revueltos (ricos en Zinc) con avena y manzana', 
        'Yogurt natural con avena, nueces y plátano', 
        'Tortilla de 3 huevos con espinaca y tomate', 
        'Avena cocida con leche y papaya picada', 
        'Dos huevos cocidos con una porción de fruta fresca'
    ],
    lunch: [
        'Filete de res magro (fuente de hierro y zinc) con arroz y ensalada verde', 
        'Filete de pollo a la plancha con papa cocida y brócoli', 
        'Pescado al horno (rico en Omega 3) con arroz y vegetales frescos', 
        'Pollo al horno con verduras mixtas y una porción de arroz', 
        'Guiso ligero de carne de res con tomate, cebolla y arroz'
    ],
    dinner: [
        'Pechuga de pollo a la plancha con verduras salteadas', 
        'Sopa de verduras con pollo desmenuzado', 
        'Pescado a la plancha con ensalada de lechuga y tomate', 
        'Ensalada fresca con carne de vaca en tiras', 
        'Filete de pollo con espinacas y zanahorias'
    ],
    snack: [
        'Un vaso de yogurt con una fruta', 
        'Un puñado de nueces o almendras (excelentes para la testosterona)', 
        'Una porción de plátano o manzana', 
        'Huevos duros como snack rico en proteínas', 
        'Gelatina dietética con trozos de fruta'
    ]
};

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const TestomaxGeneratorFlow = ({ isOpen, onClose, productColor }: TestomaxGeneratorFlowProps) => {
    const [step, setStep] = useState<Step>('intro');
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [otherText, setOtherText] = useState('');
    
    // Meal State
    const [weeklyPlan, setWeeklyPlan] = useState<any[]>([]);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep('intro');
                setCurrentQuestionIdx(0);
                setAnswers({});
                setOtherText('');
            }, 500);
        }
    }, [isOpen]);

    const handleAnswer = (answer: string) => {
        const q = questions[currentQuestionIdx];
        if (answer === 'Otro') {
            if (!otherText.trim()) return;
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

        setTimeout(() => {
            setStep('result');
        }, 4000);
    };

    const regenerateMeal = (dayIdx: number, mealType: 'breakfast'|'lunch'|'snack'|'dinner') => {
        const newPlan = [...weeklyPlan];
        const pool = mealPool[mealType];
        let newMeal = newPlan[dayIdx].meals[mealType];
        while (newMeal === newPlan[dayIdx].meals[mealType]) {
            newMeal = pool[Math.floor(Math.random() * pool.length)];
        }
        newPlan[dayIdx].meals[mealType] = newMeal;
        setWeeklyPlan(newPlan);
    };

    const sharePlanToWhatsApp = () => {
        let text = "💪 *Mi Protocolo de Salud Masculina XNutra - TestoMax* 💪\n\n";
        text += "*MENÚ SEMANAL PARA OPTIMIZACIÓN HORMONAL*\n";
        weeklyPlan.forEach(day => {
            text += `\n📅 *${day.day}*\n`;
            text += `🌅 Desayuno: ${day.meals.breakfast}\n`;
            text += `☀️ Almuerzo: ${day.meals.lunch}\n`;
            text += `🍏 Snack: ${day.meals.snack}\n`;
            text += `🌙 Cena: ${day.meals.dinner}\n`;
        });
        text += "\n🛒 *LISTA DE COMPRAS (Cantidades Semanales)*\n";
        text += "- Huevos: 2 a 3 docenas (clave para hormonas)\n";
        text += "- Carne de Vaca magra: 1.5kg\n";
        text += "- Carne de Pollo (Pechuga/Filete): 1kg\n";
        text += "- Pescado fresco: 1kg\n";
        text += "- Nueces y/o Almendras: 250g\n";
        text += "- Frutas de temporada: Aprox. 3kg combinados\n";
        text += "- Verduras verdes (Espinaca, Brócoli): 3 amarros/unidades\n";
        text += "- Verduras básicas (Tomate, Lechuga, Zanahoria): 2kg\n";
        text += "- Arroz común/integral: 1kg\n";
        text += "- Papas: 2kg\n";
        text += "- Avena en hojuelas: 500g\n";
        text += "- Yogurt natural: 2 litros\n";
        
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
                    <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-[var(--testomax-color)]/10 rounded-full blur-[120px]" style={{ '--testomax-color': productColor } as any} />
                    <div className="absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-[var(--testomax-color)]/5 rounded-full blur-[120px]" style={{ '--testomax-color': productColor } as any} />
                </div>

                <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="relative w-full max-w-5xl bg-[var(--bg-color)] border border-[var(--border-color)] rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(255,62,62,0.2)] max-h-[90vh] flex flex-col"
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
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_50px_rgba(255,62,62,0.2)]">
                                        <Shield size={48} color={productColor} />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-[0.4em] mb-4" style={{ color: productColor }}>Protocolo Clínico Personalizado</span>
                                    <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
                                        Evaluación de <br />Salud Masculina
                                    </h2>
                                    <p className="text-white/60 max-w-2xl text-lg font-bold italic mb-12">
                                        Potencia los beneficios de TestoMax entendiendo tu perfil metabólico actual. Recibe un plan de alimentación diseñado para optimizar tu testosterona y energía natural.
                                    </p>
                                    <button
                                        onClick={() => setStep('quiz')}
                                        className="bg-white text-black px-12 py-5 rounded-full font-black text-lg uppercase flex items-center gap-4 hover:scale-105 transition-all shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                    >
                                        Comenzar Análisis <ChevronRight size={24} />
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
                                            <span>Fase de Diagnóstico</span>
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
                                            className="w-32 h-32 rounded-full border-4 border-white/10 border-t-[var(--testomax-color)]"
                                            style={{ '--testomax-color': productColor } as any}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Activity size={40} color={productColor} className="animate-pulse" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-4">
                                        Analizando Perfil Hormonal
                                    </h3>
                                    <div className="space-y-2 text-white/50 font-bold text-sm uppercase tracking-widest">
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Evaluando marcadores de fatiga...</motion.p>
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Calculando deficiencias de minerales...</motion.p>
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>Estructurando dieta pro-testosterona...</motion.p>
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
                                            <span className="text-xs font-black uppercase tracking-widest text-white">Análisis Completado</span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
                                            Tu Protocolo <br /><span style={{ color: productColor }}>TestoMax</span>
                                        </h2>
                                        <p className="text-white/60 max-w-2xl mx-auto text-base font-bold italic">
                                            Basado en tus respuestas, hemos generado un menú rico en precursores hormonales (zinc, magnesio y proteínas magras). Cambia cualquier comida con el botón de recarga.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        {/* Weekly Plan */}
                                        <div className="lg:col-span-2 space-y-6">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: productColor }} />
                                                <h3 className="text-2xl font-black text-white uppercase italic">Menú Semanal T-Boost</h3>
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
                                                    <h3 className="text-2xl font-black text-white uppercase italic">Lista T-Boost</h3>
                                                </div>
                                                
                                                <div className="space-y-6 text-sm">
                                                    <div className="mb-4 text-white/50 text-xs uppercase tracking-widest font-black">Proteínas Clave (Zinc)</div>
                                                    <ul className="space-y-3 text-white/80 font-medium">
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Huevos (2-3 docenas)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Carne de Vaca magra (1.5kg)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Carne de Pollo (1kg)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Pescado fresco (1kg)</li>
                                                    </ul>

                                                    <div className="mb-4 mt-6 text-white/50 text-xs uppercase tracking-widest font-black">Vegetales y Frutas</div>
                                                    <ul className="space-y-3 text-white/80 font-medium">
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Verduras verdes (Espinaca, Brócoli) (3 amarros)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Tomate, Lechuga, Zanahoria (2kg comb.)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Frutas de temporada (Aprox. 3kg)</li>
                                                    </ul>

                                                    <div className="mb-4 mt-6 text-white/50 text-xs uppercase tracking-widest font-black">Grasas Buenas y Abarrotes</div>
                                                    <ul className="space-y-3 text-white/80 font-medium">
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Nueces y/o Almendras (250g)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Avena en hojuelas (500g)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Arroz común/integral (1kg)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Papas (2kg)</li>
                                                        <li className="flex items-start gap-2"><span style={{color: productColor}}>•</span> Yogurt natural (2 litros)</li>
                                                    </ul>
                                                </div>

                                                <div className="mt-10 space-y-4">
                                                    <button
                                                        onClick={() => window.print()}
                                                        className="w-full bg-white text-black py-4 rounded-full font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-gray-200 transition-all shadow-xl"
                                                    >
                                                        <Download size={18} /> Descargar PDF
                                                    </button>
                                                    <button
                                                        onClick={sharePlanToWhatsApp}
                                                        className="w-full bg-[#25D366] text-white py-4 rounded-full font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all shadow-xl"
                                                    >
                                                        <Share2 size={18} /> Enviar a WhatsApp
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
