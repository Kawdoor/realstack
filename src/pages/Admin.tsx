import { useState, useEffect } from 'react';
import { supabase, Project, Client, Operation } from '../lib/supabase';
import ProjectsManager from '../components/admin/ProjectsManager';
import ClientsManager from '../components/admin/ClientsManager';
import OperationsManager from '../components/admin/OperationsManager';
import ConfigManager from '../components/admin/ConfigManager';
import Login from './Login';
import { Building2, Users, FileText, Settings, Home, LogOut } from 'lucide-react';

type Tab = 'projects' | 'clients' | 'operations' | 'config';

interface AdminProps {
  onBackToHome: () => void;
}

export default function Admin({ onBackToHome }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [operations, setOperations] = useState<Operation[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    setIsCheckingAuth(false);
    
    if (session) {
      loadData();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const loadData = async () => {
    const [projectsRes, clientsRes, operationsRes] = await Promise.all([
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('clients').select('*').order('created_at', { ascending: false }),
      supabase.from('operations').select('*').order('created_at', { ascending: false }),
    ]);

    if (projectsRes.data) setProjects(projectsRes.data);
    if (clientsRes.data) setClients(clientsRes.data);
    if (operationsRes.data) setOperations(operationsRes.data);
  };

  const tabs = [
    { id: 'projects' as Tab, label: 'Proyectos', icon: Building2 },
    { id: 'clients' as Tab, label: 'Clientes', icon: Users },
    { id: 'operations' as Tab, label: 'Operaciones', icon: FileText },
    { id: 'config' as Tab, label: 'Configuración', icon: Settings },
  ];

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="mb-4 text-lg font-light tracking-wide text-neutral-600">
            Cargando...
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => {
      setIsAuthenticated(true);
      loadData();
    }} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-light tracking-wide text-neutral-900">
            Panel de Administración
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-neutral-300 px-6 py-2 text-sm tracking-wider text-red-600 transition-all hover:border-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              CERRAR SESIÓN
            </button>
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 border border-neutral-300 px-6 py-2 text-sm tracking-wider transition-all hover:border-neutral-900"
            >
              <Home className="h-4 w-4" strokeWidth={1.5} />
              VOLVER AL SITIO
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r border-neutral-200 bg-white p-6">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm tracking-wide transition-all ${
                    activeTab === tab.id
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === 'projects' && (
            <ProjectsManager projects={projects} onUpdate={loadData} />
          )}
          {activeTab === 'clients' && (
            <ClientsManager clients={clients} onUpdate={loadData} />
          )}
          {activeTab === 'operations' && (
            <OperationsManager
              operations={operations}
              projects={projects}
              clients={clients}
              onUpdate={loadData}
            />
          )}
          {activeTab === 'config' && <ConfigManager />}
        </main>
      </div>
    </div>
  );
}
