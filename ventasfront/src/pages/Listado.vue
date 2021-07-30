<template>
  <div class="q-pa-md">
      <q-form
      @submit.Enter.prevent="buscar"
      >
      <div class="row" >
        <div class="col-4">
          <q-input
            filled
            type="date"
            v-model="fecha"
            label="Fecha de Venta"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa la fecha']"
          />
        </div>
        <div class="col-4">
          <q-btn label="Buscar" type="submit" color="primary" icon="search"/>
        </div>
      </div>
      </q-form>
    <q-table
      title="Listado"
      :data="data"
      :columns="columns"
    >
    <template v-slot:body-cell-opcion="props">
            <q-td :props="props">
              <q-btn v-if="$store.state.anularventa"  color="green" @click="editRow(props)" icon="receipt"></q-btn>
              <q-btn v-if="props.row.tipo=='F' && props.row.estado=='ACTIVO'" label="Factura"  color="yellow" @click="factRow(props)" icon="receipt"></q-btn>
              <q-btn v-if="props.row.estado=='ACTIVO'" label="Comanda"  color="yellow" @click="comandaRow(props)" icon="receipt"></q-btn>
              </q-td>
          </template>

    </q-table>

    <q-dialog v-model="dialog_mod">
      <q-card>
        <q-card-section class="bg-green-14 text-white">
          <div class="text-h6">Datos de Venta</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
            @submit="delRow"
            class="q-gutter-md"
          >
          <div class="row">
            <q-input
              v-model="dato2.id"
              type="text"
              label="Id Venta"
              readonly
            />
            <q-input
              v-model="dato2.nrocomprobante"
              type="text"
              label="Nro Comprobante"
              readonly
            />
            <q-input
              v-model="dato2.total"
              type="text"
              label="Total"
              readonly
            />
          </div>
          <div class="row">
            <q-input
              v-model="dato2.fecha"
              type="text"
              label="Fecha Venta"
              readonly
            />
            <q-input
              v-model="dato2.client['nombrerazon']"
              type="text"
              label="Cliente"
              readonly
            />
            <q-input
              v-model="dato2.client['cinit']"
              type="text"
              label="CI/NIT"
              readonly
            />
          </div>
          <div class="row">
            <q-input
              v-model="dato2.user['name']"
              type="text"
              label="Vendedor"
              readonly
            />
            <q-input
              v-model="dato2.codigocontrol"
              type="text"
              label="Codigo Control"
              readonly
            />
            <q-input
              v-model="dato2.tipo"
              type="text"
              label="Tipo"
              readonly
            />
          </div>
            <h6>PRODUCTOS</h6>
                <q-table
                title="Detalle"
                :data="dato2.details"
                :columns="rows"
                >
                 <template v-slot:body="props">
                    <q-tr :props="props">
                    <q-td key="nombreproducto" :props="props">
                        {{ props.row.nombreproducto }}
                    </q-td>

                    <q-td key="cantidad" :props="props">
                        {{ props.row.cantidad }}
                    </q-td>
                    <q-td key="precio" :props="props">
                        {{ props.row.precio }}
                    </q-td>
                    <q-td key="subtotal" :props="props">
                        {{ props.row.subtotal }}
                    </q-td>
                    </q-tr>
                </template>

                </q-table>
            <div>
                <q-btn v-if="dato2.estado=='ACTIVO'" label="Anular" type="submit" color="red" icon="undo"/>
                
                <q-btn  label="Cancelar" icon="delete" color="negative" v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog_del" >
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="clear" color="red" text-color="white" />
          <span class="q-ml-sm">Seguro de Anular.</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-form
          @submit="onAnular"
          >
          <q-input
              v-model="motivo"
              type="text"
              label="Motivo"
              lazy-rules
              :rules="[ val => val && val.length > 3 || 'Ingrese el nombre']"

            />

          <q-btn type="submit" flat label="Anular" color="deep-orange"/>
          </q-form>
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>

</template>

<script>
import {date} from 'quasar'
export default {

  data () {
    return {
      alert: false,
      dialog_mod:false,
      dialog_del:false,
      dato2:{client:[],user:[],details:[]},
      name: null,
      age: null,
      accept: false,
      fecha:'',
      dato:{},
      dato3:{},
      options:[],
      props:[],
      motivo:'',
      columns: [
        {
          name: 'sales',
          required: true,
          label: 'id',
          align: 'left',
          field: row => row.id,
          // format: val => `${val}`,
          sortable: true
        },
        { name: 'nrocomprobante', align: 'center', label: 'NroComprobante', field: 'nrocomprobante', sortable: true },
        { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
        { name: 'cliente', label: 'Cliente', field: row=> row.client.nombrerazon, sortable: true },
        { name: 'user', label: 'Usuario', field: row=> row.user.name, sortable: true },
        { name: 'total', label: 'Total', field: 'total', sortable: true },
        { name: 'tipo', label: 'tipo', field: 'tipo', sortable: true },
        { name: 'estado', label: 'estado', field: 'estado', sortable: true },
        { name: 'opcion', label: 'Opcion', field:'action',  sortable: false },
      ],
      data: [],
      rows:[
        {
          name: 'nombreproducto',
          label: 'Producto',
          align: 'left',
          field: 'nombreproducto',
          // format: val => `${val}`,
        },
        { name: 'cantidad', align: 'center', label: 'cantidad', field: 'cantidad' },
        { name: 'precio', label: 'precio', field: 'precio'},
        { name: 'subtotal', label: 'subtotal', field: 'subtotal' },

      ]
    }
  },
  created() {
      this.fecha=date.formatDate(Date(),'YYYY-MM-DD');

  },
  methods:{
    buscar(){
        this.$axios.post(process.env.URL+'/listabuscar/'+this.fecha).then(res=>{
            console.log(res.data);
            this.data=res.data;
        });

    },
    editRow(producto){
        console.log(producto.row);
        this.dato2= producto.row;
        this.dialog_mod=true;
    },
    delRow(){
        this.dialog_del=true;
    },
    factRow(producto){
        this.dato2= producto.row;
        this.$axios.get(process.env.URL+'/factura/'+this.dato2.id).then(res=>{
            let myWindow = window.open("", "Imprimir", "width=200,height=100");
            myWindow.document.write(res.data);
            myWindow.document.close();
            myWindow.focus();
            setTimeout(function(){
              myWindow.print();
              myWindow.close();
              // impDetalle(response);
              //    impAniv(response);
            },500);
            })
    },
    comandaRow(producto){
      this.dato2= producto.row;
        this.$axios.get(process.env.URL+'/comanda/'+this.dato2.id).then(res=>{
            let myWindow = window.open("", "Imprimir", "width=200,height=100");
            myWindow.document.write(res.data);
            myWindow.document.close();
            myWindow.focus();
            setTimeout(function(){
              myWindow.print();
              myWindow.close();
              // impDetalle(response);
              //    impAniv(response);
            },500);})
    },

    onAnular () {
          this.dato3.user_id=this.$store.state.user.id;
          this.dato3.motivo=this.motivo;
          this.dato3.id=this.dato2.id;
          console.log(this.dato3);
          this.$axios.post(process.env.URL+'/anular',this.dato3).then(res=>{
          this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Anulado correctamente'
        });
        this.dialog_del=false;
        this.dialog_mod=false;
        this.buscar();})
      },
    onDel(){

    },

  }
}
</script>
