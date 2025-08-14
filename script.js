document.addEventListener('DOMContentLoaded', () => {
    const paginas = document.querySelectorAll('.pagina');
    let paginaAtual = 1;

    const perguntas = [
        {
            p: "Você considera perigoso confiar apenas no 'olhômetro' ou experiência para dimensionar cabos e disjuntores?",
            r: [
                "Sim, já vi erros graves por falta de cálculo correto.",
                "Concordo, dimensionar com precisão evita riscos desnecessários.",
                "Já usei métodos empíricos, mas sei que o ideal é algo técnico e confiável.",
                "Sim, preciso de uma solução que me dê confiança e segurança nos projetos."
            ]
        },
        {
            p: "O quanto seria útil ter em mãos uma ferramenta que te mostra todos os dados do dimensionamento em menos de 1 segundo?",
            r: [
                "Muito útil, porque tempo é essencial no meu dia a dia.",
                "Ferramentas assim ajudam a garantir qualidade e agilidade.",
                "Seria ótimo, porque eliminaria dúvidas comuns no serviço.",
                "Seria um diferencial que agregaria valor imediato ao meu trabalho."
            ]
        },
        {
            p: "Você acredita que dominar a NBR 5410 é essencial para prestar serviços de qualidade e evitar responsabilidade civil?",
            r: [
                "Com certeza, isso é um pilar da nossa profissão.",
                "Saber aplicar a norma aumenta minha credibilidade.",
                "Sim, é uma maneira de garantir segurança ao cliente e a mim.",
                "É essencial para trabalhar com segurança e confiança."
            ]
        },
        {
            p: "Ter um aplicativo que calcula tudo automaticamente te daria mais segurança no momento da execução?",
            r: [
                "Sim, porque reduz a chance de erro humano.",
                "Sem dúvida, me traria mais confiança para seguir com o serviço.",
                "Sim, principalmente em instalações mais complexas.",
                "Seria uma garantia técnica que valorizaria meu trabalho."
            ]
        },
        {
            p: "Você considera importante se atualizar para se destacar em um mercado competitivo como o da elétrica?",
            r: [
                "Com certeza, quem não se atualiza fica pra trás.",
                "Atualização é o que separa o profissional comum do excelente.",
                "Sim, estar atualizado é mostrar compromisso com a profissão.",
                "O mercado exige isso, e quero estar um passo à frente."
            ]
        },
        {
            p: "Já sentiu que perdeu tempo tentando calcular ou revisar projetos de forma manual e insegura?",
            r: [
                "Sim, e foi frustrante não ter uma base confiável.",
                "Já aconteceu, e percebi como um bom sistema faria diferença.",
                "Sim, seria ótimo resolver isso com rapidez e exatidão.",
                "Sim, preciso de uma solução que agilize e padronize meus cálculos."
            ]
        },
        {
            p: "Quanto valor você dá à segurança da instalação que você entrega ao cliente?",
            r: [
                "Total valor, porque é minha reputação que está em jogo.",
                "Segurança é o mínimo que se espera de um bom profissional.",
                "É fundamental, tanto para o cliente quanto para minha tranquilidade.",
                "Dou muito valor, e quero melhorar sempre nesse aspecto."
            ]
        },
        {
            p: "Você concorda que eletricistas que usam ferramentas modernas passam mais credibilidade e fecham mais serviços?",
            r: [
                "Concordo, o cliente percebe o diferencial.",
                "Sim, a apresentação profissional impacta diretamente na decisão do cliente.",
                "Ferramentas modernas mostram comprometimento e preparo.",
                "Sim, isso transmite confiança e seriedade."
            ]
        },
        {
            p: "Você acredita que aprender a calcular manualmente também reforça seu domínio técnico, mesmo com o uso de app?",
            r: [
                "Com certeza, isso me dá mais controle sobre o que estou fazendo.",
                "Sim, entender a base me permite usar a tecnologia com consciência.",
                "Sim, quero dominar os dois métodos: manual e automático.",
                "Sem dúvida, isso mostra que sou um profissional completo."
            ]
        },
        {
            p: "O quanto você valoriza investir em algo que melhora imediatamente a qualidade do seu serviço e reduz riscos de erro?",
            r: [
                "Muito, porque isso reflete diretamente na minha renda e reputação.",
                "Valorizo muito, é um investimento e não um gasto.",
                "É exatamente o tipo de solução que eu procuro.",
                "Quanto mais seguro e preciso meu trabalho, melhores são meus resultados."
            ]
        }
    ];

    const perguntasUsadas = new Set();
    const perguntasPorPagina = {};
    const respostasSelecionadas = {};

    function sortearPerguntaParaPagina(numPagina) {
        if (!perguntasPorPagina[numPagina]) {
            let indicePergunta;
            do {
                indicePergunta = Math.floor(Math.random() * perguntas.length);
            } while (perguntasUsadas.has(indicePergunta));
            
            perguntasUsadas.add(indicePergunta);
            perguntasPorPagina[numPagina] = perguntas[indicePergunta];
        }
        return perguntasPorPagina[numPagina];
    }

    function atualizarPaginaDePergunta(numPagina) {
        const pergunta = sortearPerguntaParaPagina(numPagina);
        const retanguloTx = document.getElementById(`retangulo-tx-${numPagina}`);
        
        if (retanguloTx) {
            retanguloTx.textContent = pergunta.p;
        }

        for (let i = 1; i <= 4; i++) {
            const botao = document.getElementById(`botao-resp-${numPagina}-${i}`);
            if (botao) {
                botao.textContent = pergunta.r[i - 1];
            }
        }
    }

    function irParaPagina(numPagina) {
        paginas.forEach(pagina => pagina.classList.remove('active'));
        const novaPagina = document.getElementById(`pagina-${numPagina}`);
        novaPagina.classList.add('active');
        paginaAtual = numPagina;
    }

    function avancarPagina() {
        if (paginaAtual < 6) {
            paginaAtual++;
            irParaPagina(paginaAtual);
            if (paginaAtual >= 2 && paginaAtual <= 5) {
                atualizarPaginaDePergunta(paginaAtual);
            }
        }
    }

    function voltarPagina() {
        if (paginaAtual > 1) {
            paginaAtual--;
            irParaPagina(paginaAtual);
        }
    }

    function abrirLinkCheckout() {
        window.open('https://pay.kiwify.com.br/sNBI3IF', '_blank');
    }

    function marcarBotaoSelecionado(botao) {
        const pagina = document.getElementById(`pagina-${paginaAtual}`);
        const botoesResp = pagina.querySelectorAll('.retangulo-resp');
        botoesResp.forEach(btn => {
            btn.style.backgroundColor = 'lime';
            btn.classList.remove('selecionado');
        });
        
        if (botao) {
            botao.style.backgroundColor = 'darkgreen';
            botao.classList.add('selecionado');
            setTimeout(avancarPagina, 500);
        }
    }

    document.getElementById('botao-avancar').addEventListener('click', () => {
        avancarPagina();
    });

    document.getElementById('botao-obter-oferta').addEventListener('click', () => {
        abrirLinkCheckout();
    });

    document.querySelectorAll('[id^="botao-voltar-"]').forEach(botao => {
        botao.addEventListener('click', () => {
            voltarPagina();
        });
    });

    document.querySelectorAll('[id^="botao-comprar-"]').forEach(botao => {
        botao.addEventListener('click', () => {
            abrirLinkCheckout();
        });
    });

    for (let p = 2; p <= 5; p++) {
        for (let r = 1; r <= 4; r++) {
            const botaoId = `botao-resp-${p}-${r}`;
            const botao = document.getElementById(botaoId);
            if (botao) {
                botao.addEventListener('click', (event) => {
                    marcarBotaoSelecionado(event.target);
                });
            }
        }
    }

    irParaPagina(1);
});