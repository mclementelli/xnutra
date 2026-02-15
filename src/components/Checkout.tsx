import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CreditCard, QrCode, Truck, CheckCircle2, Package, MapPin, Phone, User, ArrowRight, Zap } from 'lucide-react';
import { Product } from '../data/products';

interface CheckoutProps {
    product: Product;
    onClose: () => void;
}

type PaymentMethod = 'card' | 'qr' | 'cod';

export const Checkout = ({ product, onClose }: CheckoutProps) => {
    const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
    const [method, setMethod] = useState<PaymentMethod>('card');
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        setOrderId(`XN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
    }, []);

    const handleNext = () => {
        if (step === 'form') setStep('payment');
        else if (step === 'payment') {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setStep('success');
            }, 2000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8"
        >
            <div className="absolute inset-0 bg-[var(--bg-color)]/98 backdrop-blur-2xl" onClick={step !== 'success' ? onClose : undefined} />

            <motion.div
                initial={{ scale: 0.9, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                className="relative w-full max-w-5xl bg-[var(--bg-color)] border border-[var(--border-color)] rounded-[4rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.4)]"
            >
                {step !== 'success' && (
                    <button onClick={onClose} className="absolute top-8 right-8 z-50 text-[var(--text-color)]/20 hover:text-[var(--text-color)] transition-colors">
                        <X size={32} />
                    </button>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
                    {/* Panel de Resumen (Izquierda) */}
                    <div className="lg:col-span-5 bg-[var(--panel-bg)] border-r border-[var(--border-color)] p-12 md:p-16 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-10 h-10 rounded-xl bg-xnutra-neon flex items-center justify-center text-black">
                                    <Package size={20} />
                                </div>
                                <span className="text-xnutra-neon text-[10px] font-black uppercase tracking-[0.4em]">Resumen de Activación</span>
                            </div>

                            <div className="relative group mb-12">
                                <div className="absolute inset-0 bg-xnutra-neon/10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                                <img src={product.image} alt={product.name} className="relative z-10 w-full max-w-[280px] mx-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]" />
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-5xl font-black italic text-[var(--text-color)] leading-none uppercase tracking-tighter">{product.name}</h3>
                                <p className="text-[var(--text-color)]/40 text-sm font-bold italic border-l-4 border-xnutra-neon pl-4 uppercase tracking-tighter leading-tight">
                                    {product.tagline}
                                </p>

                                <div className="pt-8 space-y-4">
                                    <div className="flex justify-between items-center text-[var(--text-color)]/60 text-xs font-black uppercase tracking-widest italic">
                                        <span>Dosificación (1m)</span>
                                        <span>800mg x 30</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[var(--text-color)]/60 text-xs font-black uppercase tracking-widest italic">
                                        <span>Envío Prioritario</span>
                                        <span className="text-xnutra-neon">Gratis</span>
                                    </div>
                                    <div className="pt-6 border-t border-[var(--border-color)] flex justify-between items-end">
                                        <span className="text-[var(--text-color)]/20 text-[10px] font-black uppercase tracking-widest mb-1 italic">Total a Pagar</span>
                                        <div className="text-right">
                                            <span className="text-6xl font-black text-[var(--text-color)] italic">{product.price} <span className="text-xl">Bs</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 flex items-center gap-6 opacity-30 grayscale">
                            <ShieldCheck size={32} className="text-xnutra-neon" />
                            <div className="text-[9px] font-black uppercase tracking-widest leading-relaxed">
                                Transacción Encriptada <br />
                                Protocolo SSL High-Security
                            </div>
                        </div>
                    </div>

                    {/* Panel de Acción (Derecha) */}
                    <div className="lg:col-span-7 p-12 md:p-20 relative overflow-y-auto max-h-[90vh]">
                        <AnimatePresence mode="wait">
                            {step === 'form' && (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-4">
                                        <h2 className="text-6xl font-black italic text-[var(--text-color)] uppercase tracking-tighter leading-none">DATOS DE <br />RECEPCIÓN</h2>
                                        <p className="text-[var(--text-color)]/40 text-[10px] font-black uppercase tracking-[0.4em]">Protocolo de Entrega en Bolivia</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xnutra-neon text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                <User size={12} /> Nombre Completo
                                            </label>
                                            <input type="text" placeholder="EJ. JUAN PÉREZ" className="w-full bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none transition-all placeholder:text-[var(--text-color)]/10 uppercase" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xnutra-neon text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                <Phone size={12} /> WhatsApp de Contacto
                                            </label>
                                            <input type="tel" placeholder="+591 7XXXXXXX" className="w-full bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none transition-all placeholder:text-[var(--text-color)]/10" />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-xnutra-neon text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                <MapPin size={12} /> Dirección de Envío (Ciudad/Zona/Calle)
                                            </label>
                                            <textarea rows={3} placeholder="EJ. CALLE 21 DE CALACOTO, EDIFICIO X, DEPTO 4B" className="w-full bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none transition-all placeholder:text-[var(--text-color)]/10 uppercase resize-none" />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        className="w-full bg-[var(--text-color)] text-[var(--bg-color)] py-8 rounded-[2.5rem] font-black text-xl uppercase flex items-center justify-center gap-4 hover:bg-xnutra-neon hover:text-black transition-all hover:scale-[1.02] active:scale-95 shadow-2xl"
                                    >
                                        Continuar Pago <ArrowRight size={24} />
                                    </button>
                                </motion.div>
                            )}

                            {step === 'payment' && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-4">
                                        <h2 className="text-6xl font-black italic text-[var(--text-color)] uppercase tracking-tighter leading-none">MÉTODO DE <br />PAGO</h2>
                                        <p className="text-[var(--text-color)]/40 text-[10px] font-black uppercase tracking-[0.4em]">Seleccione su Vía de Activación</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { id: 'card', name: 'Tarjeta Crédito/Débito', icon: <CreditCard />, desc: 'Confirmación instantánea' },
                                            { id: 'qr', name: 'Pago vía QR Simple', icon: <QrCode />, desc: 'Transferencia directa segura' },
                                            { id: 'cod', name: 'Pago Contra Entrega (COD)', icon: <Truck />, desc: 'Paga al recibir en tu puerta' }
                                        ].map((m) => (
                                            <button
                                                key={m.id}
                                                onClick={() => setMethod(m.id as PaymentMethod)}
                                                className={`flex items-center gap-8 p-8 border rounded-3xl transition-all duration-300 text-left ${method === m.id ? 'bg-xnutra-neon/10 border-xnutra-neon scale-[1.02]' : 'bg-[var(--panel-bg)] border-[var(--border-color)] hover:border-[var(--text-color)]/30'}`}
                                            >
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${method === m.id ? 'bg-xnutra-neon text-black shadow-[0_0_30px_#00f2ff]' : 'bg-[var(--panel-bg)] text-[var(--text-color)]/40'}`}>
                                                    {m.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-xl font-black italic text-[var(--text-color)] uppercase tracking-tighter">{m.name}</div>
                                                    <div className="text-[10px] font-black text-[var(--text-color)]/40 uppercase tracking-widest">{m.desc}</div>
                                                </div>
                                                <div className={`w-6 h-6 rounded-full border-2 transition-all ${method === m.id ? 'border-xnutra-neon bg-xnutra-neon' : 'border-[var(--border-color)]'}`} />
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        disabled={loading}
                                        className={`w-full bg-[var(--text-color)] text-[var(--bg-color)] py-8 rounded-[2.5rem] font-black text-xl uppercase flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl ${loading ? 'opacity-50 cursor-wait' : 'hover:bg-xnutra-neon hover:text-black'}`}
                                    >
                                        {loading ? <Zap className="animate-spin" size={24} /> : 'Finalizar Pedido'}
                                    </button>
                                </motion.div>
                            )}

                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-12 py-10"
                                >
                                    <div className="relative inline-block">
                                        <div className="absolute inset-0 bg-xnutra-neon/30 blur-3xl animate-pulse" />
                                        <div className="relative w-32 h-32 bg-xnutra-neon rounded-[2.5rem] flex items-center justify-center text-black shadow-[0_0_60px_#00f2ff] mx-auto transform -rotate-6">
                                            <CheckCircle2 size={64} strokeWidth={2.5} />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-7xl font-black italic text-[var(--text-color)] uppercase tracking-tighter leading-[0.8]">ACTIVACIÓN <br /><span className="text-xnutra-neon">EXITOSA</span></h2>
                                        <p className="text-[var(--text-color)]/40 text-[10px] font-black uppercase tracking-[0.4em]">Su protocolo ha sido registrado</p>
                                    </div>

                                    <div className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-[3rem] p-10 space-y-6 text-left relative overflow-hidden">
                                        <div className="absolute -right-10 -top-10 opacity-5">
                                            <Zap size={200} />
                                        </div>
                                        <div className="flex justify-between items-center text-xnutra-neon text-[10px] font-black uppercase tracking-widest italic border-b border-[var(--border-color)] pb-4">
                                            <span>Orden de Grado Clínico</span>
                                            <span>ID: {orderId}</span>
                                        </div>
                                        <div className="space-y-4 pt-4">
                                            <div className="flex justify-between">
                                                <span className="text-[var(--text-color)]/30 font-bold uppercase tracking-widest text-[10px]">Paciente/Cliente</span>
                                                <span className="text-[var(--text-color)] font-black italic uppercase">Usuario Registrado</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[var(--text-color)]/30 font-bold uppercase tracking-widest text-[10px]">Producto</span>
                                                <span className="text-[var(--text-color)] font-black italic uppercase">{product.name} (800mg)</span>
                                            </div>
                                            <div className="flex justify-between border-t border-[var(--border-color)] pt-4">
                                                <span className="text-[var(--text-color)]/30 font-bold uppercase tracking-widest text-[10px]">Estado</span>
                                                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-black uppercase rounded-md tracking-widest">En Proceso</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <button
                                            onClick={onClose}
                                            className="w-full bg-[var(--text-color)] text-[var(--bg-color)] py-8 rounded-[2.5rem] font-black text-xl uppercase hover:bg-xnutra-neon hover:text-black transition-all hover:scale-[1.02] shadow-2xl"
                                        >
                                            Generar Recibo Digital
                                        </button>
                                        <p className="text-[var(--text-color)]/20 text-[10px] font-bold uppercase tracking-widest italic">
                                            Se ha enviado una confirmación detallada vía WhatsApp <br />
                                            con los pasos para el seguimiento de su envío.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
