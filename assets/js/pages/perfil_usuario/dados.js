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