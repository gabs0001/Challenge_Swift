import { formController } from "../controllers/formController.js";
import { mensagens } from "../data/mensagens.js";

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexSenha = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
const getElement = id => document.getElementById(id);

function validarCampos(campos) {
  return campos.every(({ el, condicao, msg }) =>
    el ? formController.validarCampo(el, condicao, msg) : false
  );
}

function configurarEdicaoCampo(inputId, btn, regex, storageKey) {
  const input = getElement(inputId);
  if (!input || !btn) return;

  input.readOnly = true;

  btn.addEventListener('click', e => {
    e.preventDefault();
    
    const valorOriginal = input.value;
    formController.ativarEdicao(input, regex, storageKey, valorOriginal);
  });

  const valorSalvo = localStorage.getItem(storageKey);
  if (valorSalvo) input.value = valorSalvo;
}

function configurarLogin() {
  const btnLogin = getElement('btn-login');
  const emailUsuario = getElement('email_usuario');
  const senhaUsuario = getElement('senha_usuario');

  if (!btnLogin || !emailUsuario || !senhaUsuario) return;

  btnLogin.addEventListener('click', e => {
    e.preventDefault();

    const email = emailUsuario.value.trim();
    const senha = senhaUsuario.value.trim();

    const camposValidos = validarCampos([
      { el: emailUsuario, condicao: regexEmail.test(email), msg: mensagens.email },
      { el: senhaUsuario, condicao: regexSenha.test(senha), msg: mensagens.senha }
    ]);

    if (camposValidos) {
      localStorage.setItem('emailSwift', email);
      localStorage.setItem('senhaSwift', senha);
      window.location.href = '/assets/pages/perfil_usuario/acesso.html';
    }
  });

  formController.limparErroAoDigitar('[data-login]');
}

function configurarVisitante() {
  const btnEntrar = getElement('btn__entrar');
  const nomeVisitante = getElement('nome_visitante');
  const emailVisitante = getElement('email_visitante');

  if (!btnEntrar || !nomeVisitante || !emailVisitante) return;

  btnEntrar.addEventListener('click', e => {
    e.preventDefault();

    const valorNome = nomeVisitante.value.trim();
    const valorEmail = emailVisitante.value.trim();

    const camposValidos = validarCampos([
      { el: nomeVisitante, condicao: valorNome !== '', msg: mensagens.nome },
      { el: emailVisitante, condicao: regexEmail.test(valorEmail), msg: mensagens.email }
    ]);

    if (camposValidos) {
      localStorage.setItem('emailSwift', valorEmail);
      localStorage.setItem('senhaSwift', 'visitante');
      window.location.href = '/assets/pages/perfil_usuario/acesso.html';
    }
  });

  formController.limparErroAoDigitar('[data-login]');
}

export const pageController = {
    configurarEdicaoCampo,
    configurarLogin,
    configurarVisitante
};