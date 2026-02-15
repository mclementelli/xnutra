import { motion, AnimatePresence } from 'framer-motion';
import { X, FlaskConical, Pill, Clock, Target, Shield, Zap } from 'lucide-react';
import { Product } from '../data/products';

interface ClinicalSheetProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export const ClinicalSheet = ({ product, isOpen, onClose }: ClinicalSheetProps) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-[var(--bg-color)]/95 backdrop-blur-xl"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[var(--panel-bg)] border border-[var(--border-color)] w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[4rem] relative shadow-[0_0_150px_rgba(0,0,0,0.5)]"
                >
                    {/* Header */}
                    <div className="bg-[var(--panel-bg)] border-b border-[var(--border-color)] p-8 md:p-12 rounded-t-[4rem]">
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 md:top-12 md:right-12 text-[var(--text-color)]/40 hover:text-[var(--text-color)] transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0">
                                <div className="absolute inset-0 blur-[60px] rounded-full" style={{ backgroundColor: `${product.color}40` }} />
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                                />
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                                    <Shield className="text-xnutra-neon" size={24} />
                                    <span className="text-xnutra-neon font-black text-xs uppercase tracking-[0.4em]">Ficha Clínica Oficial</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black italic mb-4 tracking-tighter text-[var(--text-color)] uppercase leading-none">{product.name}</h2>
                                <p className="text-xl md:text-2xl font-black italic uppercase mb-6" style={{ color: product.color }}>{product.tagline}</p>
                                <p className="text-[var(--text-color)]/70 text-base md:text-lg leading-relaxed font-medium max-w-2xl">{product.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 space-y-10">
                        {/* Composición Molecular */}
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-xnutra-neon/20 flex items-center justify-center border border-xnutra-neon/30">
                                    <FlaskConical className="text-xnutra-neon" size={24} />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[var(--text-color)]">Composición Molecular</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {product.formulation.map((ingredient, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-[var(--bg-color)] border border-[var(--border-color)] p-6 md:p-8 rounded-[2rem] hover:border-xnutra-neon/30 transition-all group"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <h4 className="text-xl md:text-2xl font-black italic text-[var(--text-color)] uppercase tracking-tighter flex-1">{ingredient.name}</h4>
                                            <span className="text-3xl md:text-4xl font-black italic text-xnutra-neon ml-4">{ingredient.mg}mg</span>
                                        </div>
                                        <p className="text-[var(--text-color)]/60 text-sm md:text-base mb-4 font-medium italic">{ingredient.description}</p>
                                        <div className="pt-4 border-t border-[var(--border-color)]">
                                            <p className="text-[var(--text-color)] text-sm md:text-base font-bold leading-relaxed">{ingredient.benefits}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 bg-xnutra-neon/10 border border-xnutra-neon/30 p-6 md:p-8 rounded-[2rem]">
                                <div className="flex items-center gap-3 mb-3">
                                    <Pill className="text-xnutra-neon" size={20} />
                                    <span className="text-xnutra-neon font-black text-xs uppercase tracking-widest">Concentración Total</span>
                                </div>
                                <p className="text-4xl md:text-5xl font-black italic text-[var(--text-color)]">800mg por cápsula</p>
                            </div>
                        </section>

                        {/* Modo de Uso */}
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-xnutra-neon/20 flex items-center justify-center border border-xnutra-neon/30">
                                    <Clock className="text-xnutra-neon" size={24} />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[var(--text-color)]">Protocolo de Uso</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-6 md:p-8 rounded-[2rem]">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Target className="text-xnutra-neon" size={20} />
                                        <h4 className="text-lg font-black uppercase tracking-widest text-[var(--text-color)]/60">Dosis Recomendada</h4>
                                    </div>
                                    <p className="text-2xl md:text-3xl font-black italic text-[var(--text-color)] leading-tight">{product.usage}</p>
                                </div>

                                <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-6 md:p-8 rounded-[2rem]">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Zap className="text-xnutra-neon" size={20} />
                                        <h4 className="text-lg font-black uppercase tracking-widest text-[var(--text-color)]/60">Tiempo de Acción</h4>
                                    </div>
                                    <p className="text-2xl md:text-3xl font-black italic text-[var(--text-color)] leading-tight">Resultados visibles en 14 días</p>
                                </div>
                            </div>

                            {product.scientificProof && (
                                <div className="mt-6 bg-[var(--panel-bg)] border border-[var(--border-color)] p-6 md:p-8 rounded-[2rem]">
                                    <p className="text-[var(--text-color)]/60 text-xs uppercase tracking-widest font-black mb-3">Respaldo Científico</p>
                                    <p className="text-[var(--text-color)] text-base md:text-lg font-bold italic">{product.scientificProof}</p>
                                </div>
                            )}
                        </section>

                        {/* Footer */}
                        <div className="pt-8 border-t border-[var(--border-color)] text-center">
                            <p className="text-[var(--text-color)]/30 text-xs md:text-sm font-black italic uppercase tracking-widest leading-loose">
                                * Empresa de suplementos de extractos naturales. Nuestra garantía radica en la confianza y resultados de nuestros clientes.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
