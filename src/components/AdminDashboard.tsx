import { useState, useEffect } from 'react';
import { Shield, Plus, Search, Trash2, Package, UserCheck, X, TrendingUp, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'entregas' | 'inventario' | 'reportes'>('entregas');
    const [deliveries, setDeliveries] = useState<any[]>([]);
    const [payments, setPayments] = useState<any[]>([]);
    const [inventory, setInventory] = useState<any[]>([]);
    const [selectedDist, setSelectedDist] = useState<string | null>(null);
    const [showPayModal, setShowPayModal] = useState(false);
    const [payData, setPayData] = useState({ monto: 0, metodo: 'Efectivo', notas: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAll = async () => {
        const [d, p, i] = await Promise.all([
            supabase.from('contabilidad').select('*').order('fecha', { ascending: false }),
            supabase.from('pagos').select('*').order('fecha', { ascending: false }),
            supabase.from('inventario').select('*').order('producto', { ascending: true })
        ]);
        setDeliveries(d.data || []); 
        setPayments(p.data || []); 
        setInventory(i.data || []);
    };

    useEffect(() => {
        fetchAll();
        const sub = supabase.channel('db-changes').on('postgres_changes', { event: '*', schema: 'public' }, fetchAll).subscribe();
        return () => { supabase.removeChannel(sub); };
    }, []);

    const getBalance = (dist: string) => {
        const totalDel = deliveries.filter(d => d.distribuidor === dist).reduce((a, c) => a + (c.cantidad * (c.precio_unitario || 0)), 0);
        const totalPaid = payments.filter(p => p.distribuidor === dist).reduce((a, c) => a + Number(c.monto), 0);
        const legacy = deliveries.filter(d => d.distribuidor === dist).reduce((a, c) => a + (Number(c.pagos) || 0) + (Number(c.publicidad) || 0), 0);
        return totalDel - totalPaid - legacy;
    };

    const addDelivery = async () => {
        await supabase.from('contabilidad').insert([{ 
            fecha: new Date().toISOString().split('T')[0], 
            producto: 'Nuevo Producto', 
            distribuidor: 'Ronald', 
            cantidad: 1, 
            precio_unitario: 0, 
            notas: 'Tipo: Venta' 
        }]);
    };

    const addPayment = async () => {
        if (!selectedDist) return;
        await supabase.from('pagos').insert([{ 
            fecha: new Date().toISOString().split('T')[0], 
            distribuidor: selectedDist, 
            monto: payData.monto, 
            metodo_pago: payData.metodo, 
            observaciones: payData.notas 
        }]);
        setShowPayModal(false); 
        setPayData({ monto: 0, metodo: 'Efectivo', notas: '' });
    };

    const updateField = async (table: string, id: string, field: string, value: any) => {
        await supabase.from(table).update({ [field]: value }).eq('id', id);
    };

    const filteredDeliveries = deliveries.filter(d => 
        d.producto?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        d.distribuidor?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-[1400px] mx-auto p-4 lg:p-10 min-h-screen text-white font-sans bg-[#0a0a0a]">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                        <Shield className="text-cyan-400" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none">CENTRO <span className="opacity-40">NEURONAL</span></h1>
                        <p className="text-[9px] text-cyan-400/60 font-black uppercase tracking-[0.3em]">V5.0 Logística & Finanzas</p>
                    </div>
                </div>
                <div className="flex bg-gray-900/80 p-1 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl">
                    {(['entregas', 'inventario', 'reportes'] as const).map(t => (
                        <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/20' : 'opacity-40 hover:opacity-100'}`}>{t}</button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-gray-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-md">
                {activeTab === 'entregas' && (
                    <div className="overflow-x-auto min-h-[500px]">
                        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center bg-black/20 gap-4">
                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20" size={16} />
                                <input type="text" placeholder="Filtrar por producto o distribuidor..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl py-2 pl-12 pr-4 text-xs outline-none focus:border-cyan-400/50 transition-all" />
                            </div>
                            <button onClick={addDelivery} className="w-full sm:w-auto px-6 py-2.5 bg-cyan-400 text-black rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-400/10"><Plus size={14} /> Nueva Entrega</button>
                        </div>
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead className="text-[9px] uppercase font-black opacity-30 tracking-widest border-b border-white/5 bg-black/40">
                                <tr>
                                    <th className="p-5">Fecha</th>
                                    <th className="p-5">Producto</th>
                                    <th className="p-5">Distribuidor</th>
                                    <th className="p-5 text-right">Cant</th>
                                    <th className="p-5 text-right">Precio</th>
                                    <th className="p-5 text-right">Total</th>
                                    <th className="p-5 text-center">Gestión</th>
                                    <th className="p-5"></th>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {filteredDeliveries.map(d => (
                                    <tr key={d.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group">
                                        <td className="p-2"><input type="date" value={d.fecha} onChange={e => updateField('contabilidad', d.id, 'fecha', e.target.value)} className="bg-transparent outline-none opacity-60 font-mono w-full px-3 py-2" /></td>
                                        <td className="p-2"><input type="text" value={d.producto} onChange={e => updateField('contabilidad', d.id, 'producto', e.target.value)} className="bg-transparent outline-none font-bold w-full px-3 py-2 focus:bg-white/5 rounded" /></td>
                                        <td className="p-2"><input type="text" value={d.distribuidor} onChange={e => updateField('contabilidad', d.id, 'distribuidor', e.target.value)} className="bg-transparent outline-none w-full px-3 py-2 focus:bg-white/5 rounded" /></td>
                                        <td className="p-2"><input type="number" value={d.cantidad} onChange={e => updateField('contabilidad', d.id, 'cantidad', Number(e.target.value))} className="bg-transparent outline-none text-right font-mono text-cyan-400 w-full px-3 py-2" /></td>
                                        <td className="p-2"><input type="number" value={d.precio_unitario} onChange={e => updateField('contabilidad', d.id, 'precio_unitario', Number(e.target.value))} className="bg-transparent outline-none text-right font-mono w-full px-3 py-2" /></td>
                                        <td className="p-5 text-right font-mono font-black text-cyan-400">{(d.cantidad * (d.precio_unitario || 0)).toLocaleString()}</td>
                                        <td className="p-5 text-center"><button onClick={() => setSelectedDist(d.distribuidor)} className="px-4 py-1.5 bg-white/5 hover:bg-cyan-400/20 hover:text-cyan-400 rounded-lg text-[9px] uppercase font-black transition-all border border-white/5">Ver Cuenta</button></td>
                                        <td className="p-5 text-right"><button onClick={async () => { if(confirm('¿Eliminar?')) await supabase.from('contabilidad').delete().eq('id', d.id); }} className="opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500 transition-all"><Trash2 size={14} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'inventario' && (
                    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {inventory.map(item => (
                            <div key={item.id} className="bg-black/20 p-8 rounded-[2rem] border border-white/5 relative group hover:border-cyan-400/30 transition-all shadow-xl">
                                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-all"><Package size={40} /></div>
                                <h4 className="text-sm font-black italic uppercase mb-1 opacity-50 tracking-widest">{item.producto}</h4>
                                <div className="flex items-end gap-2 mb-6">
                                    <input type="number" value={item.cantidad} onChange={e => updateField('inventario', item.id, 'cantidad', Number(e.target.value))} className="bg-transparent text-5xl font-black text-cyan-400 w-24 outline-none" />
                                    <span className="opacity-30 text-[10px] font-bold uppercase mb-2">Unid</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ width: `${Math.min(item.cantidad, 100)}%` }} />
                                </div>
                                {item.cantidad <= (item.minimo || 10) && <p className="text-[8px] font-black text-red-400 mt-4 uppercase tracking-[0.2em] animate-pulse">⚠️ Stock Bajo</p>}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'reportes' && (
                    <div className="p-10 space-y-10 min-h-[500px]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-black/20 p-6 rounded-3xl border border-white/5"><p className="text-[10px] opacity-40 uppercase font-black mb-1">Ventas Totales</p><p className="text-3xl font-black italic">Bs. {deliveries.reduce((a,c)=>a+(c.cantidad*c.precio_unitario),0).toLocaleString()}</p></div>
                            <div className="bg-black/20 p-6 rounded-3xl border border-white/5"><p className="text-[10px] opacity-40 uppercase font-black mb-1">Recaudación</p><p className="text-3xl font-black italic text-cyan-400">Bs. {payments.reduce((a,c)=>a+Number(c.monto),0).toLocaleString()}</p></div>
                            <div className="bg-black/20 p-6 rounded-3xl border border-white/5"><p className="text-[10px] opacity-40 uppercase font-black mb-1">Cuentas por Cobrar</p><p className="text-3xl font-black italic text-red-400">Bs. {(deliveries.reduce((a,c)=>a+(c.cantidad*c.precio_unitario),0) - payments.reduce((a,c)=>a+Number(c.monto),0)).toLocaleString()}</p></div>
                        </div>
                        <div className="h-64 w-full bg-black/20 rounded-[2rem] border border-white/5 p-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={deliveries.slice(0, 15)}>
                                    <XAxis dataKey="distribuidor" stroke="#333" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ background: '#000', border: '1px solid #222', borderRadius: '12px', fontSize: '10px' }} cursor={{fill: 'transparent'}} />
                                    <Bar dataKey="cantidad" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>

            {/* Account Modal */}
            {selectedDist && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                    <div className="bg-gray-900 border border-white/10 w-full max-w-2xl rounded-[3rem] p-10 relative shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                        <button onClick={() => setSelectedDist(null)} className="absolute top-8 right-8 opacity-40 hover:opacity-100 bg-white/5 p-2 rounded-full transition-all"><X size={20}/></button>
                        <h2 className="text-3xl font-black italic uppercase mb-8 flex items-center gap-4"><UserCheck className="text-cyan-400" size={32} /> {selectedDist}</h2>
                        
                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="bg-black/30 p-8 rounded-3xl border border-white/5 text-center flex flex-col justify-center">
                                <p className="text-[10px] opacity-40 uppercase font-black mb-2 tracking-widest">Saldo Pendiente</p>
                                <p className={`text-4xl font-black italic ${getBalance(selectedDist) > 0 ? 'text-red-400 shadow-[0_0_30px_rgba(248,113,113,0.1)]' : 'text-cyan-400'}`}>Bs. {getBalance(selectedDist).toLocaleString()}</p>
                            </div>
                            <div className="bg-cyan-400 hover:bg-white p-8 rounded-3xl text-center flex flex-col justify-center items-center cursor-pointer transition-all shadow-xl group" onClick={() => setShowPayModal(true)}>
                                <Plus size={24} className="text-black mb-2 group-hover:scale-125 transition-transform" />
                                <span className="text-black font-black uppercase text-xs tracking-tighter">Registrar Pago</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase opacity-30 tracking-[0.3em]">Historial de Cobros</h4>
                            <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
                                {payments.filter(p => p.distribuidor === selectedDist).length === 0 && (
                                    <div className="p-10 text-center text-white/10 italic text-xs">Sin pagos registrados aún.</div>
                                )}
                                {payments.filter(p => p.distribuidor === selectedDist).map(p => (
                                    <div key={p.id} className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/5 transition-all">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black font-mono">{p.fecha}</span>
                                            <span className="text-[9px] opacity-30 uppercase font-bold">{p.metodo_pago}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-cyan-400 font-black text-lg font-mono">Bs. {p.monto.toLocaleString()}</div>
                                            <button onClick={async () => { if(confirm('¿Eliminar pago?')) await supabase.from('pagos').delete().eq('id', p.id); }} className="opacity-0 group-hover:opacity-100 text-red-500/30 hover:text-red-500 transition-all"><Trash2 size={12}/></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Input Modal */}
            {showPayModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
                    <div className="bg-gray-900 border border-white/10 w-full max-w-sm rounded-[3rem] p-10 shadow-2xl">
                        <h3 className="text-2xl font-black italic uppercase mb-8 text-center">Registrar <span className="text-cyan-400">Abono</span></h3>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase opacity-40 block mb-3 text-center">Monto en Bolivianos</label>
                                <input type="number" value={payData.monto} onChange={e => setPayData({...payData, monto: Number(e.target.value)})} className="w-full bg-black/40 border border-cyan-400/20 p-6 rounded-2xl text-4xl font-mono text-cyan-400 font-black text-center outline-none focus:border-cyan-400 transition-all shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" autoFocus />
                            </div>
                            <button onClick={addPayment} className="w-full py-5 bg-cyan-400 text-black font-black uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95 transition-all text-xs">Confirmar Transacción</button>
                            <button onClick={() => setShowPayModal(false)} className="w-full py-2 text-[10px] font-black uppercase opacity-20 hover:opacity-100 transition-all">Regresar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
