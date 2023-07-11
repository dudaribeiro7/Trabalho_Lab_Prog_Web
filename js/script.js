// Definindo as variáveis globais
let partidaAtual = 0;
let partidasJogador = 0;
let partidasComputador = 0;

let rodadaAtual = 1;
let controladosJogador = 0;
let controladosComputador = 0;
let empatados = 3;

let energiaTotal = 1;

let maoJogador = [];
let maoComputador = [];
let baralhoRestanteJogador = [];

let forcaL1Jog = 0;
let forcaL2Jog = 0;
let forcaL3Jog = 0;

let forcaL1Comp = 0;
let forcaL2Comp = 0;
let forcaL3Comp = 0;

let indiceCartaL1Jog = 1;
let indiceCartaL2Jog = 1;
let indiceCartaL3Jog = 1;

let indiceCartaL1Comp = 1;
let indiceCartaL2Comp = 1;
let indiceCartaL3Comp = 1;

// Iniciar a primeira partida e rodada
document.addEventListener('DOMContentLoaded', function () {
    novaPartida();
});

// Função para iniciar uma nova partida
function novaPartida() {
    partidaAtual++;
    rodadaAtual = 0;

    forcaL1Jog = 0;
    forcaL2Jog = 0;
    forcaL3Jog = 0;

    forcaL1Comp = 0;
    forcaL2Comp = 0;
    forcaL3Comp = 0;

    indiceCartaL1Jog = 1;
    indiceCartaL2Jog = 1;
    indiceCartaL3Jog = 1;

    indiceCartaL1Comp = 1;
    indiceCartaL2Comp = 1;
    indiceCartaL3Comp = 1;

    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 3; j++) {
            document.getElementById(`carta${i}-vc-l${j}`).innerHTML = '';
        }
    }

    atualizarInformacoes();

    // Embaralhar o baralho
    const baralho = [
        { nome: 'Homem de Ferro', custo: 3, forca: 2 },
        { nome: 'Viúva Negra', custo: 2, forca: 3 },
        { nome: 'Capitão América', custo: 2, forca: 1 },
        { nome: 'Thor', custo: 3, forca: 4 },
        { nome: 'Hulk', custo: 2, forca: 3 },
        { nome: 'Gavião Arqueiro', custo: 1, forca: 2 },
        { nome: 'Homem Formiga', custo: 1, forca: 1 },
        { nome: 'Capitã Marvel', custo: 2, forca: 4 },
        { nome: 'Homem Aranha', custo: 3, forca: 2 },
        { nome: 'Wanda Maximoff', custo: 2, forca: 4 },
        { nome: 'Pantera Negra', custo: 1, forca: 2 },
        { nome: 'Doutor Estranho', custo: 3, forca: 2 }
    ];
    baralhoRestanteJogador = shuffleArray(baralho);

    // Distribuir cartas iniciais para o jogador
    maoJogador = baralhoRestanteJogador.splice(-4);

    // Renderizar as cartas iniciais do jogador
    renderizarMaoJogador();
    novaRodada();
}

// Função para iniciar uma nova rodada
function novaRodada() {
    rodadaAtual++;
    energiaTotal = rodadaAtual;
    atualizarInformacoes();

    // Sacar nova carta para o jogador
    const novaCartaJogador = baralhoRestanteJogador.pop();
    maoJogador.push(novaCartaJogador);

    // Renderizar nova carta do jogador
    renderizarMaoJogador();
}

// Função para atualizar as informações do jogo na tela
function atualizarInformacoes() {
    controladosJogador = 0;
    controladosComputador = 0;
    empatados = 0;

    document.getElementById('partida-atual').textContent = partidaAtual;
    document.getElementById('partidas-vc').textContent = partidasJogador;
    document.getElementById('partidas-computador').textContent = partidasComputador;
    document.getElementById('rodada-atual').textContent = rodadaAtual;
    document.getElementById('energia-total').textContent = energiaTotal;

    document.getElementById('forca-l1-vc').textContent = forcaL1Jog;
    document.getElementById('forca-l1-computador').textContent = forcaL1Comp;
    forcaL1Jog > forcaL1Comp ? controladosJogador++ : (forcaL1Jog < forcaL1Comp ? controladosComputador++ : empatados++);

    document.getElementById('forca-l2-vc').textContent = forcaL2Jog;
    document.getElementById('forca-l2-computador').textContent = forcaL2Comp;
    forcaL2Jog > forcaL2Comp ? controladosJogador++ : (forcaL2Jog < forcaL2Comp ? controladosComputador++ : empatados++);

    document.getElementById('forca-l3-vc').textContent = forcaL3Jog;
    document.getElementById('forca-l3-computador').textContent = forcaL3Comp;
    forcaL3Jog > forcaL3Comp ? controladosJogador++ : (forcaL3Jog < forcaL3Comp ? controladosComputador++ : empatados++);

    document.getElementById('controlados-vc').textContent = controladosJogador;
    document.getElementById('controlados-computador').textContent = controladosComputador;
    document.getElementById('empatados').textContent = empatados;
}

// Função para embaralhar um array
function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para renderizar as cartas na mão do jogador
function renderizarMaoJogador() {
    const maoJogadorElement = document.querySelector('.mao-jogador .cartas');
    maoJogadorElement.innerHTML = ''; // Limpar as cartas anteriores

    maoJogador.forEach((carta, index) => {
        const cartaElement = document.createElement('div');
        cartaElement.classList.add('carta');
        cartaElement.id = `carta${index + 1}-vc-mao`;
        cartaElement.innerHTML = `
            <h3>${carta.nome}</h3>
            <ul>
                <li>Custo: ${carta.custo}</li>
                <li>Força: ${carta.forca}</li>
            </ul>
        `;
        cartaElement.addEventListener('click', () => {
            if (energiaTotal >= maoJogador[index].custo) {
                const localSelecionado = prompt("Digite o número do local (1, 2 ou 3) para jogar a carta:");
                const localId = `local${localSelecionado}`;

                if (localSelecionado && localId && document.getElementById(localId)) {
                    jogarCarta(index, localSelecionado);
                } else {
                    alert("Local inválido!");
                }
            }
            else {
                alert('Você não tem energia suficiente para jogar essa carta!');
            }
        });
        maoJogadorElement.appendChild(cartaElement);
    });
}

// Função para jogar uma carta
function jogarCarta(cartaIndex, localId) {
    const maoJogadorHTML = document.querySelectorAll('.mao-jogador .carta');
    maoJogadorHTML[cartaIndex].innerHTML = '';

    const carta = maoJogador[cartaIndex];
    maoJogador.splice(cartaIndex, 1);

    energiaTotal -= carta.custo;

    let indice;
    if (localId == 1) {
        indice = indiceCartaL1Jog;
        indiceCartaL1Jog++;
        forcaL1Jog += carta.forca;
    }
    else if (localId == 2) {
        indice = indiceCartaL2Jog;
        indiceCartaL2Jog++;
        forcaL2Jog += carta.forca;
    }
    else if (localId == 3) {
        indice = indiceCartaL3Jog;
        indiceCartaL3Jog++;
        forcaL3Jog += carta.forca;
    }

    document.getElementById(`carta${indice}-vc-l${localId}`).innerHTML = `<h5>${carta.nome}</h5>`;

    atualizarInformacoes();
}

function finalizarRodada() {
    if (rodadaAtual != 6)
        novaRodada();
    else {
        if (controladosJogador > controladosComputador) {
            alert('PARABÉNS!!! Você venceu a partida!');
            partidasJogador++;
            novaPartida();
        }
        else if (controladosJogador < controladosComputador) {
            alert('GAME OVER!!! O computador venceu a partida!');
            partidasComputador++;
            novaPartida();
        }
        else {
            forcaTotalVc = forcaL1Jog + forcaL2Jog + forcaL3Jog;
            forcaTotalComp = forcaL1Comp + forcaL2Comp + forcaL3Comp;

            if (forcaTotalVc > forcaTotalComp) {
                alert('PARABÉNS!!! Foi empate, mas sua força foi maior! Você venceu a partida!');
                partidasJogador++;
                novaPartida();
            }
            else if (forcaTotalVc < forcaTotalComp) {
                alert('GAME OVER!!! Foi empate, mas sua força foi menor! O computador venceu a partida!');
                partidasComputador++;
                novaPartida();
            }
            else {
                alert('GAME OVER!!! Foi empate, mas o computador venceu a partida!');
                partidasComputador++;
                novaPartida();
            }
        }
    }
}

function reiniciarPartida(){
    partidaAtual--;
    novaPartida();
}