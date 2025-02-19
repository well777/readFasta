<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dados GenBank do NCBI</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        background: #f4f4f4;
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <h2>Sequências Genéticas do NCBI</h2>
    <ul id="genbank-list">
      Carregando...
    </ul>

    <script>
      async function fetchNCBIGenBankData() {
        const geneID = "NM_001301717"; // Exemplo de ID de gene no GenBank
        try {
          const response = await fetch(
            `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=nucleotide&id=${geneID}&retmode=xml`
          );
          if (!response.ok) throw new Error("Erro ao buscar os dados do NCBI");

          const data = await response.text(); // A resposta da API é em XML
          displayData(data); // Exibe os dados na tela
        } catch (error) {
          document.getElementById(
            "genbank-list"
          ).innerHTML = `<li>Erro: ${error.message}</li>`;
        }
      }

      function displayData(data) {
        const list = document.getElementById("genbank-list");
        list.innerHTML = `<li>Dados obtidos: ${data.slice(0, 500)}...</li>`; // Exibe os primeiros 500 caracteres
      }

      fetchNCBIGenBankData();
    </script>
  </body>
</html>
