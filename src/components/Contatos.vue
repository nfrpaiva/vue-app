<template>
    <div>
    <h1>Contatos {{itens.length}}</h1>
        <table ref="teste" id="teste" class="table table-striped table-responsive">
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
                <tr v-for="(item) in itens" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.nome}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.body}}</td>
                    <td><button class="btn btn-danger" @click.stop.prevent="excluir(item.id)">excluir</button></td>
                </tr>
            </tbody>
        </table>
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
    console.log("beforeDestroy");
  },
  beforeUpdate() {
    console.log(this.table);
    this.table.destroy();
    console.log("beforeUpdate");
  },
  updated() {
    this.table = $("#teste").DataTable();
    console.log("updated");
  },
  methods: {
    excluir(id) {
      this.$emit("excluir-contato", id);
      console.log("excluir", id);
    },
    criarTabela() {
      let table = $("#teste").DataTable();
      this.table
        .on("search.dt", function(e, settings, len) {
          //var value = $(".dataTables_filter input").val();
          console.log("pesquisar", this.table.search());
        })
        .on("length.dt", function(e, settings, len) {
          console.log("length", len);
        });
      this.table = table;
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