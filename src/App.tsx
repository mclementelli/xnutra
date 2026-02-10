import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShoppingCart, User, Menu, Shield, Lock, Sun, Moon, X } from 'lucide-react';
import { Vitrina, ClinicalSheet } from './components/Vitrina'
import { MedMatch } from './components/MedMatch'
import { AdminDashboard } from './components/AdminDashboard'
import { Login } from './components/Login'
import { Checkout } from './components/Checkout'
import { NewsSection } from './components/NewsSection'
import { Footer } from './components/Footer'

function App() {
    const [activeTab, setActiveTab] = useState('vitrina');
    const [user, setUser] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [showCheckout, setShowCheckout] = useState(false);
    const [showClinical, setShowClinical] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Manejo de Tema (Claro/Oscuro)
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Funciones globales para exponer a componentes hijos (MedMatch/Vitrina)
    useEffect(() => {
        (window as any).openCheckout = (product: any) => {
            setSelectedProduct(product);
            setShowCheckout(true);
        };
        (window as any).openClinical = (product: any) => {
            setSelectedProduct(product);
            setShowClinical(true);
        };
    }, []);

    const handleLogin = (userName: string) => {
        setUser(userName);
        setActiveTab('admin');
    };

    const handleLogout = () => {
        setUser(null);
        setActiveTab('vitrina');
    };

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] font-sans selection:bg-xnutra-neon selection:text-black transition-colors duration-300">
            {/* Header / Nav */}
            <nav className="fixed top-0 left-0 w-full z-[100] backdrop-blur-3xl border-b border-[var(--border-color)] bg-[var(--bg-color)]/40">
                <div className="max-w-[1600px] mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-6 cursor-pointer group" onClick={() => setActiveTab('vitrina')}>
                        <div className="flex flex-col">
                            <h1 className="text-lg md:text-3xl font-black tracking-tighter text-[var(--text-color)] leading-[0.85] uppercase italic flex items-center gap-2">
                                XNUTRA <span className="text-xnutra-neon">SOLUTIONS</span>
                            </h1>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="h-[1px] w-10 bg-xnutra-neon/50" />
                                <span className="text-[10px] font-black tracking-[0.5em] text-[var(--text-color)]/40 uppercase italic">
                                    PRECISION BIOTECH
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-12 bg-[var(--panel-bg)] px-10 py-3 rounded-full border border-[var(--border-color)] backdrop-blur-md">
                        {[
                            { id: 'vitrina', label: 'Vitrina', icon: <ShoppingCart size={16} /> },
                            { id: 'medmatch', label: 'MedMatch IA', icon: <Zap size={16} /> },
                            { id: 'admin', label: user ? 'Gestión' : 'Acceso', icon: user ? <Shield size={16} /> : <Lock size={16} /> }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`relative flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === item.id ? 'text-xnutra-neon' : 'text-[var(--text-color)]/40 hover:text-[var(--text-color)]'}`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                                {activeTab === item.id && (
                                    <motion.div
                                        layoutId="nav_underline"
                                        className="absolute -bottom-4 left-0 w-full h-[2px] bg-xnutra-neon shadow-[0_4px_10px_#00f2ff]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-3 rounded-xl bg-[var(--panel-bg)] border border-[var(--border-color)] text-xnutra-neon hover:scale-110 active:scale-95 transition-all"
                            title={theme === 'dark' ? 'Activar Modo Claro' : 'Activar Modo Oscuro'}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-xl text-[9px] font-black uppercase tracking-widest text-[var(--text-color)]/60 hover:text-[var(--text-color)] transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <button
                                onClick={() => setActiveTab('admin')}
                                className="p-4 bg-xnutra-neon text-black rounded-2xl hover:scale-110 active:scale-90 transition-all shadow-[0_0_30px_rgba(0,242,255,0.3)]"
                            >
                                <User size={24} />
                            </button>
                        )}
                        <Menu
                            size={28}
                            className="lg:hidden cursor-pointer hover:text-xnutra-neon transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        />
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[var(--panel-bg)] border-l border-[var(--border-color)] shadow-2xl p-8 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-xnutra-neon font-black tracking-[0.2em] uppercase text-sm">Menú</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/10 text-[var(--text-color)] transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {[
                                    { id: 'vitrina', label: 'Vitrina', icon: <ShoppingCart size={20} /> },
                                    { id: 'medmatch', label: 'MedMatch IA', icon: <Zap size={20} /> },
                                    { id: 'admin', label: user ? 'Gestión' : 'Acceso', icon: user ? <Shield size={20} /> : <Lock size={20} /> }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] p-4 rounded-xl transition-all ${activeTab === item.id
                                            ? 'bg-xnutra-neon/20 text-xnutra-neon border border-xnutra-neon/50'
                                            : 'text-[var(--text-color)]/60 hover:text-[var(--text-color)] hover:bg-white/5'
                                            }`}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-auto pt-8 border-t border-[var(--border-color)]">
                                <p className="text-[10px] text-[var(--text-color)]/30 font-black uppercase tracking-widest text-center">
                                    XNutra v4.4.1 Mobile
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="pt-24 min-h-screen">
                <AnimatePresence mode="wait">
                    {activeTab === 'vitrina' && (
                        <motion.div key="vitrina" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div id="vitrina">
                                <Vitrina />
                            </div>
                            <div id="noticias">
                                <NewsSection />
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'medmatch' && (
                        <motion.div key="medmatch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div id="medmatch">
                                <MedMatch />
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'admin' && (
                        <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {user ? <AdminDashboard /> : <Login onLogin={handleLogin} />}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Modales Globales */}
            <AnimatePresence>
                {showCheckout && selectedProduct && (
                    <Checkout product={selectedProduct} onClose={() => setShowCheckout(false)} />
                )}
                {showClinical && selectedProduct && (
                    <ClinicalSheet product={selectedProduct} onClose={() => setShowClinical(false)} />
                )}
            </AnimatePresence>

            <Footer />
        </div>
    )
}

export default App
