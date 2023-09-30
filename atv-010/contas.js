// Classe ContaBancaria
class ContaBancaria {
    constructor(agencia, numero, tipo, saldo) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this.saldo = saldo;
    }

    // Métodos get e set para o saldo
    getSaldo() {
        return this.saldo;
    }

    setSaldo(novoSaldo) {
        this.saldo = novoSaldo;
    }

    // Método para sacar
    sacar(valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }

    // Método para depositar
    depositar(valor) {
        if (valor > 0) {
            this.saldo += valor;
            return true;
        }
        return false;
    }
}

// Classe ContaCorrente (Herda de ContaBancaria)
class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, cartaoCredito, saldo) {
        super(agencia, numero, "Conta Corrente", saldo);
        this.cartaoCredito = cartaoCredito;
    }

    // Métodos get e set para o cartaoCredito
    getCartaoCredito() {
        return this.cartaoCredito;
    }

    setCartaoCredito(novoCartaoCredito) {
        this.cartaoCredito = novoCartaoCredito;
    }
}

// Classe ContaPoupanca (Herda de ContaBancaria)
class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, "Conta Poupança", saldo);
    }
}

// Classe ContaUniversitaria (Herda de ContaBancaria)
class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, "Conta Universitária", saldo);
    }

    // Sobrescreve o método de saque para limitar o valor
    sacar(valor) {
        if (valor <= 500 && valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }
}

// Função para inserir uma nova conta na lista
function inserirConta() {
    const agencia = document.getElementById("agencia").value;
    const numero = document.getElementById("numero").value;
    const tipo = document.getElementById("tipo").value;
    const saldo = parseFloat(document.getElementById("saldo").value);

    let novaConta;

    switch (tipo) {
        case "corrente":
            const cartaoCredito = document.getElementById("cartaoCredito").value;
            novaConta = new ContaCorrente(agencia, numero, cartaoCredito, saldo);
            break;
        case "poupanca":
            novaConta = new ContaPoupanca(agencia, numero, saldo);
            break;
        case "universitaria":
            novaConta = new ContaUniversitaria(agencia, numero, saldo);
            break;
        default:
            return;
    }

    contas.push(novaConta);
    alert("Conta inserida com sucesso!");
}

// Função para visualizar todas as contas
function visualizarContas() {
    const listaContas = document.getElementById("lista-contas");
    listaContas.innerHTML = "";

    for (const conta of contas) {
        const li = document.createElement("li");
        li.textContent = `Agência: ${conta.agencia}, Número: ${conta.numero}, Tipo: ${conta.tipo}, Saldo: ${conta.saldo}`;
        listaContas.appendChild(li);
    }
}

// Função para deletar uma conta
function deletarConta() {
    const index = document.getElementById("conta-a-deletar").selectedIndex;
    if (index !== -1) {
        contas.splice(index, 1);
        alert("Conta deletada com sucesso!");
    }
}

// Array para armazenar as contas bancárias
const contas = [];
