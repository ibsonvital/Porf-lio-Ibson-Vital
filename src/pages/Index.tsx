import { useState, useEffect } from 'react';
import { FaLightbulb, FaDatabase, FaBullseye, FaChartBar, FaCog, FaChartPie, FaComments, FaFileExcel, FaAward, FaLinkedin, FaGithub, FaBars, FaTimes, FaChevronDown, FaChevronLeft, FaChevronRight, FaArrowRight, FaCheckCircle, FaEnvelope, FaUserCircle, FaFilePdf } from 'react-icons/fa';

// IMPORTAÇÃO ATUALIZADA (Voltando duas pastas a partir de src/pages/Index.tsx)
import fotoIbson from '../../img/ibson.jpg';
import financeiro from '../../img/financeiro.png'; 
import imgPedidos from '../../img/pedidos.png';
import imgVendas from '../../img/vendas.png';
import imgVendasRela from '../../img/vendasrela.png';
import imgDashRH from '../../img/DASHRH.png';
import imgSqlRH from '../../img/SQLRH.png';
import pdfCurriculo from '../../img/curriculo.pdf';
import certAnaliseDados from '../../certificados/Certificado analise de dados.png';
import certPowerSql from '../../certificados/Certificado Power bi + SQL.jpg';
import certFundamentoDados from '../../certificados/Fundamento ciência de dados.png';
import certWhiteBelt from '../../certificados/white belt.png';
import certYellowBelt from '../../certificados/YELLOW BELT.jpg';
import certExcelCopilot from '../../certificados/certificado fundamentos de excel e copilot com ia.pdf';
import certPython from '../../certificados/certificado python.pdf';

function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<{ title: string; subtitle: string; src: string; type: 'image' | 'pdf' } | null>(null);
  
  // Estados para controlar o modal de projetos
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projectSlide, setProjectSlide] = useState(0);

  const certificates = [
    {
      title: 'White Belt',
      subtitle: 'Lean Six Sigma White Belt',
      src: certWhiteBelt,
      type: 'image' as const,
    },
    {
      title: 'Yellow Belt',
      subtitle: 'Lean Six Sigma Yellow Belt',
      src: certYellowBelt,
      type: 'image' as const,
    },
    {
      title: 'Power BI + SQL',
      subtitle: 'Certificado Power BI + SQL',
      src: certPowerSql,
      type: 'image' as const,
    },
    {
      title: 'Análise de Dados',
      subtitle: 'Certificado de Análise de Dados',
      src: certAnaliseDados,
      type: 'image' as const,
    },
    {
      title: 'Fundamento Ciência de Dados',
      subtitle: 'Certificado em Ciência de Dados',
      src: certFundamentoDados,
      type: 'image' as const,
    },
    {
      title: 'Excel e Copilot com IA',
      subtitle: 'Certificado Fundamentos de Excel + Copilot',
      src: certExcelCopilot,
      type: 'pdf' as const,
    },
    {
      title: 'Python',
      subtitle: 'Certificado Python',
      src: certPython,
      type: 'pdf' as const,
    },
  ];

  const projects = [
    {
      id: 'vendas',
      title: 'Dashboard de Metas e Vendas',
      description: 'Análise macro de faturamento, metas comerciais e relacionamento estrutural do modelo de dados.',
      icon: '📊',
      tools: ['Power BI', 'Excel', 'SQL'],
      images: [imgVendas, imgVendasRela],
    },
    {
      id: 'logistica',
      title: 'Dashboard de Logística & Finanças',
      description: 'Controle fino de prazos de entrega, OTIF, eficiência de frotas e visões analíticas integradas.',
      icon: '🚚',
      tools: ['Power BI', 'Excel', 'SQL'],
      images: [imgPedidos, financeiro],
    },
    {
      id: 'rh',
      title: 'Dashboard de RH',
      description: 'Análise completa de dados de recursos humanos extraídos do banco de dados do cliente com insights operacionais.',
      icon: '👥',
      tools: ['SQL', 'Power BI'],
      images: [imgDashRH, imgSqlRH],
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = el.getBoundingClientRect().top + window.pageYOffset - 92;
    window.scrollTo({ top: Math.max(offset, 0), behavior: 'smooth' });
    // garantir destaque imediato do item clicado
    setActiveSection(id);
  };

  useEffect(() => {
    const sectionIds = ['home', 'sobre', 'estrategia', 'estudo-caso', 'projetos', 'habilidades', 'certificacoes', 'contato'];

    const findSectionFromPoint = () => {
      const x = window.innerWidth / 2;
      const y = 140;
      const elements = document.elementsFromPoint(x, y);

      for (const el of elements) {
        if (!(el instanceof HTMLElement)) continue;
        const section = el.closest('[id]') as HTMLElement | null;
        if (section && section.id && sectionIds.includes(section.id)) {
          return section.id;
        }
      }

      return null;
    };

    const handleScroll = () => {
      const visibleSection = findSectionFromPoint();
      if (visibleSection) {
        setActiveSection(visibleSection);
        return;
      }

      let currentSection = 'home';
      sectionIds.forEach((sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 160) {
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-cyan-500/30 scroll-smooth antialiased">
      
      {/* HEADER / NAVBAR FIXA */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#070b12]/80 border-b border-cyan-500/10 px-6 py-4 md:px-12 flex items-center justify-between backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        
        {/* Logo e Foto de Perfil Mini */}
        <div 
          onClick={() => scrollToSection('home')}
          className="flex items-center space-x-3 cursor-pointer group transition-all duration-300"
        >
          <div className="flex-shrink-0 w-[44px] h-[44px] sm:w-11 sm:h-11 rounded-full border border-cyan-500/40 overflow-hidden transition-all group-hover:border-cyan-400 bg-[#0d1527] flex items-center justify-center avatar-glow">
            {!photoError ? (
              <img 
                src={fotoIbson} 
                alt="Ibson Vital" 
                className="w-full h-full object-cover"
                onError={() => setPhotoError(true)}
              />
            ) : (
              <FaUserCircle className="text-cyan-300 text-2xl" />
            )}
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-100 transition-all group-hover:text-cyan-400">
            Ibson Vital
          </span>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          {[
            { id: 'sobre', label: 'Sobre' },
            { id: 'estrategia', label: 'Estratégia' },
            { id: 'estudo-caso', label: 'Estudos de Caso' },
            { id: 'projetos', label: 'Projetos' },
            { id: 'habilidades', label: 'Habilidades' },
            { id: 'certificacoes', label: 'Certificações' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`transition-all duration-300 relative py-1 hover:text-cyan-400 ${
                activeSection === item.id ? 'text-cyan-400 font-semibold' : 'text-slate-400'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500 shadow-[0_0_8px_#06b6d4] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Redes Sociais e Botão Contato */}
        <div className="hidden md:flex items-center space-x-5">
          <div className="flex items-center space-x-3 border-r border-slate-800 pr-4">
            <a 
              href="https://www.linkedin.com/in/ibson-vital/" 
              target="_blank" 
              rel="noreferrer" 
              className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center transition-all hover:border-cyan-500 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.4)]"
              title="LinkedIn"
            >
              <FaLinkedin className="text-base" />
            </a>
            <a 
              href="https://github.com/ibsonvital" 
              target="_blank" 
              rel="noreferrer" 
              className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center transition-all hover:border-cyan-500 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.4)]"
              title="GitHub"
            >
              <FaGithub className="text-base" />
            </a>
          </div>
          
          <button 
            onClick={() => scrollToSection('contato')}
            className="bg-cyan-500 hover:bg-cyan-400 text-[#070b12] font-bold px-5 py-2 rounded-md text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:-translate-y-[1px]"
          >
            Contato
          </button>
        </div>

        {/* Hambúrguer Mobile */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-cyan-400 text-2xl"
          aria-label="Abrir menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* MENU MOBILE DROP-DOWN */}
      <div className={`fixed top-[73px] left-0 w-full bg-[#070b12] border-b border-cyan-500/20 z-40 transition-all duration-300 md:hidden ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <ul className="flex flex-col items-center py-6 space-y-5 font-medium text-slate-300">
          <li><button onClick={() => { scrollToSection('sobre'); setIsMenuOpen(false); }} className="hover:text-cyan-400">Sobre</button></li>
          <li><button onClick={() => { scrollToSection('estrategia'); setIsMenuOpen(false); }} className="hover:text-cyan-400">Estratégia</button></li>
          <li><button onClick={() => { scrollToSection('estudo-caso'); setIsMenuOpen(false); }} className="hover:text-cyan-400">Estudos de Caso</button></li>
          <li><button onClick={() => { scrollToSection('projetos'); setIsMenuOpen(false); }} className="hover:text-cyan-400">Projetos</button></li>
          <li><button onClick={() => { scrollToSection('habilidades'); setIsMenuOpen(false); }} className="hover:text-cyan-400">Habilidades</button></li>
          <li><button onClick={() => { scrollToSection('certificacoes'); setIsMenuOpen(false); }} className="hover:text-cyan-400">Certificações</button></li>
          <li><button onClick={() => { scrollToSection('contato'); setIsMenuOpen(false); }} className="text-cyan-400 font-bold">Contato</button></li>
        </ul>
      </div>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 text-center overflow-hidden hero-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-6 z-10 flex flex-col items-center" data-reveal>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight title-entrance" data-reveal>
            Transformando dados em <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">decisões inteligentes</span>.
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl font-light tracking-wide">
            Análise Avançada, Estratégia de BI e Automação de Processos de ponta a ponta.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => scrollToSection('projetos')}
                className="bg-cyan-500 hover:bg-cyan-400 text-[#070b12] font-bold px-8 py-3.5 rounded-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 group flex items-center justify-center relative"
              >
                Ver Projetos
                <FaArrowRight className="ml-2 text-xs transition-transform group-hover:translate-x-1" />
              </button>
              <span className="cta-badge">Novo</span>
            </div>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 font-semibold px-8 py-3.5 rounded-md transition-all"
            >
              Conhecer Trajetória
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection('sobre')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500 text-xs gap-2 tracking-widest uppercase scroll-hint"
          aria-label="Rolar para Sobre"
        >
          <span>Scroll</span>
          <FaChevronDown className="text-cyan-500" />
        </button>
      </section>

      {/* SEÇÃO SOBRE */}
      <section id="sobre" className="py-28 bg-[#090f1c] border-t border-slate-900 relative" data-reveal>
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="flex-shrink-0 relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-40 blur-md group-hover:opacity-75 transition duration-500"></div>
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-cyan-500/40 relative bg-[#070b12] shadow-2xl">
              <img 
                src={fotoIbson} 
                alt="Ibson Vital" 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="flex-1 max-w-2xl text-left space-y-6">
            <div className="space-y-2">
              <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">// Perfil Profissional</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Análise de Dados & Estratégia de Negócios
              </h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light text-base md:text-lg">
              Sou <strong className="text-slate-100 font-semibold">Ibson Vital</strong>, Analista de Dados com experiência em Power BI, Excel e Power Query, atuando na construção de dashboards gerenciais, automação de processos e análise de indicadores. Possuo conhecimentos em SQL e Python para extração, tratamento e análise de dados, transformando informações em insights para apoio à tomada de decisão.
            </p>

            <div className="mt-6 rounded-[32px] border border-slate-800 bg-[#07101f] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.22)]">
              <p className="text-cyan-400 uppercase tracking-[0.35em] text-[11px] font-semibold mb-4">Stack Tecnológica</p>
              <div className="flex flex-wrap gap-3">
                {['Power BI', 'SQL', 'Excel', 'Power Query', 'Python'].map((tech) => (
                  <span key={tech} className="rounded-full border border-slate-700 bg-[#071a2a] px-4 py-2 text-xs font-medium text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a 
                href={pdfCurriculo} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <FaFileExcel className="mr-2.5 text-cyan-500" /> Baixar CV Completo (PDF)
              </a>
            </div>
          </div>

          <div className="w-full lg:w-56 bg-[#070b12]/60 p-6 rounded-xl border border-slate-800/80 backdrop-blur-sm shadow-xl flex flex-col gap-6 text-center">
            {[
              { val: "+3", label: "Projetos de Dados Aplicados" },
              { val: "+4", label: "Processos Automatizados" },
              { val: "97%", label: "Redução no Tempo de Análise" }
            ].map((kpi, i) => (
              <div key={i} className="group border-b border-slate-900 last:border-0 pb-4 last:pb-0">
                <span className="block text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 transition-transform duration-300 group-hover:scale-105">
                  {kpi.val}
                </span>
                <p className="text-xs text-slate-500 mt-1.5 font-medium tracking-wide uppercase">{kpi.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO ESTRATÉGIA */}
      <section id="estrategia" className="py-28 bg-[#070b12] relative" data-reveal>
        <div className="max-w-5xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-3">
            <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">// Metodologia</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Como transformo dados em resultado em 3 passos
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <FaLightbulb className="text-xl" />, title: "1. Análise e Descoberta", desc: "Imersão completa para entender o contexto do negócio, mapear requisitos de dados (KPIs), identificar gargalos e definir as perguntas-chave a serem respondidas pela análise." },
              { icon: <FaDatabase className="text-xl" />, title: "2. Modelagem & ETL", desc: "Estruturação de dados limpos e modelagem eficiente (Power BI, Power Query), seguido pelo desenvolvimento de dashboards e relatórios claros, interativos e focados na tomada de decisão." },
              { icon: <FaBullseye className="text-xl" />, title: "3. Insights & Ação", desc: "Entrega dos resultados, transformando dados brutos em insights acionáveis. Foco na comunicação da história dos dados e no acompanhamento para otimização contínua de processos e resultados." }
            ].map((step, idx) => (
              <div key={idx} className="bg-[#09101f] p-10 rounded-[32px] shadow-[0_20px_70px_rgba(0,0,0,0.25)] border border-slate-900/70 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-6 mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight text-center">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-light text-center">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO PROJETOS */}
      <section id="estudo-caso" className="py-28 bg-[#090f1c] border-y border-slate-900" data-reveal>
        <div className="max-w-5xl mx-auto px-6 space-y-20">
          <div className="text-center space-y-3">
            <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">// Portfólio</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Estudos de Caso e Projetos em Destaque
            </h2>
          </div>

          {/* Estudo de Caso */}
          <div className="bg-gradient-to-br from-[#07101f] via-[#081228] to-[#0b1624] p-8 rounded-[32px] border border-cyan-500/10 shadow-[0_30px_70px_rgba(6,182,212,0.15)] relative overflow-hidden group transition-all duration-300 hover:border-cyan-500/20 hover:shadow-[0_35px_90px_rgba(6,182,212,0.22)]">
            <div className="absolute top-0 left-0 w-[4px] h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
            <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
              Estudo de Caso: Automação e Otimização de Processos
            </h3>
            <p className="text-slate-400 mb-6 text-sm md:text-base leading-relaxed font-light">
              Resumo de um projeto em que um controle manual de indicadores foi transformado em um processo automatizado,
              mais rápido e mais confiável para apoiar a tomada de decisão.
            </p>
            <ul className="grid gap-4 text-sm text-slate-300">
              <li className="bg-[#090f1c] p-4 rounded-lg border border-slate-900 leading-relaxed">
                <strong className="text-cyan-400 font-medium">Contexto:</strong> A equipe precisava acompanhar indicadores,
                prazos e dias úteis com frequência, mas dependia de planilhas e atualizações manuais.
              </li>
              <li className="bg-[#090f1c] p-4 rounded-lg border border-slate-900 leading-relaxed">
                <strong className="text-cyan-400 font-medium">Problema:</strong> Cada ciclo de análise levava cerca de 30
                minutos, aumentando o risco de erro, atraso nas informações e retrabalho.
              </li>
              <li className="bg-[#090f1c] p-4 rounded-lg border border-slate-900 leading-relaxed">
                <strong className="text-cyan-400 font-medium">Solução:</strong> Criei um fluxo automatizado com Power Query
                e dashboards no Power BI, substituindo o controle manual por uma visão atualizada e padronizada dos dados.
              </li>
              <li className="bg-[#090f1c] p-4 rounded-lg border border-slate-900 leading-relaxed">
                <strong className="text-cyan-400 font-medium">Resultado:</strong> O tempo de análise caiu de aproximadamente
                30 minutos para poucos segundos, com ganho de agilidade, precisão e confiabilidade nas informações.
              </li>
              <li className="flex items-start text-emerald-400 font-medium pl-1">
                <FaCheckCircle className="mr-2 mt-1 shrink-0 text-xs" /> Redução de 97% no tempo de análise.
              </li>
              <li className="flex items-start text-emerald-400 font-medium pl-1">
                <FaCheckCircle className="mr-2 mt-1 shrink-0 text-xs" /> Monitoramento automatizado de prazos, indicadores e dias úteis.
              </li>
              <li className="flex items-start text-emerald-400 font-medium pl-1">
                <FaCheckCircle className="mr-2 mt-1 shrink-0 text-xs" /> Menos retrabalho e mais clareza para decisões operacionais.
              </li>
            </ul>
          </div>

          <div id="projetos" className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  setSelectedProject(project.id);
                  setProjectSlide(0);
                }}
                className="bg-gradient-to-br from-[#07101f] via-[#081228] to-[#0b1624] p-6 rounded-[24px] border border-cyan-500/10 shadow-[0_30px_70px_rgba(6,182,212,0.15)] relative transition-all duration-300 hover:border-cyan-500/20 hover:shadow-[0_35px_90px_rgba(6,182,212,0.22)] cursor-pointer group"
              >
                <div className="absolute top-0 left-0 w-[4px] h-full bg-cyan-500/60 rounded-tl-[24px] rounded-bl-[24px]"></div>
                
                {/* Thumbnail Preview */}
                <div className="relative overflow-hidden w-full rounded-lg border border-slate-800 bg-[#090f1c] aspect-video mb-4 group-hover:border-cyan-500/30 transition-colors">
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="text-white/80 group-hover:text-white text-sm font-semibold transition-colors">Clique para detalhes</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  {project.title}
                  <span className="text-xl">{project.icon}</span>
                </h3>
                
                <p className="text-slate-400 text-sm mt-2 font-light mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-full text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* MODAL DE PROJETO */}
          {selectedProject && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
              <div 
                className="bg-gradient-to-br from-[#07101f] via-[#081228] to-[#0b1624] rounded-[32px] border border-cyan-500/20 shadow-[0_50px_100px_rgba(6,182,212,0.2)] max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  {/* Header com Botão de Fechar */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {projects.find(p => p.id === selectedProject)?.title}
                    </h2>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-slate-400 hover:text-cyan-400 transition-colors text-2xl"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Slider de Imagens */}
                  <div className="relative overflow-hidden w-full rounded-lg border border-slate-800 bg-[#090f1c] aspect-video mb-6">
                    <button
                      onClick={() => {
                        const project = projects.find(p => p.id === selectedProject);
                        setProjectSlide(projectSlide === 0 ? (project?.images.length || 2) - 1 : projectSlide - 1);
                      }}
                      className="absolute top-1/2 left-4 -translate-y-1/2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/90 hover:text-slate-900 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all shadow-[0_0_18px_rgba(6,182,212,0.25)]"
                      aria-label="Slide anterior"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={() => {
                        const project = projects.find(p => p.id === selectedProject);
                        setProjectSlide(projectSlide === (project?.images.length || 2) - 1 ? 0 : projectSlide + 1);
                      }}
                      className="absolute top-1/2 right-4 -translate-y-1/2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/90 hover:text-slate-900 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all shadow-[0_0_18px_rgba(6,182,212,0.25)]"
                      aria-label="Próximo slide"
                    >
                      <FaChevronRight />
                    </button>

                    <div className="w-full h-full">
                      <img
                        src={projects.find(p => p.id === selectedProject)?.images[projectSlide]}
                        alt={`Slide ${projectSlide + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Indicadores de Slide */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {projects.find(p => p.id === selectedProject)?.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setProjectSlide(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === projectSlide
                              ? 'bg-cyan-400 w-6'
                              : 'bg-slate-500 hover:bg-slate-400'
                          }`}
                          aria-label={`Ir para slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Ferramentas Utilizadas */}
                  <div className="rounded-[24px] border border-slate-900 bg-[#07101f] p-6">
                    <p className="text-cyan-400 uppercase tracking-[0.35em] text-[10px] font-semibold mb-3">
                      Ferramentas Utilizadas
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {projects.find(p => p.id === selectedProject)?.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-4 py-2 rounded-lg text-cyan-300 border border-cyan-500/40 bg-cyan-500/15 text-sm font-medium hover:bg-cyan-500/25 transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* SEÇÃO HABILIDADES */}
      <section id="habilidades" className="py-28 bg-[#070b12]" data-reveal>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-3">
            <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">// Competências</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Habilidades Técnicas & Ferramentas
            </h2>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-8 mt-10">
            <div className="bg-[#090f1c] p-8 rounded-xl shadow-xl border border-slate-900 flex-1 text-left transition-all duration-300 hover:border-cyan-500/10">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-6 border-b border-slate-800 pb-3">Habilidades Analíticas</h3>
              <ul className="flex flex-col gap-3">
                {[
                  { icon: <FaChartBar className="text-base" />, label: 'Pensamento Analítico' },
                  { icon: <FaCog className="text-base" />, label: 'Automação de Processos' },
                  { icon: <FaChartPie className="text-base" />, label: 'Análise de Dados' },
                  { icon: <FaLightbulb className="text-base" />, label: 'Resolução de Problemas' },
                  { icon: <FaComments className="text-base" />, label: 'Comunicação de Dados' }
                ].map((skill, i) => (
                  <li key={i} className="bg-[#060b16] border border-slate-900/70 rounded-2xl py-3 px-4 text-sm text-slate-300 transition-all duration-300 hover:border-cyan-500/30 hover:bg-[#08101f] flex items-center gap-3">
                    <span className="w-11 h-11 rounded-2xl bg-[#070f1d] border border-slate-800 flex items-center justify-center text-cyan-400">
                      {skill.icon}
                    </span>
                    {skill.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#090f1c] p-8 rounded-xl shadow-xl border border-slate-900 flex-1 text-left transition-all duration-300 hover:border-cyan-500/10">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-6 border-b border-slate-800 pb-3">Ferramentas e Certificações</h3>
              <ul className="flex flex-col gap-3">
                {[
                  { icon: <FaChartBar className="text-base" />, label: 'Power BI' },
                  { icon: <FaDatabase className="text-base" />, label: 'Power Query' },
                  { icon: <FaFileExcel className="text-base" />, label: 'Excel Avançado' },
                  { icon: <FaDatabase className="text-base" />, label: 'SQL Básico' },
                  { icon: <FaAward className="text-base" />, label: 'Lean Six Sigma (Yellow Belt)' },
                  { icon: <FaAward className="text-base" />, label: 'Lean Six Sigma (White Belt)' }
                ].map((skill, i) => (
                  <li key={i} className="bg-[#060b16] border border-slate-900/70 rounded-2xl py-3 px-4 text-sm text-slate-300 transition-all duration-300 hover:border-cyan-500/30 hover:bg-[#08101f] flex items-center gap-3">
                    <span className="w-11 h-11 rounded-2xl bg-[#070f1d] border border-slate-800 flex items-center justify-center text-cyan-400">
                      {skill.icon}
                    </span>
                    {skill.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO CERTIFICAÇÕES */}
      <section id="certificacoes" className="py-28 bg-[#090f1c] border-t border-slate-900" data-reveal>
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">// Certificações</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Certificados Profissionais</h2>
            <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
              Clique em qualquer certificado para ver a imagem completa do documento e comprovar suas conquistas.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <button
                key={certificate.title}
                onClick={() => setSelectedCertificate(certificate)}
                className="group text-left rounded-[32px] border border-slate-800 bg-[#070b12] p-6 transition-all duration-300 hover:border-cyan-500/30 hover:-translate-y-1 hover:bg-[#08101f]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 mb-5 transition-all duration-300 group-hover:bg-cyan-500/15">
                  {certificate.type === 'pdf' ? <FaFilePdf className="text-xl" /> : <FaAward className="text-xl" />}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{certificate.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{certificate.subtitle}</p>
                {certificate.type === 'pdf' && (
                  <span className="mt-4 inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                    Abrir PDF
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO CONTATO */}
      <section id="contato" className="py-28 bg-[#070b12] border-t border-slate-900" data-reveal>
        <div className="max-w-6xl mx-auto px-6 grid gap-10 lg:grid-cols-[1.2fr_1fr] items-stretch">
          <div className="bg-[#090f1c] rounded-[32px] border border-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.35)] p-10 flex flex-col justify-between gap-8">
            <div>
              <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">// Contato</span>
              <h2 className="mt-4 text-4xl font-bold text-white tracking-tight">Vamos conversar?</h2>
              <p className="mt-4 text-slate-400 leading-relaxed text-base">
                Envie sua ideia, solicitação de projeto ou dúvida sobre dashboards e automações de dados. A mensagem chega ao e-mail vinculado ao Formspree.</p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-cyan-500/20 bg-[#070a14] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-2">Email</p>
                <p className="text-slate-200 font-medium">ibson.photos@gmail.com</p>
              </div>
              <div className="rounded-3xl border border-slate-900/70 bg-[#070a14] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-2">Envio</p>
                <p className="text-slate-400 text-sm">Sua mensagem é transmitida com segurança para o endereço configurado em Formspree.</p>
              </div>
            </div>
          </div>

          <form action="https://formspree.io/f/mykbypzb" method="POST" className="bg-[#090f1c] rounded-[32px] border border-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.35)] p-10 grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <input 
                type="text" 
                name="name" 
                placeholder="Seu Nome" 
                required 
                className="w-full p-4 rounded-2xl border border-slate-800 bg-[#070f1d] text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm"
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Seu E-mail" 
                required 
                className="w-full p-4 rounded-2xl border border-slate-800 bg-[#070f1d] text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors text-sm"
              />
            </div>
            <textarea 
              name="message" 
              placeholder="Como posso te ajudar?" 
              rows={6} 
              required 
              className="w-full p-4 rounded-2xl border border-slate-800 bg-[#070f1d] text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors resize-none text-sm"
            ></textarea>
            <button 
              type="submit" 
              className="mt-2 inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#070b12] font-bold py-4 rounded-2xl text-sm transition-all shadow-[0_10px_40px_rgba(6,182,212,0.3)] hover:-translate-y-0.5"
            >
              Enviar Mensagem
            </button>
            <p className="text-xs text-slate-500 mt-2">A mensagem será enviada para o e-mail configurado no seu formulário Formspree.</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <a href="#contato" className="fab-contact" title="Contato rápido">
        <FaEnvelope className="text-[#021022]" />
      </a>
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-6">
          <div className="relative max-w-5xl w-full rounded-[28px] bg-[#07101f] border border-cyan-500/20 shadow-[0_35px_120px_rgba(0,0,0,0.65)] overflow-hidden">
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-slate-900/90 p-3 text-slate-100 transition hover:bg-cyan-500 hover:text-[#070b12]"
              aria-label="Fechar certificado"
            >
              <FaTimes />
            </button>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedCertificate.title}</h3>
              <p className="text-slate-400 mb-6">{selectedCertificate.subtitle}</p>
            </div>
            <div className="max-h-[80vh] overflow-hidden bg-[#070b12]">
              {selectedCertificate.type === 'image' ? (
                <img
                  src={selectedCertificate.src}
                  alt={selectedCertificate.title}
                  className="mx-auto max-h-[80vh] max-w-full object-contain"
                />
              ) : (
                <object
                  data={selectedCertificate.src}
                  type="application/pdf"
                  className="h-[80vh] w-full"
                >
                  <div className="flex h-[80vh] w-full items-center justify-center bg-slate-900 text-slate-300 px-6 text-center">
                    <p>
                      Não foi possível visualizar o PDF no navegador.{' '}
                      <a href={selectedCertificate.src} target="_blank" rel="noreferrer" className="text-cyan-400 underline">
                        Abrir em nova aba
                      </a>
                    </p>
                  </div>
                </object>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#070b12] py-12 border-t border-slate-900 text-center">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-600">© 2026 Ibson Vital. Built with React & Tailwind CSS.</p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <a href="mailto:ibson.photos@gmail.com" className="flex items-center hover:text-cyan-400 transition-colors">
              <FaEnvelope className="mr-2 text-cyan-500/80" /> ibson.photos@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/ibson-vital/" target="_blank" rel="noreferrer" className="flex items-center hover:text-cyan-400 transition-colors">
              <FaLinkedin className="mr-2 text-cyan-500/80" /> LinkedIn
            </a>
            <a href="https://github.com/ibsonvital" target="_blank" rel="noreferrer" className="flex items-center hover:text-cyan-400 transition-colors">
              <FaGithub className="mr-2 text-cyan-500/80" /> GitHub
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Index;
