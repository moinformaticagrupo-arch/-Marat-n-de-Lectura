const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");
const mainPage = document.getElementById("mainPage");
const skipBtn = document.getElementById("skipBtn");
const courseView = document.getElementById("courseView");
const courses = document.getElementById("cursos");

// =====================================================
// AÑO SELECCIONADO
// =====================================================

let currentCourse = 1;

// =====================================================
// DATOS DE LOS CURSOS
// =====================================================
// Cada año tiene la cantidad EXACTA de PDFs que corresponde.
//
// 1.º año → 3 PDFs
// 2.º año → 2 PDFs
// 3.º año → 1 PDF
// 4.º año → 1 PDF
// 5.º año → 2 PDFs
// 6.º año → 1 PDF
// 7.º año → 1 PDF
// =====================================================

const courseData = {

    1: {
        title: "1.º AÑO",
        stories: [
            {
                title: "Lectura 1",
                pdf: "assets/cuentos/1-1.pdf"
            },
            {
                title: "Lectura 2",
                pdf: "assets/cuentos/1-2.pdf"
            },
            {
                title: "Lectura 3",
                pdf: "assets/cuentos/1-3.pdf"
            }
        ]
    },

    2: {
        title: "2.º AÑO",
        stories: [
            {
                title: "Lectura 1",
                pdf: "assets/cuentos/2-1.pdf"
            },
            {
                title: "Lectura 2",
                pdf: "assets/cuentos/2-2.pdf"
            }
        ]
    },

    3: {
        title: "3.º AÑO",
        stories: [
            {
                title: "Lectura 1",
                pdf: "assets/cuentos/3-1.pdf"
            }
        ]
    },

    4: {
        title: "4.º AÑO",
        stories: [
            {
                title: "Lectura 1",
                pdf: "assets/cuentos/4-1.pdf"
            }
        ]
    },

    5: {
        title: "5.º AÑO",
        stories: [
            {
                title: "Lectura 1",
                pdf: "assets/cuentos/5-1.pdf"
            },
            {
                title: "Lectura 2",
                pdf: "assets/cuentos/5-2.pdf"
            }
        ]
    },

    6: {
        title: "6.º AÑO",
        stories: [
            {
                title: "Lectura 1",
                pdf: "assets/cuentos/6-1.pdf"
            }
        ]
    },

    7: {
        title: "7.º AÑO",
        stories: [
            {
                title: "Lectura 1",
                pdf: "assets/cuentos/7-1.pdf"
            }
        ]
    }

};

// =====================================================
// ENTRAR A LA PÁGINA DESPUÉS DEL VIDEO
// =====================================================

function enterSite() {

    if (intro) {
        intro.classList.add("hidden");
    }

    if (mainPage) {
        mainPage.classList.remove("hidden");
    }

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    if (video) {
        video.pause();
    }
}

// Cuando termina el video
if (video) {
    video.addEventListener("ended", enterSite);
}

// Botón "Entrar a la maratón"
if (skipBtn) {
    skipBtn.addEventListener("click", enterSite);
}

// =====================================================
// ABRIR UN CURSO
// =====================================================

function openCourse(year) {

    currentCourse = Number(year);

    const data = courseData[currentCourse];

    if (!data) {
        console.error("No existe información para el año:", currentCourse);
        return;
    }

    // -------------------------------------------------
    // TÍTULO DEL CURSO
    // -------------------------------------------------

    const courseTitle = document.getElementById("courseTitle");

    if (courseTitle) {
        courseTitle.textContent = data.title;
    }

    // -------------------------------------------------
    // CONTENEDOR DE LECTURAS
    // -------------------------------------------------

    /*
       Si existe un contenedor llamado "storiesContainer"
       en el HTML, generamos automáticamente todos
       los botones según la cantidad de PDFs del año.
    */

    const storiesContainer =
        document.getElementById("storiesContainer");

    if (storiesContainer) {

        storiesContainer.innerHTML = "";

        data.stories.forEach((story, index) => {

            const card = document.createElement("div");

            card.className = "story-card";

            card.innerHTML = `
                <h3>${story.title}</h3>

                <button
                    type="button"
                    class="read-story-btn"
                    onclick="readStory(${index + 1})"
                >
                    📖 Leer PDF
                </button>
            `;

            storiesContainer.appendChild(card);

        });

    } else {

        // -------------------------------------------------
        // COMPATIBILIDAD CON TU HTML ACTUAL
        // -------------------------------------------------

        const story1Title =
            document.getElementById("story1Title");

        const story2Title =
            document.getElementById("story2Title");

        if (story1Title) {
            story1Title.textContent =
                data.stories[0]
                    ? data.stories[0].title
                    : "";
        }

        if (story2Title) {
            story2Title.textContent =
                data.stories[1]
                    ? data.stories[1].title
                    : "";
        }

        // Si hay un tercer PDF y existe un elemento para él
        const story3Title =
            document.getElementById("story3Title");

        if (story3Title) {
            story3Title.textContent =
                data.stories[2]
                    ? data.stories[2].title
                    : "";
        }
    }

    // -------------------------------------------------
    // MOSTRAR CURSO
    // -------------------------------------------------

    if (courseView) {
        courseView.classList.remove("hidden");
    }

    // -------------------------------------------------
    // OCULTAR LISTA DE CURSOS
    // -------------------------------------------------

    if (courses) {
        courses.classList.add("hidden");
    }

    // -------------------------------------------------
    // OCULTAR "LA AVENTURA"
    // -------------------------------------------------

    const aventura =
        document.getElementById("aventura");

    if (aventura) {
        aventura.classList.add("hidden");
    }

    // -------------------------------------------------
    // SUBIR HASTA EL CURSO
    // -------------------------------------------------

    if (courseView) {

        window.scrollTo({
            top: courseView.offsetTop - 20,
            behavior: "smooth"
        });

    }

}

// =====================================================
// VOLVER A LOS CURSOS
// =====================================================

function closeCourse() {

    if (courseView) {
        courseView.classList.add("hidden");
    }

    if (courses) {
        courses.classList.remove("hidden");
    }

    const aventura =
        document.getElementById("aventura");

    if (aventura) {
        aventura.classList.remove("hidden");
    }

    if (courses) {

        window.scrollTo({
            top: courses.offsetTop - 20,
            behavior: "smooth"
        });

    }

}

// =====================================================
// ABRIR PDF
// =====================================================

function readStory(number) {

    const yearData = courseData[currentCourse];

    if (!yearData) {
        console.error(
            "No existe información para el año:",
            currentCourse
        );

        return;
    }

    const storyIndex = Number(number) - 1;

    const story = yearData.stories[storyIndex];

    if (!story) {

        console.error(
            `No existe el PDF ${number} para ${yearData.title}`
        );

        alert(
            `No hay una lectura ${number} disponible para ${yearData.title}.`
        );

        return;
    }

    // -------------------------------------------------
    // ABRIR PDF EN NUEVA PESTAÑA
    // -------------------------------------------------

    window.open(
        story.pdf,
        "_blank",
        "noopener,noreferrer"
    );

}

// =====================================================
// FUNCIÓN PARA OBTENER LOS DATOS DEL AÑO ACTUAL
// =====================================================

function getCurrentCourseData() {

    return courseData[currentCourse];

}

// =====================================================
// FUNCIÓN PARA SABER CUÁNTOS PDFs TIENE UN AÑO
// =====================================================

function getCoursePdfCount(year) {

    const data = courseData[Number(year)];

    if (!data) {
        return 0;
    }

    return data.stories.length;

}

// =====================================================
// MOSTRAR LOS PDFs DISPONIBLES EN CONSOLA
// =====================================================

console.log("📚 Maratón de Lectura cargada correctamente.");

Object.keys(courseData).forEach(year => {

    console.log(
        `${courseData[year].title}: ${courseData[year].stories.length} PDF(s)`
    );

});
