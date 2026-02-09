import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Activity, ArrowRight, User, Key } from 'lucide-react';

interface LoginProps {
    onLogin: (user: string) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulación de autenticación biométrica/segura
        setTimeout(() => {
            setLoading(false);
            if (email === 'admin@xnutra.com' && password === 'admin123') {
                onLogin('Administrador');
            } else {
                alert('Credenciales de grado científico rechazadas.');
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-color)] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-xnutra-neon/10 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-[var(--panel-bg)] backdrop-blur-2xl border border-[var(--border-color)] rounded-[3rem] p-12 shadow-[0_0_100px_rgba(0,0,0,0.4)]">
                    <div className="flex flex-col items-center mb-12">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-xnutra-neon blur-xl opacity-20 animate-pulse" />
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-xnutra-neon to-blue-600 flex items-center justify-center text-black shadow-2xl relative z-10">
                                <Shield size={40} />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black italic text-[var(--text-color)] uppercase tracking-tighter text-center leading-none">
                            ACCESO AL <br />
                            <span className="text-xnutra-neon underline decoration-xnutra-neon/30 decoration-4">CENTRO NEURONAL</span>
                        </h2>
                        <p className="text-[var(--text-color)]/40 text-[9px] font-black uppercase tracking-[0.4em] mt-4">Protocolo de Identidad XNutra 2026</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xnutra-neon text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-2 ml-2">
                                <User size={12} /> ID de Operador
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ADMIN@XNUTRA.COM"
                                className="w-full bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-5 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none transition-all placeholder:text-[var(--text-color)]/10 uppercase"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xnutra-neon text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-2 ml-2">
                                <Key size={12} /> Código Encriptado
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-5 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none transition-all placeholder:text-[var(--text-color)]/10"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full group relative overflow-hidden bg-[var(--text-color)] text-[var(--bg-color)] py-6 rounded-2xl font-black text-xs uppercase transition-all shadow-2xl flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-wait' : 'hover:bg-xnutra-neon hover:text-black hover:scale-[1.02] active:scale-95'}`}
                        >
                            {loading ? (
                                <Activity size={20} className="animate-spin" />
                            ) : (
                                <>
                                    Autenticar Identidad
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 flex flex-col items-center gap-6 opacity-20 text-[var(--text-color)]">
                        <div className="h-[1px] w-full bg-[var(--border-color)]" />
                        <div className="flex items-center gap-4">
                            <Lock size={14} />
                            <span className="text-[8px] font-black uppercase tracking-widest italic">Seguridad de Grado Militar SSL-256</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
