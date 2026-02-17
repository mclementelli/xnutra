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
        id: 'testomax',
        name: 'TestoMax',
        tagline: 'VIGOR & POTENCIA CELULAR',
        description: 'Sinergia de extractos andinos de grado farmacéutico que estimula la respuesta hormonal natural a través de la vía del eje hipotalámico.',
        ingredients: ['Icariina', 'Ginseng', 'DHEA', 'Ortiga', 'Maca'],
        formulation: [
            { name: 'Icariina', mg: 150, description: 'Flavonoide bioactivo.', benefits: 'Potencia la síntesis de testosterona y mejora la función eréctil natural.' },
            { name: 'Ginseng', mg: 150, description: 'Adaptógeno revitalizante.', benefits: 'Aumenta la estamina y la resistencia física al esfuerzo prolongado.' },
            { name: 'DHEA', mg: 50, description: 'Precursor hormonal sistémico.', benefits: 'Optimiza el equilibrio endocrino y la regeneración celular.' },
            { name: 'Ortiga', mg: 150, description: 'Extracto de raíz purificado.', benefits: 'Ayuda a liberar la testosterona libre y mejora la salud prostática.' },
            { name: 'Maca', mg: 300, description: 'Concentrado andino premium.', benefits: 'Aumenta la libido y regula la respuesta energética total.' }
        ],
        scientificProof: 'Incremento documentado en la síntesis de energía celular.',
        usage: '1 cápsula (800mg) con abundante agua en la mañana.',
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
        ingredients: ['Garcinia', 'Diente de León', 'Cáscara Sagrada', 'Té Verde'],
        formulation: [
            { name: 'Garcinia', mg: 350, description: 'Ácido hidroxicítrico (HCA).', benefits: 'Bloquea la lipogénesis y controla la ansiedad por carbohidratos.' },
            { name: 'Diente de León', mg: 200, description: 'Drenante natural.', benefits: 'Elimina la retención de líquidos sin desequilibrar los electrolitos.' },
            { name: 'Cáscara Sagrada', mg: 100, description: 'Regulador digestivo.', benefits: 'Optimiza el tránsito intestinal y la detoxificación hepática.' },
            { name: 'Té Verde', mg: 150, description: 'Compuesto termogénico.', benefits: 'Acelera la tasa metabólica basal para quemar grasa en reposo.' }
        ],
        scientificProof: 'Reducción del tejido adiposo mediante activación mitocondrial.',
        usage: '1 cápsula (800mg) antes de entrenar o en la mañana.',
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
        ingredients: ['Ginseng', 'Azafrán', 'Maca', 'Ashwaganda', 'L-Arginina'],
        formulation: [
            { name: 'Ginseng', mg: 200, description: 'Tónico vitalizante.', benefits: 'Reduce la fatiga y mejora la claridad mental bajo estrés.' },
            { name: 'Azafrán', mg: 30, description: 'Fitonutriente anímico.', benefits: 'Equilibra los niveles de serotonina y mitiga los síntomas premestruales.' },
            { name: 'Maca', mg: 250, description: 'Adaptógeno femenino.', benefits: 'Protege la densidad ósea y armoniza el bienestar endocrino.' },
            { name: 'Ashwaganda', mg: 200, description: 'Modulador de cortisol.', benefits: 'Reduce la ansiedad y promueve una relajación profunda y reparadora.' },
            { name: 'L-Arginina', mg: 120, description: 'Aminoácido vasodilatador.', benefits: 'Mejora la sensibilidad y la respuesta física femenina.' }
        ],
        scientificProof: 'Eficacia clínica en la regulación del ciclo y bienestar energético.',
        usage: '1 cápsula (800mg) diaria con la cena.',
        price: 290,
        image: '/assets/libifem.png',
        category: 'hormonal',
        color: '#d43eff'
    }
];
