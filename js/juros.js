window.addEventListener('load', start);

function start() {
  inputInvestment = document.querySelector('#inputInvestment');
  render();
}

function render() {
  var divNames = document.querySelector('#investimentos');
  divNames.innerHTML = '';
  var lista = getInvestment(16500);

  var ul = document.createElement('ul');
  for (let i = 0; i < lista.length; i++) {
    var li = document.createElement('li');

    if (lista[i].rentabilidade) {
      li.textContent =
        lista[i].nome +
        ' renderá R$' +
        lista[i].rentabilidade +
        ' em ' +
        lista[i].tempo +
        ' meses';
      ul.appendChild(li);
    }
  }

  divNames.appendChild(ul);
}

function getInvestment(fullInvestment) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  function calculoJuros(investment, time, taxa, nome) {
    if (fullInvestment >= investment) {
      var tempo = monthDiff(new Date(yyyy, mm, dd), time);
      taxa = (1 + taxa) ** (1 / 12) - 1;
      var rentabilidade = fullInvestment + fullInvestment * taxa * tempo;
      rentabilidade = (Math.round(rentabilidade * 100) / 100).toFixed(2);
    }
    return { tempo, rentabilidade, nome };
  }

  //TESOURO PRÉ FIXADO
  var tesouroPre2023 = calculoJuros(
    34.72,
    new Date(2023, 0, 01),
    5.54 / 100,
    'Tesouro Pre-fixado 2023'
  );
  var tesouroPre2026 = calculoJuros(
    33.34,
    new Date(2026, 0, 01),
    7.4 / 100,
    'Tesouro Pre-fixado 2026'
  );
  var tesouroPre2031 = calculoJuros(
    34.86,
    new Date(2031, 0, 01),
    8.06 / 100,
    'Tesouro Pre-fixado 2031'
  );

  //TESOURO SELIC
  //precisa ser atualizado sempre o valor do SELIC
  var selic = 1.06;
  var tesouroSelic = calculoJuros(
    105.68,
    new Date(2025, 02, 01),
    (0.03 + selic) / 100,
    'Tesouro Selic'
  );

  //TESOURO IPCA
  var ipca = 0.46;
  var tesouroIPCA2026 = calculoJuros(
    52.55,
    new Date(2026, 07, 15),
    (ipca + 3.72) / 100,
    'Tesouro IPCA 2026'
  );
  var tesouroIPCA2035 = calculoJuros(
    33.29,
    new Date(2035, 04, 15),
    (ipca + 4.68) / 100,
    'Tesouro IPCA 2035'
  );
  var tesouroIPCA2045 = calculoJuros(
    31.64,
    new Date(2045, 04, 15),
    (ipca + 4.68) / 100,
    'Tesouro IPCA 2045'
  );
  var tesouroIPCA2030 = calculoJuros(
    38.72,
    new Date(2030, 07, 15),
    (ipca + 4.06) / 100,
    'Tesouro IPCA 2030'
  );
  var tesouroIPCA2040 = calculoJuros(
    39.72,
    new Date(2040, 07, 15),
    (ipca + 4.54) / 100,
    'Tesouro IPCA 2040'
  );
  var tesouroIPCA2055 = calculoJuros(
    41.17,
    new Date(2055, 04, 15),
    (ipca + 4.71) / 100,
    'Tesouro IPCA 2055'
  );

  var lista = [
    tesouroPre2023,
    tesouroPre2026,
    tesouroPre2031,
    tesouroSelic,
    tesouroIPCA2026,
    tesouroIPCA2030,
    tesouroIPCA2035,
    tesouroIPCA2040,
    tesouroIPCA2045,
    tesouroIPCA2055
  ];

  return lista;
}

//module.exports = { getInvestment };
