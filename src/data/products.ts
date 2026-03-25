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
        tagline: 'RENDIMIENTO Y POTENCIA',
        description: 'Fórmula diseñada para el balance hormonal, rendimiento íntimo y bienestar prostático.',
        ingredients: ['Acerina', 'Ginseng', 'Tribulus', 'Ortiga', 'Maca'],
        formulation: [
            { name: 'Icariina', mg: 5, description: 'Extracto de Epimedium.', benefits: 'Potencia celular y energía.' },
            { name: 'Extracto de Ginseng', mg: 200, description: 'Panax ginseng.', benefits: 'Aumenta la estamina y la resistencia física.' },
            { name: 'Tribulus Terrestre', mg: 400, description: 'Tribulus terrestris.', benefits: 'Optimiza el balance hormonal natural.' },
            { name: 'Raíz de Ortiga', mg: 50, description: 'Urtica dioica.', benefits: 'Apoya el bienestar prostático.' },
            { name: 'Extracto de Maca', mg: 145, description: 'Lepidium meyenii.', benefits: 'Apoya el rendimiento íntimo y energía total.' }
        ],
        scientificProof: 'Incremento documentado en la síntesis de energía celular.',
        usage: '1 cápsula (800mg) diaria.',
        price: 399,
        image: '/assets/testomax.png',
        category: 'performance',
        color: '#ff3e3e'
    },
    {
        id: 'siluetta',
        name: 'Siluetta',
        tagline: 'CONTROL DE PESO Y BIENESTAR',
        description: 'Solución natural que ejerce como apoyo metabólico y promueve el bienestar diario y control del apetito.',
        ingredients: ['Garcinia Cambogia', 'Diente de León', 'Cáscara Sagrada', 'Té Verde'],
        formulation: [
            { name: 'Garcinia Cambogia', mg: 400, description: 'Extracto de fruto.', benefits: 'Control del apetito y apoyo metabólico.' },
            { name: 'Diente de León', mg: 20, description: 'Taraxacum officinale.', benefits: 'Drenante natural que favorece el bienestar diario.' },
            { name: 'Cáscara Sagrada', mg: 250, description: 'Rhamnus purshiana.', benefits: 'Regulador digestivo y apoyo al control de peso.' },
            { name: 'Té Verde', mg: 130, description: 'Camellia sinensis.', benefits: 'Acelerador metabólico para bienestar diario.' }
        ],
        scientificProof: 'Eficacia clínica en la regulación del peso y bienestar corporal.',
        usage: '1 cápsula (800mg) diaria con la cena.',
        price: 399,
        image: '/assets/siluetta.png',
        category: 'wellness',
        color: '#d43eff'
    }
];
