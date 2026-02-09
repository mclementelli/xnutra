import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, Product } from '../data/products';
import { Zap, X, Info, ShieldCheck, Microscope, MessageSquare, Activity, Target, FlaskConical, Heart, Stethoscope, ShoppingCart, Download } from 'lucide-react';

const ProductCard = ({ product, onOpenClinical }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative flex flex-col h-full"
        >
            <div className="absolute -inset-4 bg-gradient-to-b from-white/5 to-transparent rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative flex-1 bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-[3.5rem] overflow-hidden transition-all duration-500 hover:border-xnutra-neon hover:shadow-[0_0_50px_rgba(0,242,255,0.15)] flex flex-col min-h-[720px]">
                <div className="relative h-[360px] overflow-hidden bg-black/5 flex items-center justify-center p-8">
                    <div className="absolute top-8 left-8 z-20 flex flex-col gap-2">
                        <span className="px-4 py-1.5 rounded-full border border-xnutra-neon/30 bg-xnutra-neon/10 text-xnutra-neon text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md">Pureza Estandarizada</span>
                        <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/60 text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md italic">Grado Concentrado</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    <motion.img
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        src={product.image}
                        alt={product.name}
                        className="max-w-[85%] max-h-[85%] object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)] relative z-10"
                    />
                </div>

                <div className="p-10 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 rounded-full bg-xnutra-neon animate-pulse shadow-[0_0_10px_#00f2ff]" />
                            <span className="text-xnutra-neon text-[10px] font-black uppercase tracking-[0.4em]">Protocolo {product.category}</span>
                        </div>
                        <h3 className="text-5xl font-black mb-4 text-[var(--text-color)] italic group-hover:text-xnutra-neon transition-colors leading-[0.8] tracking-tighter uppercase">{product.name}</h3>
                        <p className="text-lg text-[var(--text-color)]/70 mb-8 line-clamp-2 leading-tight font-bold italic opacity-80">
                            {product.tagline}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-end justify-between border-b border-[var(--border-color)] pb-6">
                            <div>
                                <span className="text-[var(--text-color)]/20 text-[10px] font-black uppercase tracking-widest block mb-1 italic">Precio</span>
                                <span className="text-4xl font-black text-[var(--text-color)] italic">{product.price} <span className="text-xl">Bs</span></span>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] text-xnutra-neon font-black block uppercase tracking-widest mb-1">Concentración</span>
                                <span className="text-xl font-black text-[var(--text-color)]/40 italic">850mg</span>
                            </div>
                        </div>

                        <button
                            onClick={() => onOpenClinical(product)}
                            className="w-full bg-white text-black py-6 rounded-[2.5rem] font-black text-[11px] uppercase flex items-center justify-center gap-3 hover:bg-xnutra-neon transition-all hover:scale-[1.05] active:scale-95 shadow-xl group"
                        >
                            <Microscope size={18} className="group-hover:rotate-12 transition-transform" />
                            Ver Ficha Nutra mg
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const ClinicalSheet = ({ product, onClose }: { product: Product, onClose: () => void }) => {
    // ... (rest of ClinicalSheet)
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
        >
            <div className="absolute inset-0 bg-black/98 backdrop-blur-xl" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-7xl bg-[var(--bg-color)] border border-[var(--border-color)] rounded-[4rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.5)] max-h-[95vh] overflow-y-auto"
            >
                {/* Header Clínico */}
                <div className="bg-white text-black p-12 md:p-20 flex flex-col md:flex-row justify-between items-center gap-10 border-b-8 border-xnutra-neon">
                    <div className="flex items-center gap-10">
                        <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center text-xnutra-neon transform rotate-3 shadow-2xl shrink-0">
                            <Stethoscope size={48} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 bg-black text-xnutra-neon text-[10px] font-black uppercase tracking-widest rounded-md">Confidencial</span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Auth: XNutra Scientific</span>
                            </div>
                            <h2 className="text-6xl md:text-7xl font-black italic uppercase leading-[0.85] tracking-tighter">PERFIL CLÍNICO <br />DE ALTA PUREZA</h2>
                        </div>
                    </div>
                    <div className="text-center md:text-right md:border-l-4 md:border-black/10 md:pl-12 flex flex-col gap-4">
                        <div>
                            <span className="block text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2 italic underline decoration-black/20 underline-offset-4">Dosificación Concentrada</span>
                            <span className="text-8xl font-black italic tracking-tighter">850<span className="text-3xl ml-3 opacity-30">MG</span></span>
                        </div>
                        <button
                            onClick={() => window.print()}
                            className="bg-black text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase flex items-center gap-2 hover:bg-xnutra-neon hover:text-black transition-all shadow-xl"
                        >
                            <Download size={14} /> Compartir Ficha PDF
                        </button>
                    </div>
                    <button onClick={onClose} className="absolute top-10 right-10 text-black/20 hover:text-black transition-colors">
                        <X size={48} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-4 p-12 md:p-16 bg-[var(--panel-bg)] border-r border-[var(--border-color)] space-y-16">
                        <div className="relative aspect-square rounded-[4rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center overflow-hidden group">
                            <div className="absolute inset-0 bg-xnutra-neon/20 blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity" />
                            <motion.img
                                initial={{ scale: 0.8, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                src={product.image}
                                alt={product.name}
                                className="relative z-10 w-[85%] drop-shadow-[0_60px_100px_rgba(0,0,0,1)]"
                            />
                        </div>

                        <div className="space-y-10">
                            <div className="flex items-center gap-4">
                                <FlaskConical className="text-xnutra-neon" size={24} />
                                <h4 className="text-[var(--text-color)] font-black uppercase tracking-[0.2em] text-xs">Mecánica Instrumental</h4>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { t: 'SOLUBILIZACIÓN', d: 'Expansión de micro-nutrientes en medio acuoso gástrico.', p: '100%', icon: <Zap size={14} /> },
                                    { t: 'BIODISPONIBILIDAD', d: 'Absorción optimizada mediante vía liposomal natural.', p: '98.4%', icon: <Target size={14} /> },
                                    { t: 'POTENCIA FINAL', d: 'Concentración molecular pura para respuesta inmediata.', p: 'Grado A', icon: <Heart size={14} /> }
                                ].map((step, i) => (
                                    <div key={i} className="relative pl-10 border-l border-white/10 group">
                                        <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-white/20 border-2 border-xnutra-dark group-hover:bg-xnutra-neon group-hover:scale-125 transition-all" />
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xnutra-neon font-black text-[10px] tracking-widest uppercase flex items-center gap-2">
                                                {step.icon} {step.t}
                                            </span>
                                        </div>
                                        <p className="text-white/80 text-sm font-bold italic leading-snug">{step.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[3.5rem] bg-xnutra-neon/10 border border-xnutra-neon/20 italic">
                            <p className="text-xnutra-neon text-sm font-bold leading-relaxed">
                                <span className="text-lg font-black block mb-2 underline decoration-xnutra-neon/30">NOTA MÉDICA:</span>
                                "Fórmula recalibrada para 850mg de alta transferencia nutricional sin excipientes químicos."
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-8 p-12 md:p-24 space-y-20">
                        <div>
                            <div className="flex items-center gap-6 mb-16">
                                <div className="h-[2px] w-24 bg-xnutra-neon" />
                                <h3 className="text-4xl md:text-5xl font-black italic text-[var(--text-color)] uppercase tracking-tighter leading-none">Análisis de <br />Dosificación</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {product.formulation.map((item: any) => (
                                    <div key={item.name} className="bg-[var(--panel-bg)] border border-[var(--border-color)] p-10 rounded-[4rem] hover:border-xnutra-neon/40 hover:bg-white/[0.04] transition-all group relative overflow-hidden">
                                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <FlaskConical size={120} />
                                        </div>
                                        <div className="flex justify-between items-center mb-10">
                                            <div className="flex flex-col">
                                                <span className="text-5xl font-black text-[var(--text-color)] italic group-hover:text-xnutra-neon transition-colors leading-none tracking-tighter">{item.mg}</span>
                                                <span className="text-[10px] font-black text-[var(--text-color)]/40 uppercase tracking-[0.4em] mt-2">Miligramos Activos</span>
                                            </div>
                                            <div className="w-14 h-14 rounded-2xl bg-[var(--text-color)] text-[var(--bg-color)] flex items-center justify-center font-black">
                                                <Zap size={24} />
                                            </div>
                                        </div>
                                        <h4 className="text-3xl font-black text-[var(--text-color)] italic uppercase mb-4 tracking-tighter leading-none">{item.name}</h4>
                                        <p className="text-[var(--text-color)]/40 text-[10px] font-black uppercase tracking-widest border-b border-[var(--border-color)] pb-6 mb-8">{item.description}</p>
                                        <p className="text-[var(--text-color)]/80 text-lg leading-[1.3] font-bold italic">
                                            {item.benefits}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="p-12 rounded-[4rem] bg-xnutra-neon/5 border border-xnutra-neon/20 relative overflow-hidden">
                                <Activity className="absolute -right-16 -bottom-16 opacity-5" size={300} />
                                <h4 className="text-xnutra-neon font-black uppercase tracking-[0.3em] text-[10px] mb-8 flex items-center gap-3">
                                    <ShieldCheck size={18} /> Protocolo de Inocuidad
                                </h4>
                                <ul className="space-y-6">
                                    {['Extractos estandarizados', 'Dosis 850mg purificada', 'Cápsulas vegetales', 'Sin efectos secundarios adversos'].map((txt, i) => (
                                        <li key={i} className="flex items-center gap-4 text-[var(--text-color)]/80 font-bold italic text-lg leading-none uppercase tracking-tighter">
                                            <span className="text-xnutra-neon font-black underline underline-offset-4 decoration-xnutra-neon/30">✓</span> {txt}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-12 rounded-[4rem] bg-white text-black relative overflow-hidden group">
                                <Target className="absolute -right-10 -top-10 opacity-10 group-hover:rotate-12 transition-transform" size={200} />
                                <h4 className="font-black uppercase tracking-[0.4em] text-[10px] mb-6 opacity-30 italic">Punto de Verificación</h4>
                                <p className="text-4xl font-black italic leading-[0.8] mb-10 uppercase tracking-tighter">EFICIENCIA <br /><span className="text-xnutra-steel">NUTRA 100%</span></p>
                                <div className="h-4 w-full bg-black/10 rounded-full overflow-hidden p-1 shadow-inner relative">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: '92.4%' }} className="h-full bg-black rounded-full" />
                                    <span className="absolute right-4 -top-8 text-xs font-black italic">92.4%</span>
                                </div>
                                <p className="text-[10px] font-bold mt-10 opacity-50 leading-tight uppercase tracking-widest italic border-t border-black/10 pt-6">
                                    Certificación de satisfacción XNutra Bolivia 2026.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const DetailModal = ({ product, onClose, onOpenCheckout }: any) => {
    const [activeBenefits, setActiveBenefits] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8"
        >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-6xl bg-[var(--bg-color)] border border-[var(--border-color)] rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] max-h-[95vh] overflow-y-auto"
            >
                <button onClick={onClose} className="absolute top-10 right-10 z-50 p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all border border-white/10 hover:scale-110 active:scale-90 shadow-2xl">
                    <X size={32} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-12 p-8 bg-black border-b border-white/10 text-center">
                        <p className="text-xnutra-neon text-[10px] font-black uppercase tracking-[0.6em]">ALTA CONCENTRACIÓN MOLECULAR - PROTOCOLO DE CONFIANZA TOTAL</p>
                    </div>
                    <div className="lg:col-span-5 p-12 md:p-20 flex flex-col items-center justify-center bg-white/[0.03] border-r border-white/10">
                        <motion.img
                            layoutId={`img-${product.id}`}
                            src={product.image}
                            alt={product.name}
                            className="w-full max-w-[450px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,1)] mb-16"
                        />
                        <div className="w-full bg-[var(--panel-bg)] p-10 rounded-[3rem] border border-[var(--border-color)] mb-10 font-black italic shadow-2xl relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-6">
                                <ShieldCheck className="text-xnutra-neon" size={24} />
                                <h5 className="text-[var(--text-color)] uppercase tracking-[0.3em] text-[10px]">Indicaciones de Uso</h5>
                            </div>
                            <p className="text-[var(--text-color)] text-xl leading-relaxed">
                                {product.usage}
                            </p>
                        </div>
                        <div className="w-full space-y-4">
                            <button
                                onClick={() => onOpenCheckout(product)}
                                className="w-full bg-xnutra-neon text-black py-8 rounded-[3rem] font-black text-2xl uppercase flex items-center justify-center gap-5 hover:bg-white transition-all shadow-[0_0_50px_rgba(0,242,255,0.3)] hover:scale-[1.03] active:scale-95 group"
                            >
                                <ShoppingCart size={32} />
                                Iniciar Activación
                            </button>
                            <button
                                onClick={() => window.open(`https://wa.me/591XXXXXXXX?text=${encodeURIComponent(`Hola! Me interesa el producto ${product.name}`)}`, '_blank')}
                                className="w-full bg-white/5 border border-white/10 text-white py-6 rounded-[3rem] font-black text-xs uppercase flex items-center justify-center gap-4 hover:bg-white/10 transition-all"
                            >
                                <MessageSquare size={20} /> Asesoría Vía WhatsApp
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-7 p-12 lg:p-24 overflow-y-auto">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-[2px] bg-xnutra-neon" />
                            <span className="text-xnutra-neon font-black uppercase tracking-[0.4em] text-[10px]">Ficha Nutra mg</span>
                        </div>
                        <h2 className="text-7xl md:text-8xl font-black italic text-[var(--text-color)] mb-8 uppercase tracking-tighter leading-[0.7]">{product.name}</h2>
                        <p className="text-[var(--text-color)] text-3xl mb-16 leading-tight font-black italic opacity-80 uppercase tracking-tighter">
                            {product.tagline}
                        </p>

                        <div className="space-y-16">
                            <div>
                                <h4 className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px] mb-8 flex items-center gap-4 italic underline underline-offset-4 decoration-white/10">
                                    <Info size={16} /> Interacción: Pulsa para ver el impacto metabólico
                                </h4>
                                <div className="grid grid-cols-1 gap-6">
                                    {product.formulation.map((item: any) => (
                                        <div
                                            key={item.name}
                                            onClick={() => setActiveBenefits(activeBenefits === item.name ? null : item.name)}
                                            className={`bg-white/5 border p-10 rounded-[3.5rem] flex flex-col gap-8 cursor-pointer transition-all duration-500 ${activeBenefits === item.name ? 'border-xnutra-neon bg-xnutra-neon/10 scale-[1.02] shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : 'border-white/10 hover:border-white/30 hover:bg-white/[0.08]'}`}
                                        >
                                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                                <div className={`shrink-0 flex flex-col items-center justify-center w-28 h-28 rounded-[2.5rem] font-black shadow-2xl transition-all duration-500 ${activeBenefits === item.name ? 'bg-xnutra-neon text-black rotate-6' : 'bg-white text-black'}`}>
                                                    <span className="text-4xl leading-none">{item.mg}</span>
                                                    <span className="text-[12px] uppercase mt-1">mg</span>
                                                </div>
                                                <div className="flex-1 text-center md:text-left">
                                                    <span className={`text-4xl font-black block mb-2 uppercase italic transition-colors tracking-tighter leading-none ${activeBenefits === item.name ? 'text-xnutra-neon' : 'text-[var(--text-color)]'}`}>{item.name}</span>
                                                    <p className="text-[var(--text-color)]/40 text-[10px] font-black uppercase tracking-widest leading-loose">{item.description}</p>
                                                </div>
                                                <div className={`transition-transform duration-500 ${activeBenefits === item.name ? 'rotate-180 text-xnutra-neon' : 'text-[var(--text-color)]/20'}`}>
                                                    <Info size={32} />
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {activeBenefits === item.name && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-8 border-t border-xnutra-neon/30 mt-2">
                                                            <div className="flex items-center gap-4 mb-6">
                                                                <div className="w-10 h-10 rounded-xl bg-xnutra-neon flex items-center justify-center text-black">
                                                                    <Zap size={20} fill="black" />
                                                                </div>
                                                                <span className="font-black uppercase tracking-[0.3em] text-[10px] text-xnutra-neon">Función Celular</span>
                                                            </div>
                                                            <p className="text-white text-2xl font-black italic leading-[1.2] uppercase tracking-tighter">
                                                                {item.benefits}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-12 rounded-[4rem] bg-white text-black shadow-2xl relative overflow-hidden group">
                                <Zap size={80} className="absolute -right-10 -bottom-10 opacity-5 group-hover:rotate-12 transition-transform" />
                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                    <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center text-xnutra-neon shrink-0 shadow-2xl">
                                        <Zap size={48} fill="currentColor" />
                                    </div>
                                    <p className="text-xl leading-tight font-bold italic uppercase tracking-tighter">
                                        Fórmulas recalibradas 2026. 100% extractos estandarizados de grado farmacéutico.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const Vitrina = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <section className="bg-[var(--bg-color)] py-40 px-4 overflow-hidden transition-colors duration-300" id="vitrina">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-12 px-4 border-b border-white/10 pb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-1 bg-xnutra-neon" />
                            <span className="text-xnutra-neon text-xs font-black uppercase tracking-[0.6em]">Exhibición de Bio-Tecnología</span>
                        </div>
                        <h2 className="text-8xl md:text-9xl font-black text-[var(--text-color)] italic tracking-tighter leading-none mb-10 uppercase">
                            NUESTROS <span className="text-xnutra-neon">PRODUCTOS</span>
                        </h2>
                        <p className="text-2xl text-white/60 font-bold italic leading-relaxed uppercase tracking-tighter max-w-2xl">
                            Fórmulas de alta precisión diseñadas para la optimización del rendimiento humano y bienestar celular.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onOpenClinical={(p: any) => (window as any).openClinical?.(p)}
                        />
                    ))}
                </div>

                <div className="mt-40 border-t border-white/10 pt-20 flex flex-col md:flex-row justify-between items-center gap-12 opacity-40 hover:opacity-100 transition-all">
                    <div className="flex items-center gap-8">
                        <ShieldCheck size={48} className="text-xnutra-neon" />
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] italic text-[var(--text-color)]/60">
                            Protocolo de Activación Molecular Bolivia <br />
                            XNutra Scientific Division | Lab Bio-2026
                        </div>
                    </div>
                    <div className="flex items-center gap-8 border-l border-[var(--border-color)] pl-12">
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] italic text-right text-[var(--text-color)]/60">
                            Fórmulas verificadas por <br />Investigación Clínica de Alto Impacto
                        </div>
                        <Microscope size={48} className="text-[var(--text-color)]" />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedProduct && (
                    <DetailModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onOpenCheckout={(p: any) => (window as any).openCheckout?.(p)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};
