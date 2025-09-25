import { configurarPopup } from '../../controllers/popupController.js';
import { configurarEdicao } from '../../controllers/editController.js';
import { configurarFavorito } from '../../controllers/favoriteController.js';
import { configurarExclusao } from '../../controllers/deleteController.js';

document.addEventListener('DOMContentLoaded', () => {
  configurarPopup(
    document.querySelectorAll('.btn__adicionar'),
    document.getElementById('popupOverlay'),
    document.getElementById('popupTitle'),
    document.querySelector('.popup__campos'),
    document.getElementById('popupForm')
  );

  configurarEdicao(
    document.getElementById('popupEditOverlay'),
    document.getElementById('popupEditTitle'),
    document.getElementById('popupEditForm'),
    document.getElementById('popupEditOverlay').querySelector('.popup__campos')
  );

  configurarFavorito();
  configurarExclusao();

  document.querySelector('.popup__close')?.addEventListener('click', () => {
    document.getElementById('popupOverlay').classList.add('d-none');
    document.getElementById('popupForm').reset();
  });

  document.getElementById('popupEditOverlay')?.querySelector('.popup__close')?.addEventListener('click', () => {
    document.getElementById('popupEditOverlay').classList.add('d-none');
    document.getElementById('popupEditForm').reset();
  });

});


/* 
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('popupOverlay');
  const popupTitle = document.getElementById('popupTitle');
  const popupForm = document.getElementById('popupForm');
  const popupCampos = document.querySelector('.popup__campos');
  const btnAdicionar = document.querySelectorAll('.btn__adicionar');
  const closeBtn = document.querySelector('.popup__close');

  const editOverlay = document.getElementById('popupEditOverlay');
  const editTitle = document.getElementById('popupEditTitle');
  const editForm = document.getElementById('popupEditForm');
  const editCampos = editOverlay.querySelector('.popup__campos');
  const closeEditBtn = editOverlay.querySelector('.popup__close');

  let tipoAtual = null;
  
  btnAdicionar.forEach(btn => {
    btn.addEventListener('click', () => {
        tipoAtual = btn.dataset.tipo;
        const tipo = btn.textContent.trim();
        const config = tipos[tipoAtual];

        if(!config) {
            console.warn('Tipo não reconhecido: ', tipoAtual);
            return;
        }

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

  closeBtn.addEventListener('click', () => {
    overlay.classList.add('d-none');
    popupForm.reset();
  });

  popupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const tipo = popupTitle.textContent.trim();
    const config = tipos[tipoAtual];
    
    if(!config) {
      console.warn('Tipo não reconhecido: ', tipoAtual);
      return;
    }
    
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
    const botaoReferencia = container.querySelector('.btn__adicionar');

    if(container) container.insertBefore(novoCard, botaoReferencia);
    else console.warn('Container não encontrado para tipo: ', tipo);

    popupForm.reset();
    overlay.classList.add('d-none');
  });

  // editar
  let cardEditando = null;
  document.addEventListener('click', (e) => {
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
    if(!config) return;

    const paragrafos = card.querySelectorAll('p');
    const dados = {};

    if (tipoAtual === 'endereco') {
      const linha1 = paragrafos[0]?.textContent.trim(); 
      const linha2 = paragrafos[1]?.textContent.trim();

      const [ruaNumBairro, cidadeEstadoCep] = [linha1, linha2];
      const [rua, numero, bairro] = ruaNumBairro.split(',').map(s => s.trim());
      const [cidade, estado, cep] = cidadeEstadoCep.split(',').map(s => s.trim());

      dados['Rua'] = rua?.replace('Rua ', '') || '';
      dados['Número'] = numero?.replace('N° ', '') || '';
      dados['Bairro'] = bairro || '';
      dados['Cidade'] = cidade || '';
      dados['Estado'] = estado || '';
      dados['CEP'] = cep || '';
    }

    if (tipoAtual === 'cartao') {
      const linha = paragrafos[0]?.textContent.trim(); 
      const ultimosDigitos = linha?.match(/\*+(\d{4})$/)?.[1] || '';
      dados['Número do Cartão'] = `************${ultimosDigitos}`;
      dados['Nome no Cartão'] = card.querySelector('h5')?.textContent.trim() || '';
    }

    if (tipoAtual === 'telefone') {
      const linha = paragrafos[0]?.textContent.trim();
      dados['Número de Telefone'] = linha || '';
    }

    let camposEdicao = [];
    if (tipoAtual === 'endereco') camposEdicao = ['Rua', 'Número', 'Bairro', 'Cidade', 'Estado', 'CEP'];
    if (tipoAtual === 'cartao') camposEdicao = ['Número do Cartão'];
    if (tipoAtual === 'telefone') camposEdicao = ['Número de Telefone'];

    editTitle.textContent = `Editar ${tipoAtual}`;
    editCampos.innerHTML = '';
    camposEdicao.forEach(campo => {
      editCampos.innerHTML += `
        <div class="mt-3">
          <label>${campo}:</label>
          <input type="text" name="${campo}" class="form-control mt-1" required value="${dados[campo] || ''}">
        </div>
      `;
    });

    editForm.dataset.editingCardRef = card;
    editForm.dataset.tipoAtual = tipoAtual;
    editOverlay.classList.remove('d-none');
  });

  editForm.addEventListener('submit', (e) => {
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

  closeEditBtn.addEventListener('click', () => {
    editOverlay.classList.add('d-none');
    editForm.reset();
    editForm.removeAttribute('data-editingCardRef');
  });

  // favoritar
  document.addEventListener('click', (e) => {
    const estrela = e.target.closest('.fa-star');
    if (!estrela) return;

    const card = estrela.closest('.card__enderecos, .card__cartoes, .card__telefones');
    if (!card) return;

    let grupoClasse = '';
    if (card.classList.contains('card__enderecos')) grupoClasse = 'card__enderecos';
    else if (card.classList.contains('card__cartoes')) grupoClasse = 'card__cartoes';
    else if (card.classList.contains('card__telefones')) grupoClasse = 'card__telefones';

    const grupo = document.querySelectorAll(`.${grupoClasse}`);
    const jaFavoritado = estrela.classList.contains('fa-solid');

    if(jaFavoritado) {
      estrela.classList.remove('fa-solid');
      estrela.classList.add('fa-regular');
    } else {
      grupo.forEach(outroCard => {
        const icone = outroCard.querySelector('.fa-star');
        if (icone) {
          icone.classList.remove('fa-solid');
          icone.classList.add('fa-regular');
        }
      });

      estrela.classList.remove('fa-regular');
      estrela.classList.add('fa-solid');
    }
  });

  // excluir
  document.addEventListener('click', (e) => {
    const lixeira = e.target.closest('.fa-trash');
    if (!lixeira) return;
    
    const card = lixeira.closest('.card__enderecos, .card__cartoes, .card__telefones');
    if(!card) return;
    card.remove();
  });

});
*/