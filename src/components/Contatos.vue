<template>
  <div>
    <h1>Contatos {{itens.length}}</h1>
    <div class="cards">
      <div class v-for="(item, index) in itens" :key="item.id">
        <div class="card">
          <div class="card-header"># {{item.id}}</div>
          <div class="card-body">
            <div class="teste">
              <h4 class="card-title">{{item.nome}}</h4>
              <h5 class="card-subtitle mb-2 text-muted">{{item.email}}</h5>
              <p class="card-text">{{item.body}}</p>
            </div>
            <div class="float-right float-botton card-bnt">
              <button
                class="btn btn-outline-danger mr-1"
                @click.stop.prevent="excluir(item.id)"
              >excluir</button>
              <button
                class="btn btn-outline-success"
                @click.stop.prevent="prepararParaEdicao(index)"
              >editar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapActions } from "vuex";
export default {
  mounted() {
    this.criarTabela();
  },
  beforeDestroy() {
    this.destruirTabela();
  },
  beforeUpdate() {
    this.destruirTabela();
  },
  updated() {
    this.criarTabela();
  },
  methods: {
    editar(index) {
      this.$emit("editar-contato", index);
    },
    destruirTabela() {
      this.table.destroy();
    },
    criarTabela() {
      this.table = $("#teste").DataTable();
      let tempTable = this.table;
      tempTable
        .on("search.dt", function() {
          // eslint-disable-next-line
          console.log("pesquisar", tempTable.search());
        })
        .on("length.dt", function(e, settings, len) {
          // eslint-disable-next-line
          console.log("length", len);
        });
    },
    ...mapActions(["excluir", "prepararParaEdicao"])
  },
  name: "Contatos",
  props: {
    itens: {
      type: Array
    }
  },
  data() {
    return {
      table: null
    };
  }
};
</script>

<style scoped>
.teste {
  overflow: scroll;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 10px;
}
.card {
  box-shadow: var(--shadow);
}

.card-body {
  display: grid;
  grid-template-rows: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
}
.card-bnt {
  align-self: end;
  justify-self: end;
}
:root {
  --shadow: 0 1px 2px rgba(104, 104, 104, 0.8);
}
</style>