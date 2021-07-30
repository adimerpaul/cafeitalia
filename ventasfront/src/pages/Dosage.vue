<template>
  <div class="q-pa-md">
    <q-btn v-if="$store.state.creardosificacion" label="Crear Dosificacion" color="positive" @click="alert = true" icon="add_circle" class="q-mb-xs" />
    <q-dialog v-model="alert">
      <q-card style="max-width: 80%;width:50%;">
        <q-card-section class="bg-green-14 text-white">
          <div class="text-h6">Crear</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="dato.nrotramite"
              type="text"
              label="Numero Tramite"
              hint="Ingresar # tramite"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />

            <q-input
              filled
              v-model="dato.nroautorizacion"
              type="text"
              label="Numero Autorizacion"
              hint="Ingresar # autorizacion"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />

            <q-input
              filled
              v-model="dato.nrofactini"
              type="number"
              label="Numero Factura Inicial"
              hint="Ingresar # Factura"
              lazy-rules
              :rules="[ val => val>0 && val.length > 0 || 'Por favor ingresa datos']"
            />
            
            <q-input
              filled
              v-model="dato.llave"
              type="text"
              label="Llave Dosificacion"
              hint="Ingresar llave"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />

            <div class="row">
            <q-input
              filled
              v-model="dato.desde"
              type="date"
              label="Fecha Desde"
              hint=""
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato.hasta"
              type="date"
              label="Fecha Hasta"
              hint=""
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            </div>
            <q-input
              filled
              v-model="dato.leyenda"
              type="textarea"
              label="Leyenda"
              hint="Ingresar Leyenda"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />

            <div>
              <q-btn label="Crear" type="submit" color="positive" icon="add_circle"/>
                <q-btn  label="Cancelar" icon="delete" color="negative" v-close-popup />
            </div>
          </q-form>
        </q-card-section>


      </q-card>
    </q-dialog>
    <q-table
      title="Dosificaciones"
      :data="data"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body-cell-opcion="props">
            <q-td :props="props">
              <q-btn v-if="$store.state.modificardosificacion" dense round flat color="yellow" @click="editRow(props)" icon="edit"></q-btn>
              <q-btn v-if="$store.state.eliminardosificacion" dense round flat color="red" @click="deleteRow(props)" icon="delete"></q-btn>
            </q-td>          
          </template>

    </q-table>
    <q-dialog v-model="dialog_mod">
      <q-card style="max-width: 80%;width:50%;">
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
              v-model="dato2.nrotramite"
              type="text"
              label="Numero Tramite"
              hint="Ingresar # tramite"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />

            <q-input
              filled
              v-model="dato2.nroautorizacion"
              type="text"
              label="Numero Autorizacion"
              hint="Ingresar # autorizacion"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />

            <q-input
              filled
              v-model="dato2.nrofactini"
              type="number"
              label="Numero Factura Inicial"
              hint="Ingresar # Factura"
              lazy-rules
              :rules="[ val => val>0 && val.length > 0 || 'Por favor ingresa datos']"
            />
            
            <q-input
              filled
              v-model="dato2.llave"
              type="text"
              label="Llave Dosificacion"
              hint="Ingresar llave"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />

            <div class="row">
            <q-input
              filled
              v-model="dato2.desde"
              type="date"
              label="Fecha Desde"
              hint=""
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato2.hasta"
              type="date"
              label="Fecha Hasta"
              hint=""
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            </div>
            <q-input
              filled
              v-model="dato2.leyenda"
              type="textarea"
              label="Leyenda"
              hint="Ingresar Leyenda"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            /><!--            <q-toggle v-model="accept" label="I accept the license and terms" />-->

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
      columns: [
        {
          name: 'nrotramite',
          required: true,
          label: 'NroTramite',
          align: 'left',
          field: row => row.nrotramite,
          // format: val => `${val}`,
          sortable: true
        },
        { name: 'nroautorizacion', align: 'center', label: 'NroAutorizacion', field: 'nroautorizacion', sortable: true },
        { name: 'desde', align: 'center', label: 'Fec Desde', field: 'desde', sortable: true },
        { name: 'hasta', label: 'Fec Hasta', field: 'hasta', sortable: true },
        { name: 'activo', label: 'Activo', field: 'activo', sortable: true },
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
      this.$axios.get(process.env.URL+'/dosage').then(res=>{
        // console.log(res.data)
        this.data=res.data;
        this.$q.loading.hide();
      })
    },

    editRow(dosage){
        console.log(dosage.row);
        this.dato2= dosage.row;
        this.dialog_mod=true;  
    },
    deleteRow(dosage){
        console.log(dosage.row);
        this.dato2= dosage.row;
        this.dialog_del=true;
  
    },
    
    onSubmit () {
      this.$q.loading.show();
     this.dato.nrofactura=this.dato.nrofactini;
     this.dato.empresa_id=1;
      this.$axios.post(process.env.URL+'/dosage', this.dato).then(res=>{
        console.log(res.data)
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
        //this.dato2.nrofactura=this.dato2.nrofactini;

        this.$axios.put(process.env.URL+'/dosage/'+this.dato2.id,this.dato2).then(res=>{
         this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Modificado correctamente'
        });
        this.dialog_mod=false;
        this.misdatos();})
    },
    onDel(){
        this.$q.loading.show();
        this.$axios.delete(process.env.URL+'/dosage/'+this.dato2.id).then(res=>{
         this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Eliminado correctamente'
        });
        this.dialog_del=false;
        this.misdatos();})
    },

    onReset () {
      this.dato.nombre = null;
      this.dato.precio = 0.00;
      this.dato.rubro_id=1;
      this.dato.color = null;
      this.dato.imagen=null;
    }
  }
}
</script>
