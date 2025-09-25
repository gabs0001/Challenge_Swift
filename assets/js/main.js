import { pageController } from './controllers/pageController.js';

document.addEventListener('DOMContentLoaded', () => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexSenha = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  const btnsAlterar = document.querySelectorAll('.btn__salvar_alteracoes');

  if(btnsAlterar.length >= 2) {
    pageController.configurarEdicaoCampo('email_cadastrado', btnsAlterar[0], regexEmail, 'emailSwift');
    pageController.configurarEdicaoCampo('senha_atual', btnsAlterar[1], regexSenha, 'senhaSwift');
  }

  pageController.configurarLogin();
  pageController.configurarVisitante();
});