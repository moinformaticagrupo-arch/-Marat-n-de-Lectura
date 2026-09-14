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
                    title: "Lectura 1",
                    description: "Primera lectura de 1.º año.",
                    pdf: "1-1.pdf"
                },
                {
                    title: "Lectura 2",
                    description: "Segunda lectura de 1.º año.",
                    pdf: "1-2.pdf"
                },
                {
                    title: "Lectura 3",
                    description: "Tercera lectura de 1.º año.",
                    pdf: "1-3.pdf"
                }
            ]
        },
        2: {
            title: "2.º AÑO",
            stories: [
                {
                    title: "Lectura 1",
                    description: "Primera lectura de 2.º año.",
                    pdf: "2-1.pdf"
                },
                {
                    title: "Lectura 2",
                    description: "Segunda lectura de 2.º año.",
                    pdf: "2-2.pdf"
                }
            ]
        },
        3: {
            title: "3.º AÑO",
            stories: [
                {
                    title: "Lectura 1",
                    description: "Lectura de 3.º año.",
                    pdf: "3-1.pdf"
                }
            ]
        },
        4: {
            title: "4.º AÑO",
            stories: [
                {
                    title: "Lectura 1",
                    description: "Lectura de 4.º año.",
                    pdf: "4-1.pdf"
                }
            ]
        },
        5: {
            title: "5.º AÑO",
            stories: [
                {
                    title: "Lectura 1",
                    description: "Primera lectura de 5.º año.",
                    pdf: "5-1.pdf"
                },
                {
                    title: "Lectura 2",
                    description: "Segunda lectura de 5.º año.",
                    pdf: "5-2.pdf"
                }
            ]
        },
        6: {
            title: "6.º AÑO",
            stories: [
                {
                    title: "Lectura 1",
                    description: "Lectura de 6.º año.",
                    pdf: "6-1.pdf"
                }
            ]
        },
        7: {
            title: "7.º AÑO",
            stories: [
                {
                    title: "Lectura 1",
                    description: "Lectura de 7.º año.",
                    pdf: "7-1.pdf"
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
