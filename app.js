// =====================================================
// MARATÓN DE LECTURA 2026
// app.js (Unificado y Corregido)
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // =================================================
    // 1. ELEMENTOS GLOBALES
    // =================================================

    const intro = document.getElementById("intro");
    const video = document.getElementById("introVideo");
    const mainPage = document.getElementById("mainPage");
    const skipBtn = document.getElementById("skipBtn");
    const courseView = document.getElementById("courseView");
    const courses = document.getElementById("cursos");
    const aventura = document.getElementById("aventura");
    const storiesContainer = document.getElementById("storiesContainer");
    const audioToggleBtn = document.getElementById("audioToggleBtn");

    // =================================================
    // 2. ESTADO ACTUAL
    // =================================================

    let currentCourse = 1;

    // =================================================
    // 3. DATOS DE LOS CURSOS
    // =================================================

    const courseData = {
        1: {
            title: "1.º AÑO",
            stories: [
                {
                    title: "CUENTO DE NAVIDAD",
                    description: "Autor: Ray Bradbury",
                    pdf: "1-1.pdf"
                },
                {
                    title: "EL MEJOR AMIGO DE UN MUCHACHO",
                    description: "Autor: Isaac Asimov ",
                    pdf: "1-2.pdf"
                },
                {
                    title: "LA ÚLTIMA NOCHE DEL MUNDO ",
                    description: "Autor: Ray Bradbury ",
                    pdf: "1-3.pdf"
                }
            ]
        },
        2: {
            title: "2.º AÑO",
            stories: [
                {
                    title: "AUTÉNTICO AMOR",
                    description: "Autor: Isaac Asimov",
                    pdf: "2-1.pdf"
                },
                {
                    title: "CASSETTE",
                    description: "Autor: Enrique Anderson Imbert.",
                    pdf: "2do año/cassette.pdf"
                },
                 {
                    title: "SIN DORMIR,",
                    description: "Autor: Darío Levin.",
                    pdf: "sin dormir.pdf"
                }
            ]
        },
        3: {
            title: "3.º AÑO",
            stories: [
                {
                    title: "LA ABUELA ELECTRÓNICA",
                    description: "Autor: Silvia Schujer.",
                    pdf: "3er año/la-abuela-electronica2.pdf"
                }, 
                {
                    title: "EL CLON",
                    description: "Autor: Ricardo Mariño.",
                    pdf: "3er año/Cuento EL CLON.pdf"
                }, 
                 {
                    title: "COMO SE DIVERTÍAN",
                    description: "Autor: Isaac Asimov.",
                    pdf: "3er año/cuanto_se_divertian.pdf"
                }
            ]
        },
        4: {
            title: "4.º AÑO",
            stories: [
                {
                    title: "ROBOT-MASA",
                    description: "Autor: Sebastián Szabo.",
                    pdf: "Robot-masa.pdf "
                }, 
                 {
                    title: "LA MÁQUINA QUÉ GANÓ LA GUERRA",
                    description: "Autor: Isaac Asimov.",
                    pdf: "4to año/la_maquina_que_gano_la_guerra.pdf"
                } 
            ]
        },
        5: {
            title: "5.º AÑO",
            stories: [
                {
                    title: "EL CENTINELA",
                    description: "Autor: Arthur Clarke",
                    pdf: "5to año/el-centinela-de-arthur-c-clarke-1.pdf"
                }, 
                {
                    title: "EL DOCTOR OX",
                    description: "Autor: Julio Verne",
                    pdf: "5to año/el-doctor-ox.pdf"
                },
                 {
                    title: "EL PEATÓN",
                    description: "Autor: Ray Bradbury",
                    pdf: "5to año/Ray Bradbury - El Peaton.pdf"
                }
            ]
        },
        6: {
            title: "6.º AÑO",
            stories: [
                {
                    title: "CRÓNICAS MARCIANAS",
                    description: "Autor: Ray Bradbury.",
                    pdf: "6to año/Ray Bradbury - Cronicas Marcianas.pdf"
                }
            ]
        },
        7: {
            title: "7.º AÑO",
            stories: [
                {
                    title: "EL ENTERNAUTA",
                    description: "Autor: Hector G.",
                    pdf: "El_Eternauta_menos_25MB.pdf"
                }
            ]
        }
    };

    // =================================================
    // 4. CONTROL DE AUDIO E INTRO
    // =================================================

    if (video) {
        video.muted = true; // Arranca muteado por políticas del navegador
        video.play().catch(err => console.log("Autoplay inicial bloqueado:", err));
    }

    if (audioToggleBtn && video) {
        audioToggleBtn.addEventListener("click", function (e) {
            e.preventDefault();
            video.muted = !video.muted;

            if (video.muted) {
                audioToggleBtn.textContent = "🔇 Activar música";
                audioToggleBtn.classList.remove("active");
            } else {
                audioToggleBtn.textContent = "🔊 Silenciar";
                audioToggleBtn.classList.add("active");
                video.play().catch(err => console.log("Reproducción bloqueada:", err));
            }
        });
    }

    function enterSite() {
        if (intro) intro.classList.add("hidden");
        if (mainPage) mainPage.classList.remove("hidden");
        if (video) {
            video.pause();
            video.currentTime = 0;
        }

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }

    if (video) video.addEventListener("ended", enterSite);
    if (skipBtn) skipBtn.addEventListener("click", enterSite);

    // =================================================
    // 5. NAVEGACIÓN DE CURSOS Y LECTURAS (PDFs)
    // =================================================

    window.openCourse = function (year) {
        currentCourse = Number(year);
        const data = courseData[currentCourse];

        if (!data) {
            console.error("No existe el curso:", currentCourse);
            return;
        }

        const courseTitle = document.getElementById("courseTitle");
        if (courseTitle) {
            courseTitle.textContent = data.title;
        }

        if (storiesContainer) {
            storiesContainer.innerHTML = "";

            data.stories.forEach(function (story, index) {
                const number = index + 1;
                const article = document.createElement("article");
                article.className = "story";

                article.innerHTML = `
                    <div class="story-cover-wrapper">
                        <div class="book-cover">
                            <span class="book-stars">✦ ✧ ✦</span>
                            <span class="book-icon">📖</span>
                            <span class="book-label">MARATÓN</span>
                            <span class="book-number">${String(number).padStart(2, "0")}</span>
                        </div>
                    </div>
                    <div class="story-content">
                        <span class="story-label">LECTURA ${String(number).padStart(2, "0")}</span>
                        <h3>${story.title}</h3>
                        <p>${story.description}</p>
                        <div class="story-meta">
                            <span>📖 Lectura</span>
                            <span>✨ Aventura</span>
                        </div>
                        <button type="button" class="read-btn" onclick="readStory(${number})">
                            📖 Leer cuento →
                        </button>
                    </div>
                `;

                storiesContainer.appendChild(article);
            });
        }

        if (courseView) courseView.classList.remove("hidden");
        if (courses) courses.classList.add("hidden");
        if (aventura) aventura.classList.add("hidden");

        setTimeout(function () {
            if (courseView) {
                window.scrollTo({
                    top: courseView.offsetTop - 20,
                    behavior: "smooth"
                });
            }
        }, 100);
    };

    window.closeCourse = function () {
        if (courseView) courseView.classList.add("hidden");
        if (courses) courses.classList.remove("hidden");
        if (aventura) aventura.classList.remove("hidden");

        if (courses) {
            setTimeout(function () {
                window.scrollTo({
                    top: courses.offsetTop - 20,
                    behavior: "smooth"
                });
            }, 100);
        }
    };

    window.readStory = function (number) {
        const data = courseData[currentCourse];

        if (!data) {
            console.error("No existe información para este curso.");
            return;
        }

        const index = Number(number) - 1;
        const story = data.stories[index];

        if (!story) {
            alert("Esta lectura no está disponible.");
            return;
        }

        window.open(story.pdf, "_blank");
    };

    window.getCurrentCourseData = function () {
        return courseData[currentCourse];
    };

    window.getCoursePdfCount = function (year) {
        const data = courseData[Number(year)];
        return data ? data.stories.length : 0;
    };

    // =================================================
    // 6. RINCÓN DE OPINIONES Y MODAL DE COMPARTIR (QR)
    // =================================================

    const formOpinion = document.getElementById('formOpinion');
    const muroOpiniones = document.getElementById('muroOpiniones');

    if (formOpinion && muroOpiniones) {
        let opiniones = JSON.parse(localStorage.getItem('maraton_opiniones')) || [
            {
                nombre: "Profe de Literatura",
                libro: "El Eternauta (Oesterheld)",
                texto: "¡Excelente iniciativa la de digitalizar estos clásicos para la técnica! Muy buena la página."
            }
        ];

        function renderizarOpiniones() {
            muroOpiniones.innerHTML = '';
            opiniones.forEach(op => {
                const card = document.createElement('div');
                card.className = 'opinion-card';
                card.innerHTML = `
                    <div>
                        <h4>${op.nombre}</h4>
                        <span class="libro-tag">📖 ${op.libro}</span>
                        <p>"${op.texto}"</p>
                    </div>
                `;
                muroOpiniones.appendChild(card);
            });
        }

        formOpinion.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nuevaOpinion = {
                nombre: document.getElementById('nombreAlumno').value.trim(),
                libro: document.getElementById('libroSelect').value,
                texto: document.getElementById('textoOpinion').value.trim()
            };

            opiniones.unshift(nuevaOpinion);
            localStorage.setItem('maraton_opiniones', JSON.stringify(opiniones));

            renderizarOpiniones();
            formOpinion.reset();
        });

        renderizarOpiniones();
    }

    const btnCompartir = document.getElementById('btnCompartir');
    const modalCompartir = document.getElementById('modalCompartir');
    const cerrarModal = document.getElementById('cerrarModal');
    const btnCopiar = document.getElementById('btnCopiar');
    const copiadoMsg = document.getElementById('copiadoMsg');

    if (btnCompartir && modalCompartir) {
        btnCompartir.addEventListener('click', () => {
            modalCompartir.style.display = 'flex';
        });

        if (cerrarModal) {
            cerrarModal.addEventListener('click', () => {
                modalCompartir.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modalCompartir) {
                modalCompartir.style.display = 'none';
            }
        });
    }

    if (btnCopiar && copiadoMsg) {
        btnCopiar.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href);
            copiadoMsg.style.display = 'block';
            setTimeout(() => {
                copiadoMsg.style.display = 'none';
            }, 3000);
        });
    }

});
