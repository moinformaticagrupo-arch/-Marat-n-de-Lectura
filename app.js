// =====================================================
// MARATÓN DE LECTURA 2026
// app.js
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // =================================================
    // ELEMENTOS
    // =================================================

    const intro = document.getElementById("intro");
    const video = document.getElementById("introVideo");
    const mainPage = document.getElementById("mainPage");
    const skipBtn = document.getElementById("skipBtn");
    const courseView = document.getElementById("courseView");
    const courses = document.getElementById("cursos");
    const aventura = document.getElementById("aventura");
    const storiesContainer = document.getElementById("storiesContainer");

    // =================================================
    // ESTADO ACTUAL
    // =================================================

    let currentCourse = 1;

    // =================================================
    // DATOS DE LOS CURSOS
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
                    title: "AUTENTICO AMOR",
                    description: "Autor: Isaac Asimov",
                    pdf: "2-1.pdf"
                },
                {
                    title: "CASESETTE",
                    description: "Autor: Enrique Anderson Imbert.",
                    pdf: "2do año/cassette.pdf"
                },
                 {
                    title: "LAS ABEJAS DE BRONCE",
                    description: "Autor: Marco Denevi.",
                    pdf: "2do año/las_abejas_de_bronce.pdf"
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
                    title: "LA TIENDA MÁGICA",
                    description: "Autor: H.G Wells.",
                    pdf: "4to año/La tienda magica.pdf"
                }, 
                 {
                    title: "LA MÁQUINA QUÉ GANÓ LA GUERRA",
                    description: "Autor:Isaac Asimov.",
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
                    description: "Autor:Hector G.",
                    pdf: "El_Eternauta_Adaptacion.pdf"
                }
            ]
        }
    };

    // =================================================
    // ENTRAR A LA PÁGINA
    // =================================================

    function enterSite() {
        if (intro) intro.classList.add("hidden");
        if (mainPage) mainPage.classList.remove("hidden");
        if (video) video.pause();

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }

    if (video) video.addEventListener("ended", enterSite);
    if (skipBtn) skipBtn.addEventListener("click", enterSite);

    // =================================================
    // ABRIR CURSO
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

    // =================================================
    // CERRAR CURSO
    // =================================================

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

    // =================================================
    // ABRIR PDF
    // =================================================

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

    // =================================================
    // FUNCIONES AUXILIARES
    // =================================================

    window.getCurrentCourseData = function () {
        return courseData[currentCourse];
    };

    window.getCoursePdfCount = function (year) {
        const data = courseData[Number(year)];
        return data ? data.stories.length : 0;
    };

});
document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("introVideo");
    const audioToggleBtn = document.getElementById("audioToggleBtn");

    if (audioToggleBtn && video) {
        // Arranca muteado para cumplir con las políticas de autoplay de los navegadores
        video.muted = true;

        audioToggleBtn.addEventListener("click", function() {
            video.muted = !video.muted;
            
            if (video.muted) {
                audioToggleBtn.textContent = "🔇 Activar música";
            } else {
                audioToggleBtn.textContent = "🔊 Silenciar";
            }
        });
    }
});
