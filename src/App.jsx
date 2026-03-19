import { useEffect, useRef, useState } from 'react';
import './index.css';

const projects = [
  {
    title: "FindMeCourts",
    description: "FindMeCourts is a user-friendly platform that allows you to quickly locate and book nearby tennis, pickleball, badminton courts, soccer turfs, and sports events in just three clicks.",
    tags: ["React", "JavaScript", "jQuery", "Amazon S3", "AWS"]
  },
  {
    title: "QuizWizard",
    description: "QuizWizard is an online platform that enables users to create, share, and participate in interactive quizzes across various subjects.",
    tags: ["React", "Emotion", "core-js", "jQuery", "Amazon S3", "AWS"]
  },
  {
    title: "Strawket",
    description: "Strawket is an extra-curricular learning platform connecting coaches and kids worldwide.",
    tags: ["JavaScript", "React", "BootStrap", "AWS"]
  },
  {
    title: "ManageUpgrades",
    description: "ManageUpgrades is a platform that provides tools and resources for managing software updates and maintenance modes, offering solutions like a Flutter package for app updates and customizable UI components.",
    tags: ["React.js", "Next.js", "Tailwind", "MongoDB"]
  }
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Scroll Effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Intersection Observer for fade-ins and counters
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          
          // Counter animation logic
          const counters = entry.target.querySelectorAll(".counter");
          if (counters.length > 0 && !entry.target.classList.contains("counted")) {
            entry.target.classList.add("counted");
            counters.forEach(counter => {
              const target = +counter.getAttribute("data-target");
              const duration = 2000;
              const stepTime = Math.abs(Math.floor(duration / target));
              let current = 0;
              const increment = target > 100 ? Math.ceil(target / 50) : 1;
              
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  counter.innerText = target;
                  clearInterval(timer);
                } else {
                  counter.innerText = current;
                }
              }, stepTime);
            });
          }
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach(el => animateOnScroll.observe(el));

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      fadeElements.forEach(el => animateOnScroll.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // Custom cursor logic
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    const matchMedia = window.matchMedia("(any-hover: hover)");
    if (!matchMedia.matches || !cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    let animationFrameId;
    const updateFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      if (follower) {
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
      }
      animationFrameId = requestAnimationFrame(updateFollower);
    };

    document.addEventListener("mousemove", onMouseMove);
    updateFollower();

    const handleMouseEnter = () => {
      cursor.classList.add("hovered");
      follower.classList.add("hovered");
    };
    const handleMouseLeave = () => {
      cursor.classList.remove("hovered");
      follower.classList.remove("hovered");
    };

    const interactiveElements = document.querySelectorAll("a, button, input, .service-card");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={followerRef}></div>

      <header id="header" className={isScrolled ? "scrolled" : ""}>
        <nav className="navbar container">
          <a href="#" className="logo">GEN<span>COFT</span></a>
          <div className="nav-links" style={{ display: isMobileMenuOpen ? 'flex' : '', flexDirection: isMobileMenuOpen ? 'column' : '', position: isMobileMenuOpen ? 'absolute' : '', top: isMobileMenuOpen ? '100%' : '', left: isMobileMenuOpen ? '0' : '', width: isMobileMenuOpen ? '100%' : '', background: isMobileMenuOpen ? 'var(--bg-primary)' : '', padding: isMobileMenuOpen ? '2rem' : '', borderBottom: isMobileMenuOpen ? '1px solid var(--glass-border)' : '' }}>
            <a href="#home" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#services" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a href="#projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
            <a href="#contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </div>
          <button 
            className="theme-toggle" 
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            style={{background:'transparent', border:'none', color:'var(--text-primary)', fontSize:'1.25rem', marginRight:'1rem', cursor:'none'}}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </button>
          <a href="#contact" className="btn btn-primary">Get Started</a>
          <div className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-bg"></div>
          <div className="hero-overlay"></div>
          <div className="container hero-content">
            <h1 className="hero-title reveal-text">Shape The Future<br /><span className="gradient-text">With Gencoft.</span></h1>
            <p className="hero-subtitle reveal-text delay-1">Pioneering standard-defining software and AI solutions that propel your business into the next era of innovation.</p>
            <div className="hero-buttons reveal-text delay-2">
              <a href="#services" className="btn btn-primary btn-lg">Explore Solutions</a>
              <a href="#about" className="btn btn-outline btn-lg"><i className="fas fa-play"></i> Watch Video</a>
            </div>
          </div>
          <div className="scroll-indicator">
            <span>Scroll Down</span>
            <i className="fas fa-arrow-down pb-bounce"></i>
          </div>
        </section>

        <section id="logos" className="logos-section">
          <div className="container">
            <p className="logos-title">TRUSTED BY INNOVATIVE TEAMS WORLDWIDE</p>
            <div className="logos-track">
              <div className="logos-list">
                <span><i className="fab fa-aws"></i> Amazon Web Services</span>
                <span><i className="fab fa-google"></i> Google Cloud</span>
                <span><i className="fab fa-microsoft"></i> Microsoft Azure</span>
                <span><i className="fab fa-github"></i> GitHub</span>
                <span><i className="fab fa-slack"></i> Slack</span>
                <span><i className="fab fa-aws"></i> Amazon Web Services</span>
                <span><i className="fab fa-google"></i> Google Cloud</span>
                <span><i className="fab fa-microsoft"></i> Microsoft Azure</span>
                <span><i className="fab fa-github"></i> GitHub</span>
                <span><i className="fab fa-slack"></i> Slack</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="container">
            <div className="about-grid">
              <div className="about-content fade-in">
                <h2 className="section-subtitle">WHO WE ARE</h2>
                <h3 className="section-title">Redefining What's <span className="gradient-text">Possible</span></h3>
                <p>At Gencoft, we engineer high-performance software tailored to the unique demands of global enterprises. Our mission is to seamlessly merge design aesthetics with flawless functionality to create an unmatched user experience.</p>
                <ul className="about-features">
                  <li><i className="fas fa-check-circle"></i> Industry-leading standards</li>
                  <li><i className="fas fa-check-circle"></i> Scalable architecture</li>
                  <li><i className="fas fa-check-circle"></i> Cutting-edge security</li>
                </ul>
                <a href="#about" className="btn btn-secondary mt-2">Learn More</a>
              </div>
              <div className="about-image-wrapper fade-in delay-1">
                <div className="glass-card flex-center">
                  <div className="metrics">
                    <div className="metric">
                      <h4 className="counter" data-target="99">0</h4><span>%</span>
                      <p>Client Satisfaction</p>
                    </div>
                    <div className="metric">
                      <h4 className="counter" data-target="24">0</h4><span>/7</span>
                      <p>Support Access</p>
                    </div>
                    <div className="metric">
                      <h4 className="counter" data-target="50">0</h4><span>M+</span>
                      <p>Lines of Code</p>
                    </div>
                  </div>
                </div>
                <div className="glow-bg"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="container">
            <div className="text-center fade-in">
              <h2 className="section-subtitle">OUR SOLUTIONS</h2>
              <h3 className="section-title">End-to-End <span className="gradient-text">Capabilities</span></h3>
              <p className="section-desc">We deliver comprehensive technology stacks to transform your ideas into reality.</p>
            </div>
            
            <div className="services-grid">
              <div className="service-card glass-panel fade-in delay-1">
                <div className="service-icon"><i className="fas fa-laptop-code"></i></div>
                <h4>Web Engineering</h4>
                <p>Bespoke web applications built on modern frameworks for maximum performance and unparalleled aesthetics.</p>
              </div>
              <div className="service-card glass-panel fade-in delay-2">
                <div className="service-icon"><i className="fas fa-brain"></i></div>
                <h4>Artificial Intelligence</h4>
                <p>Integrate machine learning and predictive analytics to automate workflows and uncover valuable insights.</p>
              </div>
              <div className="service-card glass-panel fade-in delay-3">
                <div className="service-icon"><i className="fas fa-cloud"></i></div>
                <h4>Cloud Infrastructure</h4>
                <p>Robust, scalable, and secure cloud environments engineered for enterprise-grade reliability.</p>
              </div>
              <div className="service-card glass-panel fade-in delay-1">
                <div className="service-icon"><i className="fas fa-mobile-alt"></i></div>
                <h4>Mobile Experiences</h4>
                <p>Cross-platform mobile applications designed to engage users and deliver frictionless digital journeys.</p>
              </div>
              <div className="service-card glass-panel fade-in delay-2">
                <div className="service-icon"><i className="fas fa-shield-alt"></i></div>
                <h4>Cybersecurity</h4>
                <p>Advanced threat protection and vulnerability assessments to keep your corporate data uncompromised.</p>
              </div>
              <div className="service-card glass-panel fade-in delay-3">
                <div className="service-icon"><i className="fas fa-chart-line"></i></div>
                <h4>Data Analytics</h4>
                <p>Transform raw data into actionable intelligence with our high-end visualization tools.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="container">
            <div className="text-center fade-in">
              <h2 className="section-title">Our Projects</h2>
              <p className="section-desc" style={{marginBottom: "3rem"}}>Featured work that showcases our expertise</p>
            </div>
            
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card fade-in" style={{animationDelay: `${index * 0.15}s`}}>
                  <h4 className="project-title">{project.title}</h4>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <a href="#" className="btn-project-view">View Project</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="cta-section">
          <div className="container">
            <div className="cta-box glass-card fade-in">
              <h2>Ready to Build the <span className="gradient-text">Future?</span></h2>
              <p>Join forces with Gencoft and accelerate your digital transformation today.</p>
              <a href="#contact" className="btn btn-primary btn-lg mt-2">Start a Project</a>
              <div className="glow-bg"></div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo">GEN<span>COFT</span></a>
              <p>Elevating digital experiences through cutting-edge engineering and visionary design. We build standard-defining software.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-github"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">News</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Case Studies</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Help Center</a></li>
              </ul>
            </div>
            <div className="footer-newsletter">
              <h4>Subscribe</h4>
              <p>Get the latest updates and news delivered to your inbox.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i></button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Gencoft Inc. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
