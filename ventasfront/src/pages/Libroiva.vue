<template>
  <div class="q-pa-md">
    <div class="text-h5">LIBRO DE IVA</div>
    <q-form @submit.Enter.prevent="buscarlibro">
      <div class="row">
        <div class="col-3 q-pa-md">
          <q-input type="date" v-model="fecha2" hint="Ingrese la fecha"/>
        </div>
        <div class="col-3 q-pa-md">
          <q-select label="Mes" hint="Seleccione Mes" v-model="fecha1.mes" :options="options" lazy-rules :rules="[ val =>  val!='' || 'Ingrese el mes']"/>
        </div>
        <div class="col-3 q-pa-md">
          <q-input label="Anio" v-model="fecha1.anio" type="number" min=1000 max=9999 lazy-rules :rules="[ val => val>1000 && val<9999 && val.length >=4 || 'Ingrese el anio']"/>
        </div>
        <div class="col-3 q-pa-md">
          <q-btn label="Generar" type="submit" color="primary" icon="send" class="full-height full-width"/>
        </div>
      </div>
    </q-form>
    <!--    <q-table-->
    <!--      title="Libro IVA"-->
    <!--      :data="filas"-->
    <!--      :columns="columns"-->
    <!--      row-key="index"-->
    <!--      virtual-scroll-->
    <!--    >-->
    <!--    </q-table>-->
    <div class=" responsive">
      <table id="example" style="width:100%">
        <thead>
        <tr>
          <th>Nro</th>
          <th>FECHA</th>
          <th>N FACTURA</th>
          <th>N AUTORIZACION</th>
          <th>ESTADO</th>
          <th>CI/NIT CLIENTE</th>
          <th>NOMBRE O RAZON SOCIAL</th>
          <th>IMPORTE TOTAL DE VENTA</th>
          <th>IMPORTE ICE/IEHD/TASAS</th>
          <th>EXPORTACIONES OPERACIONES EXENTAS</th>
          <th>VENTAS GRAVADAS A TASA CERO</th>
          <th>SUB TOTAL</th>
          <th>DESCUENTOS BONIFICACIONES Y REBAJAS OTORGADAS</th>
          <th>IMPORTE BASE PARA DÉBITO FISCAL IVA</th>
          <th>DÉBITO FISCAL IVA</th>
          <th>CÓDIGO DE CONTROL</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(fila,index) in filas" :key="index">
          <td>{{fila.nro}}</td>
          <td>{{fila.fecha}}</td>
          <td>{{fila.nrocomprobante}}</td>
          <td>{{fila.nroautorizacion}}</td>
          <td>{{fila.estado}}</td>
          <td>{{fila.cinit}}</td>
          <td>{{fila.nombrerazon}}</td>
          <td>{{fila.total}}</td>
          <td>{{fila.ice}}</td>
          <td>{{fila.exenta}}</td>
          <td>{{fila.tasa}}</td>
          <td>{{fila.total}}</td>
          <td>{{fila.rebaja}}</td>
          <td>{{fila.total}}</td>
          <td>{{fila.fiscal}}</td>
          <td>{{fila.codigocontrol}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--  <pre>{{filas}}</pre>-->
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
  data(){
    return{
      fecha1:{anio:date.formatDate(Date(),'YYYY')},
      fecha2:'',
      options:[{label:"Enero",value:'01'},{label:"Febrero",value:'02'},{label:"Marzo",value:'03'},{label:"Abril",value:'04'},{label:"Mayo",value:'05'},{label:"Junio",value:'06'},{label:"Julio",value:'07'},{label:"Agosto",value:'08'},{label:"septiembre",value:'09'},{label:"Octubre",value:'10'},{label:"Noviembre",value:'11'},{label:"Diciembre",value:'12'},
      ],
      filas:[],
      columns : [
        {name: 'nro', label: 'No', field: 'nro'},
        { name: 'fecha', align: 'center', label: 'FECHA', field: row=>date.formatDate( row.fecha,"DD/MM/YYYY"), sortable: true },
        { name: 'N Factura', label: 'N FACTURA', field: 'nrocomprobante', sortable: true },
        { name: 'N Autorizacion', label: 'N AUTORIZACION', field: 'nroautorizacion' },
        { name: 'Estado', label: 'ESTADO', field: 'estado' },
        { name: 'cinit', label: 'CI/NIT CLIENTE', field: 'cinit' },
        { name: 'nombrerazon', label: 'NOMBRE O RAZON SOCIAL', field: 'nombrerazon', sortable: true },
        { name: 'total', label: 'IMPORTE TOTAL DE VENTA', field: 'total', sortable: true },
        { name: 'ice', label: 'IMPORTE ICE/IEHD/TASAS', field: 'ice', sortable: true },
        { name: 'exenta', label: 'EXPORTACIONES OPERACIONES EXENTAS', field: 'exenta', sortable: true },
        { name: 'tasa', label: 'VENTAS GRAVADAS A TASA CERO', field: 'tasa', sortable: true },
        { name: 'subtotal', label: 'SUB TOTAL', field: 'total', sortable: true },
        { name: 'rebaja', label: 'DESCUENTOS BONIFICACIONES Y REBAJAS OTORGADAS', field: 'rebaja', sortable: true },
        { name: 'total2', label: 'IMPORTE BASE PARA DÉBITO FISCAL IVA', field: 'total', sortable: true },
        { name: 'fiscal', label: 'DÉBITO FISCAL IVA', field: 'fiscal', sortable: true },
        { name: 'codigocontrol', label: 'CÓDIGO DE CONTROL', field: 'codigocontrol', sortable: true }
      ]
    }
  },
  created() {
    this.fecha1={anio:date.formatDate(Date(),'YYYY'),mes:this.fecha1.mes=this.options[date.formatDate(Date(),'M') - 1]};
  },
  mounted() {
    $('#example').DataTable( {
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ]
    } );
  },
  methods:{
    buscarlibro(){
      // console.log(this.fecha2);
      if(this.fecha2=='' || this.fecha2==null){
        // console.log(this.fecha);
        this.$q.loading.show()
        this.$axios.post(process.env.URL+'/libro', {anio:this.fecha1.anio,mes:this.fecha1.mes.value}).then( res=>{
          // console.log(res.data);
          this.filas = res.data;
          $('#example').DataTable().destroy();
          this.$nextTick(()=>{
            $('#example').DataTable( {
              dom: 'Bfrtip',
              buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
              ]
            } );
            this.$q.loading.hide();
          })
        }).catch(err=>{
          this.$q.notify({
            message:err.response.data.message,
            color:'red',
            icon:'error'
          })
        })
      }
      else{
        this.$axios.post(process.env.URL+'/libro2', {fecha:this.fecha2}).then(res=>{
          // console.log(res.data);
          this.filas=res.data;
          $('#example').DataTable().destroy();
          this.$nextTick(()=>{
            $('#example').DataTable( {
              dom: 'Bfrtip',
              buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
              ]
            } );
            this.$q.loading.hide();
          })
        }).catch(err=>{
          this.$q.notify({
            message:err.response.data.message,
            color:'red',
            icon:'error'
          })
        })
      }
    },

  }
}

</script>
