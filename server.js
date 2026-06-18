const express = require('express');
const multer = require('multer');
const PDFMerger = require('pdf-merger-js').default;
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3987;

fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });
fs.mkdirSync(path.join(__dirname, 'merged'), { recursive: true });

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.post('/merge', upload.array('pdfs'), async (req, res) => {
    try {

        console.log('merge request files:', req.files && req.files.map(f => ({ originalname: f.originalname, path: f.path })));

        const merger = new PDFMerger();

        const arquivos = (req.files || []).sort((a, b) =>
            a.originalname.localeCompare(
                b.originalname,
                undefined,
                {
                    numeric: true,
                    sensitivity: 'base'
                }
            )
        );

        for (const arquivo of arquivos) {
            await merger.add(arquivo.path);
        }

        const nomeFinal =
            `LOTE_${Date.now()}.pdf`;

        const caminhoFinal =
            path.join(
                __dirname,
                'merged',
                nomeFinal
            );

        await merger.save(caminhoFinal);

        console.log('merged file saved:', caminhoFinal);

        arquivos.forEach(arquivo => {
            console.log('deleting temp upload:', arquivo.path);
            fs.unlinkSync(arquivo.path);
        });

        res.json({
            success: true,
            arquivo: nomeFinal
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Erro ao gerar PDF'
        });
    }
});

app.get('/download/:arquivo', (req, res) => {

    const arquivo =
        path.join(
            __dirname,
            'merged',
            req.params.arquivo
        );

    res.download(arquivo);
});

app.listen(PORT, () => {
    console.log(
        `Servidor rodando em http://localhost:${PORT}`
    );
});