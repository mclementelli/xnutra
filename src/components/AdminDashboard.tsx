import { useState } from 'react';
import { Shield, TrendingUp, DollarSign, Search, Plus, FileText, Download, Map as MapIcon, ChevronRight, X } from 'lucide-react';

interface Order {
    id: string;
    customer: string;
    city: string;
    status: 'Pendiente' | 'Enviado' | 'Cobrado';
    amount: number;
    date: string;
    vendedor: string;
    patologia: string;
}

interface Customer {
    id: string;
    name: string;
    email: string;
    city: string;
    purchases: number;
    totalSpent: number;
    status: 'Activo' | 'Premium';
    patologia: string;
}

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'pedidos' | 'clientes' | 'stock' | 'reportes' | 'contabilidad'>('pedidos');
    const [searchTerm, setSearchTerm] = useState('');
    const [showOrderModal, setShowOrderModal] = useState(false);

    const [orders, setOrders] = useState<Order[]>([
        { id: 'ORD-001', customer: 'Juan Pérez', city: 'Santa Cruz', status: 'Pendiente', amount: 350, date: '2026-02-06', vendedor: 'Ronald', patologia: 'Masa Muscular' },
        { id: 'ORD-002', customer: 'María García', city: 'La Paz', status: 'Enviado', amount: 420, date: '2026-02-06', vendedor: 'Ana', patologia: 'Vitalidad' },
        { id: 'ORD-003', customer: 'Carlos Flores', city: 'Cochabamba', status: 'Cobrado', amount: 290, date: '2026-02-05', vendedor: 'Ronald', patologia: 'Quema de Grasa' },
    ]);

    const [customers] = useState<Customer[]>([
        { id: 'CUS-001', name: 'Juan Pérez', email: 'juan@email.com', city: 'Santa Cruz', purchases: 5, totalSpent: 1750, status: 'Premium', patologia: 'Masa Muscular' },
        { id: 'CUS-002', name: 'María García', email: 'maria@email.com', city: 'La Paz', purchases: 3, totalSpent: 1260, status: 'Activo', patologia: 'Vitalidad' },
        { id: 'CUS-003', name: 'Carlos Flores', email: 'carlos@email.com', city: 'Cochabamba', purchases: 1, totalSpent: 290, status: 'Activo', patologia: 'Quema de Grasa' },
    ]);

    const stockItems = [
        { id: 'SKU-TST', product: 'TestoMax Pro', quantity: 45, status: 'Low', max: 300 },
        { id: 'SKU-FIT', product: 'Pills Fitness', quantity: 12, status: 'Critical', max: 400 },
        { id: 'SKU-LIB', product: 'Libifem Balance', quantity: 230, status: 'Optimal', max: 400 },
    ];

    const costs = [
        { label: 'Producción / Insumos', value: 2500, color: '#ff4444' },
        { label: 'Logística / Envíos', value: 850, color: '#ffa000' },
        { label: 'Publicidad IA / Ads', value: 1200, color: '#2979ff' },
        { label: 'Mantenimiento Cloud', value: 450, color: '#00f2ff' }
    ];

    const totalCostsValue = costs.reduce((acc, curr) => acc + curr.value, 0);
    const totalSales = orders.reduce((acc, curr) => acc + curr.amount, 0);

    // KPI Simulations
    const monthlySales = 45200;
    const dailySales = 3500;
    const balance = monthlySales - totalCostsValue;

    const salesByVendedor = orders.reduce((acc: any, curr) => {
        acc[curr.vendedor] = (acc[curr.vendedor] || 0) + curr.amount;
        return acc;
    }, {});

    return (
        <div className="max-w-[1600px] mx-auto px-10 py-20 min-h-screen transition-colors duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-20 gap-10">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-xnutra-neon/20 flex items-center justify-center border border-xnutra-neon/30 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                        <Shield className="text-xnutra-neon" size={32} />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none mb-2 text-[var(--text-color)]">CENTRO <span className="text-[var(--text-color)]/40">NEURONAL</span></h1>
                        <p className="text-[10px] text-xnutra-neon/60 font-black tracking-[0.4em] uppercase">V4.5 GESTIÓN INTEGRAL / STOCK & FINANZAS</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 bg-[var(--panel-bg)] p-2 rounded-[2rem] border border-[var(--border-color)]">
                    {(['pedidos', 'clientes', 'stock', 'reportes', 'contabilidad'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-xnutra-neon text-black shadow-lg' : 'text-[var(--text-color)]/40 hover:text-[var(--text-color)]'}`}
                        >
                            {tab === 'pedidos' ? 'Pedidos' : tab === 'clientes' ? 'Clientes' : tab === 'stock' ? 'Stock' : tab === 'reportes' ? 'BI' : 'Contabilidad'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Métricas Financieras Actualizadas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                <MetricCard label="Ventas Mes" value={`Bs. ${monthlySales.toLocaleString()}`} icon={TrendingUp} color="var(--text-color)" />
                <MetricCard label="Ventas Día" value={`Bs. ${dailySales.toLocaleString()}`} icon={DollarSign} color="#3eff7e" />
                <MetricCard label="Gastos Operativos" value={`Bs. ${totalCostsValue.toLocaleString()}`} icon={FileText} color="#ff4444" />
                <MetricCard label="Balance General" value={`+Bs. ${balance.toLocaleString()}`} icon={Shield} color="#00f2ff" />
            </div>

            {/* Main Interface */}
            <div className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-[4rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
                <div className="p-10 border-b border-[var(--border-color)] bg-[var(--text-color)]/[0.02] flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[var(--text-color)]">
                            {activeTab === 'pedidos' ? 'Logística de Despacho' : activeTab === 'clientes' ? 'Directorio de Clientes' : activeTab === 'stock' ? 'Control de Inventario' : activeTab === 'reportes' ? 'Análisis Estratégico' : 'Balances Financieros'}
                        </h3>
                        {(activeTab === 'pedidos' || activeTab === 'stock') && (
                            <button
                                onClick={() => setShowOrderModal(true)}
                                className="bg-xnutra-neon/20 text-xnutra-neon text-[10px] font-black px-4 py-2 rounded-full uppercase flex items-center gap-2 hover:bg-xnutra-neon hover:text-black transition-all"
                            >
                                <Plus size={14} /> {activeTab === 'stock' ? 'Ajustar Inventario' : 'Nuevo Pedido'}
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--text-color)]/20" size={18} />
                            <input
                                type="text"
                                placeholder="FILTRAR..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl py-4 pl-16 pr-6 text-xs font-bold text-[var(--text-color)] outline-none focus:border-xnutra-neon transition-all placeholder:text-[var(--text-color)]/10"
                            />
                        </div>
                        <button className="flex items-center gap-3 px-6 py-4 bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl text-[10px] font-black uppercase text-[var(--text-color)]/40 hover:text-[var(--text-color)] transition-all">
                            <Download size={16} /> Exportar
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[500px]">
                    {activeTab === 'pedidos' ? (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black uppercase text-[var(--text-color)]/20 tracking-[0.3em] border-b border-[var(--border-color)]">
                                    <th className="px-10 py-6">ID / Fecha</th>
                                    <th className="px-10 py-6">Cliente & Ubicación</th>
                                    <th className="px-10 py-6">Vendedor</th>
                                    <th className="px-10 py-6">Estatus Logístico</th>
                                    <th className="px-10 py-6">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)]">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-[var(--text-color)]/[0.02] transition-colors group">
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className="font-black text-xnutra-neon italic">{order.id}</span>
                                                <span className="text-[9px] text-[var(--text-color)]/40 font-bold uppercase">{order.date}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className="font-black text-[var(--text-color)] italic tracking-tighter uppercase mb-1">{order.customer}</span>
                                                <div className="flex items-center gap-2 text-[10px] text-[var(--text-color)]/30 font-bold">
                                                    <MapIcon size={12} className="text-xnutra-neon" /> {order.city}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="px-3 py-1 bg-[var(--panel-bg)] rounded-lg text-[10px] font-black text-[var(--text-color)]/60">{order.vendedor}</span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === 'Cobrado' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <button className="p-3 bg-[var(--panel-bg)] hover:bg-xnutra-neon hover:text-black rounded-xl transition-all text-[var(--text-color)]">
                                                <ChevronRight size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : activeTab === 'clientes' ? (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black uppercase text-[var(--text-color)]/20 tracking-[0.3em] border-b border-[var(--border-color)]">
                                    <th className="px-10 py-6">Miembro / ID</th>
                                    <th className="px-10 py-6">Patología Base</th>
                                    <th className="px-10 py-6">Ciudad</th>
                                    <th className="px-10 py-6">Frecuencia</th>
                                    <th className="px-10 py-6">Estatus</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)]">
                                {customers.map((cus) => (
                                    <tr key={cus.id} className="hover:bg-[var(--text-color)]/[0.02] transition-colors group">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[var(--panel-bg)] flex items-center justify-center font-black text-xnutra-neon border border-[var(--border-color)]">
                                                    {cus.name[0]}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-[var(--text-color)] italic uppercase">{cus.name}</span>
                                                    <span className="text-[9px] text-[var(--text-color)]/40 font-bold uppercase">{cus.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="text-xnutra-neon text-[10px] font-black italic uppercase tracking-tighter">{cus.patologia}</span>
                                        </td>
                                        <td className="px-10 py-8 font-bold text-sm text-[var(--text-color)]">{cus.city}</td>
                                        <td className="px-10 py-8 font-black italic text-[var(--text-color)]">{cus.purchases} PEDIDOS</td>
                                        <td className="px-10 py-8">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${cus.status === 'Premium' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' : 'bg-[var(--panel-bg)] text-[var(--text-color)]/40'}`}>
                                                {cus.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : activeTab === 'stock' ? (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black uppercase text-[var(--text-color)]/20 tracking-[0.3em] border-b border-[var(--border-color)]">
                                    <th className="px-10 py-6">SKU / Producto</th>
                                    <th className="px-10 py-6">Disponibilidad</th>
                                    <th className="px-10 py-6">Estado de Inventario</th>
                                    <th className="px-10 py-6">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)]">
                                {stockItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-[var(--text-color)]/[0.02] transition-colors group">
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className="font-black text-[var(--text-color)] italic uppercase text-xl mb-1">{item.product}</span>
                                                <span className="text-[9px] text-[var(--text-color)]/40 font-bold uppercase tracking-widest">{item.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-black italic text-[var(--text-color)]">{item.quantity}</span>
                                                <span className="text-[10px] font-bold uppercase text-[var(--text-color)]/40">Unidades</span>
                                            </div>
                                            <div className="w-48 h-1.5 bg-[var(--border-color)] rounded-full mt-2 overflow-hidden">
                                                <div
                                                    className={`h-full ${item.status === 'Critical' ? 'bg-red-500' : item.status === 'Low' ? 'bg-orange-500' : 'bg-green-500'}`}
                                                    style={{ width: `${(item.quantity / item.max) * 100}%` }}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${item.status === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                item.status === 'Low' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                                    'bg-green-500/10 text-green-500 border-green-500/20'
                                                }`}>
                                                {item.status === 'Critical' ? 'Crítico (Reabastecer)' : item.status === 'Low' ? 'Bajo Stock' : 'Stock Saludable'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <button className="px-6 py-3 bg-[var(--text-color)] text-[var(--bg-color)] rounded-xl text-[10px] font-black uppercase hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xnutra-neon/20">
                                                Gestionar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : activeTab === 'contabilidad' ? (
                        <div className="p-20 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-12">
                                <h4 className="text-2xl font-black italic uppercase text-[var(--text-color)] tracking-tighter">DESGLOSE DE <span className="text-red-500">EGRESOS</span></h4>
                                <div className="space-y-8">
                                    {costs.map((cost) => (
                                        <div key={cost.label} className="group">
                                            <div className="flex justify-between items-end mb-4">
                                                <span className="text-xs font-black uppercase text-[var(--text-color)]/40 group-hover:text-[var(--text-color)] transition-colors">{cost.label}</span>
                                                <span className="text-xl font-black text-[var(--text-color)] italic">Bs. {cost.value.toFixed(2)}</span>
                                            </div>
                                            <div className="h-[2px] w-full bg-[var(--border-color)] rounded-full overflow-hidden">
                                                <div className="h-full group-hover:opacity-100 transition-all" style={{ backgroundColor: cost.color, width: `${(cost.value / totalCostsValue) * 100}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pt-8 mt-8 border-t border-[var(--border-color)] flex justify-between items-center text-4xl font-black italic uppercase tracking-tighter">
                                        <span className="text-[var(--text-color)]/20">TOTAL EGRESOS</span>
                                        <span className="text-red-500">Bs. {totalCostsValue.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[var(--text-color)]/[0.03] p-12 rounded-[4rem] border border-[var(--border-color)] flex flex-col justify-between">
                                <div>
                                    <h4 className="text-2xl font-black italic uppercase text-[var(--text-color)] tracking-tighter mb-10">ESTADO DE <span className="text-xnutra-neon">CUENTA REAL</span></h4>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-[var(--text-color)]/20 tracking-widest mb-2 italic">Ingresos Brutos</p>
                                            <p className="text-3xl font-black italic text-[var(--text-color)]">Bs. 34,250</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-[var(--text-color)]/20 tracking-widest mb-2 italic">Impuestos / Fee</p>
                                            <p className="text-3xl font-black italic text-[var(--text-color)]/40">Bs. 4,120</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-xnutra-neon p-12 rounded-[3rem] mt-12">
                                    <p className="text-[10px] font-black uppercase text-black/40 tracking-[0.4em] mb-4 italic">Utilidad Neta Disponible</p>
                                    <p className="text-6xl font-black italic text-black tracking-tighter">Bs. 17,680</p>
                                    <div className="mt-8 flex items-center justify-between">
                                        <span className="px-4 py-2 bg-black/10 rounded-xl text-[10px] font-black uppercase text-black/60 tracking-widest">+ Bs. 2,400 Hoy</span>
                                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors underline underline-offset-4 decoration-2 decoration-black/10">Generar Reporte Fiscal</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="bg-[var(--panel-bg)] p-10 rounded-[3rem] border border-[var(--border-color)]">
                                <h4 className="text-xl font-black italic uppercase mb-8 text-xnutra-neon">Ventas por Vendedor</h4>
                                <div className="space-y-6">
                                    {Object.entries(salesByVendedor).map(([vendedor, monto]: any) => (
                                        <div key={vendedor} className="flex flex-col gap-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-sm font-black uppercase text-[var(--text-color)] italic">{vendedor}</span>
                                                <span className="text-lg font-black text-xnutra-neon">Bs {monto.toFixed(2)}</span>
                                            </div>
                                            <div className="h-2 w-full bg-[var(--border-color)] rounded-full overflow-hidden">
                                                <div className="h-full bg-xnutra-neon" style={{ width: `${(monto / totalSales) * 100}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-[var(--panel-bg)] p-10 rounded-[3rem] border border-[var(--border-color)] flex flex-col justify-center items-center text-center">
                                <MapIcon size={64} className="text-xnutra-neon mb-6 opacity-30" />
                                <h4 className="text-xl font-black italic uppercase mb-4 text-[var(--text-color)]">Mapa de Densidad Bolivia</h4>
                                <p className="text-[var(--text-color)]/40 text-sm font-bold italic mb-8 uppercase tracking-tighter">Zona de mayor impacto: SANTA CRUZ DE LA SIERRA (42%)</p>
                                <button className="px-10 py-4 bg-[var(--text-color)] text-[var(--bg-color)] rounded-2xl font-black text-xs uppercase hover:bg-xnutra-neon hover:text-black transition-all">Abrir Logística Geo-Visual</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Simulado de Nuevo Pedido */}
            {showOrderModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-[var(--bg-color)]/90 backdrop-blur-md">
                    <div className="bg-[var(--bg-color)] border border-[var(--border-color)] w-full max-w-4xl rounded-[4rem] p-16 relative shadow-[0_0_150px_rgba(0,0,0,0.4)]">
                        <button onClick={() => setShowOrderModal(false)} className="absolute top-10 right-10 text-[var(--text-color)]/20 hover:text-[var(--text-color)] transition-colors"><X size={32} /></button>
                        <h2 className="text-5xl font-black italic mb-10 text-[var(--text-color)] uppercase tracking-tighter leading-none">AGENDAR <br /><span className="text-xnutra-neon">NUEVO CLIENTE</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <input placeholder="NOMBRE DEL CLIENTE" className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none placeholder:text-[var(--text-color)]/10" />
                            <input placeholder="WHATSAPP" className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none placeholder:text-[var(--text-color)]/10" />
                            <select className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none appearance-none">
                                <option className="bg-[var(--bg-color)] text-[var(--text-color)]">SELECCIONAR CIUDAD</option>
                                <option className="bg-[var(--bg-color)] text-[var(--text-color)]">SANTA CRUZ</option>
                                <option className="bg-[var(--bg-color)] text-[var(--text-color)]">LA PAZ</option>
                                <option className="bg-[var(--bg-color)] text-[var(--text-color)]">COCHABAMBA</option>
                                <option className="bg-[var(--bg-color)] text-[var(--text-color)]">TARIJA</option>
                            </select>
                            <input placeholder="PATOLOGÍA A TRATAR" className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl p-6 text-[var(--text-color)] font-bold italic focus:border-xnutra-neon outline-none placeholder:text-[var(--text-color)]/10" />
                        </div>
                        <div className="h-64 bg-[var(--panel-bg)] rounded-[2rem] mb-10 flex flex-col items-center justify-center border-2 border-dashed border-[var(--border-color)] hover:border-xnutra-neon transition-all cursor-crosshair group">
                            <MapIcon size={32} className="text-xnutra-neon mb-4 group-hover:scale-125 transition-transform" />
                            <span className="text-[10px] font-black uppercase text-[var(--text-color)]/40 tracking-widest">Haz clic para marcar ubicación exacta</span>
                        </div>
                        <button
                            onClick={() => {
                                const newOrder: Order = {
                                    id: `XN-${Math.floor(Math.random() * 999)}`,
                                    customer: 'Cliente Nuevo',
                                    city: 'S/C',
                                    status: 'Pendiente',
                                    amount: 350,
                                    date: new Date().toISOString().split('T')[0],
                                    vendedor: 'Ronald',
                                    patologia: 'Estandar'
                                };
                                setOrders([newOrder, ...orders]);
                                setShowOrderModal(false);
                            }}
                            className="w-full bg-[var(--text-color)] text-[var(--bg-color)] py-8 rounded-[2.5rem] font-black text-xl uppercase shadow-[0_0_50px_rgba(0,242,255,0.3)] hover:bg-xnutra-neon hover:text-black hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            CREAR PROTOCOLO DE DESPACHO
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const MetricCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-[var(--panel-bg)] backdrop-blur-3xl border border-[var(--border-color)] p-8 rounded-[3rem] relative overflow-hidden group hover:border-xnutra-neon/30 transition-all duration-500 shadow-xl">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon size={120} style={{ color }} />
        </div>
        <div className="relative z-10">
            <div className="text-[var(--text-color)]/40 text-[10px] font-black uppercase tracking-[0.5em] mb-4 italic">{label}</div>
            <div className="text-4xl font-black italic tracking-tighter" style={{ color }}>{value}</div>
            <div className="mt-4 h-1 w-12 bg-[var(--text-color)]/10 group-hover:w-full transition-all duration-700" style={{ backgroundColor: `${color}20` }} />
        </div>
    </div>
);
