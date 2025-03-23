// When the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Generate keyboard keys
    const keysContainer = document.querySelector('.keys');
    for (let i = 0; i < 56; i++) {
      const key = document.createElement('div');
      key.classList.add('key');
      keysContainer.appendChild(key);
    }
    
    // Generate square cells for design element
    const designSquare = document.querySelector('.design-square');
    for (let i = 0; i < 25; i++) {
      const cell = document.createElement('div');
      cell.classList.add('square-cell');
      designSquare.appendChild(cell);
    }
    
    // Handle folder clicks
    const folders = document.querySelectorAll('.folder');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    folders.forEach(folder => {
      folder.addEventListener('click', () => {
        const folderType = folder.getAttribute('data-folder');
        modalTitle.textContent = folder.querySelector('.folder-name').textContent;
        
        // Load content based on folder type
        loadFolderContent(folderType, modalBody);
        
        // Show modal
        modal.style.display = 'flex';
      });
    });
    
    // Close modal when clicking the close button
    document.querySelector('.close-btn').addEventListener('click', () => {
      modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
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
    setInterval(updateClock, 60000);
    
    // Add our new interactive features
    addStickyNoteFeature();
    addFlowerAnimation();
    enhanceRainbow();
  });
  
  // Function to load folder content
  function loadFolderContent(folderType, container) {
    container.innerHTML = ''; // Clear previous content
    
    switch(folderType) {
      case 'about':
        container.innerHTML = `
        <h2>My Journey</h2>
            <p>My academic journey in computing science began with a solid foundation in high school, where I graduated with a 93% overall. Now at the University of Alberta, I'm expanding my knowledge across various computing domains. My coursework has given me expertise in programming languages, data structures, machine learning, and software development.</p>
        <h2>Career Vision</h2>
            <p>I'm currently seeking industry experience through internships to apply my theoretical knowledge in professional settings. Long-term, I aspire to pursue a Master's and Ph.D. with a focus on advanced machine learning and artificial intelligence research. I'm particularly interested in developing innovative solutions that can make a meaningful impact on society.</p>
        <h2>What Drives Me</h2>
            <p>I'm driven by the potential of AI and machine learning to transform industries and solve complex problems. The rapidly evolving nature of these fields excites me, and I'm committed to staying at the forefront of technological advancements through continuous learning and practical application.</p>
        <h2>Beyond Tech</h2>
            <p>Outside of academics, I'm actively involved in campus life through volunteer work with organizations like the UASU, Campus Food Bank, and Elizabeth Fry Society. I believe in giving back to the community and advocating for diversity and inclusion in STEM fields, as demonstrated by my participation in events like CanCWIC 2024.</p>
        
        `;
        break;
      case 'projects':
        container.innerHTML = `
        
       <div class="project">
    <h2>1. Prisha Sarna's Portfolio Website</h2>
    <h3>Technologies: HTML, CSS, JavaScript, Three.js, Font Awesome</h3>
    <p>This website is my personal portfolio website, showcasing my skills, projects, and experience as a Computing Science student at the University of Alberta. The website is designed to resemble a stylized desktop environment, adding a touch of creativity and interactivity to the traditional portfolio format.</p>
    
    <h3>Features:</h3>
    <ul>
        <li>Interactive Desktop Design: The portfolio is built to look like a computer desktop, complete with folders, a taskbar, and decorative elements like functional sticky notes.</li>
        <li>Dynamic Content Loading: Content for each "folder" (About Me, Projects, Skills, etc.) is loaded dynamically using JavaScript.</li>
        <li>Animated Background: A 3D animated background on the desktop screen using Three.js adds depth and a modern feel.</li>
        <li>Modal Windows: Clicking on folders opens modal windows to display the relevant content, keeping the interface clean and organized.</li>
        <li>Responsive Design: The website adapts to different screen sizes for seamless user experience.</li>
    </ul>

    <h3>Technologies Used:</h3>
    <ul>
        <li>HTML: Provides the basic structure and content of the website.</li>
        <li>CSS: Styles the website elements and creates the desktop aesthetic and animations.</li>
        <li>JavaScript: Handles dynamic content loading, modal window functionality, and interactions.</li>
        <li>Three.js: Creates the 3D animated background on the desktop screen.</li>
        <li>Font Awesome: Used for icons within the website.</li>
    </ul>
</div>

<div class="project">
    <h2>2. Full Stack Android Application</h2>
    <h3>Technologies: Firebase, HTML, GitHub, Android Studio, Java, CSS</h3>
    <p>A team project that developed a lottery-based event registration application to enhance accessibility for participants with time constraints.</p>
    
    <h3>My Contributions:</h3>
    <ul>
        <li>Designed and implemented the user-friendly front-end interface with responsive HTML layouts.</li>
        <li>Developed the initial login screen with secure access and personal information input fields.</li>
        <li>Collaborated with team members to ensure seamless integration between front-end and back-end.</li>
        <li>Enhanced usability through intuitive navigation and visually appealing design elements.</li>
        <li>Implemented Firebase integration for real-time data management of event details, waiting lists, and notifications.</li>
    </ul>
</div>

<div class="project">
    <h2>3. Interactive Database Management System</h2>
    <h3><strong>Technologies:</strong> Python, MongoDB</h3>
    <p>A library database management system with user authentication, book borrowing functionalities, and penalty tracking.</p>
    
    <h3>Key Features:</h3>
    <ul>
        <li>Built a relational database following a specific schema for members, books, reviews, and penalties.</li>
        <li>Designed comprehensive CRUD operations for seamless database interaction.</li>
        <li>Implemented features for book borrowing, review submission, and penalty tracking.</li>
        <li>Managed team contributions via GitHub for efficient version control.</li>
        <li>Created a user-friendly command-line interface for system interaction.</li>
    </ul>
</div>

<div class="project">
    <h2>4. Data Extraction and Management Using SQL</h2>
    <h3"technologies"><strong>Technologies:</strong> SQL, SQLite3</h3>
    <p>A project focused on extracting insights from a relational database schema for a library management system.</p>
    
    <h3>Highlights:</h3>
    <ul>
        <li>Designed complex SQL queries to handle scenarios like overdue borrowings and priority-based waitlists.</li>
        <li>Implemented advanced SQL techniques for efficiency and clarity.</li>
        <li>Created a comprehensive tracking system for book reviews and penalties.</li>
        <li>Utilized SQLite3 for effective database schema management and query execution.</li>
    </ul>
</div>

<div class="project">
    <h2>5. Dynamic Web Interface Development</h2>
    <p class="technologies"><strong>Technologies:</strong> HTML, CSS</p>
    <p>A fully functional web interface inspired by the YouTube home screen, showcasing complex layout and diverse design implementations.</p>
    
    <h3>Project Features:</h3>
    <ul>
        <li>Emulated real-world UI/UX features including responsive design and interactive elements.</li>
        <li>Created clickable video thumbnails and dynamic navigation components.</li>
        <li>Focused on clean layout with attention to spacing, colors, and typography.</li>
        <li>Ensured consistent user experience across different device sizes.</li>
    </ul>
</div>

<div class="project">
    <h2>6. Data Preprocessing and Visualization</h2>
    <p class="technologies"><strong>Technologies:</strong> Python, NumPy, Pandas, Seaborn, Matplotlib, Sklearn</p>
    <p>Processed and analyzed various large datasets including school data, skin disease information, and global country statistics.</p>
    
    <h3>Project Scope:</h3>
    <ul>
        <li>Filtered and cleaned data using advanced preprocessing techniques.</li>
        <li>Created insightful visualizations using charts and graphs for deeper analysis.</li>
        <li>Generated data-driven reports based on visualization findings.</li>
        <li>Applied machine learning algorithms to identify patterns and make predictions.</li>
    </ul>
</div>

        `;
        break;
      case 'skills':
        container.innerHTML = `
        
        <div class="subsection">
            <h2>Programming Languages</h2>
            <ul>
                <li><span class="highlight">Python:</span> Extensive experience with data science libraries (NumPy, Pandas, Sklearn, Matplotlib, Seaborn)</li>
                <li><span class="highlight">C:</span> Strong foundation in system-level programming and algorithms</li>
                <li><span class="highlight">Java:</span> Application development and object-oriented programming</li>
                <li><span class="highlight">R:</span> Statistical analysis and data visualization</li>
                <li><span class="highlight">Julia:</span> High-performance numerical analysis and computational science</li>
            </ul>
        </div>
        
        <div class="subsection">
            <h2>Web Development</h2>
            <ul>
                <li><span class="highlight">HTML & CSS:</span> Creating responsive and visually appealing web interfaces</li>
                <li><span class="highlight">React:</span> Building interactive user interfaces with component-based architecture</li>
                <li><span class="highlight">Tailwind CSS:</span> Utilizing utility-first CSS framework for modern designs</li>
                <li><span class="highlight">Git & GitHub:</span> Version control and collaborative development</li>
                <li><span class="highlight">Figma:</span> UI/UX design and prototyping</li>
            </ul>
        </div>
        
        <div class="subsection">
            <h2>Databases</h2>
            <ul>
                <li><span class="highlight">SQL:</span> Complex query design and database management</li>
                <li><span class="highlight">MongoDB:</span> NoSQL database implementation and management</li>
            </ul>
        </div>
        
        <div class="subsection">
            <h2>Tools & Platforms</h2>
            <ul>
                <li><span class="highlight">Firebase:</span> Real-time database and authentication services</li>
                <li><span class="highlight">Android Studio:</span> Mobile application development</li>
                <li><span class="highlight">Git:</span> Distributed version control system</li>
            </ul>
        </div>
        
        <div class="subsection">
            <h2>Soft Skills</h2>
            <ul>
                <li><span class="highlight">Leadership:</span> Demonstrated through roles as Events Crew Leader and SU Tutor</li>
                <li><span class="highlight">Teamwork:</span> Collaborative approach in group projects and volunteer work</li>
                <li><span class="highlight">Adaptability:</span> Quick to learn new technologies and methodologies</li>
                <li><span class="highlight">Problem-Solving:</span> Analytical approach to complex technical challenges</li>
                <li><span class="highlight">Communication:</span> Effective in conveying technical concepts to diverse audiences</li>
                <li><span class="highlight">Multitasking:</span> Balancing academic responsibilities with extracurricular activities</li>
            </ul>
        </div>
        
        <div class="subsection">
            <h2>Certifications</h2>
            <ul>
                <li>Tinker Coders - Practical Machine Learning Methods</li>
                <li>Tinker Coders - Foundations of Data Science</li>
                <li>Google Digital Marketing Certification</li>
                <li>IBM: What is Data Science?</li>
                <li>Coursera RL Specialization (4 Courses)</li>
                <li>Aptech: Fundamentals of C</li>
                <li>Aptech: Fundamentals of Python and SQL</li>
            </ul>
        </div>
    </div>
        `;
        break;
      case 'contact':
        container.innerHTML = `
          <h2>Contact Information</h2>
            <ul>
                <li><span class="highlight">Phone:</span> +1-(825) 888-0924</li>
                <li><span class="highlight">Email:</span> prishasarna@gmail.com OR psarna@ualberta.ca</li>
                <li><span class="highlight">LinkedIn:</span> <a href="https://www.linkedin.com/in/prishasarna" target="_blank">linkedin.com/in/prishasarna</a></li>
                <li><span class="highlight">GitHub:</span> <a href="https://github.com/prishasarna" target="_blank">github.com/prishasarna</a></li>
            </ul>
        <h2>Connect With Me</h2>
            <p>I'm always interested in connecting with industry professionals, fellow students, and anyone passionate about technology and innovation. Feel free to reach out if you have:</p>
            <ul>
                <li>Internship or job opportunities</li>
                <li>Research collaborations</li>
                <li>Mentorship possibilities</li>
                <li>Questions about my projects or experience</li>
            </ul>
        `;
        break;
      case 'resume':
        container.innerHTML = `
          <p>My comprehensive resume details my educational background, technical skills, project experience, and extracurricular activities. It highlights my journey as a Computing Science student at the University of Alberta and my dedication to continuous learning through certifications and practical application.</p>
        
        <h2>Key Highlights:</h2>
        <ul>
            <li>Computing Science major at University of Alberta (GPA: 3.1)</li>
            <li>Extensive coursework in programming, data structures, and machine learning</li>
            <li>Practical experience with Python, Java, C, SQL, and web development technologies</li>
            <li>Active participation in campus activities and volunteer initiatives</li>
            <li>Strong foundation in data analytics and visualization</li>
            <li>Experience as a Student Union Tutor for computer science courses</li>
        </ul>
        
        <p><a href="https://github.com/prishasarna/portfolio-web/blob/main/Prisha_Sarna%20-%20Intern_Resume%20.pdf" target="_blank"><strong>Download my full resume [PDF link]</strong></a></p>
        `;
        break;
      default:
        container.innerHTML = `<p>No content available.</p>`;
    }
  }
  
  // Update the clock
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    document.querySelector('.time').textContent = timeString;
  }
  
  // Sticky Note Feature
  function addStickyNoteFeature() {
    // Create a sticky note pad on the desk
    const desk = document.querySelector('.desk');
    
    // Check if note pad already exists
    if (!document.querySelector('.note-pad')) {
      const notePad = document.createElement('div');
      notePad.classList.add('note-pad');
      notePad.innerHTML = '<div class="note-pages"></div>';
      desk.appendChild(notePad);
    }
    
    // Add click event for the note pad
    document.querySelector('.note-pad').addEventListener('click', () => {
      createNewNote();
    });
    
    // Counter for notes
    let noteCount = 0;
    
    // Function to create a new sticky note
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
      
      // Make note draggable
      makeNoteDraggable(note);
      
      // Focus on the content
      setTimeout(() => {
        note.querySelector('.note-content').focus();
      }, 100);
      
      // Close button functionality
      note.querySelector('.note-close').addEventListener('click', () => {
        note.classList.add('note-closing');
        setTimeout(() => {
          note.remove();
        }, 300);
      });
    }
    
    // Function to make notes draggable
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
        
        const top = (element.offsetTop - pos2);
        const left = (element.offsetLeft - pos1);
        
        element.style.top = top + "px";
        element.style.left = left + "px";
      }
      
      function closeDragElement() {
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
      }
    }
    
    // Generate random pastel colors for notes
    function getRandomPastelColor() {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 100%, 85%)`;
    }
  }
  // Rainbow Enhancement
  function enhanceRainbow() {
    const rainbowArches = document.querySelectorAll('.rainbow-arch');
    const rainbow = document.querySelector('.rainbow');
    
    if (!rainbow) return; // Safety check
    
    // Add shimmer effect to rainbow
    function addRainbowShimmer() {
      rainbow.innerHTML = '';
      
      // Create multiple color bands for the main rainbow
      for (let i = 0; i < 7; i++) {
        const colorBand = document.createElement('div');
        colorBand.classList.add('rainbow-band');
        colorBand.style.animationDelay = `${i * 0.2}s`;
        rainbow.appendChild(colorBand);
      }
    }
    
    // Add pulsing glow to decorative rainbows
    rainbowArches.forEach((arch, index) => {
      arch.classList.add('rainbow-pulse');
      arch.style.animationDelay = `${index * 0.7}s`;
      
      // Make rainbows interactive - clicking spawns a mini rainbow
      arch.addEventListener('click', () => {
        createMiniRainbow();
      });
    });
    
    // Create mini rainbows that float up and fade
    function createMiniRainbow() {
      const background = document.querySelector('.background');
      if (!background) return; // Safety check
      
      const miniRainbow = document.createElement('div');
      miniRainbow.classList.add('mini-rainbow');
      miniRainbow.style.left = `${Math.random() * 70 + 15}%`;
      miniRainbow.style.bottom = '20%';
      
      background.appendChild(miniRainbow);
      
      // Remove after animation completes
      setTimeout(() => {
        miniRainbow.remove();
      }, 8000);
    }
    
    addRainbowShimmer();
    
    // Occasionally create mini rainbows automatically
    setInterval(() => {
      if (Math.random() > 0.8) {
        createMiniRainbow();
      }
    }, 10000);
  }
