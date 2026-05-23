// quiz funcional
let SUS = 5;
let PROD = 5;
let TEC = 5;
let etapa = 0;
let resultadoMostrado = false;

document.addEventListener("DOMContentLoaded", () => {
  const nomeSalvo = localStorage.getItem("nome");
  const temaSalvo = localStorage.getItem("tema");
  if (nomeSalvo) {
    document.getElementById("nome-usuario").textContent = nomeSalvo;
  } else {
    document.getElementById("nome-usuario").textContent = "Visitante";
  }

    if (temaSalvo === "dark") {
    document.body.classList.add("dark");
  }

    document.getElementById("btn-iniciar").addEventListener("click", iniciarQuiz);
    document.querySelector(".quiz-container").classList.add("aparecendo");
    
    // música de fundo
    const musica = document.getElementById("musica-fundo");

const estadoMusica = localStorage.getItem("musica");
const tempoMusica = localStorage.getItem("tempo-musica");

musica.addEventListener("loadedmetadata", () => {

  if (tempoMusica) {

    musica.currentTime = tempoMusica;
  }
});

if (estadoMusica === "ligada") {

  musica.volume = 0.3;

  musica.play();
}

// atualizar o tempo da música a cada segundo
setInterval(() => {

  localStorage.setItem("tempo-musica", musica.currentTime);

}, 1000);
});

const dog = document.getElementById("dog-quiz");

function cachorroFeliz() {

  dog.src = "img/dog-feliz.png";

  dog.classList.remove("dog-calmo");

  dog.classList.add("dog-feliz");

  setTimeout(() => {

  if (!resultadoMostrado) {

    dog.src = "img/dog-normal.png";

    dog.classList.remove("dog-feliz");

    dog.classList.add("dog-calmo");
  }

}, 1000);
}

function iniciarQuiz() {
  resultadoMostrado = false;
  etapa = 0;
  SUS = 5;
  PROD = 5;
  TEC = 5;

  // ocultar os parágrafos introdutórios
  const paragrafos = document.querySelectorAll('.intro-texto');
  paragrafos.forEach(p => p.classList.add('oculto'));

  document.getElementById("btn-iniciar").classList.add("oculto");
  document.getElementById("status").classList.remove("oculto");
  document.getElementById("resultado-final").innerHTML = "";
  document.getElementById("barra-progresso").classList.remove("oculto");

  carregarPergunta();
}

function carregarPergunta() {
  const pergunta = document.getElementById("pergunta");
  const respostas = document.getElementById("respostas");
  const frase = document.getElementById("frase-etapa");
  const progresso = document.getElementById("progresso");

  progresso.style.width = `${etapa * 20}%`;
  respostas.innerHTML = ""; // limpa os botões

  // perguntas e respostas
  if (etapa === 0) {
    pergunta.textContent = "🌾 Como você inicia sua produção?";
    frase.textContent = "Toda grande colheita começa com a primeira escolha.";

    respostas.innerHTML = `
      <button data-opcao="1">🌱 Agricultura sustentável</button>
      <button data-opcao="2">⚡ Produção intensiva</button>
      <button data-opcao="3">⚖️ Equilíbrio</button>
    `;
  }

  else if (etapa === 1) {
    pergunta.textContent = "🤖 Você vai usar tecnologia no campo?";
    frase.textContent = "O futuro do agro também passa pela inovação.";

    respostas.innerHTML = `
      <button data-opcao="1">🚫 Não usar tecnologia</button>
      <button data-opcao="2">🤖 Tecnologia moderna</button>
      <button data-opcao="3">🌿 Tecnologia sustentável</button>
    `;
  }

  else if (etapa === 2) {
    pergunta.textContent = "🌍 Como você cuida do solo?";
    frase.textContent = "O solo de hoje define a colheita de amanhã.";

    respostas.innerHTML = `
      <button data-opcao="1">🌱 Rotação de culturas</button>
      <button data-opcao="2">⚠️ Uso intenso</button>
      <button data-opcao="3">⚖️ Cuida parcialmente</button>
    `;
  }

  else if (etapa === 3) {
    pergunta.textContent = "🌽 Como será a colheita?";
    frase.textContent = "Eficiência e consciência precisam andar lado a lado.";

    respostas.innerHTML = `
      <button data-opcao="1">👨‍🌾 Manual</button>
      <button data-opcao="2">🚜 Máquinas pesadas</button>
      <button data-opcao="3">🤖 Máquinas sustentáveis</button>
    `;
  }

  else if (etapa === 4) {
    pergunta.textContent = "🚚 Como você distribui sua produção?";
    frase.textContent = "Produzir bem é importante. Entregar bem também.";

    respostas.innerHTML = `
      <button data-opcao="1">🌍 Venda local</button>
      <button data-opcao="2">📦 Distribuição em massa</button>
      <button data-opcao="3">🚛 Logística inteligente</button>
    `;
  }

  else if (etapa === 5) {
    frase.textContent = "";
    mostrarResultado();
  }

  document.getElementById("status").innerHTML = `
🌱 ${SUS} | 📈 ${PROD} | 🤖 ${TEC}
`;

const botoes = respostas.querySelectorAll("button");

botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    cachorroFeliz();
    const opcao = Number(botao.dataset.opcao);
    responder(opcao);
  });
});
}

// lógica de pontuação
function responder(opcao) {

 if (etapa === 0) {
  if (opcao === 1) { SUS += 2; PROD -= 1; }
  if (opcao === 2) { PROD += 2; SUS -= 1; }
  if (opcao === 3) { SUS += 1; PROD += 1; TEC += 1; }
}

else if (etapa === 1) {
  if (opcao === 1) { SUS += 1; PROD -= 1; TEC -= 2; }
  if (opcao === 2) { TEC += 2; PROD += 1; SUS -= 1; }
  if (opcao === 3) { TEC += 2; SUS += 2;}
}

else if (etapa === 2) {
  if (opcao === 1) { SUS += 3; TEC += 1; }
  if (opcao === 2) { PROD += 2; SUS -= 2; TEC -= 1; }
  if (opcao === 3) { SUS += 2; PROD += 2; TEC += 1; }
}

else if (etapa === 3) {
  if (opcao === 1) { SUS += 2; PROD -= 1; }
  if (opcao === 2) { PROD += 2; TEC += 1; SUS -= 1; }
  if (opcao === 3) { TEC += 2; SUS += 1; PROD += 1; }
}

else if (etapa === 4) {
  if (opcao === 1) { SUS += 2; TEC += 1; }
  if (opcao === 2) { PROD += 2; SUS -= 1; }
  if (opcao === 3) { TEC += 2; PROD += 1; }
}

    limitarPontuacao();

  const caixa = document.querySelector(".quiz-container");
  caixa.classList.add("sumindo");

  setTimeout(() => {
    etapa++;
    carregarPergunta();

    caixa.classList.remove("sumindo");
    caixa.classList.add("aparecendo");

    setTimeout(() => {
      caixa.classList.remove("aparecendo");
    }, 350);

  }, 250);
}

// limitar pontuação entre 0 e 10
function limitarPontuacao() {
  if (SUS > 10) SUS = 10;
  if (SUS < 0) SUS = 0;

  if (PROD > 10) PROD = 10;
  if (PROD < 0) PROD = 0;

  if (TEC > 10) TEC = 10;
  if (TEC < 0) TEC = 0;
}

// mostrar resultado final
function mostrarResultado() {
  document.getElementById("progresso").style.width = "100%";
  const pergunta = document.getElementById("pergunta");
  const respostas = document.getElementById("respostas");
  const resultadoFinal = document.getElementById("resultado-final");

  respostas.innerHTML = "";

  let titulo = "";
  let descricao = "";
  
// diferenças
const difSP = Math.abs(SUS - PROD);
const difST = Math.abs(SUS - TEC);
const difPT = Math.abs(PROD - TEC);

// empate perfeito dos 3
if (SUS === PROD && PROD === TEC) {
  titulo = "👑 Equilíbrio Perfeito";
  descricao = "Parabéns! Você conseguiu alcançar o equilíbrio ideal entre produção, tecnologia e sustentabilidade. Esse é o modelo mais completo e representa o verdadeiro futuro sustentável do agro.";
}

// SUS + PROD
else if (
  difSP <= 1 &&
  SUS > TEC &&
  PROD > TEC
) {
  titulo = "🏆 Produtor Consciente";
  descricao = "Você equilibrou sustentabilidade e produção de forma eficiente. Seu modelo busca produtividade sem abandonar a responsabilidade ambiental.";
}

// SUS + TEC
else if (
  difST <= 1 &&
  SUS > PROD &&
  TEC > PROD
) {
  titulo = "🏆 Inovador Verde";
  descricao = "Você combinou tecnologia e sustentabilidade para criar uma fazenda moderna e consciente. Seu único desafio é ampliar a produção.";
}

// PROD + TEC
else if (
  difPT <= 1 &&
  PROD > SUS &&
  TEC > SUS
) {
  titulo = "🏆 Magnata Tecnológico";
  descricao = "Você focou em produtividade e inovação, construindo um modelo eficiente e altamente tecnológico. Porém, a sustentabilidade acabou ficando em segundo plano.";
}

// SUS dominante
else if (
  SUS > PROD &&
  SUS > TEC
) {
  titulo = "🌱 Guardião da Natureza";
  descricao = "Você priorizou a preservação ambiental e construiu uma fazenda consciente. Seu foco ecológico é admirável, mas ainda há espaço para crescer em inovação e produtividade.";
}

// PROD dominante
else if (
  PROD > SUS &&
  PROD > TEC
) {
  titulo = "📈 Império da Produção";
  descricao = "Você buscou máxima produtividade e alto rendimento. Sua fazenda produz muito, mas talvez precise equilibrar melhor os impactos ambientais.";
}

// TEC dominante
else if (
  TEC > SUS &&
  TEC > PROD
) {
  titulo = "🤖 Mestre da Tecnologia";
  descricao = "Você apostou fortemente na inovação e nas tecnologias agrícolas. Seu modelo é moderno e eficiente, mas pode se beneficiar de maior equilíbrio sustentável.";
}

pergunta.textContent = "";
resultadoFinal.innerHTML = `
<div class="resultado">
  ${titulo}<br><br>
  <span class="descricao-resultado">${descricao}</span>
  <br><br>
  🌱 Sustentabilidade: ${SUS}<br>
  📈 Produção: ${PROD}<br>
  🤖 Tecnologia: ${TEC}
  <br><br>
  <button id="btn-reiniciar">Jogar Novamente 🔄</button>
  <button id="btn-voltar" class="voltar-btn">🏠 Voltar</button>
</div>
`;

resultadoMostrado = true;
dog.classList.remove("dog-calmo");
dog.classList.add("dog-feliz");

document.getElementById('btn-reiniciar').addEventListener('click', iniciarQuiz);

document.getElementById('btn-voltar').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById("status").classList.add("oculto");
}