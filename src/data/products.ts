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
            { type: 'header', content: 'Mecanismo de Acción: ¿Cómo funciona TestoMax?' },
            { type: 'paragraph', content: 'El objetivo central de TestoMax es reactivar el sistema natural de producción hormonal del hombre, trabajando en tres frentes específicos:' },
            { type: 'point', title: '1. Estimulación de la Testosterona Natural', content: 'A diferencia de los tratamientos sintéticos, este compuesto utiliza extractos como el Tribulus y la Maca para enviar una señal directa desde el cerebro hacia los testículos. Esto ordena al cuerpo aumentar la fabricación de testosterona propia, mejorando la energía y el rendimiento físico desde la fuente.' },
            { type: 'point', title: '2. Liberación de la Hormona "Bloqueada"', content: 'Mucha de la testosterona que ya circula en tu sangre está "atrapada" por una proteína llamada SHBG, lo que la vuelve inactiva. La Raíz de Ortiga actúa como una llave que libera esa hormona, logrando que haya más testosterona libre y disponible para que los músculos y el organismo puedan utilizarla realmente.' },
            { type: 'point', title: '3. Optimización del Flujo Sanguíneo y Función Eréctil', content: 'Gracias a la Icariina, el suplemento ayuda a relajar los vasos sanguíneos de la zona pélvica. Al mejorar la circulación y los niveles de óxido nítrico, se facilita una respuesta eréctil más firme y constante, corrigiendo problemas de flujo que aparecen con la edad o el estrés.' },
            { type: 'point', title: '4. Recuperación Celular y Protección Prostática', content: 'Finalmente, componentes como el Ginseng actúan como protectores celulares. Ayudan al cuerpo a adaptarse al estrés y reducen el desgaste de los tejidos. Esto no solo mejora la resistencia muscular, sino que ayuda a mantener un equilibrio interno que favorece la salud de la próstata y reduce la inflamación sistémica.' },
            { type: 'paragraph',  title: 'En resumen:', content: 'TestoMax no solo busca subir los niveles de testosterona, sino asegurar que esa hormona esté libre para trabajar, que el flujo sanguíneo sea el adecuado y que el sistema endocrino funcione sin el estrés que lo ralentiza.' }
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
            { type: 'header', content: 'Mecanismo de Acción: ¿Cómo transforma Siluetta tu metabolismo?' },
            { type: 'paragraph', content: 'Siluetta no es un simple quemador de grasa; es un reprogramador metabólico que actúa bajo tres pilares científicos:' },
            { type: 'point', title: '1. Bloqueo de la Fabricación de Grasa (Lipogénesis)', content: 'El componente activo HCA interviene directamente en el hígado para detener la enzima encargada de convertir los carbohidratos en grasa nueva. En lugar de almacenarse, esa energía se envía a tus reservas de glucógeno. Esto genera una señal de saciedad natural en el cerebro, eliminando el hambre ansiosa o "hambre cerebral" desde la raíz.' },
            { type: 'point', title: '2. Activación de la Quema de Grasa Continua (Termogénesis)', content: 'A través de las catequinas del Té Verde, Siluetta mantiene elevados los niveles de noradrenalina en el cuerpo. Esto pone a tus células en un estado de oxidación de grasa constante, obligando a las mitocondrias (las centrales de energía de tus células) a utilizar la grasa acumulada como combustible principal para producir energía (ATP), incluso cuando estás en reposo.' },
            { type: 'point', title: '3. Depuración Linfática y Anti-inflamatoria', content: 'Uno de los mayores obstáculos para bajar de peso es la retención de líquidos y la inflamación interna. El Diente de León y la Cáscara Sagrada actúan como un equipo de limpieza que:' },
            { type: 'list-item', title: 'Elimina el exceso de líquidos:', content: 'Revierte el edema y la hinchazón en los tejidos.' },
            { type: 'list-item', title: 'Depuración Gastrointestinal:', content: 'Optimiza el tránsito y limpia el sistema linfático.' },
            { type: 'list-item', title: 'Homeostasis:', content: 'Restaura el equilibrio para que el cuerpo deje de estar "estancado" y responda mejor a la pérdida de peso.' },
            { type: 'paragraph', title: 'En resumen:', content: 'Siluetta cierra la "fábrica" de grasa nueva, acelera el "horno" celular para quemar la grasa vieja y limpia los "filtros" del cuerpo para eliminar toxinas y líquidos retenidos. Es pasar de un cuerpo que guarda energía a un cuerpo que la libera.' }
        ],
        usage: '1 cápsula (800mg) diaria con la cena.',
        price: 399,
        image: '/assets/siluetta.png',
        category: 'wellness',
        color: '#d43eff'
    }
];
