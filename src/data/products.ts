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
    clinicalProfile?: {
        type: 'header' | 'paragraph' | 'point' | 'list-item';
        title?: string;
        content: string;
    }[];
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
        clinicalProfile: [
            { type: 'header', content: '¿Cómo funciona TestoMax?' },
            { type: 'paragraph', content: 'TestoMax trabaja en 4 áreas que muchos hombres comienzan a sentir afectadas con el estrés, la edad y el desgaste físico diario:' },
            { type: 'point', title: '1. Más energía y fuerza física', content: 'Ingredientes como la Maca y el Tribulus ayudan al cuerpo a recuperar energía, mejorar el rendimiento físico y disminuir la sensación de agotamiento constante.' },
            { type: 'point', title: '2. Mejor aprovechamiento de la testosterona natural', content: 'Con el tiempo, parte de la testosterona del cuerpo deja de ser aprovechada correctamente. La Ortiga ayuda a que una mayor cantidad pueda ser utilizada por el organismo, favoreciendo fuerza, ánimo y rendimiento masculino.' },
            { type: 'point', title: '3. Mejor circulación y rendimiento íntimo', content: 'La Icariina ayuda a mejorar el flujo sanguíneo, especialmente en la zona íntima masculina, favoreciendo erecciones más firmes y una mejor respuesta física.' },
            { type: 'point', title: '4. Menos desgaste físico y estrés', content: 'El Ginseng ayuda al cuerpo a soportar mejor el cansancio físico y mental, mejorando resistencia, recuperación y sensación de vitalidad diaria.' },
            { type: 'paragraph', title: 'En resumen:', content: 'TestoMax fue desarrollado para ayudar al hombre a recuperar energía, rendimiento físico, circulación y vitalidad masculina de forma progresiva y natural.' }
        ],
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
        clinicalProfile: [
            { type: 'header', content: '¿Cómo funciona Siluetta?' },
            { type: 'paragraph', content: 'Siluetta ayuda al cuerpo a controlar el apetito, utilizar mejor la grasa acumulada y disminuir la sensación de hinchazón desde varios frentes al mismo tiempo.' },
            { type: 'point', title: '1. Ayuda a controlar el hambre y la ansiedad por comer', content: 'El HCA ayuda a disminuir el deseo constante de comer, especialmente antojos de azúcar y comidas altas en carbohidratos. Esto permite que la persona se sienta satisfecha más rápido y coma con más control durante el día.' },
            { type: 'point', title: '2. Ayuda al cuerpo a usar la grasa como energía', content: 'El Té Verde ayuda a acelerar el metabolismo y favorece que el cuerpo utilice más grasa acumulada como fuente de energía, incluso durante actividades normales del día.' },
            { type: 'point', title: '3. Disminuye la hinchazón y la retención de líquidos', content: 'Ingredientes como el Diente de León ayudan al cuerpo a eliminar líquidos retenidos, reduciendo sensación de pesadez, inflamación e hinchazón abdominal.' },
            { type: 'point', title: '4. Mejora la digestión y el tránsito intestinal', content: 'La Cáscara Sagrada ayuda al organismo a mantener un mejor tránsito intestinal, favoreciendo sensación de ligereza y mejorando la eliminación de desechos.' },
            { type: 'paragraph', title: 'En resumen:', content: 'Siluetta ayuda a controlar el apetito, disminuir ansiedad por comer, reducir hinchazón y apoyar la quema de grasa de forma progresiva para ayudar al cuerpo a sentirse más liviano y activo.' }
        ],
        usage: '1 cápsula (800mg) diaria con el desayuno.',
        price: 399,
        image: '/assets/siluetta.png',
        category: 'wellness',
        color: '#d43eff'
    }
];
