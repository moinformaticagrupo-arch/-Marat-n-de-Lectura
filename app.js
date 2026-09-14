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
    const storiesContainer =
        document.getElementById("storiesContainer");


    // =================================================
    // AÑO ACTUAL
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
                    pdf: "assets/cuentos/1-1.pdf"
                },
                {
                    title: "Lectura 2",
                    description: "Segunda lectura de 1.º año.",
                    pdf: "assets/cuentos/1-2.pdf"
                },
                {
                    title: "Lectura 3",
                    description: "Tercera lectura de 1.º año.",
                    pdf: "assets/cuentos/1-3.pdf"
                }
            ]
        },

        2: {
            title: "2.º AÑO",
            stories: [
                {
                    title: "Lectura 1",
                    description: "Primera lectura de 2.º año.",
                    pdf: "assets/cuentos/2-1.pdf"
                },
                {
                    title: "Lectura 2",
                    description: "Segunda lectura de 2.º año.",
                    pdf: "assets/cuentos/2-2.pdf"
                }
            ]
        },

        3: {
            title: "3.º AÑO",
            stories: [
                {
                    title: "Lectura 1",
                    description: "Lectura de 3.º año.",
                    pdf: "assets/cuentos/3-1.pdf"
                }
            ]
        },

        4: {
            title: "4.º AÑO",
            stories: [
                {
                    title: "Lectura 1",
                    description: "Lectura de 4.º año.",
                    pdf: "assets/cuentos/4-1.pdf"
                }
            ]
        },

        5: {
            title: "5.º AÑO",
            stories: [
                {
                    title: "Lectura 1",
                    description: "Primera lectura de 5.º año.",
                    pdf: "assets/cuentos/5-1.pdf"
                },
                {
                    title: "Lectura 2",
                    description: "Segunda lectura de 5.º año.",
                    pdf: "assets/cuentos/5-2.pdf"
                }
            ]
        },

        6: {
            title: "6.º AÑO",
            stories: [
                {
                    title: "Lectura 1",
                    description: "Lectura de 6.º año.",
                    pdf: "assets/cuentos/6-1.pdf"
                }
            ]
        },

        7: {
            title: "7.º AÑO",
            stories: [
                {
                    title: "Lectura 1",
                    description: "Lectura de 7.º año.",
                    pdf: "assets/cuentos/7-1.pdf"
                }
            ]
        }

    };


    // =================================================
    // ENTRAR A LA PÁGINA
    // =================================================

    function enterSite() {

        if (intro) {
            intro.classList.add("hidden");
        }

        if (mainPage) {
            mainPage.classList.remove("hidden");
        }

        if (video) {
            video.pause();
        }

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }


    // =================================================
    // CUANDO TERMINA EL VIDEO
    // =================================================

    if (video) {
        video.addEventListener("ended", enterSite);
    }


    // =================================================
    // BOTÓN ENTRAR
    // =================================================

    if (skipBtn) {
        skipBtn.addEventListener("click", enterSite);
    }


    // =================================================
    // ABRIR CURSO
    // =================================================

    window.openCourse = function (year) {

        currentCourse = Number(year);

        const data = courseData[currentCourse];

        if (!data) {
            console.error(
                "No existe el curso:",
                currentCourse
            );
            return;
        }


        // ---------------------------------------------
        // TÍTULO
        // ---------------------------------------------

        const courseTitle =
            document.getElementById("courseTitle");

        if (courseTitle) {
            courseTitle.textContent = data.title;
        }


        // ---------------------------------------------
        // CONTENEDOR DE HISTORIAS
        // ---------------------------------------------

        if (storiesContainer) {

            storiesContainer.innerHTML = "";


            data.stories.forEach(function (story, index) {

                const number = index + 1;

                const article =
                    document.createElement("article");

                article.className = "story";


                article.innerHTML = `

                    <div class="story-cover-wrapper">

                        <div class="book-cover">

                            <span class="book-stars">
                                ✦ ✧ ✦
                            </span>

                            <span class="book-icon">
                                📖
                            </span>

                            <span class="book-label">
                                MARATÓN
                            </span>

                            <span class="book-number">
                                ${String(number).padStart(2, "0")}
                            </span>

                        </div>

                    </div>


                    <div class="story-content">

                        <span class="story-label">
                            LECTURA ${String(number).padStart(2, "0")}
                        </span>

                        <h3>
                            ${story.title}
                        </h3>

                        <p>
                            ${story.description}
                        </p>

                        <div class="story-meta">

                            <span>
                                📖 Lectura
                            </span>

                            <span>
                                ✨ Aventura
                            </span>

                        </div>

                        <button
                            type="button"
                            class="read-btn"
                            onclick="readStory(${number})"
                        >
                            📖 Leer cuento →
                        </button>

                    </div>

                `;


                storiesContainer.appendChild(article);

            });

        }


        // ---------------------------------------------
        // MOSTRAR VISTA DEL CURSO
        // ---------------------------------------------

        if (courseView) {
            courseView.classList.remove("hidden");
        }


        // ---------------------------------------------
        // OCULTAR CURSOS
        // ---------------------------------------------

        if (courses) {
            courses.classList.add("hidden");
        }


        // ---------------------------------------------
        // OCULTAR AVENTURA
        // ---------------------------------------------

        if (aventura) {
            aventura.classList.add("hidden");
        }


        // ---------------------------------------------
        // SUBIR A LA VISTA DEL CURSO
        // ---------------------------------------------

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

        if (courseView) {
            courseView.classList.add("hidden");
        }

        if (courses) {
            courses.classList.remove("hidden");
        }

        if (aventura) {
            aventura.classList.remove("hidden");
        }


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

            console.error(
                "No existe información para este curso."
            );

            return;
        }


        const index = Number(number) - 1;

        const story = data.stories[index];


        if (!story) {

            alert(
                "Esta lectura no está disponible."
            );

            return;
        }


        console.log(
            "Abriendo:",
            story.pdf
        );


        // Abrir PDF en una pestaña nueva

        window.open(
            story.pdf,
            "_blank"
        );

    };


    // =================================================
    // FUNCIONES AUXILIARES
    // =================================================

    window.getCurrentCourseData = function () {

        return courseData[currentCourse];

    };


    window.getCoursePdfCount = function (year) {

        const data =
            courseData[Number(year)];

        if (!data) {
            return 0;
        }

        return data.stories.length;

    };


    // =================================================
    // MENSAJE DE CARGA
    // =================================================

    console.log(
        "📚 Maratón de Lectura 2026 cargada correctamente."
    );


    // Mostrar en consola cuántos PDFs tiene cada año

    Object.keys(courseData).forEach(function (year) {

        console.log(
            courseData[year].title +
            ": " +
            courseData[year].stories.length +
            " PDF(s)"
        );

    });

});
