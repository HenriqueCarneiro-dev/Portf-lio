/* ══════════════════════════════
   TERMINAL TYPEWRITER
══════════════════════════════ */
const linhas = [
    { tipo: 'cmd',    texto: 'seja bem vindo' },
    { tipo: 'output', texto: 'henrique_carneiro · CESAR School · 1º período', cor: 'azul' },
    { tipo: 'cmd',    texto: 'cat interesses.txt' },
    { tipo: 'output', texto: '→ Engenharia de Software · Desenvolvimento de Software' },
    { tipo: 'cmd',    texto: 'ls habilidades/' },
    { tipo: 'output', texto: 'python/  C++/  C/  linux/ javascript/  HTML/  CSS/' },
];

const corpo = document.getElementById('terminal-corpo');
let linhaAtual = 0;

function criarLinha(linha) {
    const div = document.createElement('div');
    div.className = 'terminal-linha';
    if (linha.tipo === 'cmd') {
        div.innerHTML = `<span class="terminal-prompt">❯</span><span class="terminal-cmd"></span>`;
    } else {
        const cls = linha.cor === 'azul' ? 'terminal-output azul' : 'terminal-output';
        div.innerHTML = `<span class="${cls}"></span>`;
    }
    corpo.appendChild(div);
    requestAnimationFrame(() => div.classList.add('visivel'));
    return div;
}

function digitarProxima() {
    if (linhaAtual >= linhas.length) {
        const ultimo = document.createElement('div');
        ultimo.className = 'terminal-linha visivel';
        ultimo.innerHTML = `<span class="terminal-prompt">❯</span> <span class="cursor"></span>`;
        corpo.appendChild(ultimo);
        return;
    }
    const linha  = linhas[linhaAtual];
    const div    = criarLinha(linha);
    const span   = div.querySelector('span:last-child');
    const texto  = linha.texto;
    let charAtual = 0;
    const velocidade = linha.tipo === 'cmd' ? 55 : 18;

    function digitarChar() {
        if (charAtual < texto.length) {
            span.textContent += texto[charAtual++];
            setTimeout(digitarChar, velocidade);
        } else {
            linhaAtual++;
            setTimeout(digitarProxima, linha.tipo === 'cmd' ? 400 : 200);
        }
    }
    digitarChar();
}

if (corpo) setTimeout(digitarProxima, 800);

/* ══════════════════════════════
   SKILL BARS — anima ao entrar na tela
══════════════════════════════ */
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-barra-fill').forEach(fill => {
                    setTimeout(() => { fill.style.width = fill.dataset.pct + '%'; }, 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(skillsSection);
}
