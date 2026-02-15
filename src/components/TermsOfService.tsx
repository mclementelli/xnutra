import { motion } from 'framer-motion';
import { FileCheck, ShoppingBag, RefreshCw, AlertTriangle, Scale, MapPin } from 'lucide-react';

export const TermsOfService = () => {
    const sections = [
        {
            icon: <FileCheck className="text-xnutra-neon" size={24} />,
            title: "Aceptación de Términos",
            content: "Al acceder y utilizar el sitio web de XNutra Solutions, aceptas estar sujeto a estos Términos de Uso y a todas las leyes y regulaciones aplicables en Bolivia. Si no estás de acuerdo con alguno de estos términos, no debes utilizar nuestro sitio web ni adquirir nuestros productos."
        },
        {
            icon: <ShoppingBag className="text-xnutra-neon" size={24} />,
            title: "Productos y Servicios",
            content: "Todos los productos ofrecidos por XNutra Solutions son suplementos naturales de grado concentrado. Nos esforzamos por proporcionar descripciones precisas de nuestros productos, incluyendo ingredientes, concentraciones (800mg por cápsula), y beneficios esperados. Los resultados pueden variar según el metabolismo individual."
        },
        {
            icon: <RefreshCw className="text-xnutra-neon" size={24} />,
            title: "Política de Devoluciones",
            content: "Ofrecemos una garantía de satisfacción de 14 días. Si no estás completamente satisfecho con tu compra, puedes solicitar un reembolso completo dentro de este período. El producto debe estar en su empaque original y sin abrir. Los gastos de envío no son reembolsables. Contacta nuestro servicio al cliente para iniciar el proceso de devolución."
        },
        {
            icon: <AlertTriangle className="text-xnutra-neon" size={24} />,
            title: "Limitación de Responsabilidad",
            content: "XNutra Solutions no se hace responsable por reacciones adversas o efectos secundarios derivados del uso inadecuado de nuestros productos. Nuestros suplementos no están destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad. Consulta a un profesional de la salud antes de usar si tienes condiciones médicas preexistentes o estás tomando medicamentos."
        },
        {
            icon: <Scale className="text-xnutra-neon" size={24} />,
            title: "Propiedad Intelectual",
            content: "Todo el contenido de este sitio web, incluyendo textos, gráficos, logos, imágenes, y software, es propiedad de XNutra Solutions y está protegido por las leyes de propiedad intelectual de Bolivia. No está permitida la reproducción, distribución o modificación sin autorización previa por escrito."
        },
        {
            icon: <MapPin className="text-xnutra-neon" size={24} />,
            title: "Jurisdicción y Ley Aplicable",
            content: "Estos Términos de Uso se rigen por las leyes de Bolivia. Cualquier disputa relacionada con estos términos o el uso de nuestros servicios será resuelta en los tribunales competentes de Bolivia. XNutra Solutions opera principalmente en Cochabamba, Santa Cruz, La Paz, y El Alto."
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
                        <FileCheck className="text-xnutra-neon" size={40} />
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-[var(--text-color)] uppercase">
                            Términos de <span className="text-xnutra-neon">Uso</span>
                        </h1>
                    </div>
                    <p className="text-[var(--text-color)]/60 text-lg md:text-xl font-bold italic max-w-3xl mx-auto">
                        Condiciones generales para el uso de nuestros servicios y la adquisición de productos XNutra.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <div className="h-1 w-20 bg-xnutra-neon/50" />
                        <span className="text-[var(--text-color)]/40 text-xs font-black uppercase tracking-widest">
                            Vigente desde: Enero 2026
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
                        XNutra Solutions se reserva el derecho de modificar estos Términos de Uso en cualquier momento.
                        El uso continuado del sitio después de cambios constituye la aceptación de los nuevos términos.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
