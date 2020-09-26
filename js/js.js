// Variaveis Global //
let largura;
let autura;
let computador = 'X';
let jogador = 'O';
let jogador_atual = jogador;

let matrix = [
	['', '', ''],
	['', '', ''],
	['', '', '']
];

let ponticao = {
	X: 10,
	O: -10,
	empate: 0
};

function setup() {
	createCanvas(400, 400);
	largura = width / 3;
	autura = height / 3;
	tabela();
}

function tabela() {
	let melhor_ponto = -Infinity;
	let mover;

	for (let cont_1 = 0; cont_1 < 3; cont_1++) {
		for (let cont_2 = 0; cont_2 < 3; cont_2++) {
			if (matrix[cont_1][cont_2] == '') {
				matrix[cont_1][cont_2] = computador;
				
				let pontuacao = minimax(matrix, 0, false);
				matrix[cont_1][cont_2] = '';

				if (pontuacao > melhor_ponto) {
					melhor_ponto = pontuacao;
					mover = {cont_1, cont_2};
				}
			}
		}
	}

	matrix[mover.cont_1][mover.cont_2] = computador;
	jogador_atual = jogador;
}

function verifica() {
	let ganhador = null;
	let aux = 0;
	let a = 0;
	let b = 0;
	let c = 0;

	for (let cont_1 = 0; cont_1 < 3; cont_1++) {
		a = matrix[cont_1][0];
		b = matrix[cont_1][1];
		c = matrix[cont_1][2];

		if (a == b && b == c && a != '') {
			ganhador = matrix[cont_1][0];
		}
	}

	for (let cont_2 = 0; cont_2 < 3; cont_2++) {
		a = matrix[0][cont_2];
		b = matrix[1][cont_2];
		c = matrix[2][cont_2];

		if (a == b && b == c && a != '') {
			ganhador = matrix[0][cont_2];
		}
	}

	a = matrix[0][0];
	b = matrix[1][1];
	c = matrix[2][2];
	
	if (a == b && b == c && a != '') {
		ganhador = matrix[0][0];
	}

	a = matrix[2][0];
	b = matrix[1][1];
	c = matrix[0][2];

	if (a == b && b == c && a != '') {
		ganhador = matrix[2][0];
	}

	for (let cont_1 = 0; cont_1 < 3; cont_1++) {
		for (let cont_2 = 0; cont_2 < 3; cont_2++) {
			if (matrix[cont_1][cont_2] == '') {
				aux++;
			}
		}
	}

	if (ganhador == null && aux == 0) {
		return 'empate';
	} else {
		return ganhador;
	}
}

function minimax(matrix, profundidade, maximizador) {
	let resultado = verifica();

	if (resultado !== null) {
		return ponticao[resultado];
	}

	if (maximizador) {
		let melhor_ponto = -Infinity;
		for (let cont_1 = 0; cont_1 < 3; cont_1++) {
			for (let cont_2 = 0; cont_2 < 3; cont_2++) {
				if (matrix[cont_1][cont_2] == '') {
					matrix[cont_1][cont_2] = computador;
					let score = minimax(matrix, profundidade + 1, false);
					matrix[cont_1][cont_2] = '';
					melhor_ponto = max(score, melhor_ponto);
				}
			}
		}
		return melhor_ponto;
	} else {
		let melhor_ponto = Infinity;
		for (let cont_1 = 0; cont_1 < 3; cont_1++) {
			for (let cont_2 = 0; cont_2 < 3; cont_2++) {
				if (matrix[cont_1][cont_2] == '') {
					matrix[cont_1][cont_2] = jogador;
					let score = minimax(matrix, profundidade + 1, true);
					matrix[cont_1][cont_2] = '';
					melhor_ponto = min(score, melhor_ponto);
				}
			}
		}
		return melhor_ponto;
	}
}

function mousePressed() {
	if (jogador_atual == jogador) {
		let cont_1 = floor(mouseX / largura);
		let cont_2 = floor(mouseY / autura);

		if (matrix[cont_1][cont_2] == '') {
			matrix[cont_1][cont_2] = jogador;
			jogador_atual = computador;
			tabela();
		}
	}
}

function draw() {
	let resultado = verifica();

	background(255);
	strokeWeight(4);

	line(largura, 0, largura, height);
	line(largura * 2, 0, largura * 2, height);
	line(0, autura, width, autura);
	line(0, autura * 2, width, autura * 2);

	for (let cont_2 = 0; cont_2 < 3; cont_2++) {
		for (let cont_1 = 0; cont_1 < 3; cont_1++) {
			let x = largura * cont_1 + largura / 2;
			let y = autura * cont_2 + autura / 2;
			let spot = matrix[cont_1][cont_2];
			textSize(32);
			let r = largura / 4;

			if (spot == jogador) {
				noFill();
				ellipse(x, y, r * 2);
			} else if (spot == computador) {
				line(x - r, y - r, x + r, y + r);
				line(x + r, y - r, x - r, y + r);
			}
		}
	}

	if (resultado != null) {
		noLoop();
		let resultadoP = createP('');
		resultadoP.style('font-size', '32pt');
		
		if (resultado == 'empate') {
			document.getElementById("resposta").innerHTML = "<h1><b>EMPATE!</b></h1>";
		} else {
			if (resultado == 'X') {
				document.getElementById("resposta").innerHTML = "<h1><b>VOCÊ PERDEU!</b></h1>";
			} else {
				document.getElementById("resposta").innerHTML = "<h1><b>VOCÊ GANHOU!</b></h1>";
			}
		}
	}
}