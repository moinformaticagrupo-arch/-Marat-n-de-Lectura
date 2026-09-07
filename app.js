const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");
const mainPage = document.getElementById("mainPage");
const skipBtn = document.getElementById("skipBtn");
const courseView = document.getElementById("courseView");
const courses = document.getElementById("cursos");

// Año que está seleccionado actualmente
let currentCourse = 1;

// =====================================================
// DATOS DE LOS CURSOS
// =====================================================

const courseData = {
  1: [
    "1.º AÑO",
    "Título del primer cuento",
    "Título del segundo cuento"
  ],

  2: [
    "2.º AÑO",
    "Título del primer cuento",
    "Título del segundo cuento"
  ],

  3: [
    "3.º AÑO",
    "Título del primer cuento",
    "Título del segundo cuento"
  ],

  4: [
    "4.º AÑO",
    "Título del primer cuento",
    "Título del segundo cuento"
  ],

  5: [
    "5.º AÑO",
    "Título del primer cuento",
    "Título del segundo cuento"
  ],

  6: [
    "6.º AÑO",
    "Título del primer cuento",
    "Título del segundo cuento"
  ],

  7: [
    "7.º AÑO",
    "Título del primer cuento",
    "Título del segundo cuento"
  ]
};


// =====================================================
// ENTRAR A LA PÁGINA DESPUÉS DEL VIDEO
// =====================================================

function enterSite() {
  intro.classList.add("hidden");
  mainPage.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  video.pause();
}


// Cuando termina el video
video.addEventListener("ended", enterSite);

// Botón "Entrar a la maratón"
skipBtn.addEventListener("click", enterSite);


// =====================================================
// ABRIR UN CURSO
// =====================================================

function openCourse(year) {

  // Guardamos qué año seleccionó el usuario
  currentCourse = year;

  // Buscamos los datos del curso
  const data = courseData[year];

  // Cambiamos el título del curso
  document.getElementById("courseTitle").textContent = data[0];

  // Cambiamos el nombre del cuento 1
  document.getElementById("story1Title").textContent = data[1];

  // Cambiamos el nombre del cuento 2
  document.getElementById("story2Title").textContent = data[2];

  // Mostramos la sección del curso
  courseView.classList.remove("hidden");

  // Ocultamos la lista de cursos
  courses.classList.add("hidden");

  // Ocultamos la sección "La aventura"
  document.getElementById("aventura").classList.add("hidden");

  // Subimos hasta la sección del curso
  window.scrollTo({
    top: courseView.offsetTop - 20,
    behavior: "smooth"
  });
}


// =====================================================
// VOLVER A LOS CURSOS
// =====================================================

function closeCourse() {

  // Ocultamos la sección del curso
  courseView.classList.add("hidden");

  // Mostramos nuevamente los cursos
  courses.classList.remove("hidden");

  // Mostramos nuevamente "La aventura"
  document.getElementById("aventura").classList.remove("hidden");

  // Volvemos a la sección de cursos
  window.scrollTo({
    top: courses.offsetTop - 20,
    behavior: "smooth"
  });
}


// =====================================================
// ABRIR LOS PDF DE LOS CUENTOS
// =====================================================

function readStory(number) {

  /*
    Los PDFs tienen que estar dentro de:

    assets/cuentos/

    Y tienen que llamarse:

    https://www.alejandrolindt.com.ar/lindt_recursos_gabriel-rolon-el-duelo.pdf  = 1.º año, cuento 1
    1-2.pdf  = 1.º año, cuento 2

    2-1.pdf  = 2.º año, cuento 1
    2-2.pdf  = 2.º año, cuento 2

    etc.
  */

  const pdf = `assets/cuentos/${currentCourse}-${number}.pdf`;

  // Abrimos el PDF en una nueva pestaña
  window.open(pdf, "_blank");
}