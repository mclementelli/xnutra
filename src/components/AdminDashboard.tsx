import { useState, useEffect } from 'react';
import { Shield, FileText, Download, Plus, Search, Activity, Trash2, MoreVertical, Edit2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContabilidadEntry {
    id: string;
    created_at: string;
    fecha: string;
    producto: string;
    distribuidor: string;
    cantidad: number;
    precio_unitario: number;
    publicidad: number;
    pagos: number;
    notas: string;
}

export const AdminDashboard = () => {
    const [entries, setEntries] = useState<ContabilidadEntry[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    
    const userRole = localStorage.getItem('userRole') || 'distributor';
    const userName = localStorage.getItem('userName') || 'Usuario';

    useEffect(() => {
        fetchData();
        
        const channel = supabase
            .channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'contabilidad' },
                (payload) => {
                    console.log('Realtime change received!', payload);
                    fetchData();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchData = async () => {
        try {
            let query = supabase.from('contabilidad').select('*').order('created_at', { ascending: false });
            
            // Si no es admin, solo ve sus propias filas (opcional, pero pidió que todos vean, solo no puedan editar)
            // Para "Excel compartido", todos ven todo.
            const { data, error } = await query;
            if (error) throw error;
            if (data) setEntries(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const addRow = async () => {
        if (userRole !== 'admin') {
            alert('Solo el Administrador de Producción puede crear nuevas filas.');
            return;
        }
        try {
            const { error } = await supabase.from('contabilidad').insert([{
                fecha: new Date().toISOString().split('T')[0],
                producto: 'Nuevo Producto',
                distribuidor: 'PierLuigi', // default
                cantidad: 0,
                precio_unitario: 0,
                publicidad: 0,
                pagos: 0,
                notas: ''
            }]);
            if (error) throw error;
        } catch (error) {
            console.error('Error adding row:', error);
            alert('Asegúrate de haber creado la tabla en Supabase.');
        }
    };

    const deleteRow = async (id: string) => {
        if (userRole !== 'admin') return;
        if (!window.confirm('¿Estás seguro de que deseas eliminar este registro de contabilidad permanentemente?')) return;
        
        try {
            setEntries(entries.filter(e => e.id !== id));
            const { error } = await supabase.from('contabilidad').delete().eq('id', id);
            if (error) throw error;
        } catch (error) {
            console.error('Error deleting row:', error);
            fetchData();
        }
    };

    const updateField = async (id: string, field: keyof ContabilidadEntry, value: any) => {
        try {
            // Optimistic update
            setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
            
            const { error } = await supabase
                .from('contabilidad')
                .update({ [field]: value })
                .eq('id', id);
                
            if (error) throw error;
        } catch (error) {
            console.error('Error updating field:', error);
            fetchData(); // revert
        }
    };

    // Filter
    const filteredEntries = entries.filter(item => 
        item.producto.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.distribuidor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fecha.includes(searchTerm)
    );

    return (
        <div className="max-w-[1600px] mx-auto px-10 py-20 min-h-screen transition-colors duration-300">
            {/* Header del Dashboard */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-10">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-xnutra-neon/20 flex items-center justify-center border border-xnutra-neon/30 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                        <Shield className="text-xnutra-neon" size={32} />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none mb-2 text-[var(--text-color)]">CENTRO <span className="text-[var(--text-color)]/40">NEURONAL</span></h1>
                        <p className="text-[10px] text-xnutra-neon/60 font-black tracking-[0.4em] uppercase">
                            CONTABILIDAD EN TIEMPO REAL - MODO {userRole === 'admin' ? 'PRODUCCIÓN (ADMIN)' : 'DISTRIBUIDOR'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabla Principal */}
            <div className="bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-[3rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
                {/* Controles de la tabla */}
                <div className="p-8 border-b border-[var(--border-color)] bg-[var(--text-color)]/[0.02] flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--text-color)]/20" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por producto, fecha o distribuidor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl py-3 pl-14 pr-6 text-xs font-bold text-[var(--text-color)] outline-none focus:border-xnutra-neon transition-all placeholder:text-[var(--text-color)]/20"
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {userRole === 'admin' && (
                            <button onClick={addRow} className="flex items-center gap-2 px-6 py-3 bg-[var(--panel-bg)] border border-[var(--border-color)] rounded-2xl text-[10px] font-black uppercase text-[var(--text-color)] hover:border-xnutra-neon hover:text-xnutra-neon transition-all w-full md:w-auto justify-center shadow-md">
                                <Plus size={16} /> Nueva Fila
                            </button>
                        )}
                        <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-3 bg-xnutra-neon text-black rounded-2xl text-[10px] font-black uppercase hover:bg-white transition-all shadow-lg w-full md:w-auto justify-center">
                            <Download size={16} /> Exportar
                        </button>
                    </div>
                </div>

                {/* Contenedor desplazable de la tabla */}
                <div className="overflow-x-auto min-h-[500px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-64 text-[var(--text-color)]/40">
                            <Activity className="animate-spin mr-3" size={24} /> Sincronizando Nube...
                        </div>
                    ) : (
                        <table className="w-full text-left whitespace-nowrap">
                            <thead>
                                <tr className="text-[10px] font-black uppercase text-[var(--text-color)]/40 tracking-[0.2em] border-b border-[var(--border-color)] bg-[var(--panel-bg)]">
                                    <th className="px-6 py-5 border-r border-[var(--border-color)] w-24">Fecha</th>
                                    <th className="px-6 py-5 border-r border-[var(--border-color)]">Producto</th>
                                    <th className="px-6 py-5 border-r border-[var(--border-color)]">Distribuidor</th>
                                    <th className="px-6 py-5 border-r border-[var(--border-color)] text-right">Cant. Entregada</th>
                                    <th className="px-6 py-5 border-r border-[var(--border-color)] text-right">Precio Unit. (Bs)</th>
                                    <th className="px-6 py-5 border-r border-[var(--border-color)] text-right text-red-500/80">A Pagar (Bs)</th>
                                    <th className="px-6 py-5 border-r border-[var(--border-color)] text-right text-yellow-500/80">Publicidad (Bs)</th>
                                    <th className="px-6 py-5 border-r border-[var(--border-color)] text-right text-green-500/80">Pagos (Bs)</th>
                                    <th className="px-6 py-5 border-r border-[var(--border-color)] text-right text-orange-500/80 font-bold">Saldo Pendiente (Bs)</th>
                                    <th className="px-6 py-5">Notas</th>
                                    <th className="px-6 py-5 border-l border-[var(--border-color)]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)] text-sm font-medium text-[var(--text-color)]">
                                {filteredEntries.map((item) => {
                                    const aPagar = (item.cantidad * item.precio_unitario);
                                    const saldo = aPagar - item.publicidad - item.pagos;

                                    return (
                                        <tr key={item.id} className="hover:bg-[var(--text-color)]/[0.02] transition-colors group">
                                            {/* Fecha - Admin */}
                                            <td className="px-2 py-2 border-r border-[var(--border-color)]">
                                                <input 
                                                    type="date"
                                                    value={item.fecha}
                                                    onChange={(e) => updateField(item.id, 'fecha', e.target.value)}
                                                    disabled={userRole !== 'admin'}
                                                    className="w-full bg-transparent outline-none disabled:opacity-50 font-mono text-xs px-2"
                                                />
                                            </td>
                                            
                                            {/* Producto - Admin */}
                                            <td className="px-2 py-2 border-r border-[var(--border-color)]">
                                                <input 
                                                    type="text"
                                                    value={item.producto}
                                                    onChange={(e) => updateField(item.id, 'producto', e.target.value)}
                                                    disabled={userRole !== 'admin'}
                                                    className="w-full bg-transparent outline-none disabled:opacity-50 font-bold px-2 hover:bg-white/5 focus:bg-white/10 rounded"
                                                />
                                            </td>

                                            {/* Distribuidor - Admin */}
                                            <td className="px-2 py-2 border-r border-[var(--border-color)]">
                                                <select 
                                                    value={item.distribuidor}
                                                    onChange={(e) => updateField(item.id, 'distribuidor', e.target.value)}
                                                    disabled={userRole !== 'admin'}
                                                    className="w-full bg-transparent outline-none disabled:opacity-50 font-bold px-2 text-[var(--text-color)] appearance-none"
                                                >
                                                    <option value="PierLuigi" className="bg-black">PierLuigi</option>
                                                    <option value="Ronald" className="bg-black">Ronald</option>
                                                    <option value="Roxana" className="bg-black">Roxana</option>
                                                    <option value="Almacén Central" className="bg-black">Almacén Central</option>
                                                </select>
                                            </td>

                                            {/* Cantidad - Admin */}
                                            <td className="px-2 py-2 border-r border-[var(--border-color)] text-right">
                                                <input 
                                                    type="number"
                                                    value={item.cantidad}
                                                    onChange={(e) => updateField(item.id, 'cantidad', parseFloat(e.target.value) || 0)}
                                                    disabled={userRole !== 'admin'}
                                                    className="w-full bg-transparent outline-none disabled:opacity-50 font-mono text-right text-xnutra-neon px-2 hover:bg-white/5 focus:bg-white/10 rounded"
                                                />
                                            </td>

                                            {/* Precio Unitario - Admin */}
                                            <td className="px-2 py-2 border-r border-[var(--border-color)] text-right">
                                                <input 
                                                    type="number"
                                                    value={item.precio_unitario}
                                                    onChange={(e) => updateField(item.id, 'precio_unitario', parseFloat(e.target.value) || 0)}
                                                    disabled={userRole !== 'admin'}
                                                    className="w-20 bg-transparent outline-none disabled:opacity-50 font-mono text-right px-2 hover:bg-white/5 focus:bg-white/10 rounded"
                                                />
                                            </td>

                                            {/* A Pagar - Calculado */}
                                            <td className="px-4 py-4 border-r border-[var(--border-color)] text-right font-mono text-red-400 bg-red-500/5">
                                                {aPagar.toLocaleString()}
                                            </td>

                                            {/* Publicidad - Distribuidor */}
                                            <td className="px-2 py-2 border-r border-[var(--border-color)] text-right bg-yellow-500/5">
                                                <input 
                                                    type="number"
                                                    value={item.publicidad}
                                                    onChange={(e) => updateField(item.id, 'publicidad', parseFloat(e.target.value) || 0)}
                                                    disabled={userRole === 'admin'}
                                                    className="w-24 bg-transparent outline-none disabled:opacity-50 font-mono text-yellow-400 text-right px-2 hover:bg-white/5 focus:bg-white/10 rounded"
                                                />
                                            </td>

                                            {/* Pagos - Distribuidor */}
                                            <td className="px-2 py-2 border-r border-[var(--border-color)] text-right bg-green-500/5">
                                                <input 
                                                    type="number"
                                                    value={item.pagos}
                                                    onChange={(e) => updateField(item.id, 'pagos', parseFloat(e.target.value) || 0)}
                                                    disabled={userRole === 'admin'}
                                                    className="w-24 bg-transparent outline-none disabled:opacity-50 font-mono text-green-400 text-right px-2 hover:bg-white/5 focus:bg-white/10 rounded"
                                                />
                                            </td>

                                            {/* Saldo Pendiente - Calculado */}
                                            <td className={`px-4 py-4 border-r border-[var(--border-color)] text-right font-mono font-black ${saldo > 0 ? 'text-orange-400 bg-orange-500/10' : saldo < 0 ? 'text-xnutra-neon bg-xnutra-neon/10' : 'text-green-500 bg-green-500/10'}`}>
                                                {saldo.toLocaleString()}
                                            </td>

                                            {/* Notas - Ambos */}
                                            <td className="px-2 py-2">
                                                <input 
                                                    type="text"
                                                    value={item.notas}
                                                    onChange={(e) => updateField(item.id, 'notas', e.target.value)}
                                                    className="w-full min-w-[200px] bg-transparent outline-none italic text-[var(--text-color)]/60 px-2 hover:bg-white/5 focus:bg-white/10 rounded"
                                                    placeholder="Añadir nota..."
                                                />
                                            </td>

                                            {/* Acciones */}
                                            <td className="px-4 py-2 border-l border-[var(--border-color)] text-center relative">
                                                <button 
                                                    onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                                    className="p-2 text-[var(--text-color)]/40 hover:text-[var(--text-color)] hover:bg-white/5 rounded-xl transition-all"
                                                >
                                                    <MoreVertical size={16} />
                                                </button>
                                                
                                                {openMenuId === item.id && (
                                                    <div className="absolute right-12 top-6 mt-1 w-32 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl shadow-2xl z-[100] overflow-hidden">
                                                        <button 
                                                            onClick={() => {
                                                                setOpenMenuId(null);
                                                                // No necesitamos hacer nada extra porque la edición ya es en línea.
                                                                // Solo sirve como indicador visual.
                                                            }}
                                                            className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-white/5 text-[var(--text-color)] flex items-center gap-2"
                                                        >
                                                            <Edit2 size={14} /> Editar
                                                        </button>
                                                        {userRole === 'admin' && (
                                                            <button 
                                                                onClick={() => { 
                                                                    setOpenMenuId(null); 
                                                                    deleteRow(item.id); 
                                                                }}
                                                                className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-red-500/10 text-red-500 flex items-center gap-2 border-t border-[var(--border-color)]"
                                                            >
                                                                <Trash2 size={14} /> Eliminar
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {entries.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={10} className="px-8 py-10 text-center text-[var(--text-color)]/40 italic">
                                            No hay registros en la base de datos. Pídele al Administrador de Producción que cree una nueva fila.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};
