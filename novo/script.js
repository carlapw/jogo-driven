document.addEventListener('DOMContentLoaded', () => {
    const conteiner = document.querySelector('.sessao1');
    let numCartas;

    do {
        numCartas = parseInt(prompt("Quantas cartas você quer? Escolha um número par entre 4 e 14."));
    } while (isNaN(numCartas) || numCartas < 4 || numCartas > 14 || numCartas % 2 !== 0);

    const imagens = [];
    const totalCartas = numCartas / 2;

    for (let i = 1; i <= totalCartas; i++) {
        imagens.push(i, i); // Adiciona pares de cartas
    }

    function embaralhar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const troca = Math.floor(Math.random() * (i + 1));
            [array[i], array[troca]] = [array[troca], array[i]];
        }
    }

    embaralhar(imagens);
    console.log(imagens); 

    imagens.forEach((imagem) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.imagem = imagem;

        const front = document.createElement('img');
        front.src = `imagens/img${imagem}.gif`; 
        front.alt = `Imagem ${imagem}`;
        front.classList.add('front');

        const back = document.createElement('img');
        back.src = 'back.png';
        back.alt = 'Verso da carta';
        back.classList.add('back');

        carta.appendChild(front);
        carta.appendChild(back);
        conteiner.appendChild(carta);
    });

    let cartaVirada = [];
    let bloqueioCarta = false;
    let jogadas = 0; 
    let paresEncontrados = 0; 

    function checkForMatch() {
        const [carta1, carta2] = cartaVirada;

        if (carta1.dataset.imagem === carta2.dataset.imagem) {
            paresEncontrados++;
            carta1.classList.add('matched');
            carta2.classList.add('matched');
            cartaVirada = [];
        } else {
            bloqueioCarta = true;
            setTimeout(() => {
                carta1.classList.remove('clicked');
                carta2.classList.remove('clicked');
                cartaVirada = [];
                bloqueioCarta = false;
            }, 1000);
        }

        if (paresEncontrados === totalCartas) {
            setTimeout(() => {
                alert(`Jogo finalizado em ${jogadas/2} jogadas.`);
            }, 500);
        }
    }

    const cartas = document.querySelectorAll('.carta');
    cartas.forEach((carta) => {
        carta.addEventListener('click', () => {
            if (bloqueioCarta || carta.classList.contains('clicked') || carta.classList.contains('matched')) return;

            jogadas++;
            carta.classList.add('clicked');
            cartaVirada.push(carta);

            if (cartaVirada.length === 2) {
                checkForMatch();
            }
        });
    });
});
