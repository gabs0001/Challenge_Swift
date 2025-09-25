export function configurarFavorito() {
  document.addEventListener('click', e => {
    const estrela = e.target.closest('.fa-star');
    if (!estrela) return;

    const card = estrela.closest('.card__enderecos, .card__cartoes, .card__telefones');
    if (!card) return;

    const grupoClasse = [...card.classList].find(c => c.startsWith('card__'));
    const grupo = document.querySelectorAll(`.${grupoClasse}`);
    const jaFavoritado = estrela.classList.contains('fa-solid');

    grupo.forEach(c => {
      const icone = c.querySelector('.fa-star');
      if (icone) {
        icone.classList.remove('fa-solid');
        icone.classList.add('fa-regular');
      }
    });

    if (!jaFavoritado) {
      estrela.classList.remove('fa-regular');
      estrela.classList.add('fa-solid');
    }
  });
}