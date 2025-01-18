//pegando os elementos do html e atribuindo a uma variavel, pra gente usar depois

const html = document.querySelector('html');
const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');

const titulo = document.querySelector('.app__title');

const botoes = document.querySelectorAll('.app__card-button');
const tempoNaTela = document.querySelector('#timer');
//seleciona o checkbox da musica
const musicaFocoInput = document.querySelector('#alternar-musica');  

//cria o objeto do audio

const musica = new Audio('/sons/luna-rise-part-one.mp3');
//como essa bomba tem 6 min, vou fazer um loop aqui do objeto Audio pra ficar tocando

musica.loop = true;

const btnStartPause = document.querySelector('#start-pause');
const btnStartPauseContent = document.querySelector('#start-pause span');
const btnStartPauseImg = document.querySelector('.app__card-primary-butto-icon');

let tempoSegundos = 1500 //significa 25 minutos

let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    }else {
        musica.pause();
    }
        
});

//musica botoes

const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioFim = new Audio('/sons/beep.mp3');


//adicionando uma ação ao botão de foco


//ASSIM É MUITO DE BOBAO, DÁ PRA CRIAR UMA FUNCAO E DEFINIR AUTOMATICAMENTE OS VALORES

// btnFoco.addEventListener('click', () => {
//     //oq vai mudar, e definir a mudança
//     html.setAttribute('data-contexto', 'foco' )
//     banner.setAttribute('src', '/imagens/foco.png')
// });

// btnCurto.addEventListener('click', () => {
//     html.setAttribute('data-contexto', 'descanso-curto')
//     banner.setAttribute('src','/imagens/descanso-curto.png');
// })

// btnLongo.addEventListener('click', () => {
//     html.setAttribute('data-contexto', 'descanso-longo');
//     banner.setAttribute('src','/imagens/descanso-longo.png');
// });


function alterarConexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        
        case 'foco':
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `

            break;

        case 'descanso-curto':
            titulo.innerHTML = `
                Que tal dar uma respirada?<br> 
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case `descanso-longo`:
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;

        default:
            break;
    }

};

btnFoco.addEventListener('click', () => {
    tempoSegundos = 1500
    alterarConexto('foco');
    btnFoco.classList.add('active');

});

btnCurto.addEventListener('click', () => {
    tempoSegundos = 300
    alterarConexto('descanso-curto');
    btnCurto.classList.add('active');
})

btnLongo.addEventListener('click', () => {
    tempoSegundos = 900
    alterarConexto('descanso-longo');
    btnLongo.classList.add('active');
});


const ContagemRegressiva = () => {
    if (tempoSegundos <= 0) {
        tocarSom(audioFim);
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoSegundos -= 1;
    mostrarTempo();
    
};

//evento click temporizador



btnStartPause.addEventListener('click', () => {
    iniciar();

    if(intervaloId) {
        tocarSom(audioPlay)
    }else {
        tocarSom(audioPause);
    };

});

function iniciar() {
    if(intervaloId) { //se tiver algum conteudo pausa
        

        zerar();
        return;

    }
    //o que vai ser contado, até quanto (1000ms = 1 segundo)
    //tem q interromper, se n fica pra semppre
    btnStartPauseContent.textContent = "Pausar";
    btnStartPauseImg.setAttribute('src',`/imagens/pause.png`);
    intervaloId = setInterval(ContagemRegressiva, 1000)
    //fazendo o pause
    
    
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null
    btnStartPauseContent.textContent = "Começar"
    btnStartPauseImg.setAttribute('src',`/imagens/play_arrow.png`);
}

function tocarSom(audio) {
    if(audio.paused) {
        audio.play();
    }else {
        audio.pause();
    }
};

function mostrarTempo() {
    //pq a gente tá trabalhando com mili segundos
    const tempo = new Date(tempoSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

//pra mostrar sempre o tempo na tela, uso a função acima
//ela basicamente vai substituir onde fica a tag de texto o texto referente à variável tempoSegundos, como tá fora vai sempre mostrar

mostrarTempo();