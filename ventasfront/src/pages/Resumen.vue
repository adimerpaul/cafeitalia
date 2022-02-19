<template>
  <div class="q-pa-md">
      <q-form
       @submit.Enter.prevent="buscar"
      >
      <div class="row">
          <div style="width:30%">
      <q-input
      type='date'
      v-model="dato1.fecha"
      label="Fecha 1"
       lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa la fecha']"
      />

      </div>
                <div style="width:30%">
      <q-input
      type='date'
      v-model="dato1.fecha2"
      label="Fecha 2"
       lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa la fecha']"
      />

      </div>
              <div style="width:30%">
    <q-select
      v-model="sel"
      label="Usuario"
      :options="luser"
      lazy-rules
              :rules="[ val => val && val!='' || 'Seleccionar Usuario']"
      />
      </div>
        <q-btn type="submit" label="Buscar" color="primary"/>
    </div>
      </q-form>
    <q-btn
    v-if="this.total1>0 && this.total2>0"
    color="warning"
    label="IMPRIMIR USER"
    @click="imprimir"
    />
        <q-btn
    v-if="this.total1>0 && this.total2>0"
    color="warning"
    label="IMPRIMIR TODOS"
    @click="imprimir2"
    />
    <q-table
      title="Ventas"
      :data="filas"
      :columns="columns"
    />
    <div class="row justify-end">
    <q-input
    label="Total"
    v-model="total1"
    readonly
    input-style="font-size: 35px; width:20%; color:red;"

    type="text"
    />
  </div>
    <q-table
      title="Productos"
      :data="filas2"
      :columns="columns2"
    />
    <div class="row justify-end">

    <q-input
    label="Total"
    v-model="total2"
    readonly
    input-style="font-size: 35px; width:20%; color:red"
    type="text"
    />
    </div>
  </div>


</template>
<script>
import {date} from 'quasar'
export default {
    data(){
        return{
            dato1:{},
            sel:[],
            luser:[],
            filas:[],
            filas2:[],
            total1:0,
            total2:0,
            columns : [
  {
    name: 'id',
    label: 'id',
    align: 'left',
    field: 'id',
    sortable: true
  },
  { name: 'fecha', align: 'center', label: 'fecha', field: 'fecha', sortable: true },
  { name: 'estado', label: 'estado', field: 'estado', sortable: true },
  { name: 'cliente', label: 'cliente', field: 'nombrerazon' },
  { name: 'total', label: 'total', field: 'total' }
],
  columns2:[{
    name: 'id',
    label: 'id',
    align: 'left',
    field: 'product_id',
    sortable: true
  },
  { name: 'producto', align: 'center', label: 'producto', field: 'producto', sortable: true },
  { name: 'cantidad', label: 'cantidad', field: 'cantidad', sortable: true },
  { name: 'precio', label: 'precio', field: 'precio' },
  { name: 'total', label: 'total', field: 'total' },
    ],
        }
    },
    created() {
      this.dato1.fecha=date.formatDate(Date(),'YYYY-MM-DD');
      this.dato1.fecha2=date.formatDate(Date(),'YYYY-MM-DD');

            this.luser=[];
            this.$axios.post(process.env.URL+'/lusuario').then(res=>{
             res.data.forEach(row => {
                this.luser.push({label:row.name,value:row.id});
            });
        });
    },
  methods:{
    buscar(){
        this.total1=0;
        this.total2=0;

        this.dato1.id=this.sel.value;
        this.filas=[];
        this.filas2=[];
        this.$axios.post(process.env.URL+'/resumen/',this.dato1).then(res=>{
            console.log(res.data);
            res.data.forEach(r => {
            this.filas.push({id:r.id,fecha:r.fecha,estado:r.estado,nombrerazon:r.client['nombrerazon'],total:r.total});
            this.total1+=r.total;
            });

        });
        this.$axios.post(process.env.URL+'/resproducto/',this.dato1).then(res=>{
            console.log(res.data);
            res.data.forEach(r => {
            this.filas2.push({product_id:r.product_id,producto:r.nombreproducto,cantidad:r.cant,precio:r.precio,total:r.total});
            this.total2+=r.total;
            });

        });

        console.log(this.filas);
    },

    imprimir(){
          let mc=this
            this.$axios.post(process.env.URL+'/imprimirresumen/',this.dato1).then(res=>{
            let myWindowr = window.open("", "Imprimir", "width=200,height=100");
            myWindowr.document.write(res.data);
            myWindowr.focus();
            myWindowr.document.close();
            setTimeout(function(){
              myWindowr.print();
              myWindowr.close();
              // impDetalle(response);
              //    impAniv(response);
              mc.imprec();

               },500);
            })},
        imprec(){
          let mc=this
            this.$axios.post(process.env.URL+'/imprimirresumenrec/',this.dato1).then(res=>{
            let myWindowc = window.open("", "Imprimir", "width=200,height=100");
            myWindowc.document.write(res.data);
            myWindowc.focus();
            myWindowc.document.close();
            setTimeout(function(){
              myWindowc.print();
              myWindowc.close();
              // impDetalle(response);
              //    impAniv(response);
              mc.impfac();

               },500);
            })},
          impfac(){
            this.$axios.post(process.env.URL+'/imprimirresumenfac/',this.dato1).then(res=>{
            let myWindowf = window.open("", "Imprimir", "width=200,height=100");
            myWindowf.document.write(res.data);
            myWindowf.focus();
            myWindowf.document.close();
            setTimeout(function(){
              myWindowf.print();
              myWindowf.close();
              // impDetalle(response);
              //    impAniv(response);
            },500);

            // this.$axios.post(process.env.URL+'/imprimirresumendel/',this.dato1).then(res=>{
            //     let myWindow = window.open("", "Imprimir", "width=200,height=100");
            //     myWindow.document.write(res.data);
            //     myWindow.document.close();
            //     myWindow.focus();
            //     setTimeout(function(){
            //       myWindow.print();
            //       myWindow.close();
            //       // impDetalle(response);
            //       //    impAniv(response);
            //     },500);
            // });


        });


    },
    
    imprimir2(){
          let mc=this
            this.$axios.post(process.env.URL+'/todoimprimirresumen/',this.dato1).then(res=>{
            let myWindowr = window.open("", "Imprimir", "width=200,height=100");
            myWindowr.document.write(res.data);
            myWindowr.focus();
            myWindowr.document.close();
            setTimeout(function(){
              myWindowr.print();
              myWindowr.close();
              // impDetalle(response);
              //    impAniv(response);
              mc.imprectodos();

               },500);
            })},
        imprectodos(){
          let mc=this
            this.$axios.post(process.env.URL+'/todoimprimirresumenrec/',this.dato1).then(res=>{
            let myWindowc = window.open("", "Imprimir", "width=200,height=100");
            myWindowc.document.write(res.data);
            myWindowc.focus();
            myWindowc.document.close();
            setTimeout(function(){
              myWindowc.print();
              myWindowc.close();
              // impDetalle(response);
              //    impAniv(response);
              mc.impfactodos();

               },500);
            })},
          impfactodos(){
            this.$axios.post(process.env.URL+'/todoimprimirresumenfac/',this.dato1).then(res=>{
            let myWindowf = window.open("", "Imprimir", "width=200,height=100");
            myWindowf.document.write(res.data);
            myWindowf.focus();
            myWindowf.document.close();
            setTimeout(function(){
              myWindowf.print();
              myWindowf.close();
            },500);



        });



    }
    }

}
</script>
