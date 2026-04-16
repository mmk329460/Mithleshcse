import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Upload, 
  Award, 
  FileText, 
  Code2, 
  GraduationCap, 
  User, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Layout,
  Coffee,
  Sparkles,
  Cpu,
  Globe,
  Smartphone,
  Trash2,
  Lock,
  Unlock,
  Key,
  ChevronDown,
  ChevronUp,
  FolderOpen
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('portfolioDocs');
    return saved ? JSON.parse(saved) : [];
  });
  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('portfolioCerts');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDocsExpanded, setIsDocsExpanded] = useState(false);
  const [isCertsExpanded, setIsCertsExpanded] = useState(false);
  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem('portfolioResume');
    return saved ? JSON.parse(saved) : null;
  });
  const [userPin, setUserPin] = useState(() => localStorage.getItem('portfolioPin') || "");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");

  // NOTE: LocalStorage is device-specific. To see documents on both Laptop and Phone, 
  // you must use a Backend Database like Supabase or Firebase.
  // Contact me if you want help setting up a cloud database for real-time sync!
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isImageHovered, setIsImageHovered] = useState(false);



  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    localStorage.setItem('portfolioDocs', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('portfolioCerts', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    if (resume) localStorage.setItem('portfolioResume', JSON.stringify(resume));
  }, [resume]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size too large for local storage (Max 2MB).");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const fileData = {
          id: Date.now(),
          name: file.name,
          date: new Date().toLocaleDateString(),
          url: reader.result,
          size: (file.size / 1024).toFixed(2) + ' KB'
        };
        if (type === 'doc') {
          setDocuments([...documents, fileData]);
          setIsUnlocked(false); // Auto-lock after adding
          alert("Document added and secured successfully!");
        }
        else if (type === 'cert') {
          setCertificates([...certificates, fileData]);
          setIsUnlocked(false); // Auto-lock after adding
          alert("Certificate added and secured successfully!");
        }
        else if (type === 'resume') setResume(fileData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerifyPin = () => {
    if (pinInput === userPin) {
      setIsUnlocked(true);
      setShowPinModal(false);
      setPinInput("");
    } else {
      alert("Incorrect PIN!");
    }
  };

  const handleSetPin = () => {
    if (pinInput.length < 4) {
      alert("PIN must be at least 4 digits.");
      return;
    }
    localStorage.setItem('portfolioPin', pinInput);
    setUserPin(pinInput);
    setIsUnlocked(true);
    setShowPinModal(false);
    setPinInput("");
    alert("PIN set successfully!");
  };

  const handleDelete = (id, type) => {
    if (type === 'doc') {
      setDocuments(documents.filter(doc => doc.id !== id));
    } else {
      setCertificates(certificates.filter(cert => cert.id !== id));
    }
  };




  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <Layout className="w-5 h-5" /> },
    { id: 'about', label: 'About', icon: <User className="w-5 h-5" /> },
    { id: 'skills', label: 'Skills', icon: <Code2 className="w-5 h-5" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-5 h-5" /> },
    { id: 'docs', label: 'Documents', icon: <FileText className="w-5 h-5" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
  ];


  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-blue-500 pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: 'spring', damping: 15, stiffness: 350, mass: 0.2 }}
      />

      {/* Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-bg w-[500px] h-[500px] bg-blue-600/10 top-[-20%] left-[-10%]" />
        <div className="glow-bg w-[600px] h-[600px] bg-purple-600/10 bottom-[-20%] right-[-10%]" />
        <div className="glow-bg w-[400px] h-[400px] bg-indigo-600/10 top-[40%] right-[20%]" />
        <div className="absolute inset-0 mesh-gradient opacity-40" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[90] bg-[#020617]/50 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent cursor-pointer flex items-center gap-2"
            onClick={() => scrollToSection('home')}
          >
            <Sparkles className="text-blue-400 w-8 h-8" />
            <span className="tracking-tighter">PORTFOLIO</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link text-sm ${activeSection === item.id ? 'text-blue-400 after:w-full' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a 
                href={resume ? resume.url : '#'} 
                download={resume ? resume.name : 'resume.pdf'}
                className={`btn-primary group ${!resume ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-4 h-4" /> {resume ? 'Download Resume' : 'No Resume'}
                </span>
              </a>
              <label className="p-4 glass-card hover:bg-white/5 cursor-pointer text-blue-400 group transition-all" title="Upload Resume">
                <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'resume')} />
              </label>
            </div>
          </motion.div>


          <button className="md:hidden text-white p-2 glass-card rounded-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                className="absolute top-0 right-0 h-screen w-3/4 bg-[#020617]/95 backdrop-blur-3xl border-l border-white/10 md:hidden p-10 flex flex-col gap-8 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-10">
                  <span className="text-xl font-bold text-gradient">Menu</span>
                  <X className="cursor-pointer" onClick={() => setIsMenuOpen(false)} />
                </div>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { scrollToSection(item.id); setIsMenuOpen(false); }}
                    className="flex items-center gap-6 text-2xl font-medium text-slate-400 hover:text-white transition-all transform hover:translate-x-4"
                  >
                    <span className="p-3 glass-card text-blue-400">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                
                <div className="mt-auto pt-10 border-t border-white/5 space-y-4">
                  <a 
                    href={resume ? resume.url : '#'} 
                    download={resume ? resume.name : 'resume.pdf'}
                    className={`btn-primary w-full flex justify-center items-center gap-3 ${!resume ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <Download className="w-5 h-5" /> {resume ? 'Download Resume' : 'Set Resume First'}
                  </a>
                  <label className="btn-primary from-blue-600 to-indigo-600 w-full flex justify-center items-center gap-3 cursor-pointer">
                    <Upload className="w-5 h-5" /> Upload Resume
                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'resume')} />
                  </label>
                </div>
              </motion.div>

            )}
          </AnimatePresence>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center px-6 pt-20">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                Namaste / Welcome to my space
              </motion.div>

              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.85] tracking-tighter">
                Hello,I am <br />
                <span className="text-gradient">Mithlesh Kumar</span> <br />
                <div className="text-4xl md:text-6xl lg:text-7xl text-slate-500 mt-8 opacity-80 tracking-[0.2em] font-light uppercase">
                  Creative Developer
                </div>
              </h1>


              
              <p className="text-slate-400 text-lg md:text-xl lg:text-2xl mb-12 max-w-xl leading-relaxed font-light">
                Crafting digital experiences that merge <span className="text-white font-medium">unparalleled design</span> with cutting-edge <span className="text-white font-medium">engineering</span>.
              </p>

              
              <div className="flex flex-wrap gap-6">
                <button className="btn-primary scale-110">Start a Project</button>
                <button className="px-10 py-5 rounded-2xl glass-card font-bold hover:bg-white/5 transition-all flex items-center gap-2 border-white/5">
                  My Work <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex gap-8 mt-16">
                {[
                  { Icon: Github, href: "https://github.com/" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/mithlesh-kumar-12ab51318/" },
                  { Icon: Mail, href: "mailto:mithleshkumar329460@gmail.com" }
                ].map(({ Icon, href }, i) => (
                  <motion.a 
                    key={i} 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="p-4 glass-card rounded-2xl text-slate-400 hover:text-blue-400 hover:border-blue-400/30 group transition-all"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
              className="relative aspect-square max-w-md mx-auto lg:max-w-none group"
            >
              <div className="absolute inset-0 bg-blue-500/20 rounded-[3rem] blur-3xl animate-pulse" />
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden glass-card p-2 animate-float">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={isImageHovered ? 'hover' : 'main'}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    src={isImageHovered ? "/profile-2.jpg" : "/profile-1.jpg"} 
                    alt="Mithlesh Kumar"


                    className="w-full h-full object-cover rounded-[2.5rem] brightness-90 group-hover:brightness-110 transition-all duration-700"
                  />
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-blue-400 font-bold uppercase tracking-widest">Based in</p>
                      <h4 className="text-xl font-bold">Bharat, Earth</h4>
                    </div>
                    <Coffee className="w-8 h-8 text-white/50" />
                  </div>
                </div>
              </div>

              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-10 p-6 glass-card rounded-3xl hidden lg:block"
              >
                <Cpu className="text-blue-400 w-10 h-10" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 p-6 glass-card rounded-3xl hidden lg:block"
              >
                 <Globe className="text-purple-400 w-10 h-10" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h6 className="text-blue-400 font-bold tracking-[0.3em] uppercase mb-6">Expertise</h6>
                <h2 className="text-5xl md:text-7xl font-black mb-12">I design and build <br /><span className="text-gradient">digital magic.</span></h2>
                <div className="space-y-8 text-slate-400 text-lg leading-relaxed">
                  <p>
                    With a deep obsession for detail, I engineer fluid animations and robust backends that don't just work—they feel alive. My philosophy is simple: software should be invisible but impactful.
                  </p>
                  <p>
                    I specialize in full-stack architecture with a focus on React, Java, and performance optimization.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-12 mt-16">
                  {[
                    { val: "B. Tech", label: "Current Focus" },
                    { val: "10+", label: "Projects" },
                    { val: "7.22", label: "Current CGPA" },
                    { val: "100%", label: "Dedication" }
                  ].map((stat, i) => (
                    <div key={i} className="group cursor-default">
                      <h4 className="text-5xl font-black text-white group-hover:text-blue-400 transition-all mb-2">{stat.val}</h4>
                      <p className="text-sm text-slate-500 uppercase font-black tracking-widest">{stat.label}</p>
                    </div>
                  ))}

                </div>
              </motion.div>
              
              <div className="order-1 lg:order-2">
                <div className="relative group">
                   <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-700" />
                   <div className="relative glass-card p-3 rounded-[3rem] overflow-hidden">
                      <img 
                        src="/profile-1.jpg" 
                        alt="Mithlesh Kumar" 
                        className="w-full aspect-[4/5] object-cover rounded-[2.5rem]"
                      />
                   </div>
                   
                   {/* Artistic elements */}
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                   <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Skills Section - Bento Grid */}
        <section id="skills" className="py-40 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-black mb-6">Tech Mastery</h2>
              <p className="text-slate-400 text-xl font-light">Tools I use to bring ideas into reality.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Java', icon: '☕', desc: 'Enterprise Logic' },
                { name: 'DSA', icon: '📊', desc: 'Efficiency & Speed' },
                { name: 'HTML5', icon: '🌐', desc: 'Core Structure' },
                { name: 'CSS3', icon: '🎨', desc: 'Visual Artistry' },
                { name: 'JavaScript', icon: '⚡', desc: 'Dynamic Magic' },
                { name: 'React', icon: '⚛️', desc: 'Modern UI' },
                { name: 'Tailwind', icon: '🌊', desc: 'Styling Velocity' },
                { name: 'Git', icon: '🌳', desc: 'Version Control' },
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-card p-10 flex flex-col justify-between h-[280px] group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-all" />
                  <span className="text-6xl mb-6 transform group-hover:scale-110 transition-all origin-left">{skill.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{skill.name}</h3>
                    <p className="text-slate-500 text-sm font-medium">{skill.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-40 px-6 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
             <div className="flex items-center gap-10 mb-24">
               <h2 className="text-5xl md:text-7xl font-black whitespace-nowrap">Education Journey</h2>
               <div className="h-[2px] w-full bg-gradient-to-r from-blue-500/50 to-transparent" />
             </div>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="p-1 glass-card bg-gradient-to-br from-blue-500/10 to-transparent group"
                >
                  <div className="p-12 h-full rounded-[1.7rem] bg-[#020617]/40">
                    <GraduationCap className="text-blue-400 w-16 h-16 mb-8 group-hover:scale-110 transition-transform" />
                    <span className="text-blue-500 text-sm font-black tracking-widest mb-4 block">GRADUATED 2021</span>
                    <h3 className="text-4xl font-bold mb-6">High School (10th)</h3>
                    <p className="text-slate-400 mb-10 text-lg leading-relaxed">Achieved academic excellence with a focus on science and mathematics, Social Science,Sanskrit,English,Hindi.</p>
                    <div className="flex items-center gap-4">
                       <div className="text-6xl font-black text-gradient">61%</div>
                       <div className="w-12 h-[2px] bg-slate-800" />
                       <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Score</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   className="p-1 glass-card bg-gradient-to-br from-purple-500/10 to-transparent group"
                >
                  <div className="p-12 h-full rounded-[1.7rem] bg-[#020617]/40">
                    <Award className="text-purple-400 w-16 h-16 mb-8 group-hover:scale-110 transition-transform" />
                    <span className="text-purple-500 text-sm font-black tracking-widest mb-4 block">GRADUATED 2023</span>
                    <h3 className="text-4xl font-bold mb-6">Intermediate (12th)</h3>
                    <p className="text-slate-400 mb-10 text-lg leading-relaxed">Specialized in PCMEH (Physics, Chemistry, Maths,English,Hindi).</p>
                    <div className="flex items-center gap-4">
                       <div className="text-6xl font-black text-gradient from-purple-400 to-pink-500">60%</div>
                       <div className="w-12 h-[2px] bg-slate-800" />
                       <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Score</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, x: 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   className="p-1 glass-card bg-gradient-to-br from-cyan-500/10 to-transparent group"
                >
                  <div className="p-12 h-full rounded-[1.7rem] bg-[#020617]/40">
                    <Cpu className="text-cyan-400 w-16 h-16 mb-8 group-hover:scale-110 transition-transform" />
                    <span className="text-cyan-500 text-sm font-black tracking-widest mb-4 block uppercase">Currently Pursuing</span>
                    <h3 className="text-4xl font-bold mb-6">B. Tech CSE</h3>
                    <p className="text-slate-400 mb-10 text-lg leading-relaxed">Focusing on Computer Science & Engineering. Mastering algorithms, full-stack development, and modern technologies.</p>
                    <div className="flex items-center gap-4">
                       <div className="text-6xl font-black text-gradient from-cyan-400 to-blue-500">7.22</div>
                       <div className="w-12 h-[2px] bg-slate-800" />
                       <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">CGPA</span>
                    </div>
                  </div>
                </motion.div>
             </div>

          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-2xl">
                <h6 className="text-blue-400 font-bold tracking-[0.3em] uppercase mb-6">Gallery</h6>
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Personal & <br /><span className="text-gradient">Academic Works</span></h2>
                <p className="text-slate-400 text-xl font-light">A curated selection of projects that define my technical evolution.</p>
              </div>
              <a 
                href="https://github.com/mithleshkumar329460-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 rounded-2xl glass-card font-bold hover:bg-blue-500 hover:text-white transition-all bg-white/5 border-white/5"
              >
                Explore All Github
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {[
                { 
                  title: "Smart Portfolio", 
                  type: "Web Innovation", 
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426",
                  tech: ["React", "Framer Motion", "Tailwind"],
                  github: "https://github.com/mithleshkumar329460-hub/K73",
                  demo: "#"
                },
                { 
                  title: "Crypto Dashboard", 
                  type: "FinTech App", 
                  image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232",
                  tech: ["Java", "Spring Boot", "MySQL"],
                  github: "https://github.com/mithleshkumar329460-hub/K73",
                  demo: "#"
                }
              ].map((project, i) => (

                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative h-[600px] rounded-[3rem] overflow-hidden glass-card"
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 brightness-50 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-all" />
                  
                  <div className="absolute inset-0 p-12 flex flex-col justify-end">
                    <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-4 block">{project.type}</span>
                      <h3 className="text-4xl md:text-5xl font-black mb-6">{project.title}</h3>
                      <div className="flex flex-wrap gap-3 mb-8 opacity-0 group-hover:opacity-100 transition-all delay-100">
                        {project.tech.map((t, idx) => (
                          <span key={idx} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase border border-white/10">{t}</span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <motion.a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: 5 }} 
                          className="w-14 h-14 glass-card flex items-center justify-center rounded-2xl bg-white/5 hover:bg-blue-500 hover:text-white transition-all"
                        >
                          <Github size={20} />
                        </motion.a>
                        <motion.a 
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: -5 }} 
                          className="w-14 h-14 glass-card flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white hover:text-black transition-all"
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="docs" className="py-40 px-6 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
               variants={sectionVariants} initial="hidden" whileInView="visible"
               className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12"
            >
              <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight line-clamp-2">Credentials Center</h2>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`px-4 py-2 rounded-full glass-card flex items-center gap-3 ${isUnlocked ? 'text-green-400 border-green-500/20' : 'text-red-400 border-red-500/20'}`}>
                    {isUnlocked ? <Unlock size={18} /> : <Lock size={18} />}
                    <span className="text-sm font-bold uppercase tracking-widest">{isUnlocked ? 'Vault Unlocked' : 'Vault Locked'}</span>
                  </div>
                  <button 
                    onClick={() => setShowPinModal(true)}
                    className="p-2 glass-card hover:bg-white/5 transition-all text-blue-400"
                    title={userPin ? "Change/Unlock PIN" : "Set Security PIN"}
                  >
                    <Key size={18} />
                  </button>
                  {isUnlocked && (
                    <button onClick={() => setIsUnlocked(false)} className="text-xs text-slate-500 hover:text-white underline">Lock Now</button>
                  )}
                </div>
                <p className="text-slate-400 text-xl font-light leading-relaxed">Securely store and share your academic and professional achievements with the world.</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="btn-primary flex items-center gap-3 cursor-pointer group shadow-blue-500/20">
                  <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> 
                  <span className="relative z-10">Add Document</span>
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'doc')} />
                </label>
                <label className="btn-primary from-purple-600 to-pink-600 flex items-center gap-3 cursor-pointer group shadow-purple-500/20">
                  <Award className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> 
                  <span className="relative z-10">Add Certificate</span>
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'cert')} />
                </label>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Docs Column */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-4 text-blue-400 uppercase tracking-widest">
                  <FileText className="w-8 h-8" /> Records
                </h3>
                
                {/* Vault Summary Card */}
                <button 
                  onClick={() => setIsDocsExpanded(!isDocsExpanded)}
                  className="w-full glass-card p-6 flex items-center justify-between group hover:border-blue-500/50 transition-all text-left"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                      <FolderOpen className="text-blue-400 w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-xl mb-1">Documents Vault</p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{documents.length} Files Stored</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-white/5 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    {isDocsExpanded ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </button>

                <div className="grid gap-4 overflow-hidden">
                  <AnimatePresence>
                    {isDocsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4"
                      >
                        {documents.length === 0 && (
                          <div className="p-8 glass-card border-dashed border-2 border-white/5 text-center text-slate-600 italic">
                            No documents uploaded.
                          </div>
                        )}
                        {documents.map((doc) => (
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            key={doc.id} 
                            className="glass-card p-6 flex items-center justify-between group hover:border-blue-500/50 bg-white/[0.02]"
                          >
                            <div className="flex items-center gap-6">
                              <div className="w-12 h-12 bg-blue-500/5 rounded-xl flex items-center justify-center group-hover:bg-blue-500/10 transition-all">
                                <FileText className="text-blue-400 w-6 h-6" />
                              </div>
                              <div>
                                <p className="font-bold mb-1">{doc.name}</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{doc.size} • {doc.date}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {isUnlocked ? (
                                <>
                                  <a href={doc.url} download={doc.name} className="p-3 glass-card hover:bg-blue-500 hover:text-white transition-all text-slate-400">
                                    <Download size={18} />
                                  </a>
                                  <button 
                                    onClick={() => handleDelete(doc.id, 'doc')}
                                    className="p-3 glass-card hover:bg-red-500/20 hover:text-red-500 transition-all text-slate-400"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </>
                              ) : (
                                <button onClick={() => setShowPinModal(true)} className="p-3 glass-card text-slate-600 hover:text-blue-400 transition-all flex items-center gap-2">
                                  <Lock size={14} /> <span className="text-[10px] font-bold">Locked</span>
                                </button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Certs Column */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-4 text-purple-400 uppercase tracking-widest">
                  <Award className="w-8 h-8" /> Badges
                </h3>

                 {/* Certificates Vault Card */}
                 <button 
                  onClick={() => setIsCertsExpanded(!isCertsExpanded)}
                  className="w-full glass-card p-6 flex items-center justify-between group hover:border-purple-500/50 transition-all text-left"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
                      <Award className="text-purple-400 w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-xl mb-1">Certificates Vault</p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{certificates.length} Badges Stored</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-white/5 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    {isCertsExpanded ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </button>

                <div className="grid gap-4 overflow-hidden">
                  <AnimatePresence>
                    {isCertsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4"
                      >
                        {certificates.length === 0 && (
                          <div className="p-8 glass-card border-dashed border-2 border-white/5 text-center text-slate-600 italic">
                            No certificates uploaded.
                          </div>
                        )}
                        {certificates.map((cert) => (
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            key={cert.id} 
                            className="glass-card p-6 flex items-center justify-between group hover:border-purple-500/50 bg-white/[0.02]"
                          >
                            <div className="flex items-center gap-6">
                              <div className="w-12 h-12 bg-purple-500/5 rounded-xl flex items-center justify-center group-hover:bg-purple-500/10 transition-all">
                                <Award className="text-purple-400 w-6 h-6" />
                              </div>
                              <div>
                                <p className="font-bold mb-1">{cert.name}</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{cert.size} • {cert.date}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {isUnlocked ? (
                                <>
                                  <a href={cert.url} download={cert.name} className="p-3 glass-card hover:bg-purple-500 hover:text-white transition-all text-slate-400">
                                    <Download size={18} />
                                  </a>
                                  <button 
                                    onClick={() => handleDelete(cert.id, 'cert')}
                                    className="p-3 glass-card hover:bg-red-500/20 hover:text-red-500 transition-all text-slate-400"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </>
                              ) : (
                                <button onClick={() => setShowPinModal(true)} className="p-3 glass-card text-slate-600 hover:text-purple-400 transition-all flex items-center gap-2">
                                  <Lock size={14} /> <span className="text-[10px] font-bold">Locked</span>
                                </button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 px-6">
          <div className="max-w-5xl mx-auto glass-card p-2 relative overflow-hidden bg-gradient-to-br from-blue-500/5 to-purple-500/5">
             <div className="p-16 rounded-[2.8rem] bg-[#020617]/80 backdrop-blur-xl">
               <div className="grid lg:grid-cols-2 gap-20">
                 <div>
                   <h2 className="text-5xl font-black mb-8 leading-tight">Ready to <br /><span className="text-gradient">levitate</span> your <br />brand?</h2>
                   <p className="text-slate-400 text-lg mb-12 font-light">Let's build something that survives the future. Get in touch for collaborations or just a coffee chat.</p>
                   
                   <div className="space-y-6">
                      <div className="flex items-center gap-4 group cursor-pointer">
                         <div className="w-12 h-12 glass-card flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                           <Mail size={20} />
                         </div>
                         <span className="text-lg font-medium">mithleshkumar329460@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-4 group cursor-pointer">
                         <div className="w-12 h-12 glass-card flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                            <Smartphone size={20} />
                         </div>
                         <span className="text-lg font-medium">+91 9234411589</span>
                      </div>
                   </div>
                 </div>

                 <form className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-3">
                       <label className="text-xs font-black uppercase tracking-widest text-slate-500">Name</label>
                       <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all" placeholder="Name" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-xs font-black uppercase tracking-widest text-slate-500">Email</label>
                       <input type="email" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all" placeholder="Email" />
                     </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Message</label>
                      <textarea rows="5" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all" placeholder="Tell me about your amazing vision..."></textarea>
                   </div>
                   <button className="btn-primary w-full py-6 text-xl shadow-2xl">Initialize Contact</button>
                 </form>
               </div>
             </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {showPinModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowPinModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md glass-card p-10 bg-[#020617]/90 border-blue-500/30"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <Key className="text-blue-500" /> 
                  <h3 className="text-2xl font-black italic">{userPin ? 'Unlock Vault' : 'Set Security PIN'}</h3>
                </div>
                <button onClick={() => setShowPinModal(false)}><X /></button>
              </div>
              
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                {userPin 
                  ? "Enter your secret access code to enable downloads and deletions." 
                  : "Create a 4-digit code to protect your personal files. This will be stored locally on this device."}
              </p>

              <div className="space-y-6">
                <input 
                  type="password" 
                  maxLength="4"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="• • • •"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-4xl text-center font-black tracking-[1em] focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all"
                />
                <button 
                  onClick={userPin ? handleVerifyPin : handleSetPin}
                  className="btn-primary w-full py-5 text-lg"
                >
                  {userPin ? 'Verify & Unlock' : 'Set Master PIN'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-20 border-t border-white/5 px-6 bg-[#010413]">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
           <div>
             <div className="text-3xl font-black text-gradient mb-4">PORTFOLIO</div>
             <p className="text-slate-500 text-sm max-w-xs leading-relaxed">Designing tomorrow's web today. Handcrafted with passion, coffee, and pure code.</p>
           </div>
           
            <div className="flex flex-wrap justify-center gap-12">
              {[
                { label: "EXPLORE", items: [{ name: "Work", href: "#projects" }, { name: "About", href: "#about" }, { name: "Contact", href: "#contact" }] },
                { label: "SOCIAL", items: [
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/mithlesh-kumar-12ab51318/" },
                  { name: "GitHub", href: "https://github.com/mithleshkumar329460-hub" },
                  { name: "Twitter", href: "#" },
                  { name: "Behance", href: "#" }
                ]},
                { label: "LEGAL", items: [{ name: "Privacy", href: "#" }, { name: "Cookies", href: "#" }] }
              ].map((col, i) => (
                <div key={i} className="space-y-6">
                  <h6 className="text-xs font-black tracking-[0.3em] text-white/40 uppercase">{col.label}</h6>
                  <ul className="space-y-3">
                    {col.items.map((item, j) => (
                      <li key={j}>
                        <a 
                          href={item.href} 
                          target={item.href.startsWith('http') ? "_blank" : "_self"}
                          rel={item.href.startsWith('http') ? "noopener noreferrer" : ""}
                          className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors text-sm font-medium"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-slate-600 text-xs">© 2026 MITHLESH KUMAR. All rights reserved.</p>
           <div className="flex items-center gap-2 text-slate-600 text-xs">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             System Status: Optimized
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

