import { motion } from 'framer-motion';
import { BadgeCheck, Award, Users, TrendingUp, Star, CheckCircle2 } from 'lucide-react';

export const Guarantee = () => {
    const guaranteeSteps = [
        {
            step: "1",
            title: "Prueba sin Riesgo",
            description: "Adquiere cualquier producto XNutra y pruébalo durante 14 días completos."
        },
        {
            step: "2",
            title: "Evalúa Resultados",
            description: "Sigue el protocolo de uso recomendado y observa los cambios en tu organismo."
        },
        {
            step: "3",
            title: "Satisfacción Garantizada",
            description: "Si no estás 100% satisfecho, te devolvemos tu dinero sin preguntas."
        }
    ];

    const testimonials = [
        {
            name: "Carlos M.",
            location: "Santa Cruz",
            product: "TestoMax",
            rating: 5,
            comment: "Después de 2 semanas noté un aumento significativo en mi energía y resistencia. XNutra cumplió su promesa."
        },
        {
            name: "María L.",
            location: "Cochabamba",
            product: "Libifem",
            rating: 5,
            comment: "Excelente producto. Mi ciclo se reguló y me siento con mucha más vitalidad. Totalmente recomendado."
        }
    ];

    const stats = [
        { value: "98%", label: "Satisfacción del Cliente" },
        { value: "14 días", label: "Garantía de Devolución" },
        { value: "800mg", label: "Concentración por Cápsula" },
        { value: "100%", label: "Extractos Naturales" }
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
                        <BadgeCheck className="text-xnutra-neon" size={48} />
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-[var(--text-color)] uppercase">
                            Garantía <span className="text-xnutra-neon">100%</span>
                        </h1>
                    </div>
                    <p className="text-[var(--text-color)]/60 text-xl md:text-2xl font-black italic max-w-3xl mx-auto uppercase">
                        Nuestra confianza se basa en resultados reales, no en promesas vacías.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[var(--panel-bg)] border border-[var(--border-color)] p-8 rounded-[2rem] text-center hover:border-xnutra-neon/30 transition-all"
                        >
                            <p className="text-4xl md:text-5xl font-black italic text-xnutra-neon mb-3">{stat.value}</p>
                            <p className="text-[var(--text-color)]/60 text-sm font-black uppercase tracking-widest">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Promise Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-xnutra-neon/10 to-transparent border border-xnutra-neon/30 p-12 md:p-16 rounded-[4rem] mb-20 text-center"
                >
                    <Award className="text-xnutra-neon mx-auto mb-6" size={48} />
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[var(--text-color)] mb-6">
                        Nuestra Promesa de Calidad
                    </h2>
                    <p className="text-[var(--text-color)]/70 text-lg md:text-xl leading-relaxed font-bold max-w-4xl mx-auto">
                        En XNutra Solutions, cada cápsula contiene exactamente <span className="text-xnutra-neon font-black">800mg de extractos naturales concentrados</span>.
                        No utilizamos rellenos ni ingredientes artificiales. Si después de 14 días de uso correcto no experimentas resultados,
                        te devolvemos el <span className="text-xnutra-neon font-black">100% de tu inversión</span>.
                    </p>
                </motion.div>

                {/* Guarantee Process */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[var(--text-color)] text-center mb-12">
                        Proceso de <span className="text-xnutra-neon">Garantía</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {guaranteeSteps.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="bg-[var(--panel-bg)] border border-[var(--border-color)] p-8 rounded-[3rem] relative hover:border-xnutra-neon/30 transition-all"
                            >
                                <div className="absolute -top-6 left-8 w-12 h-12 rounded-2xl bg-xnutra-neon text-black flex items-center justify-center font-black text-2xl italic">
                                    {item.step}
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[var(--text-color)] mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-[var(--text-color)]/70 text-base leading-relaxed font-medium">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="mb-20">
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <Users className="text-xnutra-neon" size={32} />
                        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[var(--text-color)]">
                            Lo que Dicen Nuestros <span className="text-xnutra-neon">Clientes</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                className="bg-[var(--panel-bg)] border border-[var(--border-color)] p-8 rounded-[3rem] hover:border-xnutra-neon/30 transition-all"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="text-xnutra-neon fill-xnutra-neon" size={20} />
                                    ))}
                                </div>
                                <p className="text-[var(--text-color)] text-base leading-relaxed font-medium italic mb-6">
                                    "{testimonial.comment}"
                                </p>
                                <div className="pt-4 border-t border-[var(--border-color)]">
                                    <p className="text-[var(--text-color)] font-black text-lg">{testimonial.name}</p>
                                    <p className="text-[var(--text-color)]/60 text-sm font-bold">{testimonial.location}</p>
                                    <p className="text-xnutra-neon text-xs font-black uppercase tracking-widest mt-2">{testimonial.product}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-[var(--panel-bg)] border border-[var(--border-color)] p-12 md:p-16 rounded-[4rem] text-center"
                >
                    <TrendingUp className="text-xnutra-neon mx-auto mb-6" size={40} />
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[var(--text-color)] mb-6">
                        Respaldo Científico
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center gap-3">
                            <CheckCircle2 className="text-xnutra-neon" size={32} />
                            <p className="text-[var(--text-color)] font-bold text-sm">Extractos Certificados</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <CheckCircle2 className="text-xnutra-neon" size={32} />
                            <p className="text-[var(--text-color)] font-bold text-sm">Análisis de Laboratorio</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <CheckCircle2 className="text-xnutra-neon" size={32} />
                            <p className="text-[var(--text-color)] font-bold text-sm">Protocolos Validados</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
