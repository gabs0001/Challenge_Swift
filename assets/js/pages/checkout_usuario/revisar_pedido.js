document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const botaoLixeira = e.target.closest('.excluir__item img');
        if (!botaoLixeira) return;

        const card = botaoLixeira.closest('.row.justify-content-between');
        if(card) {
            const divider = card.nextElementSibling;
            if(divider?.querySelector('.divider__acesso')) divider.remove();
            card.remove();
        }
    });

    document.addEventListener('click', (e) => {
        const botaoMais = e.target.closest('span.ms-1');
        const botaoMenos = e.target.closest('span.me-1');

        if (!botaoMais && !botaoMenos) return;

        const container = e.target.closest('.d-flex.justify-content-center');
        const indicador = container.querySelector('.indicador_qtde');
        const menos = container.querySelector('span.me-1');

        const card = e.target.closest('.row.justify-content-between');
        const precoElement = card.querySelector('p.mb-1');

        if (!indicador || !menos || !precoElement) return;

        let quantidade = parseInt(indicador.textContent.trim());

        if (botaoMais) quantidade += 1;

        if(botaoMenos && quantidade > 1) quantidade -= 1;

        indicador.textContent = quantidade;

        const precoBase = parseFloat(precoElement.dataset.preco);
        const precoAtual = precoBase * quantidade;

        precoElement.textContent = `R$ ${precoAtual.toFixed(2).replace('.', ',')}`;

        if(quantidade === 1) menos.classList.add('disabled');
        else menos.classList.remove('disabled');
    });
});