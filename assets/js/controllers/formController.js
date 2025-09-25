export const formController = {
    mostrarErro(campo, mensagem) {
        let aviso = campo.parentNode.querySelector('.erro-msg');
        
        if (!aviso) {
            aviso = document.createElement('small');
            aviso.className = 'erro-msg text-danger';
            campo.parentNode.appendChild(aviso);
        }

        aviso.textContent = mensagem;
    },

    limparErroAoDigitar(selector) {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('input', () => {
                el.classList.remove('is-invalid');
                const aviso = el.parentNode.querySelector('.erro-msg');
                if (aviso) aviso.remove();
            });
        });
    },

    validarCampo(campo, condicao, mensagem) {
        campo.classList.remove('is-invalid');
        const aviso = campo.parentNode.querySelector('.erro-msg');
        if (aviso) aviso.remove();

        if (!condicao) {
            campo.classList.add('is-invalid');
            this.mostrarErro(campo, mensagem);
            campo.focus();
            return false;
        }

        return true;
    },
    
    ativarEdicao(input, regex, chaveStorage, valorOriginal) {
        input.readOnly = false;
        input.focus();

        const validarEFechar = () => {
            const novoValor = input.value.trim();

            if (novoValor === '') {
                input.value = valorOriginal;
            } else if (!regex.test(novoValor)) {
                input.classList.add('is-invalid');
                input.value = valorOriginal;
            } else {
                input.classList.remove('is-invalid');
                localStorage.setItem(chaveStorage, novoValor);
            }

            input.readOnly = true;
            input.removeEventListener('blur', validarEFechar);
        };

        input.removeEventListener('blur', validarEFechar);
        input.addEventListener('blur', validarEFechar);
    }
}