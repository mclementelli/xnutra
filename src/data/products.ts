export interface Formulation {
    name: string;
    mg: number;
    description: string;
    benefits: string;
}

export interface Product {
    id: string;
    name: string;
    tagline: string;
    description: string;
    ingredients: string[];
    formulation: Formulation[];
    scientificProof?: string;
    usage: string;
    price: number;
    image: string;
    category: 'performance' | 'wellness' | 'hormonal';
    color: string;
}

export const products: Product[] = [
    {
        id: 'v-24',
        name: 'V-24',
        tagline: 'BIOENERGÍA & VASODILATACIÓN TOTAL',
        description: 'Complejo de alta pureza diseñado para la activación del óxido nítrico, permitiendo una entrega masiva de nutrientes mediante micro-cristales de rápida absorción.',
        ingredients: ['Arginina Pura', 'Micro-proteína Hidrolizada', 'Guaraná Amazónico', 'Concentrado de Té Verde'],
        formulation: [
            { name: 'Arginina Pura', mg: 250, description: 'Precursor del óxido nítrico.', benefits: 'Mejora el flujo sanguíneo y la oxigenación muscular inmediata.' },
            { name: 'Micro-proteína Hidrolizada', mg: 400, description: 'Aminoácidos de absorción instantánea.', benefits: 'Acelera la reconstrucción de fibras musculares durante el esfuerzo.' },
            { name: 'Guaraná Amazónico', mg: 150, description: 'Estimulante botánico de liberación lenta.', benefits: 'Mantiene la alerta cognitiva sin causar el efecto "crash" de la cafeína.' },
            { name: 'Concentrado de Té Verde', mg: 50, description: 'Antioxidante de Grado A.', benefits: 'Protege las mitocondrias y previene el envejecimiento celular prematuro.' }
        ],
        scientificProof: 'Protocolos de optimización metabólica (p=0.012).',
        usage: '1 cápsula (850mg) 20 min antes de la actividad.',
        price: 250,
        image: '/assets/v-24.png',
        category: 'performance',
        color: '#00f2ff'
    },
    {
        id: 'testomax',
        name: 'TestoMax',
        tagline: 'VIGOR & POTENCIA CELULAR',
        description: 'Sinergia de extractos andinos de grado farmacéutico que estimula la respuesta hormonal natural a través de la vía del eje hipotalámico.',
        ingredients: ['Maca Negra Concentrada', 'Zinc Biodisponible', 'Magnesio Quelatado', 'Fenogreco Extracto'],
        formulation: [
            { name: 'Maca Negra Concentrada', mg: 450, description: 'Adaptógeno andino premium.', benefits: 'Potencia el equilibrio hormonal y la resistencia física natural.' },
            { name: 'Zinc Biodisponible', mg: 50, description: 'Soporte enzimático crucial.', benefits: 'Indispensable para la síntesis de testosterona y el sistema inmune.' },
            { name: 'Magnesio Quelatado', mg: 250, description: 'Relajante neuromuscular profundo.', benefits: 'Mejora la calidad del sueño y previene calambres bajo estrés.' },
            { name: 'Fenogreco Extracto', mg: 100, description: 'Regulador de fertilidad y potencia.', benefits: 'Optimiza la biodisponibilidad de nutrientes en el eje endocrino.' }
        ],
        scientificProof: 'Incremento documentado en la síntesis de energía celular.',
        usage: '1 cápsula (850mg) con abundante agua en la mañana.',
        price: 320,
        image: '/assets/testomax.png',
        category: 'performance',
        color: '#ff3e3e'
    },
    {
        id: 'pills-fitness',
        name: 'Pills Fitness',
        tagline: 'QUEMA DE GRASA TERMOGÉNICA',
        description: 'Acelerador metabólico que utiliza tecnología de liberación prolongada para asegurar la oxidación de lípidos durante 8 horas continuas.',
        ingredients: ['L-Carnitina USP', 'Cafeína Anhidra', 'Extracto de Té Verde', 'Vinagre de Sidra'],
        formulation: [
            { name: 'L-Carnitina USP', mg: 350, description: 'Vehículo lipídico mitocondrial.', benefits: 'Transforma la grasa acumulada en energía utilizable por los músculos.' },
            { name: 'Cafeína Anhidra', mg: 150, description: 'Acelerador de tasa metabólica.', benefits: 'Aumenta la quema de calorías en reposo y suprime el apetito.' },
            { name: 'Extracto de Té Verde', mg: 200, description: 'Termogénico natural.', benefits: 'Estimula la oxidación de grasas y depura toxinas del organismo.' },
            { name: 'Vinagre de Sidra', mg: 150, description: 'Regulador glucémico.', benefits: 'Estabiliza el azúcar en sangre, evitando la formación de depósitos adiposos.' }
        ],
        scientificProof: 'Reducción del tejido adiposo mediante activación mitocondrial.',
        usage: '1 cápsula (850mg) antes de entrenar o en la mañana.',
        price: 420,
        image: '/assets/pill fitness.png',
        category: 'wellness',
        color: '#3eff7e'
    },
    {
        id: 'libifem',
        name: 'Libifem',
        tagline: 'EQUILIBRIO & VITALIDAD FEMENINA',
        description: 'Regulador hormonal botánico con alta biodisponibilidad, diseñado para restaurar el balance estrogénico y la energía vital.',
        ingredients: ['Extracto de Fenogreco', 'Vitamina B6 Activa', 'Hierro de Alta Absorción', 'Maca Roja'],
        formulation: [
            { name: 'Extracto de Fenogreco', mg: 400, description: 'Fitonutriente hormonal.', benefits: 'Regula el ciclo y mejora el deseo sexual de forma saludable.' },
            { name: 'Vitamina B6 Activa', mg: 50, description: 'Soporte del sistema nervioso.', benefits: 'Reduce la fatiga mental y ayuda al equilibrio emocional.' },
            { name: 'Hierro de Alta Absorción', mg: 100, description: 'Transportador de oxígeno.', benefits: 'Fundamental para mantener la vitalidad y prevenir la anemia.' },
            { name: 'Maca Roja', mg: 300, description: 'Adaptógeno hormonal femenino.', benefits: 'Protege la salud ósea y equilibra el bienestar endocrino.' }
        ],
        scientificProof: 'Eficacia clínica en la regulación del ciclo y bienestar energético.',
        usage: '1 cápsula (850mg) diaria con la cena.',
        price: 290,
        image: '/assets/libifem.png',
        category: 'hormonal',
        color: '#d43eff'
    }
];
