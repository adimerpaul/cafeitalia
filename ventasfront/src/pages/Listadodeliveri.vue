<template>
  <div class="q-pa-md">
      <q-form
      @submit.Enter.prevent="buscar"
      >
      <div class="row" >
        <div class="col-3 q-pa-md">
          <q-select
            label="Mes"
            hint="Seleccione Mes"
            v-model="fecha1.mes"
            :options="options"
            lazy-rules
            :rules="[ val =>  val!='' || 'Ingrese el mes']"
          />
        </div>
        <div class="col-3 q-pa-md">
          <q-select
            label="Deliveri"
            hint="Seleccione Deliveri"
            v-model="fecha1.deliveri"
            :options="options2"
            lazy-rules
            :rules="[ val =>  val!='' || 'Ingrese el deliveri']"
          />
        </div>
        <div class="col-3 q-pa-md">
          <q-input
            label="Anio"
            v-model="fecha1.anio"
            type="number"
            min=1000
            max=9999
            lazy-rules
            :rules="[ val => val>1000 && val<9999 && val.length >=4 || 'Ingrese el anio']"

          />
        </div>
        <div class="col-3 q-pa-md">
          <q-btn label="Buscar" type="submit" color="primary" icon="search" class="full-height full-width"/>
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
              <q-btn v-if="$store.state.anularventa" dense round flat color="green" @click="editRow(props)" icon="receipt"></q-btn>
            </q-td>
          </template>

    </q-table>

    <div class="row justify-end">

    <q-input
    label="Total"
    v-model="total"
    readonly
    input-style="font-size: 35px; width:20%; color:red"
    type="text"
    />
    </div>
    <q-dialog v-model="dialog_mod">
      <q-card>
        <q-card-section class="bg-green-14 text-white">
          <div class="text-h6">Datos de Venta</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
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
                <q-btn  label="Cancelar" icon="delete" color="negative" v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>

</template>

<script>
var $  = require( 'jquery' );
// // var dt = require( 'datatables.net' )( window, $ );
// require( 'jszip' );
// require( 'pdfmake' );
// require( 'datatables.net-dt' )();
// require( 'datatables.net-buttons-dt' )();
// require( 'datatables.net-buttons/js/buttons.colVis.js' )();
// import datatable from 'datatables.net-buttons-bs4'
require( 'datatables.net-buttons/js/buttons.html5.js' )();
require( 'datatables.net-buttons/js/buttons.print.js' )();
require('datatables.net-buttons/js/dataTables.buttons');
require('datatables.net-dt/css/jquery.dataTables.min.css');
import print from 'datatables.net-buttons/js/buttons.print';
import jszip from 'jszip/dist/jszip';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs=pdfFonts.pdfMake.vfs;
window.JSZip=jszip;

import { date } from 'quasar';
export default {

  data () {
    return {
      alert: false,
      dialog_mod:false,
      dato2:{client:[],user:[],details:[]},
      name: null,
      age: null,
      accept: false,
      fecha:{},
      deliveri:{},
      dato:{},
      props:[],
      options2:[],
      motivo:'',
      total:0,
      fecha1:{anio:date.formatDate(Date(),'YYYY')},
            options:[{label:"Enero",value:'01'},
            {label:"Febrero",value:'02'},
            {label:"Marzo",value:'03'},
            {label:"Abril",value:'04'},
            {label:"Mayo",value:'05'},
            {label:"Junio",value:'06'},
            {label:"Julio",value:'07'},
            {label:"Agosto",value:'08'},
            {label:"septiembre",value:'09'},
            {label:"Octubre",value:'10'},
            {label:"Noviembre",value:'11'},
            {label:"Diciembre",value:'12'},
            ],
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
    this.fecha1={anio:date.formatDate(Date(),'YYYY'),mes:this.fecha1.mes=this.options[date.formatDate(Date(),'M') - 1]};

    this.options2=[];
    this.$axios.get(process.env.URL+'/deliveri').then(res=>{
            console.log(res.data);
            res.data.forEach(de => {
              this.options2.push(de.nombre);

            });
        });
  },
  methods:{
    buscar(){
      this.total=0;
        this.fecha={anio:this.fecha1.anio,mes:this.fecha1.mes.value,deliveri:this.fecha1.deliveri};
        console.log(this.fecha);
        this.$axios.post(process.env.URL+'/listabuscar2',this.fecha).then(res=>{
            console.log(res.data);
            this.data=res.data;
            res.data.forEach(element => {
              this.total+=element.total;
            });

        });

    },
    editRow(producto){
        console.log(producto.row);
        this.dato2= producto.row;
        this.dialog_mod=true;
    },


  }
}
</script>
