import { Instagram, Facebook, MessageCircle, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-[var(--bg-color)] py-40 px-6 md:px-10 border-t border-[var(--border-color)] relative overflow-hidden transition-colors duration-300">
            <div className="absolute -right-40 -bottom-40 w-[600px] h-[600px] bg-xnutra-neon/5 blur-[200px] rounded-full pointer-events-none" />

            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                    <div className="lg:col-span-5 space-y-12">
                        <div className="flex items-center gap-6 mb-12">
                            <div className="flex flex-col">
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-[var(--text-color)] leading-none uppercase">XNUTRA <br /><span className="text-xnutra-neon">SOLUTIONS</span></h2>
                                <div className="flex items-center gap-2 mt-4">
                                    <div className="w-2 h-2 rounded-full bg-xnutra-neon animate-pulse" />
                                    <span className="text-[10px] font-black tracking-[0.4em] text-[var(--text-color)]/40 uppercase italic">Bolivia-2026 / Bio-Tech Extraction</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-[var(--text-color)]/60 text-lg font-bold italic max-w-md leading-relaxed uppercase tracking-tighter">
                            Inspiramos confianza mediante la transformación real. Nuestra ciencia no pide permiso, entrega resultados.
                        </p>
                        <div className="flex items-center gap-6">
                            <SocialLink icon={<Instagram />} href="#" />
                            <SocialLink icon={<Facebook />} href="#" />
                            <SocialLink icon={<MessageCircle />} href="#" />
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
                        <FooterGroup title="Ecosistema" links={['Vitrina', 'MedMatch IA', 'Noticias', 'Protocolos']} />
                        <FooterGroup title="Legal" links={['Políticas de Privacidad', 'Términos de Uso', 'Garantía 100%', 'Aviso de Salud']} />
                        <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-[var(--border-color)] pt-10 md:pt-0 md:pl-10">
                            <h4 className="text-xnutra-neon text-[10px] font-black uppercase tracking-[0.5em] mb-8 italic">Desarrollado por</h4>
                            <a
                                href="https://orionix-ai.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex flex-col gap-4"
                            >
                                <div className="flex items-center gap-4 text-[var(--text-color)] font-black italic text-2xl uppercase tracking-tighter group-hover:text-xnutra-neon transition-colors">
                                    ORIONIX-AI <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                                <span className="bg-[var(--panel-bg)] border border-[var(--border-color)] px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-[var(--text-color)]/40 group-hover:bg-white/10 transition-all text-center">
                                    Visitar orionix-ai.com
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-40 pt-12 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
                    <div className="flex items-center gap-10 text-[9px] font-black uppercase tracking-widest text-[var(--text-color)]">
                        <span>© 2026 XNutra BOLIVIA</span>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-xnutra-neon" /> Transacción Segura SSL
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest italic flex-wrap justify-center text-[var(--text-color)]">
                        Cochabamba <span className="text-xnutra-neon">•</span> Santa Cruz <span className="text-xnutra-neon">•</span> La Paz <span className="text-xnutra-neon">•</span> El Alto
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ icon, href }: any) => (
    <a
        href={href}
        className="w-16 h-16 rounded-2xl bg-[var(--panel-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-color)]/40 hover:bg-xnutra-neon hover:text-black hover:border-xnutra-neon hover:scale-110 transition-all duration-300 shadow-xl"
    >
        {icon}
    </a>
);

const FooterGroup = ({ title, links }: any) => {
    const linkRoutes: Record<string, string> = {
        'Vitrina': '#vitrina',
        'MedMatch IA': '#medmatch',
        'Noticias': '#noticias',
        'Protocolos': '#vitrina',
        'Políticas de Privacidad': '#',
        'Términos de Uso': '#',
        'Garantía 100%': '#',
        'Aviso de Salud': '#'
    };

    const handleClick = (e: React.MouseEvent, link: string) => {
        const route = linkRoutes[link];
        if (route && route.startsWith('#') && route !== '#') {
            e.preventDefault();
            const element = document.querySelector(route);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <div className="space-y-8">
            <h4 className="text-[var(--text-color)]/20 text-[10px] font-black uppercase tracking-[0.5em] italic">{title}</h4>
            <ul className="space-y-4">
                {links.map((link: string) => (
                    <li key={link}>
                        <a
                            href={linkRoutes[link] || '#'}
                            onClick={(e) => handleClick(e, link)}
                            className="text-[var(--text-color)]/60 font-black italic uppercase tracking-tighter text-sm hover:text-xnutra-neon transition-colors cursor-pointer"
                        >
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

