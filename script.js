// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js background and interactive elements
    initThreeJs();

    // Initialize skills section
    initSkills();

    // Mobile navigation toggle
    initMobileNav();

    // Modal functionality
    initModals();

    // Smooth scrolling for navigation
    initSmoothScroll();

    // Active navigation highlighting
    initScrollSpy();

    // Form submission handling
    initContactForm();

    // Back to top button
    initBackToTop();
});


// Skills Data
const skillsData = [
    {
        category: "Frontend Development",
        skills: [
            { name: "HTML5", proficiency: 50, icon: "fab fa-html5" },
            { name: "CSS3", proficiency: 50, icon: "fab fa-css3-alt" },
            { name: "JavaScript", proficiency: 50, icon: "fab fa-js" },
            { name: "Vue.js", proficiency: 50, icon: "fab fa-react" },
            { name: "Tailwind CSS", proficiency: 50, icon: "fab fa-css3-alt" }
        ]
    },

    {
        category: "Backend Development",
        skills: [
            { name: "Node.js", proficiency: 50, icon: "fab fa-node-js" },
            { name: "Express", proficiency: 50, icon: "fas fa-server" },
            { name: "Django", proficiency: 50, icon: "fas fa-horse" },
            { name: "MongoDB", proficiency: 50, icon: "fas fa-database" },
            { name: "MySQL", proficiency: 50, icon: "fas fa-database" },
            { name: "Laravel", proficiency: 50, icon: "fas fa-php" },
        ]
    },
    {
        category: "Tools & Others",
        skills: [
            { name: "Git", proficiency: 50, icon: "fab fa-git-alt" },
            { name: "Responsive Design", proficiency: 50, icon: "fas fa-mobile-alt" }
        ]
    }
];

// Initialize Skills Section
function initSkills() {
    const skillsCategoriesContainer = document.getElementById('skills-categories');
    if (!skillsCategoriesContainer) return;

    // Generate HTML for each category and skill
    skillsData.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category.category;
        categoryDiv.appendChild(categoryTitle);

        const skillsGrid = document.createElement('div');
        skillsGrid.className = 'skills-grid';

        category.skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';

            skillItem.innerHTML = `
                <div class="skill-icon"><i class="${skill.icon}"></i></div>
                <div class="skill-name">${skill.name}</div>
                <div class="skill-bar"><div class="skill-level" style="width: ${skill.proficiency}%;"></div></div>
            `;

            skillsGrid.appendChild(skillItem);
        });

        categoryDiv.appendChild(skillsGrid);
        skillsCategoriesContainer.appendChild(categoryDiv);
    });
}

// Enhanced Three.js Implementation
function initThreeJs() {
    // Main container for hero section
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Scene, camera, and renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create interactive globe for hero section
    const globeGeometry = new THREE.IcosahedronGeometry(10, 3);
    const globeMaterial = new THREE.MeshPhongMaterial({
        color: 0x3498db,
        wireframe: true,
        emissive: 0x1a237e,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.8
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Add particle system inside and around the globe
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const colorOptions = [
        new THREE.Color(0x3498db), // Blue
        new THREE.Color(0x2ecc71), // Green
        new THREE.Color(0x9b59b6), // Purple
        new THREE.Color(0xe74c3c)  // Red
    ];

    for (let i = 0; i < particlesCount; i++) {
        // Position particles in a sphere
        const radius = 9 + Math.random() * 5; // Some inside, some outside the globe
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Random color from options
        const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Mouse interaction for globe
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Interactive Skills Visualization
    const skillsSection = document.getElementById('skills');
    let skillsScene, skillsCamera, skillsRenderer, skillsSphere;

    if (skillsSection) {
        // Create canvas for skills visualization
        const skillsCanvas = document.createElement('canvas');
        skillsCanvas.className = 'skills-visualization';
        skillsCanvas.style.position = 'absolute';
        skillsCanvas.style.top = '0';
        skillsCanvas.style.right = '0';
        skillsCanvas.style.width = '300px';
        skillsCanvas.style.height = '300px';
        skillsCanvas.style.zIndex = '1';

        // Add canvas to skills section
        const skillsHeader = skillsSection.querySelector('.section-header');
        skillsHeader.style.position = 'relative';
        skillsHeader.appendChild(skillsCanvas);

        // Create skills visualization
        skillsScene = new THREE.Scene();
        skillsCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        skillsCamera.position.z = 30;

        skillsRenderer = new THREE.WebGLRenderer({ canvas: skillsCanvas, alpha: true });
        skillsRenderer.setSize(300, 300);
        skillsRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create skill nodes
        const skillsData = [
            { name: 'HTML', value: 0.95, color: 0xe74c3c },
            { name: 'CSS', value: 0.9, color: 0x3498db },
            { name: 'JavaScript', value: 0.85, color: 0xf1c40f },
            { name: 'React', value: 0.8, color: 0x2ecc71 },
            { name: 'Three.js', value: 0.75, color: 0x9b59b6 },
            { name: 'Node.js', value: 0.7, color: 0x1abc9c }
        ];

        // Create a group to hold all skill nodes
        const skillsGroup = new THREE.Group();

        skillsData.forEach((skill, i) => {
            // Create skill node
            const radius = 0.5 + skill.value * 0.5;
            const geometry = new THREE.SphereGeometry(radius, 16, 16);
            const material = new THREE.MeshPhongMaterial({
                color: skill.color,
                emissive: skill.color,
                emissiveIntensity: 0.2,
                transparent: true,
                opacity: 0.8
            });

            const sphere = new THREE.Mesh(geometry, material);

            // Position around in a circle
            const angle = (i / skillsData.length) * Math.PI * 2;
            const distance = 10;
            sphere.position.x = Math.cos(angle) * distance;
            sphere.position.y = Math.sin(angle) * distance;
            sphere.position.z = 0;

            // Add to group
            skillsGroup.add(sphere);
        });

        // Add group to scene
        skillsScene.add(skillsGroup);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        skillsScene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.8);
        pointLight.position.set(20, 20, 20);
        skillsScene.add(pointLight);
    }

    // Scroll-triggered 3D effects
    let scrollY = window.scrollY;
    const projectsSection = document.getElementById('projects');
    const aboutSection = document.getElementById('about');

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;

        // Parallax effect for globe
        if (container.getBoundingClientRect().bottom > 0) {
            globe.rotation.y = scrollY * 0.001;
            particles.rotation.y = scrollY * 0.0007;
        }
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Animate main globe
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        globe.rotation.y += 0.005;
        globe.rotation.x += (targetY - globe.rotation.x) * 0.05;
        globe.rotation.y += (targetX - globe.rotation.y) * 0.05;

        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;

        // Render main scene
        renderer.render(scene, camera);

        // Animate skills visualization if it exists
        if (skillsSection && skillsRenderer) {
            const skillsGroup = skillsScene.children.find(child => child.type === 'Group');
            if (skillsGroup) {
                skillsGroup.rotation.y += 0.005;
                skillsRenderer.render(skillsScene, skillsCamera);
            }
        }
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        // Update main canvas
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Update window half values for mouse interaction
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        // Update skills visualization if it exists
        if (skillsRenderer) {
            skillsRenderer.setSize(300, 300);
        }
    });

    // Start animation loop
    animate();
}

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links li a');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        // Toggle navigation menu
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Modal Functionality with Reusable Modal
// Modal Functionality with Reusable Modal
function initModals() {
    const modalLinks = document.querySelectorAll('.project-link');
    const modalContainer = document.querySelector('.modal-container');
    const modal = document.getElementById('project-modal');
    const closeButton = modal.querySelector('.close-modal');

    // Project data
    const projectsData = {
    project1: {
        title: "Image Generation Platform",
        gallery: [
            "image cafe -3.PNG",
            "image cafe -1.PNG",
            "image cafe -2.PNG"
        ],
        video: "https://www.youtube.com/embed/XiYhNvjR6wY",
        overview: "MyCafe is a sophisticated image generation and sharing platform built with Laravel. The application allows users to:",
        overviewList: ["Generate AI-powered images using the Hugging Face API", "Customize image dimensions and settings", "Share generated images with the community", "Follow other creators and build community", "Like and interact with images", "Search and explore images by categories", "Download images with permission controls", "Maintain personal galleries of creations"],

        techStack: {
            frontend: ["Tailwind CSS for responsive design", "Alpine.js for reactive components", "Blade Templates for dynamic views", "Font Awesome for iconography", "Axios for AJAX requests"],
            backend: ["Laravel PHP framework", "MySQL database", "Hugging Face API integration", "File Storage System for images"]
        },
        challenges: [
            {
                title: "Performance",
                details: ["Implementing lazy loading for galleries", "Optimizing database queries"]
            },
            {
                title: "API Integration",
                details: ["Managing API rate limiting", "Handling timeouts and failures", "Implementing error handling"]
            },
            {
                title: "User Experience",
                details: ["Building responsive image galleries", "Implementing smooth infinite scroll", "Creating intuitive generation interface", "Managing loading states effectively"]
            },
            {
                title: "Storage",
                details: ["Efficient image storage implementation", "Temporary file management"]
            },

        ],
        github: "https://github.com/ej2601/image_generation_platform",
        demo: "https://youtu.be/XiYhNvjR6wY"
    },
    project2: {
        title: "Real-Time Chat Application",
        gallery: [
            "chat_app_1.PNG",
            "chat_app_2.PNG",
            "chat_app_3.PNG"
        ],
        video: "https://youtube.com/embed/FFcZ-qWmQXQ",
        overview: "A modern real-time chat application built with MERN stack (MongoDB, Express.js, Vue.js, Node.js) featuring Socket.IO for real-time communication. The application offers:",
        overviewList: [
            "Real-time messaging with typing indicators",
            "Multiple chat room support",
            "User authentication and profile management",
            "Message reactions and reply threads",
            "Online/Away user status tracking",
            "Emoji support in messages",
            "Avatar customization",
            "Message history persistence"
        ],

        techStack: {
            frontend: [
                "Vue 3 with Composition API",
                "Vuex for state management",
                "Vue Router for navigation",
                "Tailwind CSS for styling",
                "Socket.IO client",
                "JWT for authentication"
            ],
            backend: [
                "Node.js & Express.js",
                "MongoDB with Mongoose",
                "Socket.IO for real-time features",
                "Redis for session management",
                "JWT authentication",
                "RESTful API architecture"
            ]
        },
        challenges: [
            {
                title: "Real-Time Communication",
                details: [
                    "Implementing bidirectional Socket.IO communication",
                    "Managing multiple chat rooms simultaneously",
                    "Handling user presence and typing indicators",
                    "Ensuring message delivery and order"
                ]
            },
            {
                title: "State Management",
                details: [
                    "Synchronizing real-time updates across components",
                    "Managing complex UI states",
                    "Handling offline/online transitions",
                    "Maintaining user session state"
                ]
            },
            {
                title: "User Experience",
                details: [
                    "Creating smooth animations and transitions",
                    "Implementing responsive design",
                    "Building intuitive message threading",
                    "Managing loading states and error handling"
                ]
            },
            {
                title: "Performance",
                details: [
                    "Optimizing real-time message delivery",
                    "Implementing efficient message pagination",
                    "Managing memory usage with large message histories",
                    "Optimizing Redis cache usage"
                ]
            }
        ],

        github: "https://github.com/ej2601/ej_chat_app",
        demo: "https://ej-chat-app.vercel.app"
    },
    project3: {
        title: "Dynamic Blog CMS",
        gallery: [
            "blog-1.PNG",
            "blog-3.PNG",
            "blog-2.PNG"
        ],
        video: "https://youtube.com/embed/8qj47LbH4ms",
        overview: "A custom Content Management System (CMS) built with PHP, MySQL, and Bootstrap that provides a robust platform for blog management with features including:",
        overviewList: [
            "User-friendly post creation and management",
            "Dynamic content sections (text, images, videos)",
            "Category management system",
            "Responsive design across devices",
            "Admin authentication system",
            "Media file management",
            "SEO-friendly URL structure",
            "Intuitive admin dashboard"
        ],

        techStack: {
            frontend: [
                "Bootstrap 5.3.2",
                "Custom CSS",
                "JavaScript for dynamic interactions",
                "Responsive design principles",
                "Modern UI components"
            ],
            backend: [
                "PHP 7+",
                "MySQL/PDO",
                "Session management",
                "File system operations",
                "Secure authentication system"
            ]
        },

        challenges: [
            {
                title: "Content Management",
                details: [
                    "Implementing flexible content section types",
                    "Managing media uploads securely",
                    "Creating an intuitive post editor",
                    "Maintaining content relationships"
                ]
            },
            {
                title: "Security",
                details: [
                    "Secure admin authentication",
                    "Protected file uploads",
                    "SQL injection prevention using PDO",
                    "Session management security"
                ]
            },
            {
                title: "User Experience",
                details: [
                    "Dynamic category management",
                    "Responsive image handling",
                    "Intuitive content editing interface",
                    "Smooth navigation and transitions"
                ]
            }
        ],

        github: "https://github.com/ej2601/BlogCMS",
        demo: "https://youtu.be/8qj47LbH4ms"
    },
    project4: {
    title: "IndiGalleria - Art Gallery & E-commerce Platform",
    gallery: [
        "home-page.PNG",
        "artwork-detail.PNG",
        "artist-profile.PNG"
    ],
    video: "", // Empty = video section will be hidden
    overview: "IndiGalleria is a comprehensive, production-ready art gallery and e-commerce platform built entirely with React. It connects artists, buyers, and resellers with role-based dashboards (User, Artist, Admin). The application allows users to:",
    overviewList: [
        "Browse and discover artworks with advanced filters and search",
        "Purchase original art and prints through secure checkout",
        "Create and manage artist profiles with artwork portfolios",
        "Participate in virtual exhibitions and events",
        "Read art-related blogs and educational content",
        "Manage wishlists, shopping carts, and order history",
        "Track orders and purchase history",
        "Connect with artists and the community",
        "Access dedicated dashboards for artists (upload/management) and admins (full control)"
    ],

    techStack: {
        frontend: [
            "React 18.3.1 for component-based UI development",
            "React Router DOM for client-side routing and navigation",
            "React Bootstrap for responsive grid system and components",
            "Styled Components for dynamic CSS-in-JS styling",
            "React Slick for image carousels and sliders",
            "TinyMCE React for rich text editing",
            "React Toastify for notification system",
            "Axios for HTTP requests and API communication",
            "Country flag components for international features",
            "React CountUp for animated number displays",
            "React Data Table Component for data management",
            "React Helmet Async for SEO optimization"
        ]
        // No backend array = backend section will be hidden
    },
    challenges: [
        {
            title: "Complex State Management",
            details: [
                "Implementing multiple contexts for cart, currency, authentication",
                "Managing global state across different user roles"
            ]
        },
        {
            title: "Role-Based Access Control",
            details: [
                "Implementing protected routes for different user types",
                "Managing permissions for admin, artist, and user features",
                "Creating dynamic UI based on user roles"
            ]
        },
        {
            title: "E-commerce Integration",
            details: [
                "Building secure checkout process with multiple payment options",
                "Managing shopping cart state across sessions"
            ]
        },
        {
            title: "Performance Optimization",
            details: [
                "Implementing lazy loading for artwork galleries",
                "Optimizing image loading and compression",
                "Managing large datasets with pagination"
            ]
        },
        {
            title: "User Experience",
            details: [
                "Creating responsive design for mobile and desktop",
                "Building intuitive navigation for complex features"
            ]
        }
    ],
    github: "", // Empty = GitHub button will be hidden
    demo: "https://indigalleria.com"
}
};

    if (modalLinks.length === 0) return;

    // Open modal when project is clicked
    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Get project ID
            const projectId = link.getAttribute('data-project-id');
            const project = projectsData[projectId];

            // Populate modal content
            modal.querySelector('#modal-title').textContent = project.title;
const modalGallery = modal.querySelector('#modal-gallery');
modalGallery.innerHTML = project.gallery.map(src =>
    `<img src="${src}" alt="Project Screenshot">`
).join("");
            // Show/hide video section based on whether video exists
const modalVideoContainer = modal.querySelector('#modal-video');
if (project.video && project.video.trim() !== '') {
    modalVideoContainer.innerHTML =
        `<iframe width="560" height="315" src="${project.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    modalVideoContainer.style.display = 'block';
} else {
    modalVideoContainer.innerHTML = '';
    modalVideoContainer.style.display = 'none';
}
            modal.querySelector('#modal-overview').textContent = project.overview;
            modal.querySelector('#modal-overview-list').innerHTML = project.overviewList.map(item => `<li>${item}</li>`).join("");

            modal.querySelector('#modal-tech-frontend').innerHTML = project.techStack.frontend.map(item => `<li>${item}</li>`).join("");
            
            // Show/hide backend section based on whether it exists
// Show/hide backend section based on whether it exists
const modalTechStack = modal.querySelector('#modal-tech-stack');
const backendHeading = modalTechStack.querySelector('h4:nth-of-type(2)'); // The "Backend" h4
const backendList = modal.querySelector('#modal-tech-backend');

if (project.techStack.backend && project.techStack.backend.length > 0) {
    backendList.innerHTML = project.techStack.backend.map(item => `<li>${item}</li>`).join("");
    backendHeading.style.display = 'block';
    backendList.style.display = 'block';
} else {
    backendHeading.style.display = 'none';
    backendList.style.display = 'none';
}

           // Populate challenges with subsections
const challengesContainer = modal.querySelector('#modal-challenges');
challengesContainer.innerHTML = project.challenges.map(challenge => `
    <div class="challenge-section">
        <h4>${challenge.title}</h4>
        <ul>${challenge.details.map(detail => `<li>${detail}</li>`).join("")}</ul>
    </div>
`).join("");

// Show/hide GitHub button based on whether link exists
const githubBtn = modal.querySelector('#modal-github');
if (project.github && project.github.trim() !== '' && project.github !== '#') {
    githubBtn.href = project.github;
    githubBtn.style.display = 'inline-flex';
} else {
    githubBtn.style.display = 'none';
}

modal.querySelector('#modal-demo').href = project.demo;

            // Show modal with animation
            modalContainer.style.display = 'block';
            modalContainer.style.opacity = '0';
            modal.style.display = 'block';
            modal.style.transform = 'translateY(50px)';
            modal.style.opacity = '0';

            // Fade in animation
            setTimeout(() => {
                modalContainer.style.opacity = '1';
                modal.style.transform = 'translateY(0)';
                modal.style.opacity = '1';
            }, 10);

            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when close button is clicked
    closeButton.addEventListener('click', () => {
        // Fade out animation
        modalContainer.style.opacity = '0';
        modal.style.transform = 'translateY(50px)';
        modal.style.opacity = '0';

        // Pause YouTube video
        const iframe = modal.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src; // Reload iframe to stop video
        }

        // Hide after animation
        setTimeout(() => {
            modalContainer.style.display = 'none';
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            // Fade out animation
            modalContainer.style.opacity = '0';
            modal.style.transform = 'translateY(50px)';
            modal.style.opacity = '0';

            // Pause YouTube video
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                iframe.src = iframe.src; // Reload iframe to stop video
            }

            // Hide after animation
            setTimeout(() => {
                modalContainer.style.display = 'none';
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // e.preventDefault();

            const targetId = this.getAttribute('href');

            // SKIP if:
            //  • no href
            //  • href is just "#"
            //  • href isn't a valid ID selector (e.g. "#!" or starts with a digit)
            if (
                !targetId ||
                targetId === '#' ||
                // valid IDs must start with a letter, underscore, or hyphen:
                !/^#[A-Za-z_-][\w-]*$/.test(targetId)
            ) return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            if (targetElement) {
                // Get the navbar height for offset
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;

                // Calculate the position to scroll to
                const targetPosition = targetElement.offsetTop - navbarHeight;

                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active navigation highlighting based on scroll position
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length === 0) return;

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        // Get current scroll position
        let current = '';

        // Check which section is in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Get the navbar height for offset
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            // Add an offset to account for the navbar
            if (pageYOffset >= sectionTop - navbarHeight - 100) {
                current = section.getAttribute('id');
            }
        });

        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current section link
        if (current) {
            document.querySelector(`.nav-links a[href="#${current}"]`)?.classList.add('active');
        }
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // In a real application, you would send this data to a server
        // For this demo, we'll just show a success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        // Change button text and disable
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate sending with timeout
        setTimeout(() => {
            // Create and show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Message sent successfully!';
            successMessage.style.color = '#2ecc71';
            successMessage.style.padding = '10px';
            successMessage.style.marginTop = '10px';
            successMessage.style.borderRadius = '4px';
            successMessage.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';

            contactForm.appendChild(successMessage);

            // Reset form
            contactForm.reset();

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Remove success message after a while
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    contactForm.removeChild(successMessage);
                }, 300);
            }, 3000);
        }, 1500);
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');

    if (!backToTopButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
}
