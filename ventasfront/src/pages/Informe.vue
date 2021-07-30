<template>
    <div class="q-pa-md">

    <q-form @submit="buscar">
      <div class="row">
        <div class="col-4">
        <q-input
        type="date"
        label="Fecha inicial"
        v-model="fecha.ini"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor ingresa la fecha']"
        />
        </div>
        <div class="col-4">
          <q-input
            type="date"
            label="Fecha final"
            v-model="fecha.fin"
            lazy-rules
            :rules="[ val => val>=this.fecha.ini && val.length > 0 || 'Por favor ingresa la fecha']"
          />
        </div>
        <div class="col-4">
          <q-btn label="Generar" type="submit" color="primary" icon="send"/>
        </div>

      </div>
    </q-form>
  <q-card class="bg-white q-pa-none full-width">
    <q-card-section class="bg-blue-grey-8">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6 text-white text-center">Productos Vendidos</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <canvas id="bar-chart"></canvas>
    </q-card-section>
  </q-card>
    </div>
</template>
<script>
import {date} from 'quasar'
    import Chart from "chart.js";
     export default {
  data() {
    return {
        fecha:{},
        producto:[],
        cantidad:[],
    }
    },
   mounted () {

  },
  created()
  {
      this.fecha={ini:date.formatDate(Date(),'YYYY-MM-DD'),fin:date.formatDate(Date(),'YYYY-MM-DD')};
  },
  methods: {
      buscar(){
          this.producto=[];
          this.cantidad=[];
          this.color=[];
            this.$axios.post(process.env.URL+'/informe',this.fecha).then(res=>{
            console.log(res.data);
            res.data.forEach(de => {
              this.producto.push(de.nombreproducto);
              this.cantidad.push(de.cant);
              this.color.push(de.color);

            });
            this.createChart('bar-chart');

        });
      },
    createChart (chartId) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.producto,
          datasets: [
            {
              label: 'Producto (cantidad)',
              backgroundColor: this.color,
              //['red','yellow','green','blue','orange','Chocolate','LightCyan'],
              data: this.cantidad
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Total de Productos vendidos en las fechas seleccionadas'
          }
        }
      })
      return myChart;
    }
    }
}

</script>
