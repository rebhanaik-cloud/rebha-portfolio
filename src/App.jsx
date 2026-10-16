import { useState } from 'react';
import HeroCharacter from './components/HeroCharacter';
import PortfolioChatbot from './components/PortfolioChatbot';
import './App.css';

const projects = [
  {
    number: '01',
    category: 'HEALTHCARE',
    title: 'Arogyamitra',
    description:
      'A healthcare solution concept focused on addressing real-world health challenges and improving patient care access.',
    tags: ['Healthcare', 'Innovation', 'Accessibility'],
    featured: true,
  },
  {
    number: '02',
    category: 'SMART INDIA HACKATHON',
    title: 'Decode',
    description:
      'A technology project exploring creative digital problem-solving and rapid prototyping for hackathon challenges.',
    tags: ['Technology', 'Problem Solving', 'SIH'],
    featured: true,
  },
  {
    number: '03',
    category: 'SMART INDIA HACKATHON',
    title: 'SEHAT',
    description:
      'A health-surveillance platform concept engineered for proactive community health monitoring and predictive analytics.',
    tags: ['Health Tech', 'Analytics', 'SIH'],
    featured: true,
  },
  {
    number: '04',
    category: 'SMART INDIA HACKATHON',
    title: 'DNK Portal',
    description:
      'A comprehensive digital platform concept developed around national hackathon problem statements for streamlined workflow delivery.',
    tags: ['Digital Platform', 'Workflows', 'SIH'],
    featured: false,
  },
  {
    number: '05',
    category: 'CAMPUS TECHNOLOGY',
    title: 'Smart Navigator',
    description:
      'An intuitive campus navigation solution designed to help visitors and students effortlessly locate buildings, departments, and amenities.',
    tags: ['React', 'Interactive Maps', 'Navigation'],
    featured: false,
  },
  {
    number: '06',
    category: 'WELLNESS TECHNOLOGY',
    title: 'WellNexus',
    description:
      'A personalized wellness platform connecting fitness metrics, nutrition tracking, sleep optimization, and mental well-being.',
    tags: ['AI', 'Wellness', 'Personalization'],
    featured: false,
  },
  {
    number: '07',
    category: 'SUSTAINABILITY',
    title: 'Decentralized Carbon Credit Marketplace',
    description:
      'A transparent marketplace concept exploring verified carbon-credit issuance and decentralized trading for climate action.',
    tags: ['Blockchain', 'Web3', 'Climate Action'],
    featured: false,
  },
];

const skills = [
  'C',
  'Python',
  'JavaScript',
  'React',
  'HTML & CSS',
  'Git & GitHub',
  'SQL & Databases',
  'Problem Solving',
  'Data Structures',
  'UI/UX Design',
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="portfolio-app">
      {/* Top Navigation */}
      <header className="navbar">
        <a href="#home" className="logo" aria-label="Rebha Naik Portfolio Home">
          R<span>.</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {['About', 'Education', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        <a className="nav-contact-btn" href="#contact">
          Let's Connect ↗
        </a>
      </header>

      <main>
        {/* Luxury 3D Hero Section */}
        <section className="hero-section" id="home">
          <div className="hero-inner">
            {/* Left Content Column */}
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="live-indicator-dot" />
                <span>COMPUTER SCIENCE & ENGINEERING</span>
              </div>

              <h1 className="hero-title">
                Hi, I'm <br />
                <span className="highlight-text">Rebha Naik.</span>
              </h1>

              <p className="hero-role-banner">
                STUDENT <span>·</span> ASPIRING DEVELOPER <span>·</span> CREATIVE THINKER
              </p>

              <p className="hero-description">
                Computer Science & Engineering student at BMSIT&M dedicated to building
                impactful technology, intelligent software solutions, and award-winning
                digital experiences.
              </p>

              <div className="hero-education-card">
                <div className="education-icon-box">🎓</div>
                <div className="education-details">
                  <strong>BMS Institute of Technology & Management</strong>
                  <span>B.E. — Computer Science & Engineering</span>
                </div>
              </div>

              {/* Call-to-Action Group */}
              <div className="hero-actions">
                <a href="#projects" className="btn-primary">
                  <span>Explore My Work</span>
                  <span className="btn-arrow">↗</span>
                </a>
                <a href="#contact" className="btn-secondary">
                  <span>Get in Touch</span>
                </a>
              </div>

              {/* Verified Social Quick-links */}
              <div className="hero-socials">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                  aria-label="GitHub Profile"
                >
                  <svg className="social-svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="social-svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                <a
                  href="mailto:rebhanaik@gmail.com"
                  className="social-pill"
                  aria-label="Email Rebha Naik directly"
                >
                  <svg className="social-svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span>rebhanaik@gmail.com</span>
                </a>
              </div>

              <div className="hero-micro-note">
                <span>✦ Curious by nature. Building with purpose.</span>
              </div>
            </div>

            {/* Right Centerpiece: Interactive Cursor-Tracked 3D Character */}
            <div className="hero-visual-column">
              <HeroCharacter />
            </div>
          </div>
        </section>

        {/* Highlight Stats Strip */}
        <section className="stats-strip" aria-label="Key Highlights">
          <div className="stat-card">
            <strong>07</strong>
            <span>PROJECTS & CONCEPTS</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-card">
            <strong>03</strong>
            <span>SMART INDIA HACKATHONS</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-card">
            <strong>∞</strong>
            <span>CURIOUS MIND & LEARNING</span>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="content-section">
          <div className="section-header">
            <span className="section-pill">GET TO KNOW ME</span>
            <h2>
              Curious mind. <br />
              <span className="accent-gradient-text">Creative soul.</span>
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-text-card">
              <p>
                I'm <strong>Rebha Naik</strong>, a Computer Science and Engineering student
                passionate about building software, working with intelligent algorithms, and
                crafting human-centric digital experiences that solve tangible real-world problems.
              </p>
              <p>
                From ideating healthcare innovations in national hackathons to building campus
                navigation utilities and exploring decentralized climate solutions, I thrive on
                transforming creative ideas into functional, clean code.
              </p>
              <div className="about-quote-box">
                <span className="quote-sparkle">✦</span>
                <p>Learn constantly. Build thoughtfully. Make an impact.</p>
              </div>
            </div>

            <div className="about-stats-card">
              <div className="about-focus-item">
                <span className="focus-num">01</span>
                <div>
                  <h4>Creative Engineering</h4>
                  <p>Blending strong technical foundations with interactive modern aesthetics.</p>
                </div>
              </div>
              <div className="about-focus-item">
                <span className="focus-num">02</span>
                <div>
                  <h4>Hackathon Innovation</h4>
                  <p>National-level problem solving under Smart India Hackathon frameworks.</p>
                </div>
              </div>
              <div className="about-focus-item">
                <span className="focus-num">03</span>
                <div>
                  <h4>Continuous Exploration</h4>
                  <p>Mastering AI technologies, full-stack architectures, and web performance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="content-section">
          <div className="section-header">
            <span className="section-pill">MY ACADEMIC JOURNEY</span>
            <h2>
              Education<span className="accent-dot">.</span>
            </h2>
          </div>

          <article className="education-main-card">
            <div className="education-badge-square">B</div>
            <div className="education-body">
              <span className="education-subtag">UNDERGRADUATE DEGREE</span>
              <h3>B.E. in Computer Science and Engineering</h3>
              <p className="college-title">
                BMS Institute of Technology & Management (BMSIT&M)
              </p>
              <p className="college-description">
                Focus areas include software engineering, algorithms, database management systems,
                web architectures, and emerging digital technologies.
              </p>
            </div>
          </article>
        </section>

        {/* Projects Section */}
        <section id="projects" className="content-section">
          <div className="section-header-split">
            <div>
              <span className="section-pill">A SELECTION OF MY WORK</span>
              <h2>
                Ideas into <span className="accent-gradient-text">projects.</span>
              </h2>
            </div>
            <p className="section-desc-aside">
              Exploring diverse technical challenges through software, healthcare innovation, and
              creative digital problem-solving.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-card-header">
                  <span className="project-number">{project.number}</span>
                  <span className="project-category-badge">{project.category}</span>
                </div>

                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>

                <div className="project-tags-row">
                  {project.tags.map((tag) => (
                    <span className="project-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="content-section">
          <div className="section-header">
            <span className="section-pill">WHAT I USE & LEARN</span>
            <h2>
              My Toolkit<span className="accent-dot">.</span>
            </h2>
            <p className="section-subtext">
              Building a robust foundation through hands-on practice, hackathons, and real-world experiments.
            </p>
          </div>

          <div className="skills-cloud">
            {skills.map((skill) => (
              <div className="skill-chip" key={skill}>
                <span className="chip-sparkle">✦</span>
                <span className="chip-label">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-banner-section">
          <div className="contact-ambient-light" aria-hidden="true" />
          <div className="contact-inner">
            <span className="section-pill">LET'S CONNECT</span>
            <h2>
              Have an idea or opportunity?<br />
              <span className="accent-gradient-text">Let's build something remarkable.</span>
            </h2>
            <p className="contact-subtitle">
              Open to internships, collaborative projects, hackathon teams, and exciting tech discussions.
            </p>

            <div className="contact-actions">
              <a className="btn-primary contact-cta" href="mailto:rebhanaik@gmail.com">
                <span>Email Me Directly</span>
                <span className="btn-arrow">↗</span>
              </a>
            </div>

            <p className="direct-email-text">
              Direct inbox:{' '}
              <a href="mailto:rebhanaik@gmail.com" className="email-link">
                rebhanaik@gmail.com
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-bar">
        <a href="#home" className="logo" aria-label="Back to top">
          R<span>.</span>
        </a>
        <span className="footer-tagline">
          Designed with curiosity & engineering purpose 💜 Rebha Naik
        </span>
        <a href="#home" className="back-to-top">
          Back to top ↑
        </a>
      </footer>

      {/* Interactive AI Chatbot paired with Rebha's Avatar */}
      <PortfolioChatbot />
    </div>
  );
}
