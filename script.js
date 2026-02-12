// ============================================
// PRISHA'S INTERACTIVE PORTFOLIO - ENHANCED
// ============================================

// Color themes for theme switcher
const themes = {
  default: {
    name: 'Warm Sunset',
    black: '#292421',
    copper: '#A75F37',
    pink: '#CA8E82',
    tan: '#D9B99F',
    blush: '#F2E1D6',
    vanilla: '#F2E7DD',
    green: '#7A958F',
    mint: '#BAE0DA',
    lightCream: '#F7F2ED'
  },
  ocean: {
    name: 'Ocean Breeze',
    black: '#1a2634',
    copper: '#2980b9',
    pink: '#74b9ff',
    tan: '#81ecec',
    blush: '#dfe6e9',
    vanilla: '#f0f3f5',
    green: '#00b894',
    mint: '#55efc4',
    lightCream: '#f8fffe'
  },
  forest: {
    name: 'Forest Vibes',
    black: '#1e272e',
    copper: '#6ab04c',
    pink: '#badc58',
    tan: '#c4e538',
    blush: '#f5f6e7',
    vanilla: '#fafaf5',
    green: '#009432',
    mint: '#A3CB38',
    lightCream: '#f9faf4'
  },
  sunset: {
    name: 'Purple Haze',
    black: '#2d1b4e',
    copper: '#9b59b6',
    pink: '#be2edd',
    tan: '#e056fd',
    blush: '#f8e6ff',
    vanilla: '#fdf5ff',
    green: '#6c5ce7',
    mint: '#a29bfe',
    lightCream: '#fcfaff'
  },
  dark: {
    name: 'Dark Mode',
    black: '#f5f5f5',
    copper: '#ff7675',
    pink: '#fd79a8',
    tan: '#636e72',
    blush: '#2d3436',
    vanilla: '#1e1e1e',
    green: '#00b894',
    mint: '#00cec9',
    lightCream: '#121212'
  }
};

let currentTheme = 'default';
let particleSystem = null;

// When the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js particle background
    initThreeJS();
    
    // Generate keyboard keys with interactive effects
    const keysContainer = document.querySelector('.keys');
    for (let i = 0; i < 56; i++) {
      const key = document.createElement('div');
      key.classList.add('key');
      key.addEventListener('click', () => playKeySound(i));
      keysContainer.appendChild(key);
    }
    
    // Generate square cells for design element
    const designSquare = document.querySelector('.design-square');
    for (let i = 0; i < 25; i++) {
      const cell = document.createElement('div');
      cell.classList.add('square-cell');
      designSquare.appendChild(cell);
    }
    
    // Handle folder clicks with enhanced animations
    const folders = document.querySelectorAll('.folder');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    folders.forEach(folder => {
      folder.addEventListener('click', () => {
        const folderType = folder.getAttribute('data-folder');
        modalTitle.textContent = folder.querySelector('.folder-name').textContent;
        
        // Add opening animation
        folder.classList.add('folder-opening');
        setTimeout(() => folder.classList.remove('folder-opening'), 600);
        
        // Load content based on folder type
        loadFolderContent(folderType, modalBody);
        
        // Show modal with animation
        modal.classList.add('modal-opening');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.remove('modal-opening'), 500);
      });
    });
    
    // Close modal when clicking the close button
    document.querySelector('.close-btn').addEventListener('click', () => {
      closeModal(modal);
    });
    
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    // ESC key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal(modal);
      }
    });
    
    // Create more clouds dynamically for better visibility
    const background = document.querySelector('.background');
    for (let i = 0; i < 3; i++) {
      const cloud = document.createElement('div');
      cloud.classList.add('cloud');
      cloud.style.top = `${Math.random() * 70}%`;
      cloud.style.left = `${Math.random() * 30}%`;
      cloud.style.animationDuration = `${Math.random() * 20 + 30}s`;
      cloud.style.animationDelay = `${Math.random() * 10}s`;
      background.appendChild(cloud);
    }
    
    // Animate floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
      icon.style.animationDelay = `${index * 2}s`;
    });
    
    // Update the clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Initialize theme switcher
    initThemeSwitcher();
    
    // Add typing animation to welcome text
    initTypingAnimation();
    
    // Add cursor particle trail
    initCursorTrail();
    
    // Add our interactive features
    addStickyNoteFeature();
    addFlowerAnimation();
    enhanceRainbow();
    
    // Add interactive keyboard lighting
    initKeyboardEffects();
    
    // NEW FEATURES
    initKonamiCode();
    initFunFactsTicker();
    initConfettiSystem();
    initDeskDecorations();
    
    // PROFESSIONAL FEATURES
    initSoundToggle();
    initMiniTerminal();
    initScreenSaver();
    initQuickActions();
    initDraggableFolders();
  });

// ============================================
// THREE.JS PARTICLE BACKGROUND
// ============================================
function initThreeJS() {
  const container = document.getElementById('three-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Create floating geometric shapes
  const shapes = [];
  const geometries = [
    new THREE.IcosahedronGeometry(0.5),
    new THREE.TorusGeometry(0.3, 0.1, 8, 16),
    new THREE.OctahedronGeometry(0.4),
    new THREE.TetrahedronGeometry(0.4)
  ];

  const colors = [0xA75F37, 0xCA8E82, 0x7A958F, 0xBAE0DA, 0xD9B99F];

  for (let i = 0; i < 15; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshBasicMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.x = (Math.random() - 0.5) * 20;
    mesh.position.y = (Math.random() - 0.5) * 20;
    mesh.position.z = (Math.random() - 0.5) * 10 - 5;
    
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    
    mesh.userData = {
      rotationSpeed: { x: Math.random() * 0.02 - 0.01, y: Math.random() * 0.02 - 0.01 },
      floatSpeed: Math.random() * 0.005 + 0.002,
      floatOffset: Math.random() * Math.PI * 2
    };
    
    scene.add(mesh);
    shapes.push(mesh);
  }

  // Create particle field
  const particleCount = 200;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 30;
    positions[i + 1] = (Math.random() - 0.5) * 30;
    positions[i + 2] = (Math.random() - 0.5) * 15 - 5;
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xA75F37,
    size: 0.05,
    transparent: true,
    opacity: 0.8
  });
  
  particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  camera.position.z = 10;

  // Mouse interaction
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate and float shapes
    shapes.forEach((shape, index) => {
      shape.rotation.x += shape.userData.rotationSpeed.x;
      shape.rotation.y += shape.userData.rotationSpeed.y;
      shape.position.y += Math.sin(Date.now() * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.01;
    });

    // Rotate particle system based on mouse
    if (particleSystem) {
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x = mouseY * 0.1;
      particleSystem.rotation.y += mouseX * 0.001;
    }

    // Camera subtle movement
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.02;

    renderer.render(scene, camera);
  }

  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// ============================================
// THEME SWITCHER
// ============================================
function initThemeSwitcher() {
  const switchBtn = document.querySelector('.start-btn');
  if (!switchBtn) return;
  
  let themeIndex = 0;
  const themeKeys = Object.keys(themes);
  
  switchBtn.addEventListener('click', () => {
    themeIndex = (themeIndex + 1) % themeKeys.length;
    const newTheme = themeKeys[themeIndex];
    applyTheme(newTheme);
    
    // Add switch animation
    switchBtn.classList.add('theme-switching');
    setTimeout(() => switchBtn.classList.remove('theme-switching'), 500);
    
    // Show theme name toast
    showToast(`Theme: ${themes[newTheme].name}`);
  });
}

function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return;
  
  currentTheme = themeName;
  const root = document.documentElement;
  
  root.style.setProperty('--black', theme.black);
  root.style.setProperty('--copper', theme.copper);
  root.style.setProperty('--pink', theme.pink);
  root.style.setProperty('--tan', theme.tan);
  root.style.setProperty('--blush', theme.blush);
  root.style.setProperty('--vanilla', theme.vanilla);
  root.style.setProperty('--green', theme.green);
  root.style.setProperty('--mint', theme.mint);
  root.style.setProperty('--light-cream', theme.lightCream);
  
  // Add transition effect
  document.body.classList.add('theme-transition');
  setTimeout(() => document.body.classList.remove('theme-transition'), 500);
}

function showToast(message) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast-message');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('toast-visible'), 10);
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// ============================================
// TYPING ANIMATION
// ============================================
function initTypingAnimation() {
  const welcomeContent = document.querySelector('.welcome-content h1');
  if (!welcomeContent) return;
  
  const originalText = welcomeContent.textContent;
  welcomeContent.textContent = '';
  welcomeContent.style.borderRight = '3px solid var(--copper)';
  
  let charIndex = 0;
  
  function typeChar() {
    if (charIndex < originalText.length) {
      welcomeContent.textContent += originalText[charIndex];
      charIndex++;
      setTimeout(typeChar, 80);
    } else {
      setTimeout(() => {
        welcomeContent.style.borderRight = 'none';
      }, 1000);
    }
  }
  
  setTimeout(typeChar, 500);
}

// ============================================
// CURSOR PARTICLE TRAIL
// ============================================
function initCursorTrail() {
  const screen = document.querySelector('.screen');
  if (!screen) return;
  
  screen.addEventListener('mousemove', (e) => {
    const rect = screen.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Only create particle occasionally
    if (Math.random() > 0.7) {
      createTrailParticle(x, y, screen);
    }
  });
}

function createTrailParticle(x, y, parent) {
  const particle = document.createElement('div');
  particle.className = 'cursor-particle';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--copper');
  
  parent.appendChild(particle);
  
  setTimeout(() => particle.remove(), 1000);
}

// ============================================
// MODAL CLOSE ANIMATION
// ============================================
function closeModal(modal) {
  modal.classList.add('modal-closing');
  setTimeout(() => {
    modal.style.display = 'none';
    modal.classList.remove('modal-closing');
  }, 300);
}

// ============================================
// KEYBOARD EFFECTS
// ============================================
function initKeyboardEffects() {
  const keys = document.querySelectorAll('.key');
  keys.forEach((key, index) => {
    key.addEventListener('mouseenter', () => {
      key.style.transform = 'translateY(-2px)';
      key.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    });
    key.addEventListener('mouseleave', () => {
      key.style.transform = '';
      key.style.boxShadow = '';
    });
  });
}

function playKeySound(index) {
  // Create a simple oscillator for keyboard "click" sound
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // Random pitch for variety
    oscillator.frequency.value = 800 + (index % 12) * 50;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.1);
  } catch (e) {
    // Audio not supported, silently fail
  }
}

// ============================================
// ENHANCED FOLDER CONTENT LOADER
// ============================================
function loadFolderContent(folderType, container) {
  container.innerHTML = '';
  container.classList.add('content-loading');
  
  setTimeout(() => {
    container.classList.remove('content-loading');
    
    switch(folderType) {
      case 'about':
        container.innerHTML = `
        <div class="about-section animated-content">
          <div class="section-card">
            <div class="section-icon">🎓</div>
            <h2>My Journey</h2>
            <p>I'm a Computing Science student at the University of Alberta (Sep 2022 – May 2027), with coursework spanning Machine Learning, Reinforcement Learning, AI Search & Planning, Data Structures, Advanced ML, and Software Engineering. I hold an AWS Certified Cloud Practitioner certification and Introduction to Generative AI badge.</p>
          </div>
          
          <div class="section-card">
            <div class="section-icon">🔬</div>
            <h2>Research & Industry</h2>
            <p>As an Undergraduate Research Assistant at DANS Lab, I evaluate cutting-edge Graph Neural Networks (GCN, GAT, FraudRE) and pioneer LangChain agents with Hugging Face for financial text analysis. At the City of Edmonton, I built automated Python pipelines, an AI-driven ticket classification system reducing response time by 60%, and real-time Tableau dashboards.</p>
          </div>
          
          <div class="section-card">
            <div class="section-icon">💡</div>
            <h2>What Drives Me</h2>
            <p>I'm passionate about applying AI and machine learning to solve real-world problems. From developing deep learning baselines for financial fraud detection to building data pipelines for enterprise systems, I thrive at the intersection of research and practical application.</p>
          </div>
          
          <div class="section-card">
            <div class="section-icon">🌟</div>
            <h2>Leadership & Mentorship</h2>
            <p>I serve as a Science Mentor facilitating cross-cultural integration, a Peer Academic Tutor at Lister Centre creating collaborative study environments, and a Registered Academic Tutor with the Students' Union, helping 20+ students excel in Computer Science and Statistics.</p>
          </div>
        </div>
        `;
        break;
      case 'projects':
        container.innerHTML = `
        <div class="projects-grid animated-content">
          <div class="project-card" onclick="this.classList.toggle('expanded')">
            <div class="project-header">
              <span class="project-number">01</span>
              <h3>UNTAPPED – Artist Management Portal</h3>
              <span class="expand-icon">+</span>
            </div>
            <div class="project-tags">
              <span class="tag">React</span>
              <span class="tag">Node.js</span>
              <span class="tag">PostgreSQL</span>
              <span class="tag">Cloudinary</span>
              <span class="tag">OAuth2.0</span>
              <span class="tag">Tailwind CSS</span>
            </div>
            <div class="project-details">
              <p>Led end-to-end product development as Project Manager & Product Owner for a web and mobile-friendly artist management portal used by non-profit arts organizations.</p>
              <ul>
                <li>Designed wireframes and user flows for artists and administrators</li>
                <li>Implemented artist authentication, profile creation with public URLs</li>
                <li>Invoice submission with Cloudinary document uploads</li>
                <li>Admin tools: artist database, invoice approval workflows, payment dashboards</li>
                <li>Normalized PostgreSQL schema with RESTful APIs</li>
              </ul>
              <a href="https://github.com/prishasarna" target="_blank" class="project-link">View on GitHub →</a>
            </div>
          </div>

          <div class="project-card" onclick="this.classList.toggle('expanded')">
            <div class="project-header">
              <span class="project-number">02</span>
              <h3>Event Registration System with Lottery</h3>
              <span class="expand-icon">+</span>
            </div>
            <div class="project-tags">
              <span class="tag">Java</span>
              <span class="tag">Firebase</span>
              <span class="tag">Android Studio</span>
              <span class="tag">HTML/CSS</span>
            </div>
            <div class="project-details">
              <p>Built a full-stack Android app with a lottery-based selection mechanism to improve event accessibility for participants with time constraints.</p>
              <ul>
                <li>Fair lottery algorithm ensuring equal participant access</li>
                <li>Intuitive, mobile-responsive UI with seamless authentication</li>
                <li>Strong positive user feedback</li>
                <li>Cross-functional team collaboration for front-end/back-end integration</li>
              </ul>
              <a href="https://github.com/prishasarna" target="_blank" class="project-link">View on GitHub →</a>
            </div>
          </div>

          <div class="project-card" onclick="this.classList.toggle('expanded')">
            <div class="project-header">
              <span class="project-number">03</span>
              <h3>Skincare Routine Analyzer & Climate Adjuster</h3>
              <span class="expand-icon">+</span>
            </div>
            <div class="project-tags">
              <span class="tag">Python</span>
              <span class="tag">Tkinter</span>
              <span class="tag">NetworkX</span>
              <span class="tag">Matplotlib</span>
              <span class="tag">Pandas</span>
            </div>
            <div class="project-details">
              <p>Developed a skincare optimization system analyzing 500+ ingredient interactions with 95% accuracy in compatibility predictions.</p>
              <ul>
                <li>Interactive NetworkX graphs for ingredient relationship mapping</li>
                <li>Climate-based recommendation engine (humidity, UV index, pollution)</li>
                <li>40% improvement in recommendation effectiveness</li>
                <li>Beautiful data visualization dashboard</li>
              </ul>
              <a href="https://github.com/prishasarna" target="_blank" class="project-link">View on GitHub →</a>
            </div>
          </div>

          <div class="project-card" onclick="this.classList.toggle('expanded')">
            <div class="project-header">
              <span class="project-number">04</span>
              <h3>Computer Vision & NLP Analysis Suite</h3>
              <span class="expand-icon">+</span>
            </div>
            <div class="project-tags">
              <span class="tag">Python</span>
              <span class="tag">OpenCV</span>
              <span class="tag">NLTK</span>
              <span class="tag">Scikit-learn</span>
              <span class="tag">Pandas</span>
            </div>
            <div class="project-details">
              <p>Built a data analysis pipeline processing multiple datasets with 99% accuracy for automated insight generation.</p>
              <ul>
                <li>Computer vision for skin disease classification (94% accuracy)</li>
                <li>NLP models for text/sentiment classification on 10,000+ samples (92% accuracy)</li>
                <li>Comprehensive data preprocessing pipeline</li>
                <li>Multi-modal analysis capabilities</li>
              </ul>
              <a href="https://github.com/prishasarna" target="_blank" class="project-link">View on GitHub →</a>
            </div>
          </div>

          <div class="project-card" onclick="this.classList.toggle('expanded')">
            <div class="project-header">
              <span class="project-number">05</span>
              <h3>Portfolio Website</h3>
              <span class="expand-icon">+</span>
            </div>
            <div class="project-tags">
              <span class="tag">HTML</span>
              <span class="tag">CSS</span>
              <span class="tag">JavaScript</span>
              <span class="tag">Three.js</span>
            </div>
            <div class="project-details">
              <p>Creative desktop-style portfolio featuring interactive elements, animated backgrounds, and dynamic content.</p>
              <ul>
                <li>Interactive Desktop Design with folders and taskbar</li>
                <li>3D animated background using Three.js</li>
                <li>Mini terminal with custom commands</li>
                <li>Multiple color themes & ambient mode</li>
              </ul>
            </div>
          </div>
        </div>
        `;
        break;
      case 'skills':
        container.innerHTML = `
        <div class="skills-container animated-content">
          <div class="skills-category">
            <h2><span class="category-icon">💻</span> Programming Languages</h2>
            <div class="skills-list">
              <div class="skill-item">
                <div class="skill-info"><span>Python</span><span>95%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="95"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>Java</span><span>85%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="85"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>JavaScript</span><span>85%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="85"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>C</span><span>80%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="80"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>R</span><span>70%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="70"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>HTML/CSS</span><span>90%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="90"></div></div>
              </div>
            </div>
          </div>
          
          <div class="skills-category">
            <h2><span class="category-icon">🧠</span> ML/AI & Frameworks</h2>
            <div class="skills-list">
              <div class="skill-item">
                <div class="skill-info"><span>PyTorch & TensorFlow</span><span>85%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="85"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>Scikit-learn</span><span>90%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="90"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>Pandas & NumPy</span><span>95%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="95"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>OpenCV & NLTK</span><span>80%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="80"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>NetworkX & Matplotlib</span><span>85%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="85"></div></div>
              </div>
            </div>
          </div>
          
          <div class="skills-category">
            <h2><span class="category-icon">🌐</span> Web & Backend</h2>
            <div class="skills-list">
              <div class="skill-item">
                <div class="skill-info"><span>React & Node.js</span><span>80%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="80"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>Express & Flask</span><span>75%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="75"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>Tailwind & Three.js</span><span>80%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="80"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>REST APIs & OAuth2.0</span><span>85%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="85"></div></div>
              </div>
            </div>
          </div>
          
          <div class="skills-category">
            <h2><span class="category-icon">🗄️</span> Databases & Tools</h2>
            <div class="skills-list">
              <div class="skill-item">
                <div class="skill-info"><span>PostgreSQL & SQL</span><span>90%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="90"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>MongoDB & Firebase</span><span>80%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="80"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>Git & GitHub</span><span>95%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="95"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>Tableau & Figma</span><span>75%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="75"></div></div>
              </div>
              <div class="skill-item">
                <div class="skill-info"><span>SAP (Ariba, ECC, S4 HANA)</span><span>70%</span></div>
                <div class="skill-bar"><div class="skill-progress" data-progress="70"></div></div>
              </div>
            </div>
          </div>
          
          <div class="skills-category">
            <h2><span class="category-icon">🏆</span> Certifications</h2>
            <div class="cert-grid">
              <div class="cert-badge aws">☁️ AWS Cloud Practitioner</div>
              <div class="cert-badge ai">🤖 Intro to Generative AI</div>
            </div>
          </div>
        </div>
        `;
        // Animate skill bars
        setTimeout(() => {
          document.querySelectorAll('.skill-progress').forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
          });
        }, 100);
        break;
      case 'contact':
        container.innerHTML = `
        <div class="contact-container animated-content">
          <div class="contact-card">
            <div class="contact-icon">📱</div>
            <h3>Phone</h3>
            <p>+1-(825) 888-0924</p>
          </div>
          
          <div class="contact-card">
            <div class="contact-icon">📧</div>
            <h3>Email</h3>
            <p>prishasarna@gmail.com</p>
            <p class="secondary">psarna@ualberta.ca</p>
          </div>
          
          <div class="contact-card clickable" onclick="window.open('https://www.linkedin.com/in/prishasarna', '_blank')">
            <div class="contact-icon">💼</div>
            <h3>LinkedIn</h3>
            <p>linkedin.com/in/prishasarna</p>
          </div>
          
          <div class="contact-card clickable" onclick="window.open('https://github.com/prishasarna', '_blank')">
            <div class="contact-icon">🐱</div>
            <h3>GitHub</h3>
            <p>github.com/prishasarna</p>
          </div>
          
          <div class="connect-section">
            <h2>Let's Connect!</h2>
            <p>I'm always interested in connecting with industry professionals and fellow tech enthusiasts. Feel free to reach out for:</p>
            <div class="connect-tags">
              <span class="connect-tag">💼 Internship Opportunities</span>
              <span class="connect-tag">🔬 Research Collaborations</span>
              <span class="connect-tag">📚 Mentorship</span>
              <span class="connect-tag">💬 Project Discussions</span>
            </div>
          </div>
        </div>
        `;
        break;
      case 'resume':
        container.innerHTML = `
        <div class="resume-container animated-content">
          <div class="resume-header">
            <div class="resume-icon">📄</div>
            <h2>My Resume</h2>
          </div>
          
          <p class="resume-intro">Computing Science student with research experience in Graph Neural Networks and industry experience in data engineering. AWS Certified.</p>
          
          <div class="experience-section">
            <h3>💼 Experience</h3>
            <div class="experience-item">
              <div class="exp-header">
                <strong>Undergraduate Research Assistant</strong>
                <span class="exp-date">Sep 2025 – Present</span>
              </div>
              <div class="exp-company">DANS Lab, University of Alberta</div>
              <p>Evaluating GNN models (GCN, GAT, FraudRE) on financial datasets. Pioneering LangChain agents with Hugging Face for financial text analysis.</p>
            </div>
            <div class="experience-item">
              <div class="exp-header">
                <strong>Tech and Integration Co-op (Data Engineering)</strong>
                <span class="exp-date">May – Dec 2025</span>
              </div>
              <div class="exp-company">City of Edmonton</div>
              <p>Built AI-driven ticket classification (60% faster response). Python pipelines for data extraction. Real-time Tableau dashboards.</p>
            </div>
          </div>
          
          <div class="highlights-grid">
            <div class="highlight-card">
              <span class="highlight-emoji">🎓</span>
              <h4>Education</h4>
              <p>B.Sc. Computing Science<br/>UAlberta (2022–2027)</p>
            </div>
            <div class="highlight-card">
              <span class="highlight-emoji">☁️</span>
              <h4>Certification</h4>
              <p>AWS Certified Cloud Practitioner</p>
            </div>
            <div class="highlight-card">
              <span class="highlight-emoji">🔬</span>
              <h4>Research</h4>
              <p>GNNs, LangChain, Financial ML</p>
            </div>
            <div class="highlight-card">
              <span class="highlight-emoji">👥</span>
              <h4>Leadership</h4>
              <p>Science Mentor, Academic Tutor (20+ students)</p>
            </div>
          </div>
          
          <a href="Prisha_Resume.pdf" target="_blank" class="download-btn">
            <span class="btn-icon">⬇️</span>
            Download Full Resume (PDF)
          </a>
        </div>
        `;
        break;
      default:
        container.innerHTML = `<p>No content available.</p>`;
    }
  }, 300);
}

// ============================================
// UPDATE CLOCK
// ============================================
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${ampm}`;
  document.querySelector('.time').textContent = timeString;
}

// ============================================
// STICKY NOTE FEATURE
// ============================================
function addStickyNoteFeature() {
  const desk = document.querySelector('.desk');
  
  if (!document.querySelector('.note-pad')) {
    const notePad = document.createElement('div');
    notePad.classList.add('note-pad');
    notePad.innerHTML = '<div class="note-pages"></div><span class="note-pad-label">Click for notes!</span>';
    desk.appendChild(notePad);
  }
  
  document.querySelector('.note-pad').addEventListener('click', () => {
    createNewNote();
  });
  
  let noteCount = 0;
  
  function createNewNote() {
    noteCount++;
    const desktop = document.querySelector('.desktop');
    const note = document.createElement('div');
    note.classList.add('sticky-note');
    note.style.top = `${Math.random() * 30 + 20}%`;
    note.style.left = `${Math.random() * 30 + 20}%`;
    note.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
    note.style.backgroundColor = getRandomPastelColor();
    
    note.innerHTML = `
      <div class="note-header">
        <div class="note-title">Note ${noteCount}</div>
        <div class="note-close">×</div>
      </div>
      <div class="note-content" contenteditable="true">Click to edit...</div>
    `;
    
    desktop.appendChild(note);
    makeNoteDraggable(note);
    
    setTimeout(() => {
      note.querySelector('.note-content').focus();
    }, 100);
    
    note.querySelector('.note-close').addEventListener('click', () => {
      note.classList.add('note-closing');
      setTimeout(() => note.remove(), 300);
    });
  }
  
  function makeNoteDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.querySelector('.note-header').addEventListener('mousedown', dragMouseDown);
    
    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.addEventListener('mouseup', closeDragElement);
      document.addEventListener('mousemove', elementDrag);
    }
    
    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
    }
  }
  
  function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 85%)`;
  }
}

// ============================================
// FLOWER ANIMATION (FIXED!)
// ============================================
function addFlowerAnimation() {
  const flowerContainer = document.querySelector('.flower');
  const flowerBloom = document.querySelector('.flower-bloom');
  if (!flowerContainer) return;
  
  // Make the entire flower area clickable with visual feedback
  flowerContainer.style.cursor = 'pointer';
  flowerContainer.title = 'Click me for petals!';
  
  flowerContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    createPetals();
    // Add bounce animation
    flowerBloom.style.animation = 'flower-bounce 0.5s ease';
    setTimeout(() => flowerBloom.style.animation = '', 500);
  });
  
  // Also trigger petals periodically
  setInterval(() => {
    if (Math.random() > 0.85) {
      createPetals();
    }
  }, 8000);
  
  function createPetals() {
    const desk = document.querySelector('.desk');
    if (!desk) return;
    
    const flowerRect = flowerContainer.getBoundingClientRect();
    const deskRect = desk.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const petal = document.createElement('div');
        petal.classList.add('falling-petal');
        
        // Position relative to desk
        const x = flowerRect.left - deskRect.left + Math.random() * 40 - 10;
        const y = flowerRect.top - deskRect.top - 20;
        
        petal.style.left = x + 'px';
        petal.style.top = y + 'px';
        petal.style.backgroundColor = getRandomPetalColor();
        petal.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        desk.appendChild(petal);
        
        setTimeout(() => petal.remove(), 8000);
      }, i * 150);
    }
    
    showToast('🌸 Petals!');
  }
  
  function getRandomPetalColor() {
    const colors = ['#CA8E82', '#F2D6CE', '#BAE0DA', '#D9B99F', '#ffb3ba', '#ffd1dc'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

// ============================================
// KONAMI CODE EASTER EGG
// ============================================
function initKonamiCode() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  function activateEasterEgg() {
    showToast('🎮 KONAMI CODE ACTIVATED!');
    triggerConfetti();
    
    // Rainbow mode for 5 seconds
    document.body.classList.add('rainbow-mode');
    setTimeout(() => document.body.classList.remove('rainbow-mode'), 5000);
    
    // Play a fun sound
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.3);
        }, i * 150);
      });
    } catch(e) {}
  }
}

// ============================================
// FUN FACTS TICKER
// ============================================
function initFunFactsTicker() {
  const facts = [
    "� Research Assistant at DANS Lab - GNN & Financial ML",
    "☁️ AWS Certified Cloud Practitioner (Nov 2025)",
    "📊 Built AI ticket classifier - 60% faster response time",
    "🧬 Evaluating GCN, GAT, FraudRE on financial datasets",
    "🎓 CS @ UAlberta | ML, RL, AI Search & Planning",
    "🖥️ City of Edmonton Co-op - Python pipelines & Tableau dashboards",
    "👩‍🏫 Science Mentor & Academic Tutor - Helped 20+ students",
    "🤖 LangChain + Hugging Face for financial text analysis",
    "🌿 Skincare Analyzer: 500+ ingredients, 95% accuracy",
    "👁️ Computer Vision: 94% accuracy in disease classification"
  ];
  
  const taskbar = document.querySelector('.taskbar');
  if (!taskbar) return;
  
  const ticker = document.createElement('div');
  ticker.className = 'fun-fact-ticker';
  ticker.innerHTML = `<span class="ticker-text">${facts[0]}</span>`;
  
  // Insert before the time
  const timeEl = taskbar.querySelector('.time');
  taskbar.insertBefore(ticker, timeEl);
  
  let factIndex = 0;
  setInterval(() => {
    factIndex = (factIndex + 1) % facts.length;
    const tickerText = ticker.querySelector('.ticker-text');
    tickerText.style.opacity = '0';
    setTimeout(() => {
      tickerText.textContent = facts[factIndex];
      tickerText.style.opacity = '1';
    }, 500);
  }, 6000);
}

// ============================================
// SOUND TOGGLE
// ============================================
let soundEnabled = true;

function initSoundToggle() {
  const taskbar = document.querySelector('.taskbar');
  if (!taskbar) return;
  
  const soundBtn = document.createElement('div');
  soundBtn.className = 'sound-toggle';
  soundBtn.innerHTML = '🔊';
  soundBtn.title = 'Toggle sounds';
  
  const themeBtn = taskbar.querySelector('.start-btn');
  themeBtn.parentNode.insertBefore(soundBtn, themeBtn.nextSibling);
  
  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundBtn.innerHTML = soundEnabled ? '🔊' : '🔇';
    soundBtn.classList.toggle('muted', !soundEnabled);
    showToast(soundEnabled ? 'Sound On' : 'Sound Off');
    
    if (soundEnabled) playUISound('toggle');
  });
}

function playUISound(type) {
  if (!soundEnabled) return;
  
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    const sounds = {
      'toggle': { freq: 600, duration: 0.1 },
      'click': { freq: 800, duration: 0.05 },
      'success': { freq: 880, duration: 0.15 },
      'open': { freq: 400, duration: 0.1 }
    };
    
    const sound = sounds[type] || sounds['click'];
    osc.frequency.value = sound.freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + sound.duration);
    
    osc.start();
    osc.stop(audioCtx.currentTime + sound.duration);
  } catch(e) {}
}

// ============================================
// MINI TERMINAL
// ============================================
function initMiniTerminal() {
  const desktop = document.querySelector('.desktop');
  if (!desktop) return;
  
  // Create terminal icon in folder area
  const folderContainer = document.querySelector('.folder-container');
  const terminalFolder = document.createElement('div');
  terminalFolder.className = 'folder terminal-folder';
  terminalFolder.innerHTML = `
    <div class="folder-icon" style="background-color: #1e1e1e; border: 2px solid var(--green);">
      <span style="color: var(--mint); font-size: 20px;">></span>
    </div>
    <div class="folder-name">Terminal</div>
  `;
  folderContainer.appendChild(terminalFolder);
  
  terminalFolder.addEventListener('click', () => openTerminal());
}

function openTerminal() {
  // Create terminal window
  const existingTerminal = document.querySelector('.terminal-window');
  if (existingTerminal) {
    existingTerminal.remove();
    return;
  }
  
  const terminal = document.createElement('div');
  terminal.className = 'terminal-window';
  terminal.innerHTML = `
    <div class="terminal-header">
      <span class="terminal-title">prisha@portfolio ~ </span>
      <span class="terminal-close">×</span>
    </div>
    <div class="terminal-body">
      <div class="terminal-output">
        <div class="terminal-line">Welcome to Prisha's Portfolio Terminal v2.0</div>
        <div class="terminal-line">Type 'help' for available commands.</div>
        <div class="terminal-line">---</div>
      </div>
      <div class="terminal-input-line">
        <span class="terminal-prompt">$ </span>
        <input type="text" class="terminal-input" autofocus spellcheck="false">
      </div>
    </div>
  `;
  
  document.querySelector('.desktop').appendChild(terminal);
  
  const input = terminal.querySelector('.terminal-input');
  const output = terminal.querySelector('.terminal-output');
  
  input.focus();
  
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      processCommand(cmd, output);
      input.value = '';
    }
  });
  
  terminal.querySelector('.terminal-close').addEventListener('click', () => {
    terminal.classList.add('terminal-closing');
    setTimeout(() => terminal.remove(), 300);
  });
  
  // Make terminal draggable
  makeDraggable(terminal, terminal.querySelector('.terminal-header'));
}

function processCommand(cmd, output) {
  const commands = {
    'help': `Available commands:
  about     - Learn about me
  skills    - View my skills
  projects  - See my projects
  contact   - Get my contact info
  github    - Open my GitHub
  linkedin  - Open my LinkedIn
  theme     - Change theme
  clear     - Clear terminal
  date      - Show current date
  whoami    - Display user info
  coffee    - ☕
  matrix    - Enter the matrix`,
    'about': 'Prisha Sarna - CS Student @ UAlberta | ML Research @ DANS Lab | AWS Certified',
    'skills': 'Python | Java | JS | C | R | PyTorch | TensorFlow | React | Node.js | PostgreSQL | GNNs',
    'projects': 'UNTAPPED Portal | Lottery App | Skincare Analyzer | CV & NLP Suite | Portfolio',
    'contact': 'Email: psarna@ualberta.ca | Phone: +1-825-888-0924',
    'github': () => { window.open('https://github.com/prishasarna', '_blank'); return 'Opening GitHub...'; },
    'linkedin': () => { window.open('https://www.linkedin.com/in/prishasarna', '_blank'); return 'Opening LinkedIn...'; },
    'theme': () => { document.querySelector('.start-btn').click(); return 'Theme changed!'; },
    'clear': () => { output.innerHTML = ''; return null; },
    'date': () => new Date().toLocaleString(),
    'whoami': 'visitor@prisha-portfolio (You are awesome! 🌟)',
    'coffee': '☕ Here\'s a virtual coffee for you!',
    'matrix': () => { document.body.classList.add('matrix-mode'); setTimeout(() => document.body.classList.remove('matrix-mode'), 3000); return 'Wake up, Neo...'; },
    'sudo': 'Nice try! 😄 Access denied.',
    'exit': () => { document.querySelector('.terminal-close').click(); return 'Goodbye!'; },
    'hello': 'Hello! Thanks for visiting my portfolio! 👋',
    'hire': 'I\'m available for internships! Check out my Resume folder 📄'
  };
  
  // Add command to output
  const cmdLine = document.createElement('div');
  cmdLine.className = 'terminal-line cmd';
  cmdLine.textContent = `$ ${cmd}`;
  output.appendChild(cmdLine);
  
  // Process and display result
  let result;
  if (commands[cmd]) {
    result = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
  } else if (cmd === '') {
    result = null;
  } else {
    result = `Command not found: ${cmd}. Type 'help' for available commands.`;
  }
  
  if (result) {
    const lines = result.split('\n');
    lines.forEach(line => {
      const resultLine = document.createElement('div');
      resultLine.className = 'terminal-line';
      resultLine.textContent = line;
      output.appendChild(resultLine);
    });
  }
  
  // Scroll to bottom
  output.scrollTop = output.scrollHeight;
  playUISound('click');
}

function makeDraggable(element, handle) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  handle.addEventListener('mousedown', dragStart);
  
  function dragStart(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);
  }
  
  function drag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + 'px';
    element.style.left = (element.offsetLeft - pos1) + 'px';
  }
  
  function dragEnd() {
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('mousemove', drag);
  }
}

// ============================================
// SCREENSAVER MODE
// ============================================
let screensaverTimeout;
let screensaverActive = false;

function initScreenSaver() {
  resetScreensaverTimer();
  
  ['mousemove', 'keydown', 'click', 'scroll'].forEach(event => {
    document.addEventListener(event, () => {
      if (screensaverActive) {
        exitScreensaver();
      }
      resetScreensaverTimer();
    });
  });
}

function resetScreensaverTimer() {
  clearTimeout(screensaverTimeout);
  screensaverTimeout = setTimeout(startScreensaver, 60000); // 1 minute
}

function startScreensaver() {
  if (screensaverActive) return;
  screensaverActive = true;
  
  const screensaver = document.createElement('div');
  screensaver.className = 'screensaver';
  screensaver.innerHTML = `
    <div class="screensaver-content">
      <div class="screensaver-text">Prisha Sarna</div>
      <div class="screensaver-subtext">CS Student • ML Enthusiast</div>
      <div class="screensaver-hint">Move mouse or press any key to continue</div>
    </div>
    <div class="floating-shapes"></div>
  `;
  
  document.body.appendChild(screensaver);
  
  // Add floating shapes
  const shapesContainer = screensaver.querySelector('.floating-shapes');
  for (let i = 0; i < 15; i++) {
    const shape = document.createElement('div');
    shape.className = 'ss-shape';
    shape.style.left = Math.random() * 100 + '%';
    shape.style.animationDelay = Math.random() * 5 + 's';
    shape.style.animationDuration = (Math.random() * 10 + 10) + 's';
    shapesContainer.appendChild(shape);
  }
}

function exitScreensaver() {
  const screensaver = document.querySelector('.screensaver');
  if (screensaver) {
    screensaver.classList.add('screensaver-exit');
    setTimeout(() => screensaver.remove(), 500);
  }
  screensaverActive = false;
}

// ============================================
// DRAGGABLE FOLDERS
// ============================================
function initDraggableFolders() {
  const folders = document.querySelectorAll('.folder');
  const container = document.querySelector('.folder-container');
  
  if (!container) return;
  
  // Store original positions
  const originalPositions = new Map();
  
  folders.forEach((folder, index) => {
    folder.style.cursor = 'grab';
    folder.setAttribute('draggable', 'true');
    
    let isDragging = false;
    let startX, startY, initialX, initialY;
    
    folder.addEventListener('mousedown', (e) => {
      if (e.target.closest('.folder-icon') || e.target.closest('.folder-name')) {
        // Allow click through for opening
        return;
      }
    });
    
    folder.addEventListener('dragstart', (e) => {
      isDragging = true;
      folder.style.opacity = '0.5';
      folder.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', index);
    });
    
    folder.addEventListener('dragend', (e) => {
      isDragging = false;
      folder.style.opacity = '1';
      folder.classList.remove('dragging');
    });
  });
  
  // Enable drop zones
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const dragging = document.querySelector('.dragging');
    const siblings = [...container.querySelectorAll('.folder:not(.dragging)')];
    
    const nextSibling = siblings.find(sibling => {
      const rect = sibling.getBoundingClientRect();
      const offset = e.clientY - rect.top - rect.height / 2;
      return offset < 0;
    });
    
    if (nextSibling) {
      container.insertBefore(dragging, nextSibling);
    } else {
      container.appendChild(dragging);
    }
  });
  
  // Show hint
  showToast('📁 Tip: Drag folders to rearrange them!');
}

// ============================================
// QUICK ACTIONS (Keyboard Shortcuts)
// ============================================
function initQuickActions() {
  document.addEventListener('keydown', (e) => {
    // Only if not typing in an input
    if (e.target.tagName === 'INPUT' || e.target.isContentEditable) return;
    
    switch(e.key.toLowerCase()) {
      case 't':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          document.querySelector('.start-btn').click();
        }
        break;
      case '/':
        e.preventDefault();
        openTerminal();
        break;
      case '1':
        openFolder('about');
        break;
      case '2':
        openFolder('projects');
        break;
      case '3':
        openFolder('skills');
        break;
      case '4':
        openFolder('contact');
        break;
      case '5':
        openFolder('resume');
        break;
    }
  });
  
  // Add keyboard hints to folders
  const folders = document.querySelectorAll('.folder');
  folders.forEach((folder, i) => {
    if (i < 5) {
      const hint = document.createElement('span');
      hint.className = 'keyboard-hint';
      hint.textContent = i + 1;
      folder.appendChild(hint);
    }
  });
}

function openFolder(type) {
  const folder = document.querySelector(`[data-folder="${type}"]`);
  if (folder) folder.click();
}

// ============================================
// CONFETTI SYSTEM
// ============================================
let confettiActive = false;

function initConfettiSystem() {
  // Trigger confetti when opening Resume or Contact
  const originalLoadContent = loadFolderContent;
  window.loadFolderContent = function(folderType, container) {
    originalLoadContent(folderType, container);
    if (folderType === 'resume' || folderType === 'contact') {
      setTimeout(() => triggerConfetti(), 500);
    }
  };
}

function triggerConfetti() {
  if (confettiActive) return;
  confettiActive = true;
  
  const colors = ['#A75F37', '#CA8E82', '#BAE0DA', '#7A958F', '#D9B99F', '#ff6b6b', '#4ecdc4', '#ffe66d'];
  const desk = document.querySelector('.desk');
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      
      desk.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }
  
  setTimeout(() => confettiActive = false, 2000);
}

// ============================================
// RAINBOW ENHANCEMENT
// ============================================
function enhanceRainbow() {
  const rainbowArches = document.querySelectorAll('.rainbow-arch');
  const rainbow = document.querySelector('.rainbow');
  
  if (!rainbow) return;
  
  function addRainbowShimmer() {
    rainbow.innerHTML = '';
    
    for (let i = 0; i < 7; i++) {
      const colorBand = document.createElement('div');
      colorBand.classList.add('rainbow-band');
      colorBand.style.animationDelay = `${i * 0.2}s`;
      rainbow.appendChild(colorBand);
    }
  }
  
  rainbowArches.forEach((arch, index) => {
    arch.classList.add('rainbow-pulse');
    arch.style.animationDelay = `${index * 0.7}s`;
    
    arch.addEventListener('click', () => {
      createMiniRainbow();
    });
  });
  
  function createMiniRainbow() {
    const background = document.querySelector('.background');
    if (!background) return;
    
    const miniRainbow = document.createElement('div');
    miniRainbow.classList.add('mini-rainbow');
    miniRainbow.style.left = `${Math.random() * 70 + 15}%`;
    miniRainbow.style.bottom = '20%';
    
    background.appendChild(miniRainbow);
    
    setTimeout(() => miniRainbow.remove(), 8000);
  }
  
  addRainbowShimmer();
  
  setInterval(() => {
    if (Math.random() > 0.8) {
      createMiniRainbow();
    }
  }, 10000);
}

// ============================================
// DESK DECORATIONS INTERACTIVITY
// ============================================
function initDeskDecorations() {
  // Make hardware mouse clickable
  const hardwareMouse = document.querySelector('.mouse');
  if (hardwareMouse) {
    hardwareMouse.addEventListener('click', () => {
      showToast('🖱️ Click! Click!');
      hardwareMouse.style.animation = 'mouse-click 0.3s ease';
      setTimeout(() => hardwareMouse.style.animation = '', 300);
    });
  }
  
  // Make pen holder interactive
  const penHolder = document.querySelector('.pen-holder');
  if (penHolder) {
    penHolder.addEventListener('click', () => {
      const pens = penHolder.querySelectorAll('.pen');
      pens.forEach((pen, i) => {
        setTimeout(() => {
          pen.style.animation = 'pen-jump 0.5s ease';
          setTimeout(() => pen.style.animation = '', 500);
        }, i * 100);
      });
      showToast('✏️ Ready to write!');
    });
  }
  
  // Make design cards interactive
  const designCards = document.querySelectorAll('.design-card');
  designCards.forEach((card, i) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      card.style.animation = 'card-flip 0.6s ease';
      setTimeout(() => card.style.animation = '', 600);
      showToast(['🎨 Creative!', '✨ Design!', '💡 Inspired!'][i % 3]);
    });
  });
  
  // Make design square cells interactive
  const squareCells = document.querySelectorAll('.square-cell');
  squareCells.forEach(cell => {
    cell.style.cursor = 'pointer';
    cell.style.transition = 'all 0.3s ease';
    cell.addEventListener('click', () => {
      const randomColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
      cell.style.backgroundColor = randomColor;
    });
  });
  
  // Add double-click easter egg on monitor
  const monitor = document.querySelector('.monitor');
  if (monitor) {
    monitor.addEventListener('dblclick', (e) => {
      if (e.target.closest('.screen')) return;
      showToast('🖥️ *tap tap* Hello!');
    });
  }
}

// Add CSS animations for desk decorations
const deskStyles = document.createElement('style');
deskStyles.textContent = `
  @keyframes mouse-click {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(0.9); }
  }
  
  @keyframes pen-jump {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  
  @keyframes card-flip {
    0% { transform: perspective(400px) rotateY(0); }
    50% { transform: perspective(400px) rotateY(180deg); }
    100% { transform: perspective(400px) rotateY(360deg); }
  }
  
  .pen-holder .pen {
    transition: all 0.3s ease;
  }
  
  .design-square {
    cursor: pointer;
  }
`;
document.head.appendChild(deskStyles);
