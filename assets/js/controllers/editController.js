import { tipos } from '../data/tipos.js';

export function configurarEdicao(editOverlay, editTitle, editForm, editCampos) {
  let cardEditando = null;

  document.addEventListener('click', e => {
    const lapis = e.target.closest('.fa-pencil');
    if (!lapis) return;

    const card = lapis.closest('.card__enderecos, .card__cartoes, .card__telefones');
    if (!card) return;

    cardEditando = card;

    let tipoAtual = '';
    if (card.classList.contains('card__enderecos')) tipoAtual = 'endereco';
    else if (card.classList.contains('card__cartoes')) tipoAtual = 'cartao';
    else if (card.classList.contains('card__telefones')) tipoAtual = 'telefone';

    const config = tipos[tipoAtual];
    if (!config) return;

    const dados = extrairDadosDoCard(card, tipoAtual);
    const camposEdicao = Object.keys(dados);

    editTitle.textContent = `Editar ${tipoAtual}`;
    editCampos.innerHTML = camposEdicao.map(campo => `
      <div class="mt-3">
        <label>${campo}:</label>
        <input type="text" name="${campo}" class="form-control mt-1" required value="${dados[campo]}">
      </div>
    `).join('');

    editForm.dataset.tipoAtual = tipoAtual;
    editOverlay.classList.remove('d-none');
  });

  editForm.addEventListener('submit', e => {
    e.preventDefault();

    const tipoAtual = editForm.dataset.tipoAtual;
    const config = tipos[tipoAtual];
    if (!config || !cardEditando) return;

    const inputs = editForm.querySelectorAll('input');
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

    cardEditando.innerHTML = config.formatar(dados);
    cardEditando = null;

    editForm.reset();
    editOverlay.classList.add('d-none');
  });
}

function extrairDadosDoCard(card, tipo) {
  const dados = {};
  const p = card.querySelectorAll('p');

  if (tipo === 'endereco') {
    const [linha1, linha2] = [p[0]?.textContent.trim(), p[1]?.textContent.trim()];
    const [rua, numero, bairro] = linha1.split(',').map(s => s.trim());
    const [cidade, estado, cep] = linha2.split(',').map(s => s.trim());

    dados['Rua'] = rua?.replace('Rua ', '') || '';
    dados['Número'] = numero?.replace('N° ', '') || '';
    dados['Bairro'] = bairro || '';
    dados['Cidade'] = cidade || '';
    dados['Estado'] = estado || '';
    dados['CEP'] = cep || '';
  }

  if (tipo === 'cartao') {
    const linha = p[0]?.textContent.trim();
    const ultimos = linha?.match(/\*+(\d{4})$/)?.[1] || '';
    dados['Número do Cartão'] = `************${ultimos}`;
    dados['Nome no Cartão'] = card.querySelector('h5')?.textContent.trim() || '';
  }

  if (tipo === 'telefone') {
    dados['Número de Telefone'] = p[0]?.textContent.trim() || '';
  }

  return dados;
}