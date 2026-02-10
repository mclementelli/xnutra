import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, User, MapPin, CreditCard, QrCode, Package, CheckCircle2, Minus, Plus, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';

interface CheckoutFlowProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export const CheckoutFlow = ({ product, isOpen, onClose }: CheckoutFlowProps) => {
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');
    const [step, setStep] = useState<'cart' | 'info' | 'payment' | 'success'>('cart');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        address: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: '',
        cardName: ''
    });

    const shippingCost = 30;
    const subtotal = product.price * quantity;
    const total = subtotal + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Aquí iría la lógica de procesamiento de pago
        setStep('success');
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-[var(--bg-color)]/95 backdrop-blur-xl overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[var(--panel-bg)] border border-[var(--border-color)] w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-[4rem] relative shadow-[0_0_150px_rgba(0,0,0,0.5)] my-8"
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-[var(--panel-bg)]/95 backdrop-blur-xl border-b border-[var(--border-color)] p-8 md:p-12 rounded-t-[4rem]">
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 md:top-12 md:right-12 text-[var(--text-color)]/40 hover:text-[var(--text-color)] transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-xnutra-neon/20 flex items-center justify-center border border-xnutra-neon/30">
                                <ShoppingCart className="text-xnutra-neon" size={24} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-[var(--text-color)] uppercase">
                                {step === 'success' ? 'Pedido Confirmado' : 'Checkout XNutra'}
                            </h2>
                        </div>

                        {/* Progress Steps */}
                        {step !== 'success' && (
                            <div className="flex items-center gap-2 md:gap-4">
                                {['cart', 'info', 'payment'].map((s, idx) => (
                                    <div key={s} className="flex items-center flex-1">
                                        <div className={`flex items-center gap-2 md:gap-3 flex-1 ${step === s ? 'opacity-100' : 'opacity-40'}`}>
                                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-sm ${step === s ? 'bg-xnutra-neon text-black' : 'bg-[var(--border-color)] text-[var(--text-color)]'}`}>
                                                {idx + 1}
                                            </div>
                                            <span className="hidden md:block text-xs font-black uppercase tracking-widest text-[var(--text-color)]">
                                                {s === 'cart' ? 'Carrito' : s === 'info' ? 'Datos' : 'Pago'}
                                            </span>
                                        </div>
                                        {idx < 2 && <div className="w-8 md:w-16 h-0.5 bg-[var(--border-color)]" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        <AnimatePresence mode="wait">
                            {/* Step 1: Cart */}
                            {step === 'cart' && (
                                <motion.div
                                    key="cart"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                                >
                                    {/* Product Details */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-6 md:p-8 rounded-[3rem]">
                                            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                                                <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                                                    <div className="absolute inset-0 blur-[40px] rounded-full" style={{ backgroundColor: `${product.color}40` }} />
                                                    <img src={product.image} alt={product.name} className="relative z-10 w-full h-full object-contain" />
                                                </div>
                                                <div className="flex-1 text-center md:text-left">
                                                    <h3 className="text-3xl md:text-4xl font-black italic mb-2 text-[var(--text-color)] uppercase tracking-tighter">{product.name}</h3>
                                                    <p className="text-lg font-black italic mb-4" style={{ color: product.color }}>{product.tagline}</p>
                                                    <p className="text-[var(--text-color)]/60 text-sm md:text-base font-medium">{product.description}</p>
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-6 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[var(--text-color)]/60 text-sm font-black uppercase tracking-widest">Cantidad:</span>
                                                    <div className="flex items-center gap-3 bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-2">
                                                        <button
                                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                            className="w-10 h-10 rounded-xl bg-[var(--bg-color)] hover:bg-xnutra-neon hover:text-black transition-all flex items-center justify-center"
                                                        >
                                                            <Minus size={18} />
                                                        </button>
                                                        <span className="text-2xl font-black w-12 text-center text-[var(--text-color)]">{quantity}</span>
                                                        <button
                                                            onClick={() => setQuantity(quantity + 1)}
                                                            className="w-10 h-10 rounded-xl bg-[var(--bg-color)] hover:bg-xnutra-neon hover:text-black transition-all flex items-center justify-center"
                                                        >
                                                            <Plus size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[var(--text-color)]/60 text-xs font-black uppercase tracking-widest mb-1">Precio Unitario</p>
                                                    <p className="text-3xl md:text-4xl font-black italic text-[var(--text-color)]">Bs. {product.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="lg:col-span-1">
                                        <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-6 md:p-8 rounded-[3rem] sticky top-32">
                                            <h4 className="text-2xl font-black italic uppercase mb-6 text-[var(--text-color)] tracking-tighter">Resumen</h4>
                                            <div className="space-y-4 mb-6">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[var(--text-color)]/60 font-bold">Subtotal ({quantity}x)</span>
                                                    <span className="text-xl font-black text-[var(--text-color)]">Bs. {subtotal}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[var(--text-color)]/60 font-bold">Envío</span>
                                                    <span className="text-xl font-black text-[var(--text-color)]">Bs. {shippingCost}</span>
                                                </div>
                                                <div className="pt-4 border-t border-[var(--border-color)] flex justify-between items-center">
                                                    <span className="text-lg font-black uppercase text-[var(--text-color)]">Total</span>
                                                    <span className="text-3xl md:text-4xl font-black italic text-xnutra-neon">Bs. {total}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setStep('info')}
                                                className="w-full bg-xnutra-neon text-black py-6 rounded-[2rem] font-black text-lg uppercase hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                                            >
                                                Continuar <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Customer Info */}
                            {step === 'info' && (
                                <motion.div
                                    key="info"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                                >
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-6 md:p-8 rounded-[3rem]">
                                            <div className="flex items-center gap-3 mb-6">
                                                <User className="text-xnutra-neon" size={24} />
                                                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-[var(--text-color)]">Datos Personales</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="NOMBRE COMPLETO"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="col-span-full bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-4 md:p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none placeholder:text-[var(--text-color)]/20"
                                                />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="WHATSAPP"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-4 md:p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none placeholder:text-[var(--text-color)]/20"
                                                />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="EMAIL"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-4 md:p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none placeholder:text-[var(--text-color)]/20"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-6 md:p-8 rounded-[3rem]">
                                            <div className="flex items-center gap-3 mb-6">
                                                <MapPin className="text-xnutra-neon" size={24} />
                                                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-[var(--text-color)]">Dirección de Envío</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                                <select
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-4 md:p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none appearance-none"
                                                >
                                                    <option value="" className="bg-[var(--bg-color)]">SELECCIONAR CIUDAD</option>
                                                    <option value="Santa Cruz" className="bg-[var(--bg-color)]">SANTA CRUZ</option>
                                                    <option value="La Paz" className="bg-[var(--bg-color)]">LA PAZ</option>
                                                    <option value="Cochabamba" className="bg-[var(--bg-color)]">COCHABAMBA</option>
                                                    <option value="Tarija" className="bg-[var(--bg-color)]">TARIJA</option>
                                                    <option value="Sucre" className="bg-[var(--bg-color)]">SUCRE</option>
                                                    <option value="Potosí" className="bg-[var(--bg-color)]">POTOSÍ</option>
                                                    <option value="Oruro" className="bg-[var(--bg-color)]">ORURO</option>
                                                    <option value="Beni" className="bg-[var(--bg-color)]">BENI</option>
                                                    <option value="Pando" className="bg-[var(--bg-color)]">PANDO</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    placeholder="DIRECCIÓN COMPLETA"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="col-span-full bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-4 md:p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none placeholder:text-[var(--text-color)]/20"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-1">
                                        <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-6 md:p-8 rounded-[3rem] sticky top-32">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Package className="text-xnutra-neon" size={20} />
                                                <h4 className="text-xl font-black italic uppercase text-[var(--text-color)]">Tu Pedido</h4>
                                            </div>
                                            <div className="space-y-3 mb-6 pb-6 border-b border-[var(--border-color)]">
                                                <p className="text-[var(--text-color)] font-bold">{product.name} x{quantity}</p>
                                                <p className="text-2xl font-black text-xnutra-neon">Bs. {total}</p>
                                            </div>
                                            <button
                                                onClick={() => setStep('payment')}
                                                disabled={!formData.name || !formData.phone || !formData.city || !formData.address}
                                                className="w-full bg-xnutra-neon text-black py-6 rounded-[2rem] font-black text-lg uppercase hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            >
                                                Continuar <ArrowRight size={20} />
                                            </button>
                                            <button
                                                onClick={() => setStep('cart')}
                                                className="w-full mt-4 bg-[var(--panel-bg)] border border-[var(--border-color)] text-[var(--text-color)] py-4 rounded-[2rem] font-black text-sm uppercase hover:bg-white/5 transition-all"
                                            >
                                                Volver
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Payment */}
                            {step === 'payment' && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                                >
                                    <div className="lg:col-span-2 space-y-6">
                                        {/* Payment Method Selection */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            <button
                                                onClick={() => setPaymentMethod('card')}
                                                className={`p-6 md:p-8 rounded-[2rem] border-2 transition-all ${paymentMethod === 'card' ? 'border-xnutra-neon bg-xnutra-neon/10' : 'border-[var(--border-color)] bg-[var(--bg-color)]'}`}
                                            >
                                                <CreditCard className={`mx-auto mb-4 ${paymentMethod === 'card' ? 'text-xnutra-neon' : 'text-[var(--text-color)]/40'}`} size={32} />
                                                <p className="text-lg font-black uppercase text-[var(--text-color)]">Tarjeta</p>
                                            </button>
                                            <button
                                                onClick={() => setPaymentMethod('qr')}
                                                className={`p-6 md:p-8 rounded-[2rem] border-2 transition-all ${paymentMethod === 'qr' ? 'border-xnutra-neon bg-xnutra-neon/10' : 'border-[var(--border-color)] bg-[var(--bg-color)]'}`}
                                            >
                                                <QrCode className={`mx-auto mb-4 ${paymentMethod === 'qr' ? 'text-xnutra-neon' : 'text-[var(--text-color)]/40'}`} size={32} />
                                                <p className="text-lg font-black uppercase text-[var(--text-color)]">QR</p>
                                            </button>
                                        </div>

                                        {/* Payment Form */}
                                        {paymentMethod === 'card' ? (
                                            <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-6 md:p-8 rounded-[3rem]">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <CreditCard className="text-xnutra-neon" size={24} />
                                                    <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-[var(--text-color)]">Datos de Tarjeta</h3>
                                                </div>
                                                <div className="space-y-4 md:space-y-6">
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        placeholder="NÚMERO DE TARJETA"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        maxLength={16}
                                                        className="w-full bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-4 md:p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none placeholder:text-[var(--text-color)]/20"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="cardName"
                                                        placeholder="NOMBRE EN LA TARJETA"
                                                        value={formData.cardName}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-4 md:p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none placeholder:text-[var(--text-color)]/20"
                                                    />
                                                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                                                        <input
                                                            type="text"
                                                            name="cardExpiry"
                                                            placeholder="MM/AA"
                                                            value={formData.cardExpiry}
                                                            onChange={handleInputChange}
                                                            maxLength={5}
                                                            className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-4 md:p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none placeholder:text-[var(--text-color)]/20"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="cardCVV"
                                                            placeholder="CVV"
                                                            value={formData.cardCVV}
                                                            onChange={handleInputChange}
                                                            maxLength={3}
                                                            className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-4 md:p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none placeholder:text-[var(--text-color)]/20"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-6 md:p-8 rounded-[3rem] text-center">
                                                <div className="flex items-center justify-center gap-3 mb-6">
                                                    <QrCode className="text-xnutra-neon" size={24} />
                                                    <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-[var(--text-color)]">Escanea el QR</h3>
                                                </div>
                                                <div className="w-64 h-64 mx-auto bg-white rounded-3xl p-6 mb-6 flex items-center justify-center">
                                                    <QrCode size={200} className="text-black" />
                                                </div>
                                                <p className="text-[var(--text-color)]/60 text-sm font-bold mb-2">Monto a pagar:</p>
                                                <p className="text-4xl md:text-5xl font-black italic text-xnutra-neon mb-6">Bs. {total}</p>
                                                <p className="text-[var(--text-color)]/40 text-xs font-bold italic">Escanea con tu app bancaria para completar el pago</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="lg:col-span-1">
                                        <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-6 md:p-8 rounded-[3rem] sticky top-32">
                                            <h4 className="text-xl font-black italic uppercase mb-6 text-[var(--text-color)]">Resumen Final</h4>
                                            <div className="space-y-3 mb-6 pb-6 border-b border-[var(--border-color)]">
                                                <p className="text-[var(--text-color)]/60 text-sm font-bold">{product.name} x{quantity}</p>
                                                <p className="text-[var(--text-color)]/60 text-sm font-bold">{formData.name}</p>
                                                <p className="text-[var(--text-color)]/60 text-sm font-bold">{formData.city}</p>
                                            </div>
                                            <p className="text-3xl font-black text-xnutra-neon mb-6">Bs. {total}</p>
                                            <button
                                                onClick={handleSubmit}
                                                className="w-full bg-xnutra-neon text-black py-6 rounded-[2rem] font-black text-lg uppercase hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                                            >
                                                Confirmar Pedido <CheckCircle2 size={20} />
                                            </button>
                                            <button
                                                onClick={() => setStep('info')}
                                                className="w-full mt-4 bg-[var(--panel-bg)] border border-[var(--border-color)] text-[var(--text-color)] py-4 rounded-[2rem] font-black text-sm uppercase hover:bg-white/5 transition-all"
                                            >
                                                Volver
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 4: Success */}
                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center max-w-3xl mx-auto py-12"
                                >
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-xnutra-neon/20 flex items-center justify-center mx-auto mb-8 border border-xnutra-neon/30">
                                        <CheckCircle2 className="text-xnutra-neon" size={64} />
                                    </div>
                                    <h3 className="text-4xl md:text-6xl font-black italic mb-6 text-[var(--text-color)] uppercase tracking-tighter">¡Pedido Confirmado!</h3>
                                    <p className="text-xl md:text-2xl text-[var(--text-color)]/70 mb-8 font-bold italic">Tu pedido está siendo procesado</p>

                                    <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-8 md:p-12 rounded-[3rem] mb-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                            <div>
                                                <p className="text-[var(--text-color)]/40 text-xs font-black uppercase tracking-widest mb-2">Número de Orden</p>
                                                <p className="text-2xl font-black italic text-xnutra-neon">XN-{Math.floor(Math.random() * 10000)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[var(--text-color)]/40 text-xs font-black uppercase tracking-widest mb-2">Total Pagado</p>
                                                <p className="text-2xl font-black italic text-[var(--text-color)]">Bs. {total}</p>
                                            </div>
                                            <div className="col-span-full">
                                                <p className="text-[var(--text-color)]/40 text-xs font-black uppercase tracking-widest mb-2">Envío a</p>
                                                <p className="text-lg font-bold text-[var(--text-color)]">{formData.address}, {formData.city}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-[var(--text-color)]/60 text-sm md:text-base font-medium mb-8">
                                        Recibirás un mensaje de confirmación en WhatsApp al <span className="font-black text-xnutra-neon">{formData.phone}</span>
                                    </p>

                                    <button
                                        onClick={onClose}
                                        className="bg-[var(--text-color)] text-[var(--bg-color)] px-12 py-6 rounded-[2rem] font-black text-lg uppercase hover:scale-105 active:scale-95 transition-all shadow-xl"
                                    >
                                        Cerrar
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
