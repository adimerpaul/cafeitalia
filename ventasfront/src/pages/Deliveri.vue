<template>
  <div class="q-pa-md">
    <q-btn label="Agregar Deliveri" color="positive" @click="alert = true" icon="add_circle" class="q-mb-xs" />
    <q-dialog v-model="alert">
      <q-card style="max-width: 80%;width:50%;">
        <q-card-section class="bg-green-14 text-white">
          <div class="text-h6">Nuevo Deliveri</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="dato.nombre"
              type="text"
              label="Nombre Deliveri"
              hint="Ingresar Deliveri"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />

            <div>
              <q-btn label="Agregar" type="submit" color="positive" icon="add_circle"/>
                <q-btn  label="Cancelar" icon="delete" color="negative" v-close-popup />
            </div>
          </q-form>
        </q-card-section>


      </q-card>
    </q-dialog>
    <q-table
      title="Deliveries"
      :data="data"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body-cell-opcion="props">
            <q-td :props="props">
              <q-btn v-if="$store.state.modificardeliveri" dense round flat color="yellow" @click="editRow(props)" icon="edit"></q-btn>
            </q-td>          
          </template>

    </q-table>
    <q-dialog v-model="dialog_mod">
      <q-card style="max-width: 80%;width:50%;">
        <q-card-section class="bg-green-14 text-white">
          <div class="text-h6">Modificar Deliveri</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
            @submit="onMod"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="dato2.nombre"
              type="text"
              label="Nombre Deliveri"
              hint="Ingresar Deliveri"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />

            <div>
              <q-btn label="Modificar" type="submit" color="positive" icon="add_circle"/>
                <q-btn  label="Cancelar" icon="delete" color="negative" v-close-popup />
            </div>
          </q-form>
        </q-card-section>


      </q-card>
    </q-dialog>

  </div>
  
</template>

<script>
export default {
  data () {
    return {
      alert: false,
      dialog_mod:false,
      dato:{},
      dato2:{},
      options:[],
      props:[],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: row => row.id,
          sortable: true
        },
        { name: 'Nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'opcion', label: 'Opcion', field:'action',  sortable: false },
      ],
      data: [
      ]
    }
  },
  created() {
    this.misdatos();
  },
  methods:{
    misdatos(){
      this.$q.loading.show();
      this.$axios.get(process.env.URL+'/deliveri').then(res=>{
        // console.log(res.data)
        this.data=res.data;
        this.$q.loading.hide();
      })
    },

    editRow(deliveri){
        this.dato2= deliveri.row;
        this.dialog_mod=true;  
    },
    
    onSubmit () {
      this.$q.loading.show();
      this.$axios.post(process.env.URL+'/deliveri', this.dato).then(res=>{
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Creado correctamente'
        });
        this.alert=false;
        this.misdatos();
      })


    },
    onMod(){
        this.$q.loading.show();
        this.$axios.put(process.env.URL+'/deliveri/'+this.dato2.id,this.dato2).then(res=>{
         this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Modificado correctamente'
        });
        this.dialog_mod=false;
        this.misdatos();})
    },
    onReset () {
      this.dato.nombre = null;
    }
  }
}
</script>
