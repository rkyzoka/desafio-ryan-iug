class CaixaDaLanchonete {
  cardapio = {
    cafe: 3.0,
    chantily: 1.5,
    suco: 6.2,
    sanduiche: 6.5,
    queijo: 2.0,
    salgado: 7.25,
    combo1: 9.5,
    combo2: 7.5,
  };
  extras = { chantily: "cafe", queijo: "sanduiche" };

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (itens.length === 0) return "Não há itens no carrinho de compra!";
    let total = this.validarPedido(itens);

    if (typeof total === "string") {
      return total;
    }

    if (metodoDePagamento === "dinheiro") {
      total -= (total * 5) / 100;
      return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
    if (metodoDePagamento === "credito") {
      total += (total * 3) / 100;
      return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
    if (metodoDePagamento === "debito") {
      return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
    return "Forma de pagamento inválida!";
  }

  validarPedido(itens) {
    let total = 0;

    for (let item of itens) {
      let codigoPedido = item.split(",")[0];
      let qtdPedido = parseInt(item.split(",")[1]);

      if (!this.cardapio[codigoPedido]) return "Item inválido!";
      if (qtdPedido <= 0) return "Quantidade inválida!";

      if (
        this.extras[codigoPedido] &&
        !itens.some((i) => i.startsWith(this.extras[codigoPedido]))
      ) {
        return "Item extra não pode ser pedido sem o principal";
      }

      total += this.cardapio[codigoPedido] * qtdPedido;
    }

    return total;
  }
}

console.log(new CaixaDaLanchonete().calcularValorDaCompra("credito", []));

export { CaixaDaLanchonete };
