<template>
  <q-page class="q-pa-xs">


    <div class="row">
      <div class="col-12 col-md-8">
        <div class="row">
          <div class="col-12">
            <q-card>
              <q-card-section class="bg-primary text-white q-pa-xs">
                <div > <q-icon name="store"></q-icon> Rubros</div>
              </q-card-section>
              <q-card-section class="q-pa-xs">
                <div class="row">
                  <div v-for="rubro in rubros" :key="rubro.id" class="col-4 col-md-3">
                    <q-card @click="misproductos(rubro)" class="q-pa-xs">
                      <q-img
                        :style="'background: '+rubro.color"
                        :src="url+'/../imagenes/'+rubro.imagen"
                        basic
                        style="height: 140px"
                      >
                        <div class="absolute-bottom text-subtitle2 text-center">
                          {{rubro.nombre}}
                        </div>
                      </q-img>
                    </q-card>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12">
            <q-card>
              <q-card-section class="bg-secondary text-white q-pa-xs">
                <div > <q-icon name="send"></q-icon> Productos</div>
              </q-card-section>
              <q-card-section class="q-pa-xs">
                <div class="row">
                  <div v-for="product in products" :key="product.nombre" class="col-4 col-md-3">
                    <q-card @click="miventa(product)" class="q-pa-xs" v-if="product.cantidad>0">
                      <q-img
                        :style="'background: '+product.color"
                        :src="url+'/../imagenes/'+product.imagen"
                        basic
                        style="height: 140px"
                      >
                        <div class="absolute-bottom text-subtitle2 text-center">
                          {{product.nombre}}
                          <div class="row">
                            <div class="col-6">{{product.precio}}Bs</div>
                            <div class="col-6">{{product.cantidad}}U</div>
                          </div>
                        </div>
                      </q-img>
                    </q-card>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section class="bg-accent text-white q-pa-xs">
            <q-icon name="point_of_sale"></q-icon> Venta <q-btn @click="reset"  color="negative" size="xs" icon="restart_alt" label="cancelar"/><q-btn @click="icon = true;tienerebaja=false;"  color="positive" label="Venta" size="xs" icon="add_circle"/>
          </q-card-section>
          <q-card-section class="q-pa-xs">
            <table style="width: 100%;border: 1px solid black" >
              <thead>
              <tr class="bg-accent text-white">
                <th>#</th>
                <th>Nombre producto</th>
                <th>Cant.</th>
                <th>Subt.</th>
                <th>Opc</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(i,index) in $store.state.products" :key="index">
                <td>{{index+1}}</td>
                <td>{{i.nombre}}</td>
                <td>{{i.cantidad}}</td>
                <td>{{i.subtotal}}</td>
                <td>
                  <q-btn @click="agregar(index)" size="xs" icon="add" color="green"></q-btn>
                  <q-btn @click="disminuir(index)" size="xs" icon="remove" color="warning"></q-btn>
                  <q-btn @click="quitar(index)" size="xs" icon="delete" color="negative"></q-btn>
                </td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>TOTAL</th>
                <th>{{total}}</th>
              </tr>
              </tfoot>
            </table>
          </q-card-section>
        </q-card>

        <q-dialog v-model="icon">
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section class="row items-center q-pa-xs bg-green-14 text-white">
              <div class="text-h6"> <q-icon name="send"></q-icon> Realizar venta</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-12">
                  <q-form
                    @submit.prevent="onsubmit"
                    class="q-gutter-md"
                  >
                    <div class="row">
                      <div class="col-6">
                        <q-input
                          required
                          @keyup="onkeyup"
                          filled
                          v-model="ci"
                          label="CI / NIT *"
                          hint="Carnet o nit"
                          lazy-rules
                          :rules="[ val => val && val.length > 0 || 'Dato obligatorio']"
                        />
                      </div>
                      <div class="col-6">
                        <q-input
                          required
                          filled
                          v-model="nombrerazon"
                          label="Nombre y razon *"
                          hint="Razon social"
                          style="text-transform: uppercase"
                          lazy-rules
                          :rules="[ val => val && val.length > 0 || 'Dato obligatorio']"
                        />
                      </div>
                      <!--                    <div class="col-4">-->
                      <!--                      <q-input-->
                      <!--                        filled-->
                      <!--                        v-model="fecha"-->
                      <!--                        label="fecha *"-->
                      <!--                        hint="fecha"-->
                      <!--                        lazy-rules-->
                      <!--                        type="date"-->
                      <!--                        :rules="[ val => val && val.length > 0 || 'Please type something']"-->
                      <!--                      />-->
                      <!--                    </div>-->
                      <div class="col-3 q-pa-xs">
                        <q-input
                          required
                          filled
                          v-model="total"
                          label="Total*"
                          lazy-rules
                        />
                      </div>
                      <div class="col-3 q-pa-xs">
                        <q-input
                          @keyup="cambio=recibido-total"
                          v-model="recibido"
                          filled
                          label="Monto recibido"
                          required
                        />
                      </div>
                      <div class="col-3 q-pa-xs">
                        <q-input
                          filled
                          label="Cambio"
                          v-model="cambio"
                        />
                      </div>
                      <div class="col-3">
                        <q-select v-model="delivery" :options="options" label="Delivery" />
                      </div>
                    </div>
                    <div>
                      {{ tienerebaja }}
                      <q-btn  label=" venta" icon="send" type="submit" color="positive" :disable="btn" :loading="loading"/>
                      <q-btn label="Cerrar" type="button" size="md" icon="delete" color="negative" class="q-ml-sm" @click="icon=false" />
                    </div>
                  </q-form>
                  <div class="col-2"><q-checkbox v-model="boolcredito"  label="T Credito"/></div>
                  <div class="col-2"><q-checkbox @input="verificar" v-model="booltargeta"  label="Targeta"/></div>
                      <template v-if="booltargeta">
                        <q-form @submit.prevent="consultartargeta">
                        <div class="row">
                        <div class="col-4"><q-input label="Codigo" v-model="codigo"  @keyup="consultartargeta"/></div>
                        <!--                    <div class="col-2 flex flex-center"><q-btn  icon="refresh" color="teal" size="xs" @click="consultartargeta" label="consultar"/></div>-->
                        <div class="col-4"><q-banner >Saldo :{{nombresaldo.saldo}} -- {{nombresaldo.nombre}}</q-banner></div>
                        <!--                      <div class="col-2 flex flex-center"><q-btn  icon="code" color="accent" size="xs" @click="rebaja" label="Dar rebaja"/></div>-->
<!--                        <div class="col-2"></div>-->
                      </div>
                      </q-form>
                      </template>

                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>

  </q-page>
</template>

<script>
// import { LoadingBar } from 'quasar'
export default {
  name: "Venta",
  data(){
    return {
      loading:false,
      btn:false,
      tienerebaja:false,
      tcredito:'',
      rubros:[],
      codigo:'',
      nombresaldo:'',
      booltargeta:false,
      boolcredito:false,
      products:[],
      url:process.env.URL,
      icon:false,
      fecha:'2021-01-01',
      ci:'',
      nombrerazon:'',
      recibido:'',
      cambio:'',
      delivery:'',
      // total:'',
      options: [
        // 'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  },
  created() {
    this.misrubros();
    this.$axios.get(process.env.URL+'/deliveri').then(res=>{
      // this.options=res.data;
      this.options.push('')
      res.data.forEach(r=>{
        this.options.push(r.nombre);
      })
      // console.log(this.options)
    })
  },
  methods:{
    verificar(){
      // console.log(this.booltargeta)
      this.codigo=''
      this.nombresaldo=''
      if (!this.booltargeta){
        if (this.tienerebaja){
          this.$store.state.products.forEach(r=>{
            r.precio=(1.25*r.precio).toFixed(2)
            r.subtotal=(1.25*r.subtotal).toFixed(2)
          })
          this.btn=false
          this.tienerebaja=false
        }
      }
    },
    consultartargeta(){
      if (this.codigo!='' || this.codigo!=undefined){
        //this.$q.loading.show()
        this.nombresaldo=''
        this.codigo=this.codigo.replaceAll(' ','');
        if (this.tienerebaja){
          this.$store.state.products.forEach(r=>{
            r.precio=(1.25*r.precio).toFixed(2)
            r.subtotal=(1.25*r.subtotal).toFixed(2)
          })
          this.btn=false
          this.tienerebaja=false
        }
        this.$axios.get(process.env.URL+'/sale/'+this.codigo).then(res=>{
          //console.log(res.data);
          //return false;
          // console.log(res.data)
          this.$q.loading.hide()
          if (res.data=='0' || res.data==''){
          }else{
            this.nombresaldo=res.data
            // console.log(res.data)
            if (!this.tienerebaja){
              this.$store.state.products.forEach(r=>{
                r.precio=(0.8*r.precio).toFixed(2)
                r.subtotal=(0.8*r.subtotal).toFixed(2)
              })
              this.tienerebaja=true
              if ( parseFloat(this.total) <= parseFloat(this.nombresaldo.saldo)){
                this.btn=false
              }else {
                this.btn=true
              }
            }
          }
          // console.log(res.data);
          // this.rubros=res.data;
        })
      }
    },
    rebaja(){
    },
    misrubros() {
      this.rubros=[];
      this.$axios.get(process.env.URL+'/rubro').then(res=>{
        // console.log(res.data);
        this.rubros=res.data;
      })
    },
    onkeyup(){
      // console.log('a');
      // LoadingBar.start();
      this.nombrerazon='';
      if (this.ci!='' && this.ci!=null)
        this.$axios(process.env.URL+'/client/'+this.ci).then(res=>{
          // LoadingBar.stop()
          if(res.data.length>0){
            // console.log(res.data[0])
            this.nombrerazon=res.data[0].nombrerazon;
          }else{
            this.nombrerazon='';
          }
        })
    },
    misproductos(rubro){
      // console.log(rubro.products);
      this.products=rubro.products;
    },
    reset(){
      this.$store.state.products=[]
    },
    quitar(index){
      this.$store.state.products.splice(index,1);
    },
    agregar(index){
      let product=this.$store.state.products[index];
      this.$store.state.products[index].cantidad++;
      this.$store.state.products[index].subtotal= (parseFloat(product.precio)* parseFloat(this.$store.state.products[index].cantidad)).toFixed(2);
    },
    disminuir(index){
      let product=this.$store.state.products[index];
      this.$store.state.products[index].cantidad--;
      this.$store.state.products[index].subtotal= (parseFloat(product.precio)* parseFloat(this.$store.state.products[index].cantidad)).toFixed(2);
      if( this.$store.state.products[index].cantidad==0)
        this.$store.state.products.splice(index,1);
    },
    miventa(product){
      // dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 1)
      // console.log(this.$store.state.sale.products.find(p=>p.product_id === 1));
      // this.$store.state.sale.products.push({product_id:product.id,})
      // if(empty(this.$store.state.sale.products))
      // if(typeof(this.$store.state.sale.products) == 'undefined' || this.$store.state.sale.products === null) {
      // console.log('no hay')
      // console.log(this.$store.state.products.find(p=>p.product_id === product.id));
      let index=this.$store.state.products.findIndex(p=>p.product_id===product.id);
      // console.log(index);
      if (index==-1){
        this.$store.state.products.push({'product_id':product.id,'nombre':product.nombre,'precio':product.precio,'cantidad':1,'subtotal':product.precio});
      }else{
        this.$store.state.products[index].cantidad++;
        this.$store.state.products[index].subtotal= (parseFloat(product.precio)* parseFloat(this.$store.state.products[index].cantidad)).toFixed(2) ;
        // this.ventas[index].cantidad=this.ventas[index].cantidad-1;
        // if (this.ventas[index].cantidad==0){
        //   this.ventas.splice(index,1);
        //   return false;
        // }
        // console.log(this.ventas[index].cantidad+1);
      }
      // if (this.$store.state.products.find(p=>p.product_id === product.id)==undefined){
      //   this.$store.state.products.push({'product_id':product.id,'nombre':product.nombre,'precio':product.precio,'cantidad':1,'subtotal':product.precio});
      // }else{
      //
      // }
      // console.log(this.$store.state.products)
      // }else{
      // console.log('hay')
      // console.log(this.$store.state.sale.products.find(p=>p.product_id === 1));
      // }
    },
    comanda(sale_id){
      let mc=this
      this.$axios.get(process.env.URL+'/comanda/'+sale_id).then(res=>{
        let myWindow = window.open("", "Imprimir", "width=200,height=100");
        myWindow.document.write(res.data);
        myWindow.document.close();
        myWindow.focus();
        setTimeout(function(){
          myWindow.print();
          myWindow.close();
         //  mc.comanda2(sale_id);
          //    impAniv(response);
        },500);
      })
    },
    comanda2(sale_id){
      this.$axios.get(process.env.URL+'/comanda/'+sale_id).then(res=>{
        let myWindow = window.open("", "Imprimir", "width=200,height=100");
        myWindow.document.write(res.data);
        myWindow.document.close();
        myWindow.focus();
        setTimeout(function(){
          myWindow.print();
          myWindow.close();
          // this.comanda(sale_id);
          //    impAniv(response);
        },500);
      })
    },
    onsubmit(){
      this.loading=true
      this.btn=true;
      // console.log('a');
      this.$q.loading.show()
      let mc=this;
      if (this.ci=='' || this.ci==null){
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Tienes que colocar un cliente'
        })
        this.$q.loading.hide()
        this.btn=false
        this.loading=false
        return false;
      }
      if (this.total=='' || this.total==null|| parseFloat(this.total)==0){
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Tienes que Tener productos para realizar la venta'
        })
        this.$q.loading.hide()
        this.btn=false
        this.loading=false
        return false;
      }
      let tj='';
      let tcred='';
      if(this.tienerebaja) tj='SI'; else tj='NO';
      if(this.boolcredito) tcred='SI'; else tcred='NO';
      this.$axios.post(process.env.URL+'/sale',{
        total:this.total,
        monto:this.recibido,
        cinit:this.ci,
        nombrerazon:this.nombrerazon,
        delivery:this.delivery,
        details:this.$store.state.products,
        fecha:this.fecha,
        codigo:this.codigo,
        tarjeta:tj,
        credito:tcred,
      }).then(res=>{
        this.booltargeta=false
        this.tienerebaja=false
        this.boolcredito=false
        this.codigo=''
        this.btn=false
        this.loading=false
        this.icon=false
        this.$store.state.products=[]
        console.log(res.data);
        // this.misrubros();
        this.products=[]
        this.rubros=[]
        this.ci=''
        this.nombrerazon=''
        this.recibido=''
        this.cambio=''
        this.delivery=''
        this.$q.loading.hide()
        if (res.data.tipo=='F'){
          let sale_id=res.data.sale_id;
          this.$axios.get(process.env.URL+'/rubro').then(res=>{
            this.rubros=res.data;
            this.$axios.get(process.env.URL+'/factura/'+sale_id).then(res=>{
              let myWindow = window.open("", "Imprimir", "width=200,height=100");
              myWindow.document.write(res.data);
              myWindow.document.close();
              myWindow.focus();
              setTimeout(function(){
                myWindow.print();
                myWindow.close();
                mc.comanda(sale_id);
                //    impAniv(response);
              },500);
            })
          })
        }
        else{
          let sale_id=res.data.sale_id;
          this.$axios.get(process.env.URL+'/rubro').then(res=>{
            this.rubros=res.data;
            this.comanda(sale_id);
            // this.$axios.get(process.env.URL+'/factura/'+sale_id).then(res=>{
            //   let myWindow = window.open("", "Imprimir", "width=200,height=100");
            //   myWindow.document.write(res.data);
            //   myWindow.document.close();
            //   myWindow.focus();
            //   setTimeout(function(){
            //     myWindow.print();
            //     myWindow.close();
            //     mc.comanda(sale_id);
            //     //    impAniv(response);
            //   },500);
            // })
          })
        }
        // let te=res.data;
        // if(res.data==1){
        //   this.$axios.get(process.env.URL+'/rubro').then(res=>{
        //     this.rubros=res.data;
        //
        //   });
        // }else{
        //   this.$axios.get(process.env.URL+'/rubro').then(res=>{
        //     // console.log(res.data);
        //     this.rubros=res.data;
        //     let myWindow = window.open("", "Imprimir", "width=200,height=100");
        //     myWindow.document.write(te);
        //     myWindow.document.close();
        //     myWindow.focus();
        //     setTimeout(function(){
        //       myWindow.print();
        //       myWindow.close();
        //       // impDetalle(response);
        //       //    impAniv(response);
        //     },500);
        //   })
        // }
        // if (this.ci!='' && this.ci!=null){
        // }
      }).catch(err=>{
        this.btn=false
        this.loading=false
        this.$q.loading.hide()
        //   this.alert=false;
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'No existe dosificacion Preguntar Administrador'
        })
      });
    }
  },
  computed:{
    total:function (){
      let t=0;
      this.$store.state.products.forEach(r=>{
        // console.log(r.ventas);
        // if (r.ventas.length==1){
        // console.log(r.ventas[0].total);
        t+= parseFloat(r.precio)*parseFloat(r.cantidad);
        // }
        // t+=
      })
      return t.toFixed(2);
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}
table td,table th {
  border: 1px solid black;
  /*text-align: center;*/
}
</style>
