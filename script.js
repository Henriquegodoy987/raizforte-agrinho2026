// menu funcional
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("ativo");
}

// quando abre o site
const nomeSalvo = localStorage.getItem("nome");
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-continuar").addEventListener("click", salvarNome);
  document.getElementById("btn-temas").addEventListener("click", toggleMenu);

  // fecha popup com Enter
document.getElementById("input-nome").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    salvarNome();
  }
});

// mostrar paginas dos temas
const botoesTema = document.querySelectorAll(".tema-item");
document.getElementById("btn-voltar-painel").addEventListener("click", fecharTema);

botoesTema.forEach(botao => {
  botao.addEventListener("click", () => {
    abrirTema(botao.dataset.tema);
  });
});

// modo noturno
const botaoDark = document.getElementById("btn-dark");

botaoDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // salva a escolha
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("tema", "dark");
  } else {
    localStorage.setItem("tema", "light");
  }
});

  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "dark") {
    document.body.classList.add("dark");
  }

  if (nomeSalvo) {
    document.getElementById("popup-nome").classList.add("oculto");

    // mostra o nome no header
    document.getElementById("nome-usuario").textContent = nomeSalvo;
  }

  const intro = document.querySelector(".intro");
  requestAnimationFrame(() => {
  intro.classList.add("animacao-aparecer");
});

// popup de feedback
const btnFeedback = document.getElementById("btn-feedback");
const popupFeedback = document.getElementById("popup-feedback");
const fecharFeedback = document.getElementById("fechar-feedback");
const enviarFeedback = document.getElementById("enviar-feedback");
const mensagemFeedback = document.getElementById("mensagem-feedback");
const campoFeedback = document.getElementById("campo-feedback");

btnFeedback.addEventListener("click", () => {

  const nomeFeedback = localStorage.getItem("nome");

  document.getElementById("nome-usuario-feedback").textContent =
    nomeFeedback || "Visitante";

  popupFeedback.classList.remove("oculto");
  campoFeedback.classList.remove("oculto");
  enviarFeedback.classList.remove("oculto");
  mensagemFeedback.textContent = "";
});

fecharFeedback.addEventListener("click", () => {
  popupFeedback.classList.add("oculto");
});

enviarFeedback.addEventListener("click", () => {

  if (campoFeedback.value.trim() === "") {
    mensagemFeedback.textContent = "Escreva algo antes 🌱";
    return;
  }

  campoFeedback.classList.add("oculto");
  enviarFeedback.classList.add("oculto");
  mensagemFeedback.textContent = "Obrigado pelo feedback 🌾";

  setTimeout(() => {

    popupFeedback.classList.add("oculto");

    mensagemFeedback.textContent = "";

    campoFeedback.value = "";

  }, 1800);
});

// música de fundo
const musica = document.getElementById("musica-fundo");
const btnMusica = document.getElementById("btn-musica");

let musicaLigada = false;

// carregar estado salvo
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

  btnMusica.textContent = "🔊";

  musicaLigada = true;
}

// botão música
btnMusica.addEventListener("click", () => {

  if (!musicaLigada) {

    musica.volume = 0.3;

    musica.play();

    btnMusica.textContent = "🔊";

    localStorage.setItem("musica", "ligada");

    musicaLigada = true;

  } else {

    musica.pause();

    btnMusica.textContent = "🔇";

    localStorage.setItem("musica", "desligada");

    musicaLigada = false;
  }
});

// salva o tempo da música constantemente
setInterval(() => {
  localStorage.setItem("tempo-musica", musica.currentTime);
}, 1000);
});

// salvar nome e iniciar animação
function salvarNome() {
  let nome = document.getElementById("input-nome").value;

  if (!nome) nome = "Visitante";

  // salva
  localStorage.setItem("nome", nome);

  // atualiza header
  document.getElementById("nome-usuario").textContent = nome;

  // fecha popup
  document.getElementById("popup-nome").classList.add("oculto");

  // animação
  const tela = document.getElementById("intro-animacao");
  const texto = document.getElementById("texto-boas-vindas");

  tela.classList.remove("oculto");
  tela.classList.add("flex-visivel");
  texto.textContent = `Bem-vindo, ${nome}! 🌱`;

  texto.classList.remove("animacao-aparecer", "animacao-subir", "sem-animacao");
  texto.classList.add("sem-animacao");
  texto.offsetHeight;

  texto.classList.remove("sem-animacao");
  texto.classList.add("animacao-aparecer");

  setTimeout(() => {
    texto.classList.add("animacao-subir");
  }, 800);

  setTimeout(() => {
    tela.classList.remove("flex-visivel");
    tela.classList.add("oculto");
  }, 1800);
}

// conteúdo dos temas
function abrirTema(tema) {
  const painel = document.getElementById("painel-tema");
  window.scrollTo(0, 0);
  const conteudo = document.getElementById("conteudo-painel");

  const conteudos = {
    producao: `
     
    <div class="bloco-tema">

      <h3>Produção Agrícola: O Coração do Brasil</h3>

        <div class="conteudo-linha">
          <div class="texto-tema">

      <p>A produção agrícola não é apenas sobre plantar e colher; é a base da segurança alimentar mundial e o motor que movimenta a economia brasileira. Produzir no campo é transformar recursos naturais em vida, energia e matéria-prima para milhares de produtos que utilizamos todos os dias.</p>

      <h2>Como funciona a produção?</h2>
      <p>Para que um alimento chegue à mesa, existe um ciclo complexo e técnico. A produção agrícola moderna envolve:</p>

      <ul>
        <li>Preparo do Solo: Análise técnica para garantir que a terra tenha os nutrientes necessários.</li>
        <li>Tecnologia de Plantio: Uso de sementes selecionadas e máquinas de precisão que evitam o desperdício.</li>
        <li>Manejo Integrado: O cuidado constante com as plantas, monitorando pragas e doenças de forma inteligente.</li>
        <li>Colheita e Logística: O momento exato de retirar o produto do campo para manter sua qualidade e frescor.</li>
      </ul>

      <h2>O Elo com a Sustentabilidade</h2>
      <p>Hoje, produzir muito não é o suficiente; é preciso produzir melhor. A agricultura sustentável utiliza técnicas como o Plantio Direto (que protege o solo), a Rotação de Culturas (que mantém a terra fértil naturalmente) e o uso consciente da água através da irrigação inteligente. Ao preservarmos as matas ciliares e as nascentes, garantimos que o campo continue produtivo para as próximas gerações.</p>

      <h2>O Futuro da Nossa Terra</h2>
      <p>O futuro da produção agrícola está na união entre o conhecimento tradicional e a inovação digital. Com o uso de drones, sensores e inteligência artificial, estamos entrando na era da Agricultura 5.0. O impacto disso é claro: alimentos mais saudáveis, menos impacto ambiental e um Brasil cada vez mais forte e resiliente diante dos desafios globais.</p>
      </div>

      <div class="imagem-tema">
        <img src="img/producao.jpg" alt="foto de uma plantação verde">
         <p class="credito">
           Foto por Felipe Gorniak
         </p>

        <img src="img/chibi-producao.png" alt="mascote de uma menininha fofa plantando uma uma muda" class="chibi-producao">
      </div>

    </div>
  </div>
    `,

    tecnologia: `

    <div class="bloco-tema">

      <h3>Tecnologia no Campo: A Revolução do Agronegócio</h3>

      <div class="conteudo-linha">
        <div class="texto-tema">

      <p>A imagem do campo apenas com enxada e arado ficou no passado. Hoje, o agronegócio é um dos setores mais tecnológicos do planeta. A tecnologia no campo não serve apenas para facilitar o trabalho, mas para transformar dados em decisões, garantindo que cada centímetro de terra seja aproveitado da melhor maneira possível.</p>

      <h2>A Digitalização do Cultivo</h2>
      <p>A tecnologia atual atua em várias frentes que tornam a fazenda "inteligente":</p>

      <ul>
        <li>Drones e Satélites: Funcionam como "olhos no céu", identificando falhas no plantio ou focos de pragas que o olho humano demoraria dias para ver.</li>
        <li>Sensores de Solo (IoT): Dispositivos espalhados pela terra que avisam no celular do produtor se a planta está com sede ou se precisa de nutrientes.</li>
        <li>GPS e Automação: Tratores e colheitadeiras que se guiam sozinhos com precisão de centímetros, evitando sobreposição de sementes e economizando combustível.</li>
        <li>Big Data: Softwares que cruzam informações do clima, do mercado e da plantação para prever o melhor dia para colher.</li>
      </ul>

      <h2>Tecnologia a Serviço do Planeta</h2>
      <p>O maior benefício da tecnologia é a eficiência. Quando usamos um drone para aplicar defensivos apenas onde existe uma praga (em vez de aplicar em todo o campo), reduzimos drasticamente o uso de químicos. Além disso, sistemas de irrigação automatizados economizam milhões de litros de água ao irrigar apenas o necessário. Tecnologia, aqui, é sinônimo de preservação.</p>

      <h2>O Impacto no Amanhã</h2>
      <p>Estamos vivendo a transição para a Agricultura Conectada. No futuro próximo, o campo será um ambiente totalmente integrado, atraindo jovens talentos que dominam a computação e a robótica. O impacto final é uma produção mais barata, mais limpa e capaz de alimentar uma população mundial que não para de crescer, sem precisar avançar sobre novas áreas de floresta.</p>
      </div>

      <div class="imagem-tema">
        <img src= "img/tecnologia.jpg" alt="Colheitadeira moderna colhendo um trigo ao pôr-do-sol">
        <p class="credito">
          Foto por
          <a href="https://unsplash.com/pt-br/fotografias/uma-ceifeira-debulhadora-colhendo-um-campo-ao-por-do-sol-ervJLTyYTDw" target="_blank" rel="noopener noreferrer">
          James Baltz
          </a>
        </p>

        <img src="img/chibi-tecnologia.png" alt="mascote de um menino com uma bola de futebol dentro de uma colheitadeira" class="chibi-tecnologia">

        <img src="img/chibi-drone.png" alt="mascote de uma menininha fofa voando com um drone com seu gatinho" class="chibi-drone">

      </div>

     </div>
    </div>
    `,

    sustentabilidade: `

    <div class="bloco-tema">

      <h3>Sustentabilidade: Preservando o Futuro do Agronegócio</h3>

      <div class="conteudo-linha">
        <div class="texto-tema">

      <p>Sustentabilidade não é apenas uma palavra da moda; é a única forma de garantir que teremos solo fértil e água limpa no futuro. No campo, ser sustentável significa equilibrar três pilares fundamentais: o econômico (a fazenda precisa ser viável), o social (respeito às pessoas e à comunidade) e o ambiental (cuidado com os ecossistemas).</p>

      <h2>Práticas que Fazem a Diferença</h2>
      <p>A sustentabilidade na agricultura acontece através de ações concretas que regeneram o meio ambiente enquanto produzimos alimentos:</p>

      <ul>
       <li>Recuperação de Pastagens: Transformar terras degradadas em áreas produtivas, evitando a abertura de novas matas.</li>
        <li>Gestão de Resíduos: O descarte correto de embalagens e a transformação de dejetos animais em biofertilizantes ou energia (biogás).</li>
        <li>Controle Biológico: O uso de "insetos do bem" para combater pragas, reduzindo a necessidade de produtos químicos.</li>
        <li>Preservação de APPs: A manutenção das Áreas de Preservação Permanente, como matas na beira de rios, que protegem a biodiversidade.</li>
      </ul>

      <h2>A Conexão com o Ciclo da Vida</h2>
      <p>Tudo na natureza está conectado. Quando o produtor adota a sustentabilidade, ele protege o ciclo da água: a floresta preservada ajuda a formar as chuvas, que por sua vez irrigam a plantação. É um sistema onde todos ganham. O solo bem cuidado armazena mais carbono, ajudando inclusive a combater as mudanças climáticas globais.</p>

      <h2>O Futuro Sustentável</h2>
      <p>O futuro pertence às propriedades que possuem o "selo verde" da consciência. O impacto dessa escolha é um mundo onde o progresso humano não acontece às custas da destruição ambiental. Ser sustentável hoje é garantir que as crianças do futuro conheçam um campo rico, verde e cheio de vida.</p>
      </div>

      <div class="imagem-tema">
        <img src="img/sustentabilidade-1.jpg" alt="árvore verde com o sol brilhando em cima">
         <p class="credito">
          Foto por 
          <a href="https://unsplash.com/pt-br/fotografias/low-angle-photography-of-trees-at-daytime-4rDCa5hBlCs" target="_blank" rel="noopener noreferrer">
          Casey Horner
          </a>
        </p>
        <img src="img/sustentabilidade-2.jpg" alt="pequenas plantas verdes crescendo">
         <p class="credito">
          Foto por 
          <a href="https://unsplash.com/pt-br/fotografias/plantas-verdes-no-solo-ruQHpukrN7c" target="_blank" rel="noopener noreferrer">
          Francesco Gallarotti
          </a>
         </p>
      </div>

      </div>
    </div>
    `,

    solo: `

    <div class="bloco-tema">

      <h3>Solo e Recursos Naturais: A Base da Produção</h3>

      <div class="conteudo-linha">
        <div class="texto-tema">

      <p>Muitas vezes olhamos para o chão e vemos apenas "terra", mas o solo é um recurso natural finito e cheio de vida. Ele é a pele do nosso planeta. Junto com a água e o ar, o solo forma o triângulo essencial para a existência de qualquer ecossistema. Cuidar desses recursos não é uma opção, é a garantia de que a vida continuará florescendo.</p>

      <h2>O Ciclo dos Recursos no Campo</h2>
      <p>A gestão inteligente dos recursos naturais envolve entender como cada elemento interage com a produção:</p>

      <ul>
        <li>Saúde do Solo: Um solo rico em matéria orgânica retém mais água e nutrientes, funcionando como uma esponja natural que alimenta as plantas.</li>
        <li>Ciclo da Água: A agricultura depende da chuva e dos lençóis freáticos. Proteger as nascentes dentro das propriedades é garantir que o "combustível" da vida nunca falte.</li>
        <li>Biodiversidade: Insetos polinizadores, microrganismos do solo e aves formam uma rede de proteção natural que ajuda a equilibrar o ambiente agrícola.</li>
      </ul>

      <h2>Conexão com a Sustentabilidade</h2>
      <p>A conservação dos recursos naturais é o pilar prático da sustentabilidade. Técnicas como a curva de nível (que evita que a enxurrada leve a terra boa embora) e o uso de adubação verde (plantas que recuperam o solo) mostram que é possível produzir em harmonia. Quando protegemos o solo contra a erosão e evitamos a contaminação dos rios, estamos preservando os serviços ecossistêmicos que a natureza nos dá de graça.</p>

      <h2>O Solo no Futuro</h2>
      <p>O futuro da humanidade depende da nossa capacidade de regenerar o que foi desgastado. O impacto de um solo bem cuidado é a mitigação das mudanças climáticas, já que a terra saudável estoca carbono. Ao tratarmos os recursos naturais como um patrimônio valioso e não como algo infinito, garantimos que as futuras gerações herdem um planeta fértil, capaz de sustentar a vida com abundância.</p>
      </div>

      <div class="imagem-tema">
        <img src="img/solo.jpg" alt="Solo marrom com plantas verdes crescendo">
        <p class="credito">
          Foto por 
          <a href="https://unsplash.com/pt-br/fotografias/caminho-marrom-entre-plantas-de-folhas-verdes-9SjCXUq_qSE" target="_blank" rel="noopener noreferrer">
          Dylan de Jonge
          </a>
        </p>
        <img src="img/chibi-solo.png" alt="mascote de uma menininha fofa sentada em uma pedra na frente de uma usina eólica rezando com seu rosário" class="chibi-solo">
      </div>

      </div>
    </div>
    `,

    colheita: `

    <div class="bloco-tema">

      <h3>Colheita e Distribuição: Do campo à Mesa</h3>

       <div class="conteudo-linha colheita-layout">
        <div class="texto-tema">

      <p>A colheita não é o fim, mas o início de uma jornada logística impressionante. De nada adianta produzir com excelência se o alimento não chegar ao consumidor final com qualidade, rapidez e segurança. Este é o momento em que o esforço do produtor se conecta com a necessidade das famílias nas cidades.</p>

      <h2>A Logística da Eficiência</h2>
      <p>Para que a distribuição funcione sem desperdícios, o processo precisa ser milimétrico:</p>

      <ul>
        <li>Ponto de Maturação: A colheita deve acontecer no momento exato, usando máquinas reguladas para não machucar o grão ou o fruto.</li>
        <li>Armazenamento Inteligente: O uso de silos e câmaras frias que mantêm a temperatura ideal, evitando que o alimento estrague antes de seguir viagem.</li>
        <li>Rastreabilidade: Tecnologias (como QR Codes) que permitem ao consumidor saber exatamente de onde veio aquele produto e como ele foi cultivado.</li>
        <li>Transporte Intermodal: O uso de caminhões, trens e navios organizados para que a produção chegue aos mercados e portos da forma mais ágil possível.</li>
      </ul>

      <h2>Sustentabilidade no Trajeto</h2>
      <p>A sustentabilidade aqui foca na redução de perdas. Estima-se que grande parte do desperdício de alimentos no mundo ocorra no transporte. Utilizar embalagens recicláveis, planejar rotas mais curtas para economizar combustível e investir em infraestrutura que evite o tombamento de cargas são formas de respeitar o meio ambiente e o trabalho do produtor. Menos desperdício significa menos pressão sobre os recursos naturais.</p>

      <h2>O Impacto no Futuro</h2>
      <p>O futuro da distribuição está no encurtamento das distâncias e na transparência total. Com a logística 4.0, teremos cadeias de suprimentos cada vez mais inteligentes e automatizadas. O impacto final é uma segurança alimentar fortalecida, onde o alimento chega mais fresco, mais barato e com menor pegada de carbono à mesa de todos os brasileiros.</p>
    </div>

      <div class="imagem-tema">
        <img src="img/distribuicao.png" alt="infográfico ilustrando a cadeia produtiva de alimentos, desde o cultivo na fazenda e o transporte logístico até a venda no supermercado e o consumo final em casa.">
      </div>

      </div>
    </div>
      `,

    trabalho: `

    <div class="bloco-tema">

      <h3>O Agronegócio: Uma Nova Era de Oportunidades</h3>

      <div class="conteudo-linha">
        <div class="texto-tema">

      <h2>Esqueça os Estereótipos: O Agro é High-Tech</h2>
      <p>Se você acha que trabalhar no campo é apenas um trabalho braçal sob o sol, está na hora de atualizar seus conceitos. O agronegócio hoje é um dos setores que mais absorve programadores, engenheiros, especialistas em dados, pilotos de drone e gestores ambientais. Entrar no agro é estar na linha de frente da tecnologia global.</p>

      <h2>Por que escolher o Agronegócio?</h2>
      <p>Existem motivos de sobra para você considerar esse caminho, mas aqui estão os principais:</p>

      <ul>
        <li>Propósito Real: No agro, você trabalha diretamente com a missão mais nobre da humanidade: alimentar o mundo e garantir a sobrevivência das próximas gerações.</li>
        <li> Mercado em Expansão: Enquanto muitos setores oscilam, o agro nunca para. É uma das áreas com maior empregabilidade e oportunidades de crescimento no Brasil.</li>
        <li>Laboratório a Céu Aberto: É a chance de unir a inovação dos escritórios com a liberdade da natureza. Você vê o resultado do seu trabalho crescer e ganhar vida.</li>
        <li>Sustentabilidade na Prática: Se você se preocupa com o planeta, o agro é o lugar onde você pode criar soluções para as mudanças climáticas e a preservação de recursos.</li>
      </ul>
      <h2>Como dar o primeiro passo?</h2>
      <p>Não importa se você mora na cidade ou no campo, o caminho começa com a curiosidade:</p>

      <ul>
        <li>Educação e Conhecimento: Busque cursos técnicos, faculdades de Agronomia, Veterinária ou Engenharia, mas também áreas como Gestão de TI e Biotecnologia. O projeto Agrinho já é o seu melhor ponto de partida!</li>
        <li>Conecte-se com a Tecnologia: Aprenda sobre análise de dados, monitoramento remoto e sustentabilidade. Essas são as línguas que o campo fala hoje.</li>
        <li>Desenvolva o "Olhar Verde": Entenda que a produção deve caminhar junto com a preservação. O mercado busca profissionais que pensem de forma regenerativa.</li>
        <li>Esteja Aberto à Mudança: O agro se renova a cada safra. Ser um profissional do setor exige vontade de aprender sempre.</li>
      </ul>

      <h2>O Impacto: Seja o Protagonista do Amanhã</h2>
      <p>Trabalhar no agro é ser parte de algo maior que nós mesmos. É entender que cada semente plantada e cada linha de código escrita para uma colheitadeira inteligente impacta a vida de milhões de pessoas.</p>
      <p>O futuro não está apenas sendo escrito; ele está sendo plantado. E a pergunta que fica é: você vai ficar assistindo ou vai ajudar a cultivar o futuro do Brasil?</p>
     </div>

      <div class="imagem-tema">
        <img src="img/trabalho-1.jpg" alt="homem pilotando um drone sobre um campo verde">
          <p class="credito">
          Foto por 
          <a href="https://unsplash.com/pt-br/fotografias/homem-voando-drone-sobre-campo-verde-D_R2wPPIHvw" target="_blank" rel="noopener noreferrer">
          Fridi Antrack
          </a>
         </p>
        <img src="img/trabalho-2.jpg" alt="foto de uma colheitadeira sob o por do sol colhendo um campo">
          <p class="credito">
          Foto por 
          <a href="https://unsplash.com/pt-br/fotografias/um-grande-caminhao-verde-dirigindo-por-uma-estrada-de-terra-8IqGocd1S4o" target="_blank" rel="noopener noreferrer">
          Charlie Jones
          </a>
         </p>
      </div>

      </div>
    </div>
      `
  };

  conteudo.innerHTML = conteudos[tema];

  document.querySelector(".intro").classList.add("oculto");
  painel.classList.remove("oculto");
}

function fecharTema() {
  document.getElementById("painel-tema").classList.add("oculto");
  document.querySelector(".intro").classList.remove("oculto");
}

// animação das folhas
const containerFolhas = document.getElementById("folhas-container");

const posicoes = [
  "folha1", "folha2", "folha3", "folha4", "folha5",
  "folha6", "folha7", "folha8", "folha9", "folha10"
];

const velocidades = [
  "velocidade1",
  "velocidade2",
  "velocidade3"
];

const delays = [
  "delay1",
  "delay2",
  "delay3",
  "delay4"
];

const folhas = ["🍃", "🌿", "🍂"];

for (let i = 0; i < 4; i++) {

  const folha = document.createElement("div");

  folha.classList.add("folha");

  folha.classList.add(
    posicoes[Math.floor(Math.random() * posicoes.length)]
  );

  folha.classList.add(
    velocidades[Math.floor(Math.random() * velocidades.length)]
  );

  folha.classList.add(
    delays[Math.floor(Math.random() * delays.length)]
  );

  folha.textContent = folhas[i % folhas.length];

  containerFolhas.appendChild(folha);
}