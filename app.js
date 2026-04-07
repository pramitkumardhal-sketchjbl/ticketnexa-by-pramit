document.addEventListener('DOMContentLoaded', () => {
    // ---- Hero Carousel Logic ----
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    function updateCarousel() {
        // Remove active class from all
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.transition = 'opacity 0.5s ease-in-out';
        });
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current
        slides[currentSlide].classList.add('active');
        // Small timeout to allow display:block to apply before animating opacity
        setTimeout(() => {
            slides[currentSlide].style.opacity = '1';
        }, 10);
        
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Event Listeners for Carousel
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            resetInterval();
        });
    });

    // Auto-advance
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    startInterval();

    // ---- See All Movies Toggle Logic ----
    const seeAllBtn = document.getElementById('seeAllMoviesBtn');
    const navMoviesBtn = document.getElementById('navMoviesBtn');
    
    // ---- Auth Modals Logic ----
    const authModal = document.getElementById('authModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');

    function openModal(formType) {
        authModal.style.display = 'flex';
        if (formType === 'signup') {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        } else {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        }
    }

    if (loginBtn) loginBtn.addEventListener('click', () => openModal('login'));
    if (signupBtn) signupBtn.addEventListener('click', () => openModal('signup'));
    if (closeModal) closeModal.addEventListener('click', () => authModal.style.display = 'none');

    window.addEventListener('click', (e) => {
        if (e.target === authModal) authModal.style.display = 'none';
    });

    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('signup');
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('login');
        });
    }

    // ---- Theme Toggle Logic ----
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'bright') {
        body.classList.add('bright-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('bright-theme');
            
            // Save preference
            if (body.classList.contains('bright-theme')) {
                localStorage.setItem('theme', 'bright');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    const extraMovies = document.querySelectorAll('.extra-movie');
    let isExpanded = false;

    function expandMovies() {
        if (!isExpanded) {
            isExpanded = true;
            extraMovies.forEach(movie => {
                movie.style.display = 'block';
            });
            if (seeAllBtn) {
                seeAllBtn.style.display = 'none';
            }
        }
    }

    if (seeAllBtn) {
        seeAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            expandMovies();
        });
    }

    const sportsSection = document.getElementById('sports-section');
    const moviesSection = document.querySelector('.section-movies');
    const offersSection = document.getElementById('offers-section');
    const eventsDetailsSection = document.getElementById('events-details-section');

    const navSportsBtn = document.getElementById('navSportsBtn');
    const navOffersBtn = document.getElementById('navOffersBtn');
    const navEventsDetailsBtn = document.getElementById('navEventsDetailsBtn');
    
    const sidebarFilters = document.querySelector('.sidebar-filters');
    const contentLayout = document.querySelector('.content-layout');

    const featuredSportsSection = document.getElementById('featured-sports-section');
    const seeAllSportsLink = document.getElementById('seeAllSportsLink');
    const adsSection = document.getElementById('ads-section');

    function switchTab(tab) {
        if (moviesSection) moviesSection.style.display = (tab === 'movies') ? 'block' : 'none';
        
        if (featuredSportsSection) featuredSportsSection.style.display = 'none';
        if (adsSection) adsSection.style.display = 'none';
        
        if (sportsSection) sportsSection.style.display = (tab === 'sports') ? 'block' : 'none';
        if (offersSection) offersSection.style.display = (tab === 'offers') ? 'block' : 'none';
        if (eventsDetailsSection) eventsDetailsSection.style.display = (tab === 'events') ? 'block' : 'none';

        if (navMoviesBtn) {
            if (tab === 'movies') navMoviesBtn.classList.add('active');
            else navMoviesBtn.classList.remove('active');
        }
        if (navSportsBtn) {
            if (tab === 'sports') navSportsBtn.classList.add('active');
            else navSportsBtn.classList.remove('active');
        }
        if (navOffersBtn) {
            if (tab === 'offers') navOffersBtn.classList.add('active');
            else navOffersBtn.classList.remove('active');
        }
        if (navEventsDetailsBtn) {
            if (tab === 'events') navEventsDetailsBtn.classList.add('active');
            else navEventsDetailsBtn.classList.remove('active');
        }

        if (sidebarFilters) sidebarFilters.style.display = (tab === 'movies') ? 'block' : 'none';
        
        // Adjust grid based on tab
        if (contentLayout) {
            if (tab === 'movies') {
                contentLayout.style.gridTemplateColumns = '1fr 300px';
                contentLayout.style.display = 'grid';
            } else {
                contentLayout.style.gridTemplateColumns = '1fr';
                // If it was hidden, don't show it as grid unless we are in movies mode 
                // because other sections are outside contentLayout usually?
                // Wait, index.html might have placed them inside main but not necessarily inside .content-layout
            }
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (seeAllSportsLink) {
        seeAllSportsLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('sports');
        });
    }

    if (navMoviesBtn) {
        navMoviesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            expandMovies();
            switchTab('movies');
        });
    }

    if (navSportsBtn) {
        navSportsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('sports');
        });
    }

    if (navOffersBtn) {
        navOffersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('offers');
        });
    }

    if (navEventsDetailsBtn) {
        navEventsDetailsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('events');
        });
    }

    // ---- Movie Filter Logic ----
    const applyFiltersBtn = document.querySelector('.sidebar-filters .btn-apply');
    const movieSidebarFilters = document.getElementById('movieSidebarFilters');
    
    if (applyFiltersBtn && movieSidebarFilters) {
        applyFiltersBtn.addEventListener('click', () => {
            const checkedBoxes = movieSidebarFilters.querySelectorAll('input[type="checkbox"]:checked');
            const movieCards = document.querySelectorAll('.movie-grid .movie-card');
            
            // Organize active filters by type
            const activeFilters = {
                genre: [],
                language: [],
                price: [],
                format: []
            };
            
            checkedBoxes.forEach(cb => {
                const type = cb.dataset.type;
                const val = cb.dataset.value;
                if (activeFilters[type]) activeFilters[type].push(val);
            });
            
            let matchCount = 0;
            movieCards.forEach(card => {
                const cardGenresStr = card.dataset.genres || "";
                const cardGenres = cardGenresStr.split(',').map(g => g.trim());
                const cardLang = card.dataset.language || "";
                const cardPrice = parseInt(card.dataset.price) || 0;
                const cardFormat = card.dataset.format || "";
                
                let matchesGenre = activeFilters.genre.length === 0 || activeFilters.genre.some(g => cardGenres.some(cg => cg.includes(g)));
                let matchesLang = activeFilters.language.length === 0 || activeFilters.language.some(l => cardLang.includes(l));
                let matchesFormat = activeFilters.format.length === 0 || activeFilters.format.includes(cardFormat);
                
                // Price Range Check: match "100 - 500" from dataset value
                let matchesPrice = activeFilters.price.length === 0;
                if (activeFilters.price.length > 0) {
                    matchesPrice = activeFilters.price.some(range => {
                        const bounds = range.match(/\d+/g);
                        if (bounds && bounds.length === 2) {
                            const min = parseInt(bounds[0]);
                            const max = parseInt(bounds[1]);
                            return cardPrice >= min && cardPrice <= max;
                        }
                        return false;
                    });
                }
                
                if (matchesGenre && matchesLang && matchesFormat && matchesPrice) {
                    card.style.display = 'block';
                    matchCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Feedback for no matches
            const grid = document.querySelector('.movie-grid');
            let noMatchMsg = document.getElementById('no-movie-match');
            if (matchCount === 0) {
                if (!noMatchMsg) {
                    noMatchMsg = document.createElement('div');
                    noMatchMsg.id = 'no-movie-match';
                    noMatchMsg.style.gridColumn = '1 / -1';
                    noMatchMsg.style.textAlign = 'center';
                    noMatchMsg.style.padding = '50px';
                    noMatchMsg.style.color = 'var(--text-secondary)';
                    noMatchMsg.innerHTML = '<i class="fa-solid fa-face-frown" style="font-size: 3rem; margin-bottom: 20px;"></i><p>No movies found matching these filters. Try checking different options!</p>';
                    grid.appendChild(noMatchMsg);
                } else {
                    noMatchMsg.style.display = 'block';
                }
            } else if (noMatchMsg) {
                noMatchMsg.style.display = 'none';
            }
            
            window.scrollTo({ top: grid.offsetTop - 100, behavior: 'smooth' });
        });
    }

    // ---- Events Filter Logic ----
    const applyEventsFilterBtn = document.getElementById('applyEventsFilterBtn');
    const eventsSidebar = document.getElementById('events-sidebar');
    
    if (applyEventsFilterBtn && eventsSidebar) {
        applyEventsFilterBtn.addEventListener('click', () => {
            const checkedBoxes = eventsSidebar.querySelectorAll('input[type="checkbox"]:checked');
            const eventCards = document.querySelectorAll('.events-grid .event-card');
            const priceLimit = parseInt(eventsSidebar.querySelector('input[type="range"]').value);
            
            const activeFilters = {
                category: [],
                language: []
            };
            
            checkedBoxes.forEach(cb => {
                const type = cb.dataset.type;
                const val = cb.dataset.value;
                if (activeFilters[type]) activeFilters[type].push(val);
            });
            
            let matchCount = 0;
            eventCards.forEach(card => {
                const cardCategory = card.dataset.category || "";
                const cardLang = card.dataset.language || "";
                const cardPrice = parseInt(card.dataset.price) || 0;
                
                let matchesCategory = activeFilters.category.length === 0 || activeFilters.category.some(c => cardCategory.includes(c));
                let matchesLang = activeFilters.language.length === 0 || activeFilters.language.includes(cardLang);
                let matchesPrice = cardPrice <= priceLimit;
                
                if (matchesCategory && matchesLang && matchesPrice) {
                    card.style.display = 'flex';
                    matchCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            const grid = document.getElementById('events-details-grid');
            let noMatchMsg = document.getElementById('no-event-match');
            if (matchCount === 0) {
                if (!noMatchMsg) {
                    noMatchMsg = document.createElement('div');
                    noMatchMsg.id = 'no-event-match';
                    noMatchMsg.style.gridColumn = '1 / -1';
                    noMatchMsg.style.textAlign = 'center';
                    noMatchMsg.style.padding = '100px 20px';
                    noMatchMsg.innerHTML = `
                        <i class="fa-solid fa-calendar-xmark" style="font-size: 3.5rem; color: var(--accent-color); margin-bottom: 20px; opacity: 0.5;"></i>
                        <h3 style="font-size: 1.5rem; margin-bottom: 10px;">No matching events found</h3>
                        <p style="color: var(--text-secondary);">Try adjusting your categories or increasing the price range.</p>
                    `;
                    grid.appendChild(noMatchMsg);
                } else {
                    noMatchMsg.style.display = 'block';
                }
            } else if (noMatchMsg) {
                noMatchMsg.style.display = 'none';
            }
            
            window.scrollTo({ top: grid.offsetTop - 150, behavior: 'smooth' });
        });

        // Live price range display
        const priceRange = eventsSidebar.querySelector('input[type="range"]');
        const priceDisplay = priceRange.parentElement.querySelector('div span:last-child');
        if (priceRange && priceDisplay) {
            priceRange.addEventListener('input', () => {
                priceDisplay.textContent = `₹${priceRange.value}`;
            });
        }
        // Booking Flow Elements
        const bookingModal = document.getElementById('bookingModal');
        const modalMovieTitle = document.getElementById('modalMovieTitle');
        const modalSubTitle = document.getElementById('modalSubTitle');
        const formatOptionsGrid = document.getElementById('formatOptionsGrid');
        const theatersList = document.getElementById('theatersList');
        const formatSelectionView = document.getElementById('formatSelectionView');
        const showtimeSelectionView = document.getElementById('showtimeSelectionView');
        
        const closeBookingModal = document.getElementById('closeBookingModal');
        const confirmFormatBtn = document.getElementById('confirmFormatBtn');
        const backToFormatBtn = document.getElementById('backToFormatBtn');
        const finalBookBtn = document.getElementById('finalBookBtn');

        const availableFormats = ["3D", "IMAX 2D", "3D SCREEN X", "4DX", "4DX 3D", "MX4D 3D", "IMAX 3D", "ICE 3D"];
        const theaters = [
            // Original Halls (F&B + Tickets)
            { name: "Inox South City", brand: "INOX", hasTickets: true, hasFood: true },
            { name: "PVR Diamond Plaza", brand: "PVR", hasTickets: true, hasFood: true },
            { name: "Cinepolis Lake Mall", brand: "CINEPOLIS", hasTickets: true, hasFood: true },
            { name: "Inox Quest Mall", brand: "INOX", hasTickets: true, hasFood: true },
            { name: "Inox City Centre", brand: "INOX", hasTickets: true, hasFood: true },
            { name: "Cinepolis Acropolis Mall", brand: "CINEPOLIS", hasTickets: true, hasFood: true },
            { name: "RDB Cinemas", brand: "RDB", hasTickets: true, hasFood: true },
            { name: "Inox Hiland Park", brand: "INOX", hasTickets: true, hasFood: true },
            { name: "PVR Avani Mall", brand: "PVR", hasTickets: true, hasFood: true },
            { name: "Atindra Cinema", brand: "LOCAL", hasTickets: true, hasFood: true },
            { name: "PVR Mani Square", brand: "PVR", hasTickets: true, hasFood: true },
            { name: "Inox Star Mall", brand: "INOX", hasTickets: true, hasFood: true },
            
            // Tickets-Only Halls
            { name: "Bioscope Axis Mall", brand: "BIOSCOPE", hasTickets: true, hasFood: false },
            { name: "Nazrultirtha Cinema", brand: "HIDCO", hasTickets: true, hasFood: false },
            { name: "Elora Multiplex", brand: "ELORA", hasTickets: true, hasFood: false },
            { name: "Hind Inox", brand: "INOX", hasTickets: true, hasFood: false },
            { name: "SSR Cinemas Maheshtala", brand: "SSR", hasTickets: true, hasFood: false },
            { name: "Jayanti Cinema", brand: "LOCAL", hasTickets: true, hasFood: false },
            
            // New Additions (Tickets + F&B)
            { name: "Miraj Cinemas Terminus", brand: "MIRAJ", hasTickets: true, hasFood: true },
            { name: "Inox Forum Mall", brand: "INOX", hasTickets: true, hasFood: true },
            { name: "Inox Rangoli Mall", brand: "INOX", hasTickets: true, hasFood: true },
            { name: "SSR Ajanta Cinema", brand: "SSR", hasTickets: true, hasFood: true },
            { name: "SVF Cinemas Wood Square Mall", brand: "SVF", hasTickets: true, hasFood: true },
            { name: "Inox Swabhumi Maulana Azad Sarani", brand: "INOX", hasTickets: true, hasFood: true },
            { name: "SVF Cinemas Platina Mall", brand: "SVF", hasTickets: true, hasFood: true },
            { name: "Inox Metro JNR", brand: "INOX", hasTickets: true, hasFood: true },
            { name: "Rathindra Multiplex", brand: "LOCAL", hasTickets: true, hasFood: true },
            { name: "SSR Globe Cinema", brand: "SSR", hasTickets: true, hasFood: true },
            { name: "Miraj Cinemas Downtown Mall", brand: "MIRAJ", hasTickets: true, hasFood: true },
            { name: "SSR Cinemas Suncity Mall", brand: "SSR", hasTickets: true, hasFood: true },
            { name: "Jaya Cinemas City Mall", brand: "LOCAL", hasTickets: true, hasFood: true },
            { name: "SVF Baruipur Cinemas", brand: "SVF", hasTickets: true, hasFood: true },

            // Heritage/Talkie Halls (2D ONLY, 2-4 shows, Tickets only)
            { name: "Uma Talkies", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Sobha Talkies", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Amala Cinema", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Utpal Dutta Mancha", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Lali Cinema", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Rupmandir Cinema", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Minar Cinema", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Bijoli Cinema", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Asoka Cinema", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Navina Cinema", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Priya Cinema", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Sonali Cinema", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Binodini(Star) Cinema", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Prachi Cinema", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true },
            { name: "Padma Cinema", brand: "TALKIES", hasTickets: true, hasFood: false, is2DOnly: true }
        ];

        let currentSelectedFormat = "2D";

        // Open Modal
        const movieSection = document.querySelector('.section-movies');
        if (movieSection) {
            movieSection.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-book-sm')) {
                    const card = e.target.closest('.movie-card');
                    const movieName = card.querySelector('h3').textContent.trim();
                    modalMovieTitle.textContent = movieName;
                    resetModalStep1();
                    bookingModal.classList.add('active');
                }
            });
        }

        function resetModalStep1() {
            modalSubTitle.textContent = "Choose your preferred format to continue booking";
            formatSelectionView.style.display = 'block';
            showtimeSelectionView.style.display = 'none';
            formatOptionsGrid.innerHTML = '';
            
            if (window.isDhurandhar) {
                addFormatToModal("2D", true);
                addFormatToModal("3D", false);
                addFormatToModal("IMAX 3D", false);
            } else {
                addFormatToModal("2D", true);
                const shuffled = [...availableFormats].sort(() => 0.5 - Math.random());
                shuffled.slice(0, Math.floor(Math.random() * 2) + 1).forEach(fmt => addFormatToModal(fmt, false));
            }
        }

        function addFormatToModal(name, isDefault) {
            const card = document.createElement('div');
            card.className = `format-option-card ${isDefault ? 'selected' : ''}`;
            card.innerHTML = `
                ${isDefault ? '<span class="format-badge-must">2D MUST</span>' : ''}
                <span class="format-name">${name}</span>
                <span class="format-price-sm">Starting from ₹350</span>
            `;
            card.addEventListener('click', () => {
                document.querySelectorAll('.format-option-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                currentSelectedFormat = name;
            });
            formatOptionsGrid.appendChild(card);
        }

        function generateShowtimes(theater, format) {
            const times = [];
            let count;
            
            if (window.isDhurandhar) {
                if (format === "2D") count = Math.floor(Math.random() * 6) + 10; // 10-15 shows
                else if (format === "3D") count = Math.floor(Math.random() * 5) + 4; // 4-8 shows
                else if (format === "IMAX 3D") count = Math.floor(Math.random() * 2) + 2; // 2-3 shows
                else count = 2;
            } else {
                if (theater.is2DOnly) {
                    count = Math.floor(Math.random() * 3) + 2; 
                } else {
                    count = format === "2D" ? 
                              Math.floor(Math.random() * 8) + 5 : 
                              Math.floor(Math.random() * 5) + 1;
                }
            }
            
            for (let i = 0; i < count; i++) {
                const hour = Math.floor(Math.random() * 17) + 7; // 7am to 11:30pm (7 + 16 = 23)
                const min = Math.random() > 0.5 ? "00" : "30";
                const period = hour >= 12 ? "PM" : "AM";
                const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
                times.push(`${displayHour}:${min} ${period}`);
            }
            return [...new Set(times)].sort((a,b) => {
                return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
            });
        }

        confirmFormatBtn.addEventListener('click', () => {
            const selectedFormatCard = document.querySelector('.format-option-card.selected .format-name');
            currentSelectedFormat = selectedFormatCard ? selectedFormatCard.textContent : "2D";
            
            modalSubTitle.textContent = `Booking in ${currentSelectedFormat} experience`;
            formatSelectionView.style.display = 'none';
            showtimeSelectionView.style.display = 'block';
            
            renderTheaters(currentSelectedFormat);
        });

        function renderTheaters(format) {
            theatersList.innerHTML = '';
            let selectedTheaters = [...theaters];
            if (window.isDhurandhar) {
                selectedTheaters = selectedTheaters.sort(() => 0.5 - Math.random());
                if (format === "2D") selectedTheaters = selectedTheaters.slice(0, 20);
                else if (format === "3D") selectedTheaters = selectedTheaters.slice(0, 12);
                else if (format === "IMAX 3D") selectedTheaters = selectedTheaters.slice(0, 4);
            }

            selectedTheaters.forEach(theater => {
                // Skip heritage halls if not 2D
                if (!window.isDhurandhar && format !== "2D" && theater.is2DOnly) return;

                const item = document.createElement('div');
                item.className = 'theater-item';
                
                const showtimes = generateShowtimes(theater, format);
                let showtimeHtml = '';
                showtimes.forEach(time => {
                    showtimeHtml += `<button class="showtime-chip">${time}</button>`;
                });

                item.innerHTML = `
                    <div class="theater-info">
                        <div class="brand-icon"><i class="fa-solid fa-hotel"></i></div>
                        <span class="theater-name">${theater.name}</span>
                        <i class="fa-solid fa-car" title="Parking Facility Available" style="color: #10b981; font-size: 0.9rem; margin-left: 5px;"></i>
                        <div class="theater-meta-icons">
                            ${(window.isDhurandhar || theater.hasTickets) ? '<i class="fa-solid fa-ticket" title="M-Ticket Available" style="color: #3b82f6;"></i>' : ''}
                            ${(window.isDhurandhar || theater.hasFood) ? '<i class="fa-solid fa-burger" title="Food & Beverage Available" style="color: #f59e0b;"></i>' : ''}
                        </div>
                    </div>
                    <div class="showtimes-grid">${showtimeHtml}</div>
                `;
                
                item.addEventListener('click', (e) => {
                    if (e.target.classList.contains('showtime-chip')) {
                        document.querySelectorAll('.showtime-chip').forEach(c => c.classList.remove('selected'));
                        e.target.classList.add('selected');
                    }
                });
                
                theatersList.appendChild(item);
            });
        }

        // Seat Selection Elements
        const seatSelectionView = document.getElementById('seatSelectionView');
        const seatsLayout = document.getElementById('seatsLayout');
        const seatCountChips = document.getElementById('seatCountChips');
        const selectedSeatsText = document.getElementById('selectedSeatsText');
        const totalPriceText = document.getElementById('totalPriceText');
        const backToTheatersBtn = document.getElementById('backToTheatersBtn');
        const confirmTicketsBtn = document.getElementById('confirmTicketsBtn');

        let maxSeats = 1;
        let selectedSeats = [];

        // Transition Step 2 -> Step 3
        finalBookBtn.addEventListener('click', () => {
            const selectedShow = document.querySelector('.showtime-chip.selected');
            if (!selectedShow) return alert("Please select a showtime!");
            
            showtimeSelectionView.style.display = 'none';
            seatSelectionView.style.display = 'block';
            modalSubTitle.textContent = "Almost there! Select your favorite seats";
            
            generateSeats();
        });

        // Seat Count Picker
        seatCountChips.addEventListener('click', (e) => {
            if (e.target.classList.contains('count-chip')) {
                document.querySelectorAll('.count-chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                maxSeats = parseInt(e.target.dataset.count);
                resetSeatsSelection();
            }
        });

        const seatPricing = [
            { rows: ['A', 'B', 'C'], label: 'Premium', price: 500 },
            { rows: ['D', 'E', 'F', 'G'], label: 'Club', price: 350 },
            { rows: ['H', 'I', 'J', 'K'], label: 'Executive', price: 250 }
        ];

        function generateSeats() {
            seatsLayout.innerHTML = '';
            selectedSeats = [];
            updateSummary();

            seatPricing.forEach(tier => {
                const divider = document.createElement('div');
                divider.className = 'seat-price-divider';
                divider.textContent = `${tier.label} - ₹${tier.price}`;
                seatsLayout.appendChild(divider);

                tier.rows.forEach(rowLetter => {
                    const rowDiv = document.createElement('div');
                    rowDiv.className = 'seat-row';
                    
                    const label = document.createElement('div');
                    label.className = 'row-label';
                    label.textContent = rowLetter;
                    rowDiv.appendChild(label);

                    for (let i = 1; i <= 15; i++) {
                        const seat = document.createElement('div');
                        const isOccupied = Math.random() < 0.2;
                        seat.className = `seat ${isOccupied ? 'occupied' : 'available'}`;
                        seat.dataset.row = rowLetter;
                        seat.dataset.num = i;
                        seat.dataset.price = tier.price;

                        seat.addEventListener('click', () => toggleSeat(seat));
                        rowDiv.appendChild(seat);
                    }
                    seatsLayout.appendChild(rowDiv);
                });
            });
        }

        function toggleSeat(seat) {
            if (seat.classList.contains('occupied')) return;

            if (seat.classList.contains('selected')) {
                seat.classList.remove('selected');
                selectedSeats = selectedSeats.filter(s => s !== seat);
            } else {
                if (selectedSeats.length >= maxSeats) {
                    const first = selectedSeats.shift();
                    first.classList.remove('selected');
                }
                seat.classList.add('selected');
                selectedSeats.push(seat);
            }
            updateSummary();
        }

        function resetSeatsSelection() {
            document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
            selectedSeats = [];
            updateSummary();
        }

        function updateSummary() {
            let total = 0;
            selectedSeats.forEach(s => total += parseInt(s.dataset.price));
            
            selectedSeatsText.textContent = selectedSeats.length > 0 ? 
                `${selectedSeats.length} Seat(s) Selected` : "Select Seats";
            
            const totalStr = `₹${total.toFixed(2)}`;
            totalPriceText.textContent = totalStr;
            
            // Update button text to "Pay Now ₹Total"
            if (total > 0) {
                confirmTicketsBtn.textContent = `Pay Now ${totalStr}`;
            } else {
                confirmTicketsBtn.textContent = "Pay Now";
            }
        }

        // Step Navigation & Close
        backToFormatBtn.addEventListener('click', () => resetModalStep1());
        closeBookingModal.addEventListener('click', () => bookingModal.classList.remove('active'));
        
        window.addEventListener('click', (e) => {
            if (e.target === bookingModal) bookingModal.classList.remove('active');
        });

        // Navigation
        backToTheatersBtn.addEventListener('click', () => {
            seatSelectionView.style.display = 'none';
            showtimeSelectionView.style.display = 'block';
            modalSubTitle.textContent = "Choose your preferred cinema and showtime";
        });

        confirmTicketsBtn.addEventListener('click', () => {
            if (selectedSeats.length === 0) return alert("Please select at least one seat!");
            
            const movie = modalMovieTitle.textContent;
            const theater = document.querySelector('.theater-item:has(.showtime-chip.selected) .theater-name').textContent;
            const show = document.querySelector('.showtime-chip.selected').textContent;
            
            alert(`🎉 Booking Successful! \n\nMovie: ${movie}\nCinema: ${theater}\nShow: ${show}\nSeats: ${selectedSeats.length}\nTotal: ${totalPriceText.textContent}`);
            bookingModal.classList.remove('active');
        });
    }

    // --- SPORTS BOOKING MODAL LOGIC ---
    const sportsBookingModal = document.getElementById('sportsBookingModal');
    const closeSportsBookingModal = document.getElementById('closeSportsBookingModal');
    const sportsModalMovieTitle = document.getElementById('sportsModalMovieTitle');
    const sportsBookingFooter = document.getElementById('sportsBookingFooter');
    const sportsSeatCountChips = document.getElementById('sportsSeatCountChips');
    const sportsSelectedStandText = document.getElementById('sportsSelectedStandText');
    const sportsTotalPriceText = document.getElementById('sportsTotalPriceText');
    const sportsPayNowBtn = document.getElementById('sportsPayNowBtn');
    const stands = document.querySelectorAll('.stand');

    let selectedStand = null;
    let sportsSeatCount = 1;

    // Open Booking Modals
    const bookingSections = document.querySelectorAll('section, .carousel-container, .sports-carousel, .events-carousel');
    bookingSections.forEach(section => {
        section.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-book-sm') || e.target.classList.contains('btn-book')) {
                const card = e.target.closest('.event-card') || e.target.closest('.carousel-slide');
                if (!card) return;
                const titleEl = card.querySelector('h3, h1');
                const eventName = titleEl ? titleEl.textContent.trim() : '';
                
                const specialEvents = [
                    "Unlocking Creativity", "LOL Night", "Global Jazz Festival", "Magic & Mystery", "Startup Founders", 
                    "Swan Lake", "TechNova", "Photography Masterclass", "Stand Up Special", "Rock the Night", "Disney on Ice",
                    "Creative Writers Guild Meetup", "Ancient Wonders", "Broadway Nights", "MedTech Summit", 
                    "Pottery & Ceramics", "Open Mic Night", "Electronic Beats", "Puppet Theatre", "Automotive Expo", 
                    "Hip Hop Dance", "Quantum Computing"
                ];

                const freeEvents = [
                    "Modern Art & Sculpture", "Digital Marketing 101 Networking"
                ];

                if (eventName === 'DHURANDHAR') {
                    window.isDhurandhar = true;
                    const evtTitle = document.getElementById('modalMovieTitle');
                    if (evtTitle) evtTitle.textContent = eventName;
                    
                    if (window.resetModalStep1) window.resetModalStep1();
                    const bModal = document.getElementById('bookingModal');
                    if (bModal) bModal.classList.add('active');
                }
                else if (eventName.includes('IPL 2026') || eventName.includes('IPL')) {
                    window.isDhurandhar = false;
                    const iplTitle = document.getElementById('iplModalMovieTitle');
                    if (iplTitle) iplTitle.textContent = eventName;
                    if (window.resetIplModal) window.resetIplModal();
                    const iplModal = document.getElementById('iplBookingModal');
                    if (iplModal) iplModal.classList.add('active');
                }
                else if (eventName.includes('INDIAN PREMIER LEAGUE') || eventName.includes('ICC T20 WORLD CUP') || eventName.includes('THE ASHES') || eventName.toLowerCase().includes('cricket')) {
                    sportsModalMovieTitle.textContent = eventName;
                    resetSportsModal();
                    sportsBookingModal.classList.add('active');
                } 
                else if (eventName.includes('FIFA WORLD CUP') || eventName.includes('INDIAN SUPER LEAGUE') || eventName.includes('PREMIER LEAGUE') || eventName.includes('UEFA CHAMPIONS LEAGUE') || eventName.toLowerCase().includes('football')) {
                    footballModalMovieTitle.textContent = eventName;
                    resetFootballModal();
                    footballBookingModal.classList.add('active');
                }
                else if (eventName.includes('WIMBLEDON') || eventName.includes('AUSTRALIAN OPEN') || eventName.toLowerCase().includes('tennis')) {
                    tennisModalMovieTitle.textContent = eventName;
                    resetTennisModal();
                    tennisBookingModal.classList.add('active');
                }
                else if (eventName.includes('NBA FINALS') || eventName.includes('SUPER BOWL')) {
                    const bbTitle = document.getElementById('basketballModalMovieTitle');
                    if (bbTitle) bbTitle.textContent = eventName;
                    resetBasketballModal();
                    document.getElementById('basketballBookingModal').classList.add('active');
                }
                else if (eventName.includes('OLYMPIC GAMES') || eventName.toLowerCase().includes('olympic')) {
                    const olympicTitle = document.getElementById('olympicModalMovieTitle');
                    if (olympicTitle) olympicTitle.textContent = eventName;
                    resetOlympicModal();
                    document.getElementById('olympicBookingModal').classList.add('active');
                }
                else if (freeEvents.some(name => eventName.includes(name))) {
                    const evtTitle = document.getElementById('eventModalTitle');
                    if (evtTitle) evtTitle.textContent = eventName;
                    
                    const hours = Math.floor(Math.random() * (9 - 2 + 1)) + 2; 
                    const randTime = document.getElementById('eventRandomShowtime');
                    if (randTime) randTime.textContent = `${hours}:00 PM`;
                    
                    if (window.resetEventModal) window.resetEventModal(true);
                    document.getElementById('eventBookingModal').classList.add('active');
                }
                else if (specialEvents.some(name => eventName.includes(name))) {
                    const evtTitle = document.getElementById('eventModalTitle');
                    if (evtTitle) evtTitle.textContent = eventName;
                    
                    const hours = Math.floor(Math.random() * (9 - 2 + 1)) + 2; 
                    const randTime = document.getElementById('eventRandomShowtime');
                    if (randTime) randTime.textContent = `${hours}:00 PM`;
                    
                    if (window.resetEventModal) window.resetEventModal(false);
                    document.getElementById('eventBookingModal').classList.add('active');
                }
                else {
                    alert(`Booking for ${eventName} will open soon!`);
                }
            }
        });
    });

    if (closeSportsBookingModal) {
        closeSportsBookingModal.addEventListener('click', () => {
            sportsBookingModal.classList.remove('active');
        });
    }

    if (closeFootballBookingModal) {
        closeFootballBookingModal.addEventListener('click', () => {
            footballBookingModal.classList.remove('active');
        });
    }

    if (document.getElementById('closeTennisBookingModal')) {
        document.getElementById('closeTennisBookingModal').addEventListener('click', () => {
            document.getElementById('tennisBookingModal').classList.remove('active');
        });
    }
    if (document.getElementById('closeBasketballBookingModal')) {
        document.getElementById('closeBasketballBookingModal').addEventListener('click', () => {
            document.getElementById('basketballBookingModal').classList.remove('active');
        });
    }
    if (document.getElementById('closeOlympicBookingModal')) {
        document.getElementById('closeOlympicBookingModal').addEventListener('click', () => {
            document.getElementById('olympicBookingModal').classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === sportsBookingModal) {
            sportsBookingModal.classList.remove('active');
        }
        if (e.target === footballBookingModal) {
            footballBookingModal.classList.remove('active');
        }
        if (e.target === document.getElementById('tennisBookingModal')) {
            document.getElementById('tennisBookingModal').classList.remove('active');
        }
        if (e.target === document.getElementById('basketballBookingModal')) {
            document.getElementById('basketballBookingModal').classList.remove('active');
        }
        if (e.target === document.getElementById('olympicBookingModal')) {
            document.getElementById('olympicBookingModal').classList.remove('active');
        }
    });

    // --- CRICKET MODAL FUNCTIONS ---
    stands.forEach(stand => {
        stand.addEventListener('click', () => {
            stands.forEach(s => s.classList.remove('selected'));
            stand.classList.add('selected');
            
            selectedStand = {
                name: stand.dataset.stand,
                price: parseInt(stand.dataset.price)
            };
            
            sportsBookingFooter.style.display = 'flex';
            updateSportsSummary();
        });
    });

    if (sportsSeatCountChips) {
        sportsSeatCountChips.addEventListener('click', (e) => {
            if (e.target.classList.contains('count-chip')) {
                document.querySelectorAll('#sportsSeatCountChips .count-chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                sportsSeatCount = parseInt(e.target.dataset.count);
                updateSportsSummary();
            }
        });
    }

    function updateSportsSummary() {
        if (!selectedStand) return;
        
        sportsSelectedStandText.textContent = `${sportsSeatCount} Seat(s) in ${selectedStand.name}`;
        const total = selectedStand.price * sportsSeatCount;
        const totalStr = `₹${total.toFixed(2)}`;
        
        sportsTotalPriceText.textContent = totalStr;
        sportsPayNowBtn.textContent = `Pay Now ${totalStr}`;
    }

    function resetSportsModal() {
        stands.forEach(s => s.classList.remove('selected'));
        selectedStand = null;
        sportsSeatCount = 1;
        if (document.querySelectorAll('#sportsSeatCountChips .count-chip').length > 0) {
            document.querySelectorAll('#sportsSeatCountChips .count-chip').forEach(c => c.classList.remove('active'));
            document.querySelector('#sportsSeatCountChips .count-chip').classList.add('active');
        }
        sportsBookingFooter.style.display = 'none';
        sportsPayNowBtn.textContent = 'Pay Now';
    }

    if (sportsPayNowBtn) {
        sportsPayNowBtn.addEventListener('click', () => {
            if (!selectedStand) return;
            const event = sportsModalMovieTitle.textContent;
            alert(`🎉 Booking Successful! \n\nEvent: ${event}\nStand: ${selectedStand.name}\nTickets: ${sportsSeatCount}\nTotal: ${sportsTotalPriceText.textContent}`);
            sportsBookingModal.classList.remove('active');
        });
    }

    // --- FOOTBALL MODAL FUNCTIONS ---
    const footballStands = document.querySelectorAll('.football-stadium-container .stand');
    
    footballStands.forEach(stand => {
        stand.addEventListener('click', () => {
            footballStands.forEach(s => s.classList.remove('selected'));
            stand.classList.add('selected');
            
            footballSelectedStand = {
                name: stand.dataset.stand,
                price: parseInt(stand.dataset.price)
            };
            
            footballBookingFooter.style.display = 'flex';
            updateFootballSummary();
        });
    });

    if (footballSeatCountChips) {
        footballSeatCountChips.addEventListener('click', (e) => {
            if (e.target.classList.contains('count-chip')) {
                document.querySelectorAll('#footballSeatCountChips .count-chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                footballSeatCount = parseInt(e.target.dataset.count);
                updateFootballSummary();
            }
        });
    }

    function updateFootballSummary() {
        if (!footballSelectedStand) return;
        
        footballSelectedStandText.textContent = `${footballSeatCount} Seat(s) in ${footballSelectedStand.name}`;
        const total = footballSelectedStand.price * footballSeatCount;
        const totalStr = `₹${total.toFixed(2)}`;
        
        footballTotalPriceText.textContent = totalStr;
        footballPayNowBtn.textContent = `Pay Now ${totalStr}`;
    }

    function resetFootballModal() {
        footballStands.forEach(s => s.classList.remove('selected'));
        footballSelectedStand = null;
        footballSeatCount = 1;
        if (document.querySelectorAll('#footballSeatCountChips .count-chip').length > 0) {
            document.querySelectorAll('#footballSeatCountChips .count-chip').forEach(c => c.classList.remove('active'));
            document.querySelector('#footballSeatCountChips .count-chip').classList.add('active');
        }
        footballBookingFooter.style.display = 'none';
        footballPayNowBtn.textContent = 'Pay Now';
    }

    if (footballPayNowBtn) {
        footballPayNowBtn.addEventListener('click', () => {
            if (!footballSelectedStand) return;
            const event = footballModalMovieTitle.textContent;
            alert(`🎉 Booking Successful! \n\nEvent: ${event}\nStand: ${footballSelectedStand.name}\nTickets: ${footballSeatCount}\nTotal: ${footballTotalPriceText.textContent}`);
            footballBookingModal.classList.remove('active');
        });
    }

    // --- TENNIS MODAL FUNCTIONS ---
    const tennisBookingModal = document.getElementById('tennisBookingModal');
    const tennisModalMovieTitle = document.getElementById('tennisModalMovieTitle');
    const tennisBookingFooter = document.getElementById('tennisBookingFooter');
    const tennisSeatCountChips = document.getElementById('tennisSeatCountChips');
    const tennisSelectedStandText = document.getElementById('tennisSelectedStandText');
    const tennisTotalPriceText = document.getElementById('tennisTotalPriceText');
    const tennisPayNowBtn = document.getElementById('tennisPayNowBtn');
    const tennisStands = document.querySelectorAll('.tennis-stadium-container .stand');

    let tennisSelectedStand = null;
    let tennisSeatCount = 1;

    tennisStands.forEach(stand => {
        stand.addEventListener('click', () => {
            tennisStands.forEach(s => s.classList.remove('selected'));
            stand.classList.add('selected');
            
            tennisSelectedStand = {
                name: stand.dataset.stand,
                price: parseInt(stand.dataset.price)
            };
            
            tennisBookingFooter.style.display = 'flex';
            updateTennisSummary();
        });
    });

    if (tennisSeatCountChips) {
        tennisSeatCountChips.addEventListener('click', (e) => {
            if (e.target.classList.contains('count-chip')) {
                document.querySelectorAll('#tennisSeatCountChips .count-chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                tennisSeatCount = parseInt(e.target.dataset.count);
                updateTennisSummary();
            }
        });
    }

    function updateTennisSummary() {
        if (!tennisSelectedStand) return;
        
        tennisSelectedStandText.textContent = `${tennisSeatCount} Seat(s) in ${tennisSelectedStand.name}`;
        const total = tennisSelectedStand.price * tennisSeatCount;
        const totalStr = `₹${total.toFixed(2)}`;
        
        tennisTotalPriceText.textContent = totalStr;
        tennisPayNowBtn.textContent = `Pay Now ${totalStr}`;
    }

    function resetTennisModal() {
        tennisStands.forEach(s => s.classList.remove('selected'));
        tennisSelectedStand = null;
        tennisSeatCount = 1;
        if (document.querySelectorAll('#tennisSeatCountChips .count-chip').length > 0) {
            document.querySelectorAll('#tennisSeatCountChips .count-chip').forEach(c => c.classList.remove('active'));
            document.querySelector('#tennisSeatCountChips .count-chip').classList.add('active');
        }
        if (tennisBookingFooter) {
            tennisBookingFooter.style.display = 'none';
        }
        if (tennisPayNowBtn) {
            tennisPayNowBtn.textContent = 'Pay Now';
        }
    }

    if (tennisPayNowBtn) {
        tennisPayNowBtn.addEventListener('click', () => {
            if (!tennisSelectedStand) return;
            const event = tennisModalMovieTitle.textContent;
            alert(`🎉 Booking Successful! \n\nEvent: ${event}\nStand: ${tennisSelectedStand.name}\nTickets: ${tennisSeatCount}\nTotal: ${tennisTotalPriceText.textContent}`);
            tennisBookingModal.classList.remove('active');
        });
    }

    // --- BASKETBALL MODAL FUNCTIONS ---
    const basketballBookingFooter = document.getElementById('basketballBookingFooter');
    const basketballSeatCountChips = document.getElementById('basketballSeatCountChips');
    const basketballSelectedStandText = document.getElementById('basketballSelectedStandText');
    const basketballTotalPriceText = document.getElementById('basketballTotalPriceText');
    const basketballPayNowBtn = document.getElementById('basketballPayNowBtn');
    const basketballStands = document.querySelectorAll('.basketball-stadium-container .stand');

    let basketballSelectedStand = null;
    let basketballSeatCount = 1;

    basketballStands.forEach(stand => {
        stand.addEventListener('click', () => {
            basketballStands.forEach(s => s.classList.remove('selected'));
            stand.classList.add('selected');
            
            basketballSelectedStand = {
                name: stand.dataset.stand,
                price: parseInt(stand.dataset.price)
            };
            
            if(basketballBookingFooter) basketballBookingFooter.style.display = 'flex';
            updateBasketballSummary();
        });
    });

    if (basketballSeatCountChips) {
        basketballSeatCountChips.addEventListener('click', (e) => {
            if (e.target.classList.contains('count-chip')) {
                document.querySelectorAll('#basketballSeatCountChips .count-chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                basketballSeatCount = parseInt(e.target.dataset.count);
                updateBasketballSummary();
            }
        });
    }

    function updateBasketballSummary() {
        if (!basketballSelectedStand) return;
        
        basketballSelectedStandText.textContent = `${basketballSeatCount} Seat(s) in ${basketballSelectedStand.name}`;
        const total = basketballSelectedStand.price * basketballSeatCount;
        const totalStr = `₹${total.toFixed(2)}`;
        
        basketballTotalPriceText.textContent = totalStr;
        basketballPayNowBtn.textContent = `Pay Now ${totalStr}`;
    }

    window.resetBasketballModal = function() {
        basketballStands.forEach(s => s.classList.remove('selected'));
        basketballSelectedStand = null;
        basketballSeatCount = 1;
        if (document.querySelectorAll('#basketballSeatCountChips .count-chip').length > 0) {
            document.querySelectorAll('#basketballSeatCountChips .count-chip').forEach(c => c.classList.remove('active'));
            document.querySelector('#basketballSeatCountChips .count-chip').classList.add('active');
        }
        if (basketballBookingFooter) basketballBookingFooter.style.display = 'none';
        if (basketballPayNowBtn) basketballPayNowBtn.textContent = 'Pay Now';
    }

    if (basketballPayNowBtn) {
        basketballPayNowBtn.addEventListener('click', () => {
            if (!basketballSelectedStand) return;
            const event = document.getElementById('basketballModalMovieTitle').textContent;
            alert(`🎉 Booking Successful! \n\nEvent: ${event}\nStand: ${basketballSelectedStand.name}\nTickets: ${basketballSeatCount}\nTotal: ${basketballTotalPriceText.textContent}`);
            document.getElementById('basketballBookingModal').classList.remove('active');
        });
    }

    // --- OLYMPIC MODAL FUNCTIONS ---
    const olympicBookingFooter = document.getElementById('olympicBookingFooter');
    const olympicSeatCountChips = document.getElementById('olympicSeatCountChips');
    const olympicSelectedStandText = document.getElementById('olympicSelectedStandText');
    const olympicTotalPriceText = document.getElementById('olympicTotalPriceText');
    const olympicPayNowBtn = document.getElementById('olympicPayNowBtn');
    const olympicStands = document.querySelectorAll('.olympic-stadium-container .stand');

    let olympicSelectedStand = null;
    let olympicSeatCount = 1;

    olympicStands.forEach(stand => {
        stand.addEventListener('click', () => {
            olympicStands.forEach(s => s.classList.remove('selected'));
            stand.classList.add('selected');
            
            olympicSelectedStand = {
                name: stand.dataset.stand,
                price: parseInt(stand.dataset.price)
            };
            
            if(olympicBookingFooter) olympicBookingFooter.style.display = 'flex';
            updateOlympicSummary();
        });
    });

    if (olympicSeatCountChips) {
        olympicSeatCountChips.addEventListener('click', (e) => {
            if (e.target.classList.contains('count-chip')) {
                document.querySelectorAll('#olympicSeatCountChips .count-chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                olympicSeatCount = parseInt(e.target.dataset.count);
                updateOlympicSummary();
            }
        });
    }

    function updateOlympicSummary() {
        if (!olympicSelectedStand) return;
        
        olympicSelectedStandText.textContent = `${olympicSeatCount} Seat(s) in ${olympicSelectedStand.name}`;
        const total = olympicSelectedStand.price * olympicSeatCount;
        const totalStr = `₹${total.toFixed(2)}`;
        
        olympicTotalPriceText.textContent = totalStr;
        olympicPayNowBtn.textContent = `Pay Now ${totalStr}`;
    }

    window.resetOlympicModal = function() {
        olympicStands.forEach(s => s.classList.remove('selected'));
        olympicSelectedStand = null;
        olympicSeatCount = 1;
        if (document.querySelectorAll('#olympicSeatCountChips .count-chip').length > 0) {
            document.querySelectorAll('#olympicSeatCountChips .count-chip').forEach(c => c.classList.remove('active'));
            document.querySelector('#olympicSeatCountChips .count-chip').classList.add('active');
        }
        if (olympicBookingFooter) olympicBookingFooter.style.display = 'none';
        if (olympicPayNowBtn) olympicPayNowBtn.textContent = 'Pay Now';
    }

    if (olympicPayNowBtn) {
        olympicPayNowBtn.addEventListener('click', () => {
            if (!olympicSelectedStand) return;
            const event = document.getElementById('olympicModalMovieTitle').textContent;
            alert(`🎉 Booking Successful! \n\nEvent: ${event}\nStand: ${olympicSelectedStand.name}\nTickets: ${olympicSeatCount}\nTotal: ${olympicTotalPriceText.textContent}`);
            document.getElementById('olympicBookingModal').classList.remove('active');
        });
    }

    // --- EVENT MODAL FUNCTIONS ---
    const eventBookingModal = document.getElementById('eventBookingModal');
    const closeEventBookingModal = document.getElementById('closeEventBookingModal');
    const eventTimeSelectionView = document.getElementById('eventTimeSelectionView');
    const eventTicketSelectionView = document.getElementById('eventTicketSelectionView');
    const eventModalTitle = document.getElementById('eventModalTitle');
    const eventModalSubTitle = document.getElementById('eventModalSubTitle');
    
    const eventProceedBtn = document.getElementById('eventProceedBtn');
    const eventBackBtn = document.getElementById('eventBackBtn');
    const eventPayNowBtn = document.getElementById('eventPayNowBtn');
    
    const eventRandomShowtime = document.getElementById('eventRandomShowtime');
    const eventSelectedTicketsText = document.getElementById('eventSelectedTicketsText');
    const eventTotalPriceText = document.getElementById('eventTotalPriceText');

    let eventTickets = {
        platinum: { count: 0, price: 10000 },
        gold: { count: 0, price: 5000 },
        silver: { count: 0, price: 2000 },
        free: { count: 0, price: 0 }
    };
    let isCurrentEventFree = false;

    if (closeEventBookingModal) {
        closeEventBookingModal.addEventListener('click', () => {
            if (eventBookingModal) eventBookingModal.classList.remove('active');
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === eventBookingModal) {
            eventBookingModal.classList.remove('active');
        }
    });

    if (eventProceedBtn) {
        eventProceedBtn.addEventListener('click', () => {
            eventTimeSelectionView.style.display = 'none';
            eventTicketSelectionView.style.display = 'block';
            eventModalSubTitle.textContent = 'Step 2: Select Ticketing Tier';
        });
    }

    if (eventBackBtn) {
        eventBackBtn.addEventListener('click', () => {
            eventTimeSelectionView.style.display = 'block';
            eventTicketSelectionView.style.display = 'none';
            eventModalSubTitle.textContent = 'Step 1: Confirm Showtime';
        });
    }

    const tierBtns = document.querySelectorAll('.tier-btn');
    tierBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tier = e.target.dataset.tier;
            const isPlus = e.target.classList.contains('plus-btn');
            
            if (isPlus) {
                if (getTotalEventTickets() < 10) { 
                    eventTickets[tier].count++;
                }
            } else {
                if (eventTickets[tier].count > 0) {
                    eventTickets[tier].count--;
                }
            }
            
            document.getElementById(`count-${tier}`).textContent = eventTickets[tier].count;
            updateEventSummary();
        });
    });

    function getTotalEventTickets() {
        if (isCurrentEventFree) {
            return eventTickets.free.count;
        }
        return eventTickets.platinum.count + eventTickets.gold.count + eventTickets.silver.count;
    }

    function updateEventSummary() {
        const totalCount = getTotalEventTickets();
        
        let totalPrice = 0;
        if (!isCurrentEventFree) {
            totalPrice = (eventTickets.platinum.count * eventTickets.platinum.price) + 
                         (eventTickets.gold.count * eventTickets.gold.price) + 
                         (eventTickets.silver.count * eventTickets.silver.price);
        }
                           
        if(eventSelectedTicketsText) eventSelectedTicketsText.textContent = `${totalCount} Ticket(s)`;
        const totalStr = isCurrentEventFree ? (totalCount > 0 ? "Free" : "₹0.00") : `₹${totalPrice.toFixed(2)}`;
        
        if(eventTotalPriceText) {
            if (isCurrentEventFree && totalCount > 0) {
                eventTotalPriceText.textContent = 'Free';
            } else {
                eventTotalPriceText.textContent = `₹${totalPrice.toFixed(2)}`;
            }
        }
        
        if(eventPayNowBtn) {
            if (totalCount > 0) {
                eventPayNowBtn.textContent = isCurrentEventFree ? `Pay Now (Free)` : `Pay Now ₹${totalPrice.toFixed(2)}`;
                eventPayNowBtn.dataset.active = 'true';
            } else {
                eventPayNowBtn.textContent = 'Pay Now';
                eventPayNowBtn.dataset.active = 'false';
            }
        }
    }

    window.resetEventModal = function(isFree = false) {
        isCurrentEventFree = isFree;
        if(eventTimeSelectionView) eventTimeSelectionView.style.display = 'block';
        if(eventTicketSelectionView) eventTicketSelectionView.style.display = 'none';
        if(eventModalSubTitle) eventModalSubTitle.textContent = 'Step 1: Confirm Showtime';
        
        eventTickets.platinum.count = 0;
        eventTickets.gold.count = 0;
        eventTickets.silver.count = 0;
        eventTickets.free.count = 0;
        
        const countPlat = document.getElementById('count-platinum');
        const countGold = document.getElementById('count-gold');
        const countSilver = document.getElementById('count-silver');
        const countFree = document.getElementById('count-free');
        
        if(countPlat) countPlat.textContent = '0';
        if(countGold) countGold.textContent = '0';
        if(countSilver) countSilver.textContent = '0';
        if(countFree) countFree.textContent = '0';
        
        const paidTiers = document.getElementById('paidTicketTiers');
        const freeTiers = document.getElementById('freeTicketTiers');
        if (paidTiers) paidTiers.style.display = isFree ? 'none' : 'flex';
        if (freeTiers) freeTiers.style.display = isFree ? 'flex' : 'none';
        
        updateEventSummary();
    }

    if (eventPayNowBtn) {
        eventPayNowBtn.addEventListener('click', () => {
            if (eventPayNowBtn.dataset.active !== 'true') return;
            const eventTitle = document.getElementById('eventModalTitle').textContent;
            const timeInfo = eventRandomShowtime ? eventRandomShowtime.textContent : '';
            
            let summaryText = `🎉 Booking Successful! \n\nEvent: ${eventTitle}\nTime: ${timeInfo}\n`;
            if (isCurrentEventFree) {
                summaryText += `Free Tickets: ${eventTickets.free.count}\nTotal: Free`;
            } else {
                summaryText += `Platinum: ${eventTickets.platinum.count}\nGold: ${eventTickets.gold.count}\nSilver: ${eventTickets.silver.count}\nTotal: ₹${((eventTickets.platinum.count * eventTickets.platinum.price) + (eventTickets.gold.count * eventTickets.gold.price) + (eventTickets.silver.count * eventTickets.silver.price)).toFixed(2)}`;
            }
            
            alert(summaryText);
            eventBookingModal.classList.remove('active');
        });
    }

    // --- IPL MODAL FUNCTIONS (10 BLOCKS) ---
    const iplBookingModal = document.getElementById('iplBookingModal');
    const closeIplBookingModal = document.getElementById('closeIplBookingModal');
    const iplBookingFooter = document.getElementById('iplBookingFooter');
    const iplSelectedStandText = document.getElementById('iplSelectedStandText');
    const iplTotalPriceText = document.getElementById('iplTotalPriceText');
    const iplPayNowBtn = document.getElementById('iplPayNowBtn');
    
    let iplSelectedStand = null;
    let iplSeatCount = 1;

    if (closeIplBookingModal) {
        closeIplBookingModal.addEventListener('click', () => {
            if (iplBookingModal) iplBookingModal.classList.remove('active');
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === iplBookingModal) {
            iplBookingModal.classList.remove('active');
        }
    });

    const iplStands = document.querySelectorAll('.ipl-stand');
    iplStands.forEach(stand => {
        stand.addEventListener('click', () => {
            iplStands.forEach(s => s.classList.remove('selected'));
            stand.classList.add('selected');
            
            iplSelectedStand = {
                name: stand.dataset.stand,
                price: parseInt(stand.dataset.price)
            };
            
            if (iplBookingFooter) iplBookingFooter.style.display = 'flex';
            updateIplSummary();
        });
    });

    const iplSeatCountChips = document.getElementById('iplSeatCountChips');
    if (iplSeatCountChips) {
        iplSeatCountChips.addEventListener('click', (e) => {
            if (e.target.classList.contains('count-chip')) {
                document.querySelectorAll('#iplSeatCountChips .count-chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                iplSeatCount = parseInt(e.target.dataset.count);
                updateIplSummary();
            }
        });
    }

    function updateIplSummary() {
        if (!iplSelectedStand) return;
        
        if (iplSelectedStandText) iplSelectedStandText.textContent = `${iplSeatCount} Seat(s) in ${iplSelectedStand.name}`;
        const total = iplSelectedStand.price * iplSeatCount;
        const totalStr = `₹${total}`;
        
        if (iplTotalPriceText) iplTotalPriceText.textContent = totalStr;
        if (iplPayNowBtn) iplPayNowBtn.textContent = `Pay Now ${totalStr}`;
    }

    window.resetIplModal = function() {
        iplStands.forEach(s => s.classList.remove('selected'));
        iplSelectedStand = null;
        iplSeatCount = 1;
        if (document.querySelectorAll('#iplSeatCountChips .count-chip').length > 0) {
            document.querySelectorAll('#iplSeatCountChips .count-chip').forEach(c => c.classList.remove('active'));
            document.querySelector('#iplSeatCountChips .count-chip').classList.add('active');
        }
        if (iplBookingFooter) iplBookingFooter.style.display = 'none';
        if (iplPayNowBtn) iplPayNowBtn.textContent = 'Pay Now';
    }

    if (iplPayNowBtn) {
        iplPayNowBtn.addEventListener('click', () => {
            if (!iplSelectedStand) return;
            const event = document.getElementById('iplModalMovieTitle') ? document.getElementById('iplModalMovieTitle').textContent : 'IPL 2026';
            alert(`🎉 Booking Successful! \n\nEvent: ${event}\nStand: ${iplSelectedStand.name}\nTickets: ${iplSeatCount}\nTotal: ${iplTotalPriceText.textContent}`);
            if (iplBookingModal) iplBookingModal.classList.remove('active');
        });
    }

    // =============================================
    // ---- GLOBAL SEARCH ENGINE ----
    // =============================================
    const searchInput = document.getElementById('globalSearchInput');
    const searchDropdown = document.getElementById('searchResultsDropdown');
    const searchClearBtn = document.getElementById('globalSearchClear');

    if (!searchInput || !searchDropdown) return;

    function buildSearchIndex() {
        const index = [];

        // --- MOVIES ---
        document.querySelectorAll('.movie-card').forEach(card => {
            const title = card.querySelector('h3')?.textContent?.trim() || '';
            const meta = card.querySelector('.meta')?.textContent?.trim() || '';
            const img = card.querySelector('img')?.src || '';
            const price = card.dataset.price || '';
            const format = card.dataset.format ? card.dataset.format.trim() : '';
            index.push({
                type: 'Movie',
                icon: '🎬',
                title,
                meta: `${meta}${format ? ' • ' + format : ''}${price ? ' • From ₹' + price : ''}`,
                img,
                card
            });
        });

        // --- SPORTS (featured sports grid + sports section event cards) ---
        document.querySelectorAll('#featured-sports-section .event-card, #sports-section .event-card').forEach(card => {
            const title = card.querySelector('h3')?.textContent?.trim() || '';
            const meta = card.querySelector('.meta, p.meta')?.textContent?.trim() || '';
            const img = card.querySelector('img')?.src || '';
            index.push({
                type: 'Sports',
                icon: '🏆',
                title,
                meta,
                img,
                card
            });
        });

        // --- EVENTS ---
        document.querySelectorAll('#events-details-section .event-card, #events-details-grid .event-card').forEach(card => {
            const title = card.querySelector('h3')?.textContent?.trim() || '';
            const dateEl = card.querySelector('.meta, [style*="calendar"]')?.textContent?.trim() || '';
            const priceEl = card.querySelector('[style*="rupee"]')?.textContent?.trim() || card.querySelector('p[style*="font-weight"]')?.textContent?.trim() || '';
            const img = card.querySelector('img')?.src || '';
            index.push({
                type: 'Event',
                icon: '🎭',
                title,
                meta: `${dateEl} ${priceEl}`.trim(),
                img,
                card
            });
        });

        return index;
    }

    function renderSearchResults(query) {
        const q = query.trim().toLowerCase();
        searchDropdown.innerHTML = '';

        if (q.length < 2) {
            searchDropdown.style.display = 'none';
            return;
        }

        const index = buildSearchIndex();
        const matches = index.filter(item => item.title.toLowerCase().includes(q));

        if (matches.length === 0) {
            searchDropdown.style.display = 'block';
            searchDropdown.innerHTML = `
                <div style="padding: 30px 20px; text-align: center; color: #64748b;">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; margin-bottom: 10px; display:block; opacity:0.4;"></i>
                    <p style="font-size:0.9rem;">No results found for <strong style="color:#f8fafc;">"${query}"</strong></p>
                    <p style="font-size:0.8rem; margin-top:5px;">Try searching for a movie, sport or event name.</p>
                </div>`;
            return;
        }

        // Group by type
        const groups = { Movie: [], Sports: [], Event: [] };
        matches.forEach(m => { if (groups[m.type]) groups[m.type].push(m); });

        const labels = { Movie: '🎬 Movies', Sports: '🏆 Sports', Event: '🎭 Events' };

        Object.entries(groups).forEach(([type, items]) => {
            if (items.length === 0) return;

            // Section header
            const header = document.createElement('div');
            header.innerHTML = `<div style="padding: 8px 18px 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #3b82f6;">${labels[type]}</div>`;
            searchDropdown.appendChild(header);

            items.slice(0, 5).forEach(item => {
                const row = document.createElement('div');
                row.style.cssText = 'display:flex; align-items:center; gap:14px; padding:10px 18px; cursor:pointer; transition:background 0.2s; border-radius:10px; margin: 0 6px;';
                row.onmouseenter = () => row.style.background = 'rgba(59,130,246,0.12)';
                row.onmouseleave = () => row.style.background = 'transparent';

                // Highlight matching text
                const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                const highlighted = item.title.replace(regex, '<mark style="background:rgba(59,130,246,0.3); color:#93c5fd; border-radius:3px; padding:0 2px;">$1</mark>');

                row.innerHTML = `
                    <img src="${item.img}" alt="${item.title}" style="width:46px; height:46px; object-fit:cover; border-radius:10px; flex-shrink:0; border:1px solid rgba(255,255,255,0.1);" onerror="this.style.display='none'">
                    <div style="flex:1; min-width:0;">
                        <div style="font-weight:600; font-size:0.9rem; color:#f1f5f9; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${highlighted}</div>
                        <div style="font-size:0.75rem; color:#64748b; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.meta || type}</div>
                    </div>
                    <button class="search-result-book-btn" style="flex-shrink:0; background:rgba(59,130,246,0.15); border:1px solid rgba(59,130,246,0.4); color:#60a5fa; padding:5px 12px; border-radius:20px; cursor:pointer; font-size:0.75rem; font-weight:600; white-space:nowrap; transition:all 0.2s;">Book Now</button>
                `;

                // Clicking the row or button triggers the card's Book Now button
                const triggerBooking = (e) => {
                    e.stopPropagation();
                    const bookBtn = item.card.querySelector('.btn-book-sm, .btn-book');
                    if (bookBtn) {
                        closeSearch();
                        // Make the card visible if hidden (extra-movie)
                        if (item.card.style.display === 'none') item.card.style.display = 'block';
                        bookBtn.click();
                    } else {
                        closeSearch();
                        item.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                };

                row.addEventListener('click', triggerBooking);
                row.querySelector('.search-result-book-btn').addEventListener('click', triggerBooking);

                searchDropdown.appendChild(row);
            });

            // Separator between groups
            const sep = document.createElement('div');
            sep.style.cssText = 'height:1px; background:rgba(255,255,255,0.05); margin:6px 16px;';
            searchDropdown.appendChild(sep);
        });

        // Total count footer
        const footer = document.createElement('div');
        footer.style.cssText = 'padding: 8px 18px; font-size:0.75rem; color:#475569; border-top:1px solid rgba(255,255,255,0.05); margin-top:4px;';
        footer.textContent = `${matches.length} result${matches.length !== 1 ? 's' : ''} found`;
        searchDropdown.appendChild(footer);

        searchDropdown.style.display = 'block';
    }

    function closeSearch() {
        searchDropdown.style.display = 'none';
        searchInput.value = '';
        searchClearBtn.style.display = 'none';
    }

    // Input handler with debounce
    let searchDebounce;
    searchInput.addEventListener('input', () => {
        const val = searchInput.value;
        searchClearBtn.style.display = val.length > 0 ? 'inline-flex' : 'none';
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(() => renderSearchResults(val), 180);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
    });

    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => closeSearch());
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
        const wrapper = document.getElementById('searchBarWrapper');
        if (wrapper && !wrapper.contains(e.target)) {
            searchDropdown.style.display = 'none';
        }
    });

    // Re-open dropdown if user clicks back into input with existing text
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length >= 2) renderSearchResults(searchInput.value);
    });
});

