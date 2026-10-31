const inicio = document.getElementById("inicio");
const sobre = document.getElementById("sobre");
const carta = document.getElementById("carta");
const cerrar = document.getElementById("cerrar");

// Tiempo que dura la animación del sobre antes de mostrar la carta (ms)
const DURACION_APERTURA = 1100;

// En móviles el alto visible cambia al aparecer/ocultarse la barra del navegador.
// Guardamos el alto real para que la carta nunca quede cortada.
function ajustarAltoPantalla() {
    const alto = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    document.documentElement.style.setProperty("--alto-pantalla", `${alto}px`);
}

function abrirCarta() {
    if (sobre.classList.contains("abierto")) return;

    sobre.classList.add("abierto");

    setTimeout(() => {
        inicio.classList.add("oculto");
        carta.scrollTop = 0;
        carta.classList.add("visible");
        carta.setAttribute("aria-hidden", "false");
        cerrar.focus({ preventScroll: true });
    }, DURACION_APERTURA);
}

function guardarCarta() {
    carta.classList.remove("visible");
    carta.setAttribute("aria-hidden", "true");
    inicio.classList.remove("oculto");
    sobre.classList.remove("abierto");
    sobre.focus({ preventScroll: true });
}

ajustarAltoPantalla();
window.addEventListener("resize", ajustarAltoPantalla);
window.addEventListener("orientationchange", ajustarAltoPantalla);
if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", ajustarAltoPantalla);
}

sobre.addEventListener("click", abrirCarta);
cerrar.addEventListener("click", guardarCarta);

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && carta.classList.contains("visible")) {
        guardarCarta();
    }
});
