<template>
    <div>
    <h1>Contatos {{itens.length}}</h1>
        <!-- <table ref="teste" id="teste" class="table table-striped table-responsive">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Body</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itens" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.nome}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.body}}</td>
                    <td>
                      <button class="btn btn-danger" @click.stop.prevent="excluir(item.id)">excluir</button>
                      <button class="btn btn-success" @click.stop.prevent="editar(index)">editar</button>
                    </td>
                </tr>
            </tbody>
        </table> -->
        <div class="row">
        <div class="col-sm-4 mt-1" v-for="(item, index) in itens" :key="item.id">
          <div class="card">
            <div class="card-header"># {{item.id}}</div>
            <div class="card-body">
              <h4 class="card-title">{{item.nome}}</h4>
              <h5 class="card-subtitle  mb-2 text-muted">{{item.email}}</h5>
              <p class="card-text">{{item.body}}</p>
              <div class="float-right">
                <button class="btn btn-danger mr-1" @click.stop.prevent="excluir(item.id)">excluir</button>
                <button class="btn btn-success" @click.stop.prevent="editar(index)">editar</button>
              </div>
              
            </div>
          </div>
        </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
import dt from "datatables.net-dt";
export default {
  mounted() {
    this.criarTabela();
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  beforeDestroy() {
    this.table.destroy();
    console.log("beforeDestroy");
  },
  beforeUpdate() {
    console.log(this.table);
    this.table.destroy();
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
    this.criarTabela();
  },
  methods: {
    editar(index) {
      console.log("editar contato");
      this.$emit("editar-contato", index);
    },
    excluir(id) {
      this.$emit("excluir-contato", id);
      console.log("excluir", id);
    },
    criarTabela() {
      this.table = $("#teste").DataTable();
      let tempTable = this.table;
      tempTable
        .on("search.dt", function(e, settings, len) {
          console.log("pesquisar", tempTable.search());
        })
        .on("length.dt", function(e, settings, len) {
          console.log("length", len);
        });
    }
  },
  name: "Contatos",
  props: {
    itens: {
      type: Array,
      defaul() {
        return [{ id: 1, nome: "Fernando" }, { id: 2, nome: "João" }];
      }
    }
  },
  data() {
    return {
      table: null
    };
  }
};
</script>