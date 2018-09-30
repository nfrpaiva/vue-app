<template>
    <div>
    <h1>Contatos {{itens.length}}</h1>
      <div class="table-responsive">
        <table ref="teste" id="teste" class="table table-striped">
            <thead>
                <tr>
                    <th >Id</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Body</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itens" :key="item.id" >
                    <td>{{item.id}}</td>
                    <td>{{item.nome}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.body}}</td>
                    <td>
                      <button class="btn btn-outline-danger mr-1" @click.stop.prevent="excluir(item.id)">Excluir</button>
                      <button class="btn btn-outline-success" @click.stop.prevent="editar(index)">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
        <!-- <div class="row">
          <div class="col-sm-4 mt-1" v-for="(item, index) in itens" :key="item.id">
            <div class="card">
              <div class="card-header"># {{item.id}}</div>
              <div class="card-body">
                <h4 class="card-title">{{item.nome}}</h4>
                <h5 class="card-subtitle  mb-2 text-muted">{{item.email}}</h5>
                <p class="card-text">{{item.body}}</p>
                <div class="float-right">
                  <button class="btn btn-outline-danger mr-1" @click.stop.prevent="excluir(item.id)">excluir</button>
                  <button class="btn btn-outline-success" @click.stop.prevent="editar(index)">editar</button>
                </div>
              </div>
            </div>
          </div>
        </div> -->
    </div>
</template>
<script>
import $ from "jquery";
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
    excluir(id) {
      this.$emit("excluir-contato", id);
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
    }
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