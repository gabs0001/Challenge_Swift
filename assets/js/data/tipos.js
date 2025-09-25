export const tipos = {
    endereco: {
      campos: ['Rua', 'Número', 'Bairro', 'Cidade', 'Estado', 'CEP'],
      container: '.main__container_meus_enderecos',
      classeCard: 'card__enderecos',
      formatar: (dados) => `
        <h5>${dados.tipo || 'Novo Endereço'}</h5>
        <hr class="divider__dados_card_enderecos"/>
        <p class="mt-2 text-center">Rua ${dados.Rua}, N° ${dados.Número}, Bairro ${dados.Bairro}</p>
        <p>${dados.Cidade}, ${dados.Estado}, ${dados.CEP}</p>
        <div class="d-flex gap-3 justify-content-xxl-center">
          <i aria-label="Editar endereço" class="fa-solid fa-pencil icon__color"></i>
          <i aria-label="Excluir endereço" class="fa-solid fa-trash icon__color"></i>
          <i aria-label="Favoritar endereço" class="fa-regular fa-star icon__color"></i>
        </div>
      `
    },
    cartao: {
      campos: ['Nome no Cartão', 'Número do Cartão'],
      container: '.main__container_conteudo .d-xxl-flex',
      classeCard: 'card__cartoes',
      formatar: (dados) => `
        <h5>${dados['Nome no Cartão']}</h5>
        <hr class="divider__dados_card_contato"/>
        <p class="mt-2 text-center">Visa ************${dados['Número do Cartão'].slice(-4)}</p>
        <div class="d-flex gap-3 justify-content-xxl-center">
          <i aria-label="Editar cartão" class="fa-solid fa-pencil icon__color"></i>
          <i aria-label="Excluir cartão" class="fa-solid fa-trash icon__color"></i>
          <i aria-label="Favoritar cartão" class="fa-regular fa-star icon__color"></i>
        </div>
      `
    },
    telefone: {
      campos: ['Número de Telefone'],
      container: '.main__container_conteudo:nth-of-type(2) .d-xxl-flex',
      classeCard: 'card__telefones',
      formatar: (dados) => `
        <h5>Telefone</h5>
        <hr class="divider__dados_card_contato"/>
        <p class="mt-2">${dados['Número de Telefone']}</p>
        <div class="d-flex gap-3 justify-content-xxl-center">
          <i aria-label="Editar telefone" class="fa-solid fa-pencil icon__color"></i>
          <i aria-label="Excluir telefone" class="fa-solid fa-trash icon__color"></i>
          <i aria-label="Favoritar telefone" class="fa-regular fa-star icon__color"></i>
        </div>
      `
    }
};