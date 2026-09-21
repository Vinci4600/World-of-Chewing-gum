import React, { useState, useMemo } from 'react';
import {
    User,
    Shield,
    Heart,
    MessageSquare,
    Mail,
    Hash,
    Trash2,
    Edit3,
    Save,
    X,
    Plus,
    CheckCircle2,
    Search,
    UserCheck,
    Crown,
    Sparkles,
    Info,
    KeyRound,
    Eye,
    EyeOff,
    Building2,
    Tag,
    SlidersHorizontal,
    ChevronRight,
    Sparkle
} from 'lucide-react';

// Role Enum based on org.example.backend.Model.Role
const Role = {
    ADMIN: 'ADMIN',
    KUNDE: 'KUNDE'
};

/**
 * Mocked Users like Admin
 * @type {{id: number, benutzername: string, email: string, role: string, dtype: string}}
 */
const CURRENT_LOGGED_IN_ADMIN = {
    id: 1,
    benutzername: "admin_master",
    email: "admin.master@gummistore.de",
    role: Role.ADMIN,
    dtype: "Admin"
};

// Mock Backend Database Entities (Single Table Inheritance)
const INITIAL_USERS_DATABASE = [
    {
        id: 1,
        benutzername: "admin_master",
        email: "admin.master@gummistore.de",
        passwort: "$2a$12$eX8mP2zQ9kLsA...",
        role: Role.ADMIN,
        dtype: "Admin",
        kundennummer: null,
        kommentare: [
            { id: 1001, text: "Systemwartung erfolgreich für die neue Kaugummi-Kategorie abgeschlossen.", erstelltAm: "2026-09-18 09:12" },
            { id: 1002, text: "Rabattaktion für Fruchtgummis im September freigeschaltet.", erstelltAm: "2026-09-19 15:40" }
        ],
        favoriten: [
            { id: 1, name: "Spearmint Fresh Extra", geschmack: "Pfefferminze", preis: 1.49, bewertung: 4.8 },
            { id: 3, name: "Bubblegum Retro Classic", geschmack: "Tutti Frutti", preis: 0.99, bewertung: 4.6 }
        ]
    },
    {
        id: 2,
        benutzername: "max_mustermann",
        email: "max.mustermann@web.de",
        passwort: "$2a$12$K1mO9w2pA3xL...",
        role: Role.KUNDE,
        dtype: "Kunde",
        kundennummer: "KD-2026-1049",
        kommentare: [
            { id: 2001, text: "Der Erdbeer-Geschmack ist der absolute Hammer!", erstelltAm: "2026-09-12 11:05" },
            { id: 2002, text: "Lieferung kam super pünktlich an. Danke!", erstelltAm: "2026-09-15 14:20" },
            { id: 2003, text: "Gibt es diese Sorte auch bald in einer Vorratspackung?", erstelltAm: "2026-09-20 08:30" }
        ],
        favoriten: [
            { id: 2, name: "Strawberry Explosion", geschmack: "Erdbeere", preis: 1.29, bewertung: 4.9 },
            { id: 4, name: "Blue Sour Raspberry", geschmack: "Blaubeere / Sauer", preis: 1.59, bewertung: 4.4 },
            { id: 5, name: "Cinnamon Heatwave", geschmack: "Zimt Extra", preis: 1.39, bewertung: 4.1 }
        ]
    },
    {
        id: 3,
        benutzername: "anna_schmidt",
        email: "anna.s@gmx.de",
        passwort: "$2a$12$J93mLxO02PqA...",
        role: Role.KUNDE,
        dtype: "Kunde",
        kundennummer: "KD-2026-2281",
        kommentare: [
            { id: 3001, text: "Kaugummi bleibt beim Kauen erstaunlich lange weich.", erstelltAm: "2026-09-10 16:45" }
        ],
        favoriten: [
            { id: 1, name: "Spearmint Fresh Extra", geschmack: "Pfefferminze", preis: 1.49, bewertung: 4.8 },
            { id: 6, name: "Tropical Mango Splash", geschmack: "Mango / Exotisch", preis: 1.69, bewertung: 4.7 }
        ]
    }
];

export default function Kundenprofil() {
    const [users, setUsers] = useState(INITIAL_USERS_DATABASE);
    const [selectedUserId, setSelectedUserId] = useState(2); // Default to Kunde 'max_mustermann'
    const [activeTab, setActiveTab] = useState('details'); // 'details' | 'favoriten' | 'kommentare'
    const [favoriteFilter, setFavoriteFilter] = useState('');
    const [newCommentInput, setNewCommentInput] = useState('');
    const [showPasswordHash, setShowPasswordHash] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    // Form State for editing customer/user entity
    const [editFormData, setEditFormData] = useState({
        benutzername: '',
        email: '',
        kundennummer: '',
        role: Role.KUNDE
    });

    // Currently inspected profile
    const selectedUser = useMemo(() => {
        return users.find(u => u.id === selectedUserId) || users[0];
    }, [users, selectedUserId]);

    // Status check: Is viewed user equal to logged-in admin?
    const isCurrentLoggedInUser = useMemo(() => {
        return selectedUser.id === CURRENT_LOGGED_IN_ADMIN.id;
    }, [selectedUser]);

    // Filtered favorite bubblegum list
    const filteredFavoriten = useMemo(() => {
        if (!selectedUser.favoriten) return [];
        return selectedUser.favoriten.filter(item =>
            item.name.toLowerCase().includes(favoriteFilter.toLowerCase()) ||
            item.geschmack.toLowerCase().includes(favoriteFilter.toLowerCase())
        );
    }, [selectedUser, favoriteFilter]);

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleStartEditing = () => {
        setEditFormData({
            benutzername: selectedUser.benutzername,
            email: selectedUser.email,
            kundennummer: selectedUser.kundennummer || '',
            role: selectedUser.role
        });
        setIsEditing(true);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setUsers(prevUsers => prevUsers.map(user => {
            if (user.id === selectedUser.id) {
                return {
                    ...user,
                    benutzername: editFormData.benutzername,
                    email: editFormData.email,
                    role: editFormData.role,
                    ...(user.dtype === 'Kunde' ? { kundennummer: editFormData.kundennummer } : {})
                };
            }
            return user;
        }));
        setIsEditing(false);
        triggerToast("Profil-Stammdaten erfolgreich im Backend gespeichert!");
    };

    const handleRemoveFavorite = (favId) => {
        setUsers(prevUsers => prevUsers.map(user => {
            if (user.id === selectedUser.id) {
                return {
                    ...user,
                    favoriten: user.favoriten.filter(f => f.id !== favId)
                };
            }
            return user;
        }));
        triggerToast("Kaugummi aus Favoriten entfernt.");
    };

    const handleDeleteComment = (commentId) => {
        setUsers(prevUsers => prevUsers.map(user => {
            if (user.id === selectedUser.id) {
                return {
                    ...user,
                    kommentare: user.kommentare.filter(c => c.id !== commentId)
                };
            }
            return user;
        }));
        triggerToast("Kommentar erfolgreich moderiert/gelöscht.");
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newCommentInput.trim()) return;

        const newCommentObj = {
            id: Date.now(),
            text: newCommentInput.trim(),
            erstelltAm: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };

        setUsers(prevUsers => prevUsers.map(user => {
            if (user.id === selectedUser.id) {
                return {
                    ...user,
                    kommentare: [newCommentObj, ...(user.kommentare || [])]
                };
            }
            return user;
        }));

        setNewCommentInput('');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 md:p-8">

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-400/30 animate-bounce">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="font-semibold text-sm">{toastMessage}</span>
                </div>
            )}

            <div className="max-w-5xl mx-auto space-y-6">

                {}
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-5 rounded-2xl shadow-xl">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-400 text-xs font-extrabold uppercase tracking-widest">
                            <Shield className="w-4 h-4" /> Admin-Dashboard &bull; Kunden-Entität
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tight mt-1">
                            Kunden- & Benutzerprofil
                        </h1>
                    </div>

                    {/* User Selector Dropdown/Tabs */}
                    <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-2 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 px-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-400" /> Kundenprofil wählen:
            </span>
                        {users.map(u => {
                            const isActive = u.id === selectedUserId;
                            const isCurrentUser = u.id === CURRENT_LOGGED_IN_ADMIN.id;

                            return (
                                <button
                                    key={u.id}
                                    onClick={() => {
                                        setSelectedUserId(u.id);
                                        setIsEditing(false);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                                        isActive
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold'
                                            : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                                    }`}
                                >
                                    {isCurrentUser && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                                    <span>{u.benutzername}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full uppercase font-bold ${
                                        u.dtype === 'Admin'
                                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                    }`}>
                    {u.dtype}
                  </span>
                                </button>
                            );
                        })}
                    </div>
                </header>

                {}
                <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">

                    {/* Active Logged-in Indicator Badge */}
                    {isCurrentLoggedInUser && (
                        <div className="sm:absolute sm:top-6 sm:right-6 mb-4 sm:mb-0 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-inner">
                            <UserCheck className="w-4 h-4 text-amber-400" />
                            <span>Aktuell angemeldetes Admin-Konto</span>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="relative">
                            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-3xl font-black shadow-inner ${
                                selectedUser.dtype === 'Admin'
                                    ? 'bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 ring-4 ring-amber-500/20'
                                    : 'bg-gradient-to-tr from-indigo-500 to-cyan-400 text-slate-950 ring-4 ring-cyan-500/20'
                            }`}>
                                {selectedUser.benutzername.charAt(0).toUpperCase()}
                            </div>
                            <span className={`absolute -bottom-1 -right-1 p-1.5 rounded-2xl border-2 border-slate-900 ${
                                selectedUser.dtype === 'Admin' ? 'bg-amber-400 text-slate-950' : 'bg-cyan-400 text-slate-950'
                            }`}>
                {selectedUser.dtype === 'Admin' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2.5">
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                    {selectedUser.benutzername}
                                </h2>

                                {/* Role Badge */}
                                <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase border ${
                                    selectedUser.role === Role.ADMIN
                                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                        : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                                }`}>
                  {selectedUser.role}
                </span>

                                {/* JPA Inheritance Discriminator */}
                                <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700 font-mono">
                  Entity: {selectedUser.dtype}
                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <a href={`mailto:${selectedUser.email}`} className="hover:text-indigo-300 transition">
                    {selectedUser.email}
                  </a>
                </span>

                                {selectedUser.kundennummer && (
                                    <span className="flex items-center gap-1.5 font-mono text-cyan-300 font-semibold">
                    <Hash className="w-4 h-4 text-cyan-400" />
                    Kundennummer: {selectedUser.kundennummer}
                  </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {}
                <div className="flex border-b border-slate-800 space-x-2">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                            activeTab === 'details'
                                ? 'border-indigo-500 text-indigo-400 bg-slate-900/60 rounded-t-xl'
                                : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        <Info className="w-4 h-4" /> Stammdaten & Details
                    </button>

                    <button
                        onClick={() => setActiveTab('favoriten')}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                            activeTab === 'favoriten'
                                ? 'border-pink-500 text-pink-400 bg-slate-900/60 rounded-t-xl'
                                : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        <Sparkles className="w-4 h-4 text-pink-400" /> Favoriten ({selectedUser.favoriten ? selectedUser.favoriten.length : 0})
                    </button>

                    <button
                        onClick={() => setActiveTab('kommentare')}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                            activeTab === 'kommentare'
                                ? 'border-cyan-500 text-cyan-400 bg-slate-900/60 rounded-t-xl'
                                : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        <MessageSquare className="w-4 h-4 text-cyan-400" /> Kommentare ({selectedUser.kommentare ? selectedUser.kommentare.length : 0})
                    </button>
                </div>

                {}
                {activeTab === 'details' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <Info className="w-5 h-5 text-indigo-400" /> Entity Details (JPA Model)
                                </h3>
                                {!isEditing && (
                                    <button
                                        onClick={handleStartEditing}
                                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-1.5 rounded-lg border border-slate-700 transition flex items-center gap-1.5 font-semibold"
                                    >
                                        <Edit3 className="w-3.5 h-3.5" /> Profil Bearbeiten
                                    </button>
                                )}
                            </div>

                            {isEditing ? (
                                /* Edit Form Mode */
                                <form onSubmit={handleSaveProfile} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-400 mb-1">Benutzername</label>
                                            <input
                                                type="text"
                                                required
                                                value={editFormData.benutzername}
                                                onChange={e => setEditFormData({ ...editFormData, benutzername: e.target.value })}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-400 mb-1">E-Mail Adresse</label>
                                            <input
                                                type="email"
                                                required
                                                value={editFormData.email}
                                                onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedUser.dtype === 'Kunde' && (
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-400 mb-1">Kundennummer (@Column)</label>
                                                <input
                                                    type="text"
                                                    value={editFormData.kundennummer}
                                                    onChange={e => setEditFormData({ ...editFormData, kundennummer: e.target.value })}
                                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                                                />
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-400 mb-1">Rolle (Role Enum)</label>
                                            <select
                                                value={editFormData.role}
                                                onChange={e => setEditFormData({ ...editFormData, role: e.target.value })}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                            >
                                                <option value={Role.KUNDE}>KUNDE</option>
                                                <option value={Role.ADMIN}>ADMIN</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 pt-3">
                                        <button
                                            type="submit"
                                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                                        >
                                            <Save className="w-4 h-4" /> Speichern
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                                        >
                                            <X className="w-4 h-4" /> Abbrechen
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                /* Read-Only Details */
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
                                    <div className="py-1.5 border-b border-slate-800">
                                        <dt className="text-slate-400 flex items-center gap-1 mb-1">
                                            <Tag className="w-3.5 h-3.5 text-slate-500" /> Database ID (@Id):
                                        </dt>
                                        <dd className="font-mono text-slate-200 font-bold text-sm">#{selectedUser.id}</dd>
                                    </div>

                                    <div className="py-1.5 border-b border-slate-800">
                                        <dt className="text-slate-400 mb-1">Benutzername:</dt>
                                        <dd className="font-semibold text-slate-200 text-sm">{selectedUser.benutzername}</dd>
                                    </div>

                                    <div className="py-1.5 border-b border-slate-800">
                                        <dt className="text-slate-400 mb-1">E-Mail Adresse:</dt>
                                        <dd className="text-slate-300 font-medium">{selectedUser.email}</dd>
                                    </div>

                                    <div className="py-1.5 border-b border-slate-800">
                                        <dt className="text-slate-400 mb-1">Rolle (@Enumerated):</dt>
                                        <dd className="font-extrabold text-indigo-400">{selectedUser.role}</dd>
                                    </div>

                                    {selectedUser.dtype === 'Kunde' && (
                                        <div className="py-1.5 border-b border-slate-800">
                                            <dt className="text-slate-400 mb-1">Kundennummer:</dt>
                                            <dd className="font-mono text-cyan-300 font-bold text-sm">{selectedUser.kundennummer || 'N/A'}</dd>
                                        </div>
                                    )}



                                </dl>
                            )}
                        </div>

                        {/* Quick Overview Sidebar */}
                        <div className="space-y-4">
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                    Vererbung & JPA Strategie
                                </h4>
                                <div className="space-y-2 text-xs text-slate-300">
                                    <div className="flex justify-between py-1 border-b border-slate-800">
                                        <span className="text-slate-400">Table Strategy:</span>
                                        <span className="font-mono text-indigo-300">SINGLE_TABLE</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-slate-800">
                                        <span className="text-slate-400">Discriminator Column:</span>
                                        <span className="font-mono text-slate-300">dtype</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-slate-400">Discriminator Value:</span>
                                        <span className="font-bold text-emerald-400">{selectedUser.dtype}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl grid grid-cols-2 gap-3 text-center">
                                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                                    <div className="text-2xl font-black text-pink-400">
                                        {selectedUser.favoriten ? selectedUser.favoriten.length : 0}
                                    </div>
                                    <div className="text-[11px] text-slate-400 mt-1 font-semibold">Favoriten</div>
                                </div>

                                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                                    <div className="text-2xl font-black text-cyan-400">
                                        {selectedUser.kommentare ? selectedUser.kommentare.length : 0}
                                    </div>
                                    <div className="text-[11px] text-slate-400 mt-1 font-semibold">Kommentare</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {}
                {activeTab === 'favoriten' && (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-pink-400" /> Favoriten (Kaugummi Liste)
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    @ManyToMany Verknüpfung über <span className="font-mono text-indigo-300">benutzer_favoriten</span>
                                </p>
                            </div>

                            {/* Search input */}
                            <div className="relative w-full sm:w-64">
                                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Favoriten durchsuchen..."
                                    value={favoriteFilter}
                                    onChange={e => setFavoriteFilter(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredFavoriten.length > 0 ? (
                                filteredFavoriten.map(fav => (
                                    <div
                                        key={fav.id}
                                        className="group flex items-center justify-between bg-slate-950/80 border border-slate-800 hover:border-pink-500/40 p-4 rounded-xl transition shadow-sm"
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 text-xl shrink-0">
                                                🍬
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-100 group-hover:text-pink-300 transition">
                                                    {fav.name}
                                                </h4>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    Geschmack: <span className="text-slate-200">{fav.geschmack}</span> &bull; <span className="text-emerald-400 font-mono font-bold">{fav.preis.toFixed(2)} €</span>
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleRemoveFavorite(fav.id)}
                                            title="Favorit aus Kundenprofil entfernen"
                                            className="opacity-60 group-hover:opacity-100 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 p-2 rounded-lg transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
                                    Keine Kaugummi-Favoriten vorhanden.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {}
                {activeTab === 'kommentare' && (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                        <div>
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-cyan-400" /> Verfasste Kommentare
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                                @OneToMany Beziehung zu <span className="font-mono text-indigo-300">Kommentar</span> Entities
                            </p>
                        </div>

                        {/* Add comment form */}
                        <form onSubmit={handleAddComment} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Neuen Admin-Vermerk oder Kommentar verfassen..."
                                value={newCommentInput}
                                onChange={e => setNewCommentInput(e.target.value)}
                                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                            />
                            <button
                                type="submit"
                                className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0"
                            >
                                <Plus className="w-4 h-4" /> Einen neuen Kommentar Hinzufügen
                            </button>
                        </form>

                        {/* Comments list */}
                        <div className="space-y-3">
                            {selectedUser.kommentare && selectedUser.kommentare.length > 0 ? (
                                selectedUser.kommentare.map(kommentar => (
                                    <div
                                        key={kommentar.id}
                                        className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl relative group shadow-sm flex justify-between items-start"
                                    >
                                        <div className="space-y-1.5 pr-8">
                                            <p className="text-xs text-slate-200 leading-relaxed font-medium">
                                                "{kommentar.text}"
                                            </p>
                                            <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
                                                <span>Erstellt: {kommentar.erstelltAm}</span>
                                                <span>ID: #{kommentar.id}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDeleteComment(kommentar.id)}
                                            title="Kommentar als Admin löschen"
                                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 p-1.5 rounded-lg transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
                                    Keine Kommentare verfasst.
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

