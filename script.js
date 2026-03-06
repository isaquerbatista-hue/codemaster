// 1ª Digitação (JS Completo)

// ================ CONTROLE DO MENU MOBILE ================
const menuIcon = document.querySelector('#menu-icon');
const navList = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navList.classList.toggle('open');

    // Bloquear scroll quando menu aberto
    document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : 'auto';
});

// Fechar menu ao clicar em links
document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

// Fechar menu ao rolar
window.addEventListener('scroll', () => {
    if (navList.classList.contains('open')) {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// ================= NAVGAÇÃO ATIVA =================
// Seleciona todos os links de navegação
const navLinks = document.querySelectorAll('.navlist a');

// Função para adicionar a classe "active" ao link clicado
function activeLink() {
    navLinks.forEach(item => item.classList.remove('active')); // Remove a classe "active" de todos os links
    this.classList.add('active'); // Adiciona a classe "active" ao link clicado
}

// Adiciona um evento de clique a cada link de navegação
navLinks.forEach(item => item.addEventListener('click', activeLink));

// ================= ALTERNAR MODO CLARO/ESCURO =================
// Função para alternar entre os temas claro e escuro
function toggleMode() {
    const html = document.documentElement;
    html.classList.toggle('light'); // Alterna a classe "light" no elemento HTML

    // Salva o tema escolhido no localStorage
    const mode = html.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);

    // Atualiza a cor do texto do título
    updateTextColor();
}

// Carrega o tema salvo no localStorage ao carregar a página
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.classList.toggle('light', savedTheme === 'light');
}

const titleElement = document.querySelector('#name');
const text = "CODEMASTER";
let index = 0;
let isTyping = true;
let currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';

// Função para animar o texto do título (digitação e apagamento)
function animateText() {
    if (isTyping) {
        if (index < text.length) {
            titleElement.textContent = text.slice(0, index + 1); // Adiciona uma letra ao título
            index++;
        } else {
            isTyping = false; // Alterna para o modo de apagamento
        }
    } else {
        if (index > 1) {
            titleElement.textContent = text.slice(0, index - 1); // Remove uma letra do título
            index--;
        } else {
            isTyping = true; // Alterna para o modo de digitação
            // Alterna a cor do texto entre branco/preto e laranja
            currentColor = currentColor === (document.documentElement.classList.contains('light') ? 'black' : '#fff')
                ? '#FC9416'
                : (document.documentElement.classList.contains('light') ? 'black' : '#fff');
            titleElement.style.color = currentColor;
        }
    }

    setTimeout(animateText, 300); // Define um intervalo para a próxima animação
}

// Função para atualizar a cor do texto do título com base no tema
function updateTextColor() {
    currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';
    titleElement.style.color = currentColor;
}

// Inicia a animação do título ao carregar a página
document.addEventListener('DOMContentLoaded', animateText);
updateTextColor();

// ================= ANIMAÇÃO DA SEÇÃO HOME =================
// Seleciona a seção home e aplica uma animação de fade-in
const homeSection = document.querySelector('#home');
homeSection.style.opacity = '0';
homeSection.style.transform = 'translateY(20px)';
homeSection.style.transition = 'opacity 1s ease, transform 1s ease';

setTimeout(() => {
    homeSection.style.opacity = '1';
    homeSection.style.transform = 'translateY(0)';
}, 100);

// ================= ANIMAÇÃO DAS SEÇÕES =================
// Seleciona todas as seções e aplica animações de entrada
const sections = document.querySelectorAll('section');

sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 1s, transform 1s';

// Aplica diferentes transformações com base no índice da seção
if (index !== 0) {
    if (index === 1) section.style.transform = 'translateY(100px)';
    else if (index === 2) section.style.transform = 'scale(0.8)';
    else if (index === 3) section.style.transform = 'rotateY(90deg)';
}
});

// Observer para animar as seções ao rolar a página
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
        }
    });
});

// Observa cada seção para aplicar a animação
sections.forEach((section) => observer.observe(section));

// ================= FORMULÁRIO DE CONTATO =================
// Seleciona o formulário de contato e a mensagem de agradecimento
const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');

// Adiciona um evento de envio ao formulário
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    thankYouMessage.style.display = 'block'; // Exibe a mensagem de agradecimento

    // Envia os dados do formulário usando Fetch API
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            setTimeout(() => window.location.reload(), 2000); // Recarrega a página após 2 segundos
        } else {
            alert('Erro ao enviar formulário. Tente novamente.');
         }
    })
    .catch(() => alert('Erro na conexão. Tente novamente.'));
});

// ================ ANIMAÇÃO DA SEÇÃO "SOBRE MIM" ================
// Seleciona a seção "Sobre Mim"
const aboutSection = document.querySelector('.about');

// Função para verificar se a seção está visível na tela
function checkAboutVisibility() {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Verifica se a seção está dentro da área visível da tela
    if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
        aboutSection.classList.add('visible'); // Adiciona a classe "visible"
        window.removeEventListener('scroll', checkAboutVisibility); // Remove o listener após a animação
    }
}

// Adiciona um listener para o evento de scroll
window.addEventListener('scroll', checkAboutVisibility);

// Verifica a visibilidade ao carregar a página (caso a seção já esteja visível)
checkAboutVisibility();