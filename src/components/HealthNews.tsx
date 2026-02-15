import { motion } from 'framer-motion';
import { Newspaper, Heart, Dumbbell, Pill, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

export const HealthNews = () => {
    const categories = [
        { name: "Hormonal", icon: <TrendingUp size={20} />, color: "#ff3e3e" },
        { name: "Fitness", icon: <Dumbbell size={20} />, color: "#3eff7e" },
        { name: "Nutrición", icon: <Pill size={20} />, color: "#00f2ff" },
        { name: "Investigación", icon: <Heart size={20} />, color: "#d43eff" }
    ];

    const articles = [
        {
            category: "Hormonal",
            title: "El Rol de la Testosterona en el Rendimiento Masculino",
            excerpt: "Descubre cómo la testosterona natural influye en tu energía, masa muscular y bienestar general. Conoce los métodos naturales para optimizar tus niveles hormonales.",
            date: "10 Feb 2026",
            readTime: "5 min",
            color: "#ff3e3e"
        },
        {
            category: "Fitness",
            title: "Maximiza tu Quema de Grasa con Termogénicos Naturales",
            excerpt: "Los termogénicos naturales como el té verde y la L-Carnitina pueden acelerar tu metabolismo hasta un 15%. Aprende cómo incorporarlos en tu rutina.",
            date: "08 Feb 2026",
            readTime: "7 min",
            color: "#3eff7e"
        },
        {
            category: "Nutrición",
            title: "Maca Andina: El Superalimento de los Incas",
            excerpt: "La maca negra ha sido utilizada durante siglos para mejorar la vitalidad y el equilibrio hormonal. Conoce sus beneficios científicamente comprobados.",
            date: "05 Feb 2026",
            readTime: "6 min",
            color: "#00f2ff"
        },
        {
            category: "Investigación",
            title: "Estudios Recientes sobre Óxido Nítrico y Vasodilatación",
            excerpt: "Nuevas investigaciones demuestran que la arginina puede mejorar el flujo sanguíneo en un 40%, optimizando la entrega de nutrientes a los músculos.",
            date: "03 Feb 2026",
            readTime: "8 min",
            color: "#ff3e3e"
        },
        {
            category: "Hormonal",
            title: "Equilibrio Hormonal Femenino: Guía Completa",
            excerpt: "El ginseng y la maca son aliados naturales para regular el ciclo menstrual y mejorar la vitalidad femenina sin efectos secundarios.",
            date: "01 Feb 2026",
            readTime: "6 min",
            color: "#d43eff"
        },
        {
            category: "Fitness",
            title: "Protocolo de Suplementación para Atletas de Alto Rendimiento",
            excerpt: "Descubre el timing perfecto para tomar tus suplementos y maximizar la absorción de nutrientes antes, durante y después del entrenamiento.",
            date: "28 Ene 2026",
            readTime: "10 min",
            color: "#3eff7e"
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-color)] py-32 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <Newspaper className="text-xnutra-neon" size={48} />
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-[var(--text-color)] uppercase">
                            Aviso de <span className="text-xnutra-neon">Salud</span>
                        </h1>
                    </div>
                    <p className="text-[var(--text-color)]/60 text-xl md:text-2xl font-black italic max-w-3xl mx-auto uppercase">
                        Noticias, investigaciones y consejos sobre salud hormonal y nutrición avanzada.
                    </p>
                </motion.div>

                {/* Categories */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                    {categories.map((category, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 px-6 py-4 bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl hover:border-xnutra-neon/50 transition-all group"
                        >
                            <div className="text-[var(--text-color)]/60 group-hover:text-xnutra-neon transition-colors">
                                {category.icon}
                            </div>
                            <span className="text-sm font-black uppercase tracking-widest text-[var(--text-color)]/60 group-hover:text-[var(--text-color)] transition-colors">
                                {category.name}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {/* Featured Article */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-xnutra-neon/10 to-transparent border border-xnutra-neon/30 p-12 md:p-16 rounded-[4rem] mb-16 hover:border-xnutra-neon/50 transition-all cursor-pointer group"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-2 bg-xnutra-neon/20 border border-xnutra-neon/50 rounded-xl text-xnutra-neon text-xs font-black uppercase tracking-widest">
                            Destacado
                        </span>
                        <div className="flex items-center gap-2 text-[var(--text-color)]/40 text-xs font-bold">
                            <Calendar size={14} />
                            <span>10 Feb 2026</span>
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-[var(--text-color)] mb-6 group-hover:text-xnutra-neon transition-colors">
                        Revolución en Suplementación: Extractos de 800mg
                    </h2>
                    <p className="text-[var(--text-color)]/70 text-lg md:text-xl leading-relaxed font-medium mb-8 max-w-4xl">
                        La nueva generación de suplementos concentrados está cambiando las reglas del juego. Con 800mg de extractos puros por cápsula,
                        los resultados son visibles en menos de 14 días. Descubre la ciencia detrás de la concentración molecular y por qué
                        los extractos naturales superan a los sintéticos en biodisponibilidad.
                    </p>
                    <div className="flex items-center gap-3 text-xnutra-neon font-black text-sm uppercase tracking-widest group-hover:gap-5 transition-all">
                        Leer Artículo Completo <ArrowRight size={20} />
                    </div>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-[3rem] overflow-hidden hover:border-xnutra-neon/30 transition-all cursor-pointer group"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-widest"
                                        style={{
                                            backgroundColor: `${article.color}20`,
                                            color: article.color,
                                            border: `1px solid ${article.color}40`
                                        }}
                                    >
                                        {article.category}
                                    </span>
                                    <span className="text-[var(--text-color)]/40 text-xs font-bold">{article.readTime}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-[var(--text-color)] mb-4 group-hover:text-xnutra-neon transition-colors leading-tight">
                                    {article.title}
                                </h3>
                                <p className="text-[var(--text-color)]/60 text-sm leading-relaxed font-medium mb-6">
                                    {article.excerpt}
                                </p>
                                <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[var(--text-color)]/40 text-xs font-bold">
                                        <Calendar size={14} />
                                        <span>{article.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xnutra-neon text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                                        Leer <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="mt-20 bg-[var(--panel-bg)] border border-[var(--border-color)] p-12 md:p-16 rounded-[4rem] text-center"
                >
                    <Heart className="text-xnutra-neon mx-auto mb-6" size={40} />
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[var(--text-color)] mb-4">
                        Mantente <span className="text-xnutra-neon">Informado</span>
                    </h2>
                    <p className="text-[var(--text-color)]/60 text-lg font-medium mb-8 max-w-2xl mx-auto">
                        Recibe las últimas noticias sobre salud hormonal, nutrición avanzada y nuevas investigaciones directamente en tu WhatsApp.
                    </p>
                    <button className="bg-xnutra-neon text-black px-12 py-6 rounded-[2rem] font-black text-lg uppercase hover:scale-105 active:scale-95 transition-all shadow-xl">
                        Suscribirme Ahora
                    </button>
                </motion.div>
            </div>
        </div>
    );
};
