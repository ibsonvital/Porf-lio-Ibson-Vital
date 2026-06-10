import { useState, useEffect } from 'react';
import { FaLightbulb, FaDatabase, FaBullseye, FaChartBar, FaCog, FaChartPie, FaComments, FaFileExcel, FaAward, FaLinkedin, FaGithub, FaBars, FaTimes, FaChevronDown, FaChevronLeft, FaChevronRight, FaArrowRight, FaCheckCircle, FaEnvelope, FaUserCircle } from 'react-icons/fa';

// IMPORTAÇÃO ATUALIZADA (Voltando duas pastas a partir de src/pages/Index.tsx)
import fotoIbson from '../../img/ibson.jpg';
import financeiro from '../../img/financeiro.png'; 
import imgPedidos from '../../img/pedidos.png';
import imgVendas from '../../img/vendas.png';
import imgVendasRela from '../../img/vendasrela.png';
import pdfCurriculo from '../../img/curriculo.pdf';

function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  
  // Estados para controlar os slides dos dashboards
  const [vendasSlide, setVendasSlide] = useState(0);
  const [logisticaSlide, setLogisticaSlide] = useState(0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = el.getBoundingClientRect().top + window.pageYOffset - 92;
    window.scrollTo({ top: Math.max(offset, 0), behavior: 'smooth' });
    // garantir destaque imediato do item clicado
    setActiveSection(id);
  };

  useEffect(() => {
    const sectionIds = ['home', 'sobre', 'estrategia', 'estudo-caso', 'projetos', 'habilidades', 'contato'];

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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500 text-xs gap-2 tracking-widest uppercase animate-pulse">
          <span>Scroll</span>
          <FaChevronDown className="text-cyan-500" />
        </div>
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
                Engenharia de Dados & Estratégia de Negócios
              </h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light text-base md:text-lg">
              Sou <strong className="text-slate-100 font-semibold">Ibson Vital</strong>, Analista de Dados focado em transformar dados em decisões estratégicas e ganho de eficiência operacional. Atuo com Power BI, Excel e automação de processos, criando soluções que reduzem tempo de análise, aumentam a confiabilidade das informações e apoiam diretamente a tomada de decisão. Tenho experiência prática com análise de dados no dia a dia e possuo certificações em Lean Six Sigma (White e Yellow Belt).
            </p>
            
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
          <div className="bg-[#070b12] p-8 rounded-xl border border-slate-900 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-[4px] h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center tracking-tight">
              Estudo de Caso: Automação e Otimização de Processos <span className="ml-2 text-sm opacity-80">📝</span>
            </h3>
            <p className="text-slate-400 mb-6 text-sm md:text-base leading-relaxed font-light">
              Este projeto demonstra a aplicação prática de Business Intelligence e automação para resolver um gargalo crítico no monitoramento de indicadores.
            </p>
            <ul className="grid gap-4 text-sm text-slate-300">
              <li className="bg-[#090f1c] p-3 rounded border border-slate-900"><strong className="text-cyan-400 font-medium">Problema:</strong> O monitoramento de indicadores era manual, baseado em planilhas, consumindo cerca de 30 minutos de trabalho por ciclo de análise.</li>
              <li className="bg-[#090f1c] p-3 rounded border border-slate-900"><strong className="text-cyan-400 font-medium">Solução:</strong> Desenvolvimento de dashboards dinâmicos no Power BI, substituindo controles manuais e automatizando todo o fluxo de dados com Power Query.</li>
              <li className="flex items-center text-emerald-400 font-medium pl-2"><FaCheckCircle className="mr-2 text-xs" /> Redução de 97% no Tempo de Análise (de ~30 minutos para segundos).</li>
              <li className="flex items-center text-emerald-400 font-medium pl-2"><FaCheckCircle className="mr-2 text-xs" /> Aumento significativo na agilidade, precisão e confiabilidade das informações.</li>
              <li className="flex items-center text-emerald-400 font-medium pl-2"><FaCheckCircle className="mr-2 text-xs" /> Criação de solução automatizada para monitoramento de prazos e dias úteis.</li>
            </ul>
          </div>

          <div id="projetos" className="space-y-8 pt-8">
            {/* SLIDER 1: DASHBOARD DE VENDAS */}
            <div className="bg-[#070b12] p-8 rounded-xl border border-slate-900 shadow-xl relative">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-cyan-500/60"></div>
              <h3 className="text-xl font-bold text-slate-100 tracking-tight">Dashboard de Metas e Vendas 📊</h3>
              <p className="text-slate-400 text-sm mt-1 font-light">Análise macro de faturamento, metas comerciais e relacionamento estrutural do modelo de dados.</p>
              
              <div className="relative overflow-hidden w-full mt-6 rounded-lg border border-slate-800 bg-[#090f1c] aspect-video">
                <button 
                  onClick={() => setVendasSlide(vendasSlide === 0 ? 1 : 0)}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/90 hover:text-slate-900 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all shadow-[0_0_18px_rgba(6,182,212,0.25)]"
                  aria-label="Slide anterior"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={() => setVendasSlide(vendasSlide === 0 ? 1 : 0)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/90 hover:text-slate-900 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all shadow-[0_0_18px_rgba(6,182,212,0.25)]"
                  aria-label="Próximo slide"
                >
                  <FaChevronRight />
                </button>

                <div 
                  className="flex transition-transform duration-500 ease-in-out w-[200%] h-full"
                  style={{ transform: `translateX(-${vendasSlide * 50}%)` }}
                >
                  <div className="w-1/2 h-full relative">
                    <img src={imgVendas} alt="Dashboard de Vendas Principal" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-1/2 h-full relative">
                    <img src={imgVendasRela} alt="Relatório de Vendas Detalhado" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDER 2: DASHBOARD DE LOGÍSTICA / FINANCEIRO */}
            <div className="bg-[#070b12] p-8 rounded-xl border border-slate-900 shadow-xl relative">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-cyan-500/60"></div>
              <h3 className="text-xl font-bold text-slate-100 tracking-tight">Dashboard de Logística & Finanças 🚚</h3>
              <p className="text-slate-400 text-sm mt-1 font-light">Controle fino de prazos de entrega, OTIF, eficiência de frotas e visões analíticas integradas.</p>
              
              <div className="relative overflow-hidden w-full mt-6 rounded-lg border border-slate-800 bg-[#090f1c] aspect-video">
                <button 
                  onClick={() => setLogisticaSlide(logisticaSlide === 0 ? 1 : 0)}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/90 hover:text-slate-900 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all shadow-[0_0_18px_rgba(6,182,212,0.25)]"
                  aria-label="Slide anterior"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={() => setLogisticaSlide(logisticaSlide === 0 ? 1 : 0)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/90 hover:text-slate-900 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all shadow-[0_0_18px_rgba(6,182,212,0.25)]"
                  aria-label="Próximo slide"
                >
                  <FaChevronRight />
                </button>

                <div 
                  className="flex transition-transform duration-500 ease-in-out w-[200%] h-full"
                  style={{ transform: `translateX(-${logisticaSlide * 50}%)` }}
                >
                  <div className="w-1/2 h-full relative">
                    <img src={imgPedidos} alt="Painel Logístico Geral" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-1/2 h-full relative">
                    {/* VARIÁVEL CORRIGIDA DE logoLogistica PARA financeiro */}
                    <img src={financeiro} alt="Dashboard Financeiro" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>

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