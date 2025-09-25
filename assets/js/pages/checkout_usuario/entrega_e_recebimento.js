document.addEventListener('DOMContentLoaded', () => {
    const botaoAgendar = document.getElementById('btn_agendar_retirada');
    const selectLoja = document.getElementById('escolher_loja');
    const modal = document.getElementById('modalRetirada');
    const lojaSpan = document.getElementById('lojaSelecionada');
    const fecharIcone = document.getElementById('fecharIcone');
    const btnSalvar = document.getElementById('btnSalvarRetirada');

    botaoAgendar.addEventListener('click', (e) => {
        e.preventDefault();

        const lojaSelecionada = selectLoja.options[selectLoja.selectedIndex];

        if (!lojaSelecionada || lojaSelecionada.value === '0') {
            alert('Por favor, selecione uma loja antes de agendar a retirada.');
            return;
        }

        lojaSpan.textContent = lojaSelecionada.text;
        modal.classList.remove('d-none');
        modal.classList.add('d-flex');
    });

    fecharIcone.addEventListener('click', () => {
        modal.classList.remove('d-flex');
        modal.classList.add('d-none');
    });

    btnSalvar.addEventListener('click', () => {
        const data = document.getElementById('data_retirada').value;
        const horario = document.getElementById('horario_retirada').value;

        if (!data || !horario) {
            alert('Por favor, selecione uma data e um horário para continuar.');
            return;
        }

        alert(`Retirada agendada para ${data} às ${horario}`);

        modal.classList.remove('d-flex');
        modal.classList.add('d-none');
    });

    document.querySelectorAll('.btn-alterar').forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();

            const input = botao.previousElementSibling;
            if(!input || input.tagName !== 'INPUT') return;

            const valorOriginal = input.value;
            input.readOnly = false;
            input.focus();

            input.addEventListener('blur', () => {
                if (input.value.trim() === '') input.value = valorOriginal;
                input.readOnly = true;
            }, 
            { once: true });
        });
    });

    document.getElementById('opcao_entrega').addEventListener('change', (e) => {
        const valorEntrega = document.getElementById('valor_entrega');
        const valorSelecionado = e.target.value;

        if (valorSelecionado === '1' || valorSelecionado === '2') {
            valorEntrega.value = 'R$ ' + (14.90).toFixed(2).replace('.', ',');
        } else if (valorSelecionado === '3' || valorSelecionado === '4') {
            valorEntrega.value = 'R$ ' + (16.90).toFixed(2).replace('.', ',');
        } else {
            valorEntrega.value = '';
        }
    });
});