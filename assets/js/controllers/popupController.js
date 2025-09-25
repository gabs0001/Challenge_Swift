import { tipos } from '../data/tipos.js';

export function configurarPopup(btnAdicionar, overlay, popupTitle, popupCampos, popupForm) {
  let tipoAtual = null;

  btnAdicionar.forEach(btn => {
    btn.addEventListener('click', () => {
      tipoAtual = btn.dataset.tipo;
      const tipo = btn.textContent.trim();
      const config = tipos[tipoAtual];

      if (!config) return console.warn('Tipo não reconhecido:', tipoAtual);

      popupTitle.textContent = tipo;
      popupCampos.innerHTML = '';

      config.campos.forEach(campo => {
        popupCampos.innerHTML += `
          <div class="mt-3">
            <label>${campo}:</label>
            <input type="text" name="${campo}" class="form-control mt-1" required>
          </div>
        `;
      });

      overlay.classList.remove('d-none');
    });
  });

  popupForm.addEventListener('submit', e => {
    e.preventDefault();

    const config = tipos[tipoAtual];
    if (!config) return;

    const inputs = popupForm.querySelectorAll('input');
    const dados = {};
    let valido = true;

    inputs.forEach(input => {
      const valor = input.value.trim();
      if (!valor) {
        input.classList.add('is-invalid');
        valido = false;
      } else {
        input.classList.remove('is-invalid');
        dados[input.name] = valor;
      }
    });

    if (!valido) return;

    const novoCard = document.createElement('div');
    novoCard.className = `d-flex flex-column align-items-center mx-5 my-4 p-3 ${config.classeCard}`;
    novoCard.innerHTML = config.formatar(dados);

    const container = document.querySelector(config.container);
    const referencia = container.querySelector('.btn__adicionar');

    if (container) container.insertBefore(novoCard, referencia);
    else console.warn('Container não encontrado para tipo:', tipoAtual);

    popupForm.reset();
    overlay.classList.add('d-none');
  });
}