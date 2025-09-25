export function configurarExclusao() {
  document.addEventListener('click', e => {
    const lixeira = e.target.closest('.fa-trash');
    if (!lixeira) return;

    const card = lixeira.closest('.card__enderecos, .card__cartoes, .card__telefones');
    if (!card) return;

    card.remove();
  });
}