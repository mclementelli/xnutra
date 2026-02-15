import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Mail, Phone } from 'lucide-react';

export const PrivacyPolicy = () => {
    const sections = [
        {
            icon: <FileText className="text-xnutra-neon" size={24} />,
            title: "Recopilación de Información",
            content: "En XNutra Solutions recopilamos información personal cuando realizas un pedido, te registras en nuestro sitio, o te suscribes a nuestro boletín. La información recopilada incluye: nombre completo, dirección de correo electrónico, número de teléfono, dirección de envío, y datos de pago (procesados de forma segura)."
        },
        {
            icon: <Lock className="text-xnutra-neon" size={24} />,
            title: "Uso de la Información",
            content: "Utilizamos tu información personal para: procesar y enviar tus pedidos, comunicarnos contigo sobre tu compra, mejorar nuestros productos y servicios, enviar correos promocionales (solo si aceptaste recibirlos), y cumplir con requisitos legales y regulatorios en Bolivia."
        },
        {
            icon: <Shield className="text-xnutra-neon" size={24} />,
            title: "Protección de Datos",
            content: "Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. Utilizamos encriptación SSL para todas las transacciones y almacenamos datos en servidores seguros con acceso restringido."
        },
        {
            icon: <Eye className="text-xnutra-neon" size={24} />,
            title: "Tus Derechos",
            content: "Tienes derecho a: acceder a tu información personal, solicitar corrección de datos inexactos, solicitar la eliminación de tus datos, oponerte al procesamiento de tu información, y retirar tu consentimiento en cualquier momento. Para ejercer estos derechos, contáctanos a través de nuestros canales oficiales."
        },
        {
            icon: <Mail className="text-xnutra-neon" size={24} />,
            title: "Cookies y Tecnologías",
            content: "Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web, analizar el tráfico, y personalizar el contenido. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades del sitio."
        },
        {
            icon: <Phone className="text-xnutra-neon" size={24} />,
            title: "Contacto",
            content: "Si tienes preguntas sobre nuestra Política de Privacidad o el manejo de tus datos personales, puedes contactarnos a través de WhatsApp, correo electrónico, o nuestras redes sociales oficiales. Nos comprometemos a responder todas las consultas en un plazo máximo de 48 horas."
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-color)] py-32 px-6 md:px-10">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <Shield className="text-xnutra-neon" size={40} />
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-[var(--text-color)] uppercase">
                            Políticas de <span className="text-xnutra-neon">Privacidad</span>
                        </h1>
                    </div>
                    <p className="text-[var(--text-color)]/60 text-lg md:text-xl font-bold italic max-w-3xl mx-auto">
                        Tu privacidad es nuestra prioridad. Conoce cómo protegemos y utilizamos tu información personal.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <div className="h-1 w-20 bg-xnutra-neon/50" />
                        <span className="text-[var(--text-color)]/40 text-xs font-black uppercase tracking-widest">
                            Última actualización: Febrero 2026
                        </span>
                        <div className="h-1 w-20 bg-xnutra-neon/50" />
                    </div>
                </motion.div>

                {/* Sections */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[var(--panel-bg)] border border-[var(--border-color)] p-8 md:p-12 rounded-[3rem] hover:border-xnutra-neon/30 transition-all"
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-xnutra-neon/10 border border-xnutra-neon/30 flex items-center justify-center shrink-0">
                                    {section.icon}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-[var(--text-color)] mb-4">
                                        {section.title}
                                    </h2>
                                    <p className="text-[var(--text-color)]/70 text-base md:text-lg leading-relaxed font-medium">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 p-8 bg-xnutra-neon/10 border border-xnutra-neon/30 rounded-[3rem] text-center"
                >
                    <p className="text-[var(--text-color)] text-sm md:text-base font-bold italic">
                        XNutra Solutions se reserva el derecho de actualizar esta Política de Privacidad en cualquier momento.
                        Te notificaremos sobre cambios significativos a través de nuestro sitio web o por correo electrónico.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
