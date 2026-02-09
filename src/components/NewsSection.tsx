import { motion } from 'framer-motion';
import { Zap, Target, BookOpen, FlaskConical } from 'lucide-react';

export const NewsSection = () => {
    const articles = [
        {
            title: "Sinergia Molecular: Cómo el extracto de Fenogreco optimiza el eje hormonal",
            category: "Investigación",
            image: "/assets/fenogreco.jpg",
            desc: "Estudios recientes demuestran que la pureza del 850mg en XNutra permite una absorción del 94%, superando estándares tradicionales.",
            icon: <FlaskConical className="text-xnutra-neon" />
        },
        {
            title: "Protocolo de Absorción: ¿Por qué 14 días para los primeros resultados?",
            category: "Bio-Ciencia",
            image: "/assets/absorcion.jpg",
            desc: "Explicamos el ciclo de saturación biológica y cómo nuestros compuestos atacan la fatiga desde el primer contacto.",
            icon: <Zap className="text-xnutra-neon" />
        },
        {
            title: "Estrategia de Nutrición: Superando patologías mediante suplementos concentrados",
            category: "Salud Nutra",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
            desc: "Nuestra guía exclusiva sobre el impacto de la quercetina y zinc en el sistema inmunológico moderno.",
            icon: <Target className="text-xnutra-neon" />
        }
    ];

    return (
        <section className="py-40 px-6 md:px-10 bg-[var(--bg-color)]/60 transition-colors duration-300" id="investigacion">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-10">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-[2px] bg-xnutra-neon" />
                            <span className="text-xnutra-neon font-black uppercase tracking-[0.4em] text-[10px]">News & Investigation</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black italic text-[var(--text-color)] uppercase tracking-tighter leading-[0.7] mb-6 md:mb-0">BIO-AVANCES <br /><span className="text-xnutra-neon">2026 BOLIVIA</span></h2>
                    </div>
                    <p className="max-w-md text-[var(--text-color)]/40 font-bold italic border-l-4 border-[var(--border-color)] pl-8 uppercase tracking-tighter text-sm leading-tight">
                        "En XNutra Solutions, no vendemos productos; entregamos resultados comprobados mediante la transformación real de nuestros clientes."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {articles.map((article, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-panel group cursor-pointer overflow-hidden rounded-[3rem] border-[var(--border-color)] hover:border-xnutra-neon/30 transition-all duration-500"
                        >
                            <div className="h-80 relative overflow-hidden">
                                <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                <div className="absolute top-8 left-8 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-2">
                                    {article.icon}
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">{article.category}</span>
                                </div>
                            </div>
                            <div className="p-10 space-y-6">
                                <h3 className="text-2xl font-black italic text-[var(--text-color)] uppercase tracking-tighter leading-none group-hover:text-xnutra-neon transition-colors">{article.title}</h3>
                                <p className="text-[var(--text-color)]/40 text-sm font-bold italic leading-relaxed uppercase tracking-widest">{article.desc}</p>
                                <div className="flex items-center gap-2 text-xnutra-neon text-[10px] font-black uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all translate-x-[-20px] group-hover:translate-x-0">
                                    Leer Investigación <BookOpen size={14} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
