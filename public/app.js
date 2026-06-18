const input =
    document.getElementById('pdfs');

const lista =
    document.getElementById('listaArquivos');

const btn =
    document.getElementById('btnGerar');

const resultado =
    document.getElementById('resultado');

input.addEventListener(
    'change',
    () => {

        lista.innerHTML = '';

        [...input.files]
            .sort((a, b) =>
                a.name.localeCompare(
                    b.name,
                    undefined,
                    {
                        numeric: true
                    }
                )
            )
            .forEach(file => {

                const li =
                    document.createElement('li');

                li.textContent =
                    file.name;

                lista.appendChild(li);
            });
    }
);

btn.addEventListener(
    'click',
    async () => {

        if (!input.files.length) {

            alert(
                'Selecione PDFs'
            );

            return;
        }

        resultado.innerHTML =
            'Processando...';

        const formData =
            new FormData();

        [...input.files].forEach(
            arquivo => {
                formData.append(
                    'pdfs',
                    arquivo
                );
            }
        );

        const response =
            await fetch(
                '/merge',
                {
                    method: 'POST',
                    body: formData
                }
            );

        const data =
            await response.json();

        if (!data.success) {

            resultado.innerHTML =
                'Erro ao gerar PDF';

            return;
        }

        resultado.innerHTML = `
            <a href="/download/${data.arquivo}">
                Baixar PDF Consolidado
            </a>
        `;
    }
);