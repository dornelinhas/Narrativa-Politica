import { motion } from "motion/react";
import { ArrowRight, Globe, Users, Zap } from "lucide-react";

// --- CORES DA MARCA (ONG / ATIVISMO) ---
const colors = {
  red: "bg-[#DF2028]",
  pink: "bg-[#FF6BCA]",
  yellow: "bg-[#FFE65A]",
  lime: "bg-[#A4CD39]",
  mint: "bg-[#A2E3B1]",
  blue: "bg-[#3D78E0]",
  dark: "bg-[#1C1C1C]",
  textDark: "text-[#1C1C1C]",
  textLight: "text-[#F7F7F5]",
};

const rawColors = {
  red: "#DF2028",
  pink: "#FF6BCA",
  yellow: "#FFE65A",
  lime: "#A4CD39"
};

// --- LOGO NP (Com o design exato da imagem) ---
const NPLogo = ({ light = false, className = "" }) => (
  <div className={`relative flex items-center justify-center font-display text-4xl tracking-tight ${light ? 'text-white' : 'text-[#1C1C1C]'} ${className}`}>
    <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full" style={{ backgroundColor: rawColors.red }}></div>
    <div className="absolute top-1 -right-4 w-4 h-3" style={{ backgroundColor: rawColors.pink }}></div>
    <div className="absolute -bottom-1 -right-2 w-3 h-3" style={{ backgroundColor: rawColors.lime }}></div>
    <div className="absolute -bottom-2 left-1 w-3 h-5" style={{ backgroundColor: rawColors.yellow }}></div>
    <div className="absolute top-2 right-0 w-2 h-2 rounded-full" style={{ backgroundColor: rawColors.lime }}></div>
    <span className="relative z-10 mt-1">NP</span>
  </div>
);

// --- COMPONENTES GEOMÉTRICOS ---
const GeoShape = ({ type, color, className = "" }) => {
  const shapes = {
    circle: "rounded-full aspect-square",
    square: "rounded-none aspect-square",
    pillX: "rounded-full h-8 w-16",
    pillY: "rounded-full h-16 w-8",
  };
  return <div className={`${shapes[type as keyof typeof shapes]} ${color} ${className} inline-block`} />;
};

const Tag = ({ text, color, shape = "square", textColor = "text-[#1C1C1C]" }) => {
  const isCircle = shape === "circle";
  return (
    <div className={`inline-flex items-center justify-center font-sans font-bold text-[11px] uppercase tracking-widest px-4 py-2 ${color} ${textColor} ${isCircle ? 'rounded-full' : 'rounded-none'}`}>
      {text}
    </div>
  );
};

const Marquee = ({ text, bg = colors.pink, fg = colors.textDark }) => {
  const items = Array.from({ length: 8 }).fill(text);
  
  return (
    <div className={`flex overflow-x-hidden ${bg} ${fg} py-5 border-y-4 border-[#1C1C1C]`}>
      <motion.div 
        className="flex whitespace-nowrap font-display uppercase tracking-widest text-lg" 
        animate={{ x: ["0%", "-50%"] }} 
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center mx-6">
            {item as string} <GeoShape type="circle" color={colors.dark} className="w-4 h-4 mx-6" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Button = ({ children, className = "", variant = "primary" }) => {
  const base = "inline-flex items-center gap-4 px-8 py-4 font-sans uppercase font-black tracking-widest text-sm transition-all duration-300 border-2 border-[#1C1C1C]";
  const variants = {
    primary: `${colors.yellow} ${colors.textDark} hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1C1C1C]`,
    secondary: `bg-white ${colors.textDark} hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1C1C1C]`,
    dark: `${colors.dark} ${colors.textLight} hover:-translate-y-1 hover:shadow-[4px_4px_0px_#DF2028]`,
    red: `${colors.red} ${colors.textLight} hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1C1C1C]`,
  };
  
  return (
    <button className={`${base} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
      <ArrowRight className="w-5 h-5" />
    </button>
  );
};

// --- SEÇÕES PRINCIPAIS ---

const Navbar = () => (
  <nav className="absolute top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 text-white mix-blend-difference">
    <div className="flex items-center gap-5">
      <NPLogo light />
      <div className="font-sans font-black text-sm uppercase tracking-widest hidden sm:block mt-1">
        A Bancada de Impacto
      </div>
    </div>
    <div className="flex gap-8 font-sans font-bold text-xs uppercase tracking-widest">
      <a href="#essays" className="hover:text-[#FFE65A] transition-colors hidden md:block">Movimento</a>
      <a href="#opportunities" className="hover:text-[#A4CD39] transition-colors hidden md:block">Radar</a>
      <a href="#services" className="hover:text-[#FF6BCA] transition-colors cursor-pointer">Envolva-se</a>
    </div>
  </nav>
);

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] activist-gradient flex flex-col justify-center pt-24 pb-12 px-6 md:px-12 overflow-hidden border-b-8 border-[#1C1C1C]">
      <Navbar />

      {/* Formas Geométricas Flutuantes - ONG Vibe */}
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-[20%] right-[10%] md:right-[20%] z-10"
      >
        <GeoShape type="pillY" color={colors.pink} className="w-12 md:w-20 h-32 md:h-48 border-4 border-[#1C1C1C] shadow-[8px_8px_0px_rgba(28,28,28,0.5)]" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 30, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[15%] left-[5%] md:left-[10%] z-10"
      >
        <GeoShape type="square" color={colors.yellow} className="w-16 md:w-24 border-4 border-[#1C1C1C] shadow-[-8px_8px_0px_rgba(28,28,28,0.5)] rotate-12" />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }} 
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[40%] left-[60%] md:left-[50%] z-10"
      >
        <GeoShape type="circle" color={colors.blue} className="w-8 md:w-12 border-4 border-[#1C1C1C]" />
      </motion.div>

      <div className="relative z-20 flex flex-col items-start justify-center flex-grow max-w-6xl mx-auto w-full">
        <h1 className="font-display text-[16vw] md:text-[11vw] leading-[0.8] tracking-tighter text-white drop-shadow-md mb-6 uppercase">
          Reivindique <br />
          <span className="text-[#FFE65A]">O Futuro</span>.
        </h1>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 mt-8 bg-white/10 backdrop-blur-sm p-6 rounded-3xl border-2 border-white/30">
          <p className="max-w-md font-sans text-sm md:text-base font-semibold leading-relaxed text-white">
            Uma plataforma para ativismo de alto impacto, análise política e mobilização comunitária. Não viemos para debater, viemos para mudar a estrutura.
          </p>
          <div className="flex gap-4">
            <Button variant="primary">Agir Agora</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedWriting = () => (
  <section id="essays" className="bg-[#F7F7F5] text-[#1C1C1C] py-24 px-6 md:px-12 relative">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none">
          Nossa <br /> <span className="activist-gradient-text">Voz Estratégica</span>
        </h2>
        <p className="font-sans font-bold text-sm uppercase tracking-widest max-w-xs text-right hidden md:block border-l-4 border-[#A4CD39] pl-4">
          Ensaios críticos, educação política e ferramentas de mobilização comunitária.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card Maior */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 group cursor-pointer border-4 border-[#1C1C1C] overflow-hidden bg-white hover:shadow-[8px_8px_0px_#A4CD39] transition-all flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-64 md:h-auto relative border-b-4 md:border-b-0 md:border-r-4 border-[#1C1C1C]">
            <img 
              src="https://images.unsplash.com/photo-1541844053589-346841d0b34c?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
              alt="Protesto"
            />
            <div className="absolute inset-0 bg-[#A4CD39]/20 group-hover:bg-transparent transition-colors"></div>
            <div className="absolute top-4 left-4">
               <Tag text="Mobilização" color={colors.yellow} />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tighter leading-[0.9] mb-6">
              Por que o ativismo corporativo fracassa.
            </h3>
            <p className="font-sans text-sm font-medium opacity-80 leading-relaxed mb-8">
              Um mergulho profundo na cooptação de movimentos radicais e o que o impacto autêntico exige dos organizadores comunitários no cenário atual.
            </p>
            <div className="mt-auto">
               <span className="font-sans font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:text-[#DF2028] transition-colors">
                 Ler Ensaio Completo <ArrowRight className="w-4 h-4" />
               </span>
            </div>
          </div>
        </div>

        {/* Notícias Rápidas */}
        <div className="flex flex-col gap-8">
          {[
            { tag: "Educação", title: "Como estruturar um sindicato local no modelo 2026", color: colors.pink, shape: "circle" },
            { tag: "Clima", title: "A geopolítica da descarbonização nos países em desenvolvimento", color: colors.blue, shape: "square" },
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer border-4 border-[#1C1C1C] p-8 bg-white hover:shadow-[8px_8px_0px_#FF6BCA] transition-all h-full flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <Tag text={item.tag} color={item.color} shape={item.shape as "square" | "circle"} textColor="text-white" />
                <ArrowRight className="w-6 h-6 opacity-30 group-hover:opacity-100 group-hover:-rotate-45 transition-all" />
              </div>
              <h4 className="font-display text-2xl uppercase tracking-tighter leading-tight mt-auto">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Opportunities = () => (
  <section id="opportunities" className="bg-[#A4CD39] py-24 px-6 md:px-12 border-y-4 border-[#1C1C1C] relative overflow-hidden">
    {/* Formas de fundo */}
    <GeoShape type="circle" color={colors.yellow} className="absolute -bottom-20 -left-20 w-64 opacity-50 shrink-0 border-4 border-[#1C1C1C]" />
    
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
      <div className="col-span-1 lg:col-span-4 flex flex-col justify-between">
         <div>
           <div className="inline-flex items-center gap-3 mb-6">
             <GeoShape type="square" color={colors.red} className="w-6 border-2 border-[#1C1C1C]" />
             <span className="font-sans font-black text-sm uppercase tracking-widest text-[#1C1C1C]">O Radar Ativista</span>
           </div>
           <h2 className="font-display text-5xl md:text-7xl leading-none tracking-tighter uppercase mb-6 text-[#1C1C1C]">
             Oportuni<br/>dades
           </h2>
         </div>
         <p className="font-sans font-semibold text-lg text-[#1C1C1C] mb-8 bg-white p-6 border-4 border-[#1C1C1C] shadow-[6px_6px_0px_#1C1C1C]">
           Vagas, subsídios e bolsas para lideranças que constroem a base e não apenas a marca. Atualizado pela nossa rede.
         </p>
      </div>
      
      <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
        {[
          { type: "Bolsa Formação", title: "Liderança em Justiça Climática", org: "EarthPress", deadline: "15 OUT", tagColor: colors.mint },
          { type: "Fundo Solidário", title: "Micro-Subsídios para Comunidades", org: "Zine Fund", deadline: "01 NOV", tagColor: colors.pink },
          { type: "Vaga", title: "Mobilizador(a) Regional", org: "Instituto Floresta", deadline: "ABERTO", tagColor: colors.blue },
        ].map((item, i) => (
          <div key={i} className="group bg-white border-4 border-[#1C1C1C] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1C1C1C] transition-all p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 cursor-pointer">
            <div>
              <div className="flex items-center gap-3 mb-3">
                 <GeoShape type="circle" color={item.tagColor} className="w-3 border-2 border-[#1C1C1C]" />
                 <span className="font-sans font-black text-xs uppercase tracking-widest">{item.type}</span>
              </div>
              <h4 className="font-display text-2xl uppercase tracking-tighter leading-tight bg-gradient-to-r from-transparent to-transparent group-hover:from-[#FFE65A] group-hover:to-[#FFE65A] bg-[length:100%_12px] bg-no-repeat bg-bottom transition-all">
                {item.title}
              </h4>
              <p className="font-sans font-semibold mt-2 opacity-70">org: {item.org}</p>
            </div>
            
            <div className="w-full sm:w-auto text-center font-sans font-black text-sm uppercase tracking-widest border-2 border-[#1C1C1C] px-6 py-4 bg-[#F7F7F5] group-hover:bg-[#1C1C1C] group-hover:text-white transition-colors">
              PrazO: {item.deadline}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="bg-[#1C1C1C] py-24 px-6 md:px-12 text-[#F7F7F5] relative overflow-hidden">
    {/* Grid Background Pattern */}
    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#F7F7F5 2px, transparent 2px), linear-gradient(90deg, #F7F7F5 2px, transparent 2px)', backgroundSize: '60px 60px' }}></div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-16">
        <GeoShape type="circle" color={colors.red} className="w-12 border-2 border-[#F7F7F5]" />
        <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tighter">
          Nossos <span className="text-[#FFE65A]">Eixos de Ação</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Escola de Formação", desc: "Cursos e materiais para desenvolvimento de novas lideranças comunitárias.", icon: Users, color: "text-[#FF6BCA]", border: "border-[#FF6BCA]" },
          { title: "Incidência Política", desc: "Acompanhamento legislativo e construção de campanhas de pressão pública.", icon: Globe, color: "text-[#A4CD39]", border: "border-[#A4CD39]" },
          { title: "Apoio a Territórios", desc: "Suporte logístico e intelectual para movimentos sociais na linha de frente.", icon: Zap, color: "text-[#3D78E0]", border: "border-[#3D78E0]" }
        ].map((svc, i) => {
          const Icon = svc.icon;
          return (
            <div key={i} className={`p-8 border-4 border-white/20 hover:${svc.border} bg-[#2A2A2A] transition-all group hover:-translate-y-2`}>
              <Icon className={`w-12 h-12 ${svc.color} mb-8`} strokeWidth={2.5} />
              <h3 className="font-display text-3xl uppercase tracking-tighter mb-4 text-white">{svc.title}</h3>
              <p className="font-sans font-medium opacity-80 leading-relaxed min-h-[5rem] text-sm md:text-base">
                {svc.desc}
              </p>
              <div className="mt-8 pt-6 border-t font-sans font-black text-xs uppercase tracking-widest border-white/10 group-hover:border-current flex items-center justify-between">
                <span>Conheça os Projetos</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </section>
);

const NewsletterSignup = () => (
  <section className="bg-[#4477DE] py-24 px-6 md:px-12 border-b-8 border-[#1C1C1C]">
    <div className="max-w-5xl mx-auto bg-[#FFE65A] border-4 border-[#1C1C1C] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center shadow-[12px_12px_0px_#1C1C1C]">
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 mb-4">
           <Zap className="w-6 h-6 text-[#DF2028] fill-current" />
           <span className="font-sans font-black text-xs uppercase tracking-widest text-[#1C1C1C]">Rede de Mobilização</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-[#1C1C1C] leading-none mb-4">
          Junte-se ao <br /> Movimento.
        </h2>
        <p className="font-sans font-bold text-[#1C1C1C]/80">
          Receba despachos estratégicos, convocações de ação e atualizações das frentes de luta. Sem spam.
        </p>
      </div>
      
      <div className="flex-1 w-full relative">
        {/* Adereços Geométricos locais */}
        <GeoShape type="circle" color={colors.red} className="absolute -top-6 -right-6 w-12 border-2 border-[#1C1C1C] z-20" />
        <GeoShape type="square" color={colors.mint} className="absolute -bottom-6 -left-6 w-12 border-2 border-[#1C1C1C] z-0" />
        
         <form className="flex flex-col gap-4 relative z-10 bg-white p-6 border-4 border-[#1C1C1C]">
            <input 
              type="email" 
              placeholder="Digite seu email..." 
              className="w-full bg-[#F7F7F5] border-2 border-[#1C1C1C] px-6 py-4 font-sans font-bold text-lg text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none focus:bg-white transition-colors"
            />
            <Button variant="red" className="w-full justify-center">Quero Fazer Parte</Button>
         </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#F7F7F5] text-[#1C1C1C] pt-20 pb-8 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 border-b-4 border-[#1C1C1C] pb-16 mb-8">
      <div>
        <div className="mb-8 flex justify-start">
          <NPLogo />
        </div>
        <div className="font-display text-3xl md:text-5xl uppercase tracking-tighter mb-4 leading-none">
          Núcleo Pela <br/> Luta Social.
        </div>
        <p className="font-sans font-bold text-sm text-[#1C1C1C]/60 max-w-sm">
          Apoio estratégico, comunicação e infraestrutura financeira para os movimentos que ousam desenhar um novo amanhã.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-20 font-sans font-black text-sm uppercase tracking-widest">
         <div className="flex flex-col gap-4 border-l-4 border-[#FFE65A] pl-6">
            <a href="#" className="hover:text-[#DF2028] transition-colors">Quem Somos</a>
            <a href="#" className="hover:text-[#DF2028] transition-colors">Manifesto</a>
            <a href="#" className="hover:text-[#DF2028] transition-colors">Transparência</a>
         </div>
         <div className="flex flex-col gap-4 border-l-4 border-[#FF6BCA] pl-6">
            <a href="#" className="hover:text-[#FFE65A] transition-colors">Doe Agora</a>
            <a href="#" className="hover:text-[#FFE65A] transition-colors">Seja Voluntário</a>
            <a href="#" className="hover:text-[#FFE65A] transition-colors">Contato</a>
         </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 font-sans font-bold text-[10px] uppercase tracking-widest text-[#1C1C1C]/60">
      <p>© 2026 ORGANIZAÇÃO NÃO GOVERNAMENTAL "NP". TODOS OS DIREITOS RESERVADOS.</p>
      <div className="flex gap-4">
        <span className="hover:text-[#1C1C1C] cursor-pointer">POLÍTICA DE PRIVACIDADE</span>
        <span>•</span>
        <span className="hover:text-[#1C1C1C] cursor-pointer">TERMOS DE USO</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="antialiased selection:bg-[#FFE65A] selection:text-[#1C1C1C] flex flex-col bg-[#F7F7F5]">
      <main className="flex-grow">
        <Hero />
        <Marquee text="POR DEMOCRACIA, TERRITÓRIO E JUSTIÇA SOCIAL" />
        <FeaturedWriting />
        <Opportunities />
        <Services />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
}
