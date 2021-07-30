<template>
  <div class="q-pa-md">
      <div class="row">
          <form action=""
            @submit.enter.prevent="buscar"
          >
              <q-input
              type="text"
              label="CI / NIT"
              v-model="bclient"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
              />
              <q-btn type="submit" label="Buscar Clientes" icon="search" color="primary"/>
          </form>

      </div>
    <q-btn v-if="$store.state.crearcliente" label="Agregar Cliente " color="positive" @click="alert = true" icon="add_circle" class="q-mb-xs" />
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section class="bg-green-14 text-white">
          <div class="text-h6">Nuevo Cliente</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="dato.cinit"
              type="text"
              label="CI / NIT"
              hint="Ingresar el ci o nit"
              lazy-rules
              :rules="[ val => validarcinit(val) && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato.nombrerazon"
              type="text"
              label="Nombre o Razon Social"
              hint="Ingresar Dato del cliente"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />


            <div>
              <q-btn label="Crear" type="submit" color="positive" icon="add_circle"/>
<!--              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />-->
<!--              <q-card-actions align="right">-->
                <q-btn  label="Cancelar" icon="delete" color="negative" v-close-popup />
<!--              </q-card-actions>-->
            </div>
          </q-form>
        </q-card-section>


      </q-card>
    </q-dialog>
    <q-table
      title="Clientes"
      :data="data"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body-cell-opcion="props">
            <q-td :props="props">
              <q-btn v-if="$store.state.modificarcliente" dense round flat color="yellow" @click="editRow(props)" icon="edit"></q-btn>
              <q-btn v-if="$store.state.eliminarcliente" dense round flat color="red" @click="deleteRow(props)" icon="delete"></q-btn>
            </q-td>
          </template>

    </q-table>
    <q-dialog v-model="dialog_mod">
      <q-card>
        <q-card-section class="bg-green-14 text-white">
          <div class="text-h6">Modificar</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
            @submit="onMod"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="dato2.cinit"
              type="text"
              label="CI / NIT"
              hint="Ingresar ci o nit"
              lazy-rules
              :rules="[ val => validarcinit(val) && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato2.nombrerazon"
              type="text"
              label="Nombre o Razon Social"
              hint="Ingresar dato del cliente"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />

            <div>
              <q-btn label="Modificar" type="submit" color="positive" icon="add_circle"/>
<!--              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />-->
<!--              <q-card-actions align="right">-->
                <q-btn  label="Cancelar" icon="delete" color="negative" v-close-popup />
<!--              </q-card-actions>-->
            </div>
          </q-form>
        </q-card-section>


      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog_del" >
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="clear" color="red" text-color="white" />
          <span class="q-ml-sm">Seguro de eliminar Registro.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Eliminar" color="deep-orange" @click="onDel"/>
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>

</template>

<script>
const cinitvalido=/^[0-9]+-??[0-9A-Za-z]{2}$/;
export default {
  data () {
    return {
      alert: false,
      dialog_mod:false,
      dialog_del:false,
      name: null,
      age: null,
      accept: false,
      dato:{},
      dato2:{},
      options:[],
      props:[],
      bclient:'',
      columns: [
        {
          name: 'cinit',
          required: true,
          label: 'CI/NIT',
          align: 'left',
          field: row => row.cinit,
          // format: val => `${val}`,
          sortable: true
        },
        { name: 'nombrerazon', align: 'center', label: 'Nombre Cliente', field: 'nombrerazon', sortable: true },
        { name: 'opcion', label: 'Opcion', field:'action',  sortable: false },
      ],
      data: [
      ]
    }
  },
  created() {
    //this.misdatos();
  },
  methods:{
    misdatos(){
      this.$q.loading.show();
      this.$axios.get(process.env.URL+'/client').then(res=>{
        // console.log(res.data)
        this.data=res.data;
        this.$q.loading.hide();
      })
    },
    buscar(){
      this.$q.loading.show();
      this.$axios.post(process.env.URL+'/listclient/'+this.bclient).then(res=>{
        // console.log(res.data)
        this.data=res.data;
      })
        this.$q.loading.hide();

    },
    validarcinit(cinit){
        return cinitvalido.test(cinit);

    },
    editRow(client){
        console.log(client.row);
        this.dato2= client.row;
        this.dialog_mod=true;
    },
    deleteRow(client){
        console.log(client.row);
        this.dato2= client.row;
        this.dialog_del=true;

    },

    onSubmit () {
      this.$q.loading.show();

      this.$axios.post(process.env.URL+'/client', this.dato).then(res=>{
        console.log(res.data);
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Creado correctamente'
        });
        this.alert=false;

        this.onReset();
      }).catch(err=>{

          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: 'Error al registrar'
          });
        })
        this.$q.loading.hide();


    },
    onMod(){
        this.$q.loading.show();
        this.$axios.put(process.env.URL+'/client/'+this.dato2.id,this.dato2).then(res=>{
         this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Modificado correctamente'
        });
        this.dialog_mod=false;
       }).catch(err=>{

          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: 'Error al Modificar'
          });
        })
        this.$q.loading.hide();
    },
    onDel(){
        this.$q.loading.show();
        this.$axios.delete(process.env.URL+'/client/'+this.dato2.id).then(res=>{
         this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Eliminado correctamente'
        });
        this.dialog_del=false;
        this.buscar();
        //this.misdatos();
        })
        this.$q.loading.hide();
    },

    onReset () {
      this.dato.nombre = null;
      this.dato.cinit=null;
    }
  }
}
</script>
