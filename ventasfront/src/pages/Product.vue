<template>
  <div class="q-pa-md">
    <q-btn v-if="$store.state.crearproducto" label="Crear Producto" color="positive" @click="alert = true" icon="add_circle" class="q-mb-xs" />
    <q-dialog v-model="alert">
      <q-card>
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
              v-model="dato.nombre"
              type="text"
              label="Nombre"
              hint="Ingresar nombre"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato.descripcion"
              type="text"
              label="Descripcion"
              hint="Ingresar descripcion"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato.precio"
              label="Precio"
              type="number"
              step="0.01"
              hint="Ingresar precio"
              lazy-rules
              :rules="[ val => val>0 && val < 5000 || 'Por favor Valor']"
            />
            <q-select
              v-model="dato.rubro_id"
              label="Rubro"
              :options="options"
              emit-value
            />

            <q-input
              filled
              v-model="dato.color"
              class="my-input"
              lazy-rules              
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="dato.color" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-uploader
              style="max-width: 300px"
              label="Main Image"
              :factory="uploadFile"
              max-files="1"
              accept=".jpg,.png, image/*"
              v-model="dato.imagen"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />

<!--            <q-toggle v-model="accept" label="I accept the license and terms" />-->

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
      title="Productos"
      :data="data"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre" :props="props">
            {{ props.row.nombre }}
          </q-td>
          <!--          <q-td key="color" :props="props">-->
          <!--            <q-badge :style="'background: '+props.row.color">-->
          <!--              {{ props.row.color }}-->
          <!--            </q-badge>-->
          <!--          </q-td>-->
          <q-td key="imagen" :props="props"  width='200'>
            <!--            <q-badge color="purple">-->
            <div :style="'background: '+props.row.color" style="border-radius: 25px;">
              <img :src="url+'/../imagenes/'+props.row.imagen"  width="100" height="100">
            </div>

            <!--            </q-badge>-->
          </q-td>
          <q-td key="cantidad" :props="props">
            {{ props.row.cantidad }}
          </q-td>
          <q-td key="precio" :props="props">
            {{ props.row.precio }}
          </q-td>
          <q-td key="rubro" :props="props">
            <div class="text-h6">{{ props.row.rubro.nombre }}</div>
          </q-td>
          <q-td key="activo" :props="props">
            <q-badge color="green" v-if="props.row.activo==1" @click="camestado(props.row)">
                    ACTIVO
                  </q-badge>
                  <q-badge color="red" v-else @click="camestado(props.row)">
                    INACTIVO
                  </q-badge>
          </q-td>
          <q-td key="opcion" :props="props">
            <q-btn v-if="$store.state.modificarproducto" dense round flat color="green" @click="addRow(props)" icon="add"></q-btn>
            <q-btn v-if="$store.state.modificarproducto" dense round flat color="red" @click="substractRow(props)" icon="remove"></q-btn>
            <q-btn dense round flat color="yellow" @click="verRow(props)" icon="list"></q-btn>
            <q-btn v-if="$store.state.modificarproducto" dense round flat color="yellow" @click="editRow(props)" icon="edit"></q-btn>
            <q-btn v-if="$store.state.modificarproducto" dense round flat color="ingo" @click="editImg(props)" icon="photo"></q-btn>
            <q-btn v-if="$store.state.eliminarproducto" dense round flat color="red" @click="deleteRow(props)" icon="delete"></q-btn>
          </q-td>
        </q-tr>
      </template>
<!--    <template v-slot:body-cell-opcion="props">-->
<!--            <q-td :props="props">-->
<!--              <q-btn dense round flat color="yellow" @click="editRow(props)" icon="edit"></q-btn>-->
<!--              <q-btn dense round flat color="red" @click="deleteRow(props)" icon="delete"></q-btn>-->
<!--            </q-td>-->
<!--    </template>-->

    </q-table>
    <q-dialog v-model="dialog_mod">
      <q-card>
        <q-card-section class="bg-amber-14 text-white">
          <div class="text-h6">Modificar</div>
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
              label="Nombre"
              hint="Ingresar nombre"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato2.descripcion"
              type="text"
              label="Descripcion"
              hint="Ingresar descripcion"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato2.precio"
              label="Precio"
              type="number"
              step="0.01"
              hint="Ingresar precio"
              lazy-rules
              :rules="[ val => val>0 && val < 5000 || 'Por favor Valor']"
            />
            <q-input
              filled
              v-model="dato2.cantidad"
              label="Cantidad"
              type="number"
              hint="Cantidad de platos"
              lazy-rules
              :rules="[ val => val>0 && val < 5000 || 'Por favor Valor']"
            />
            <q-select
              v-model="dato2.rubro_id"
              label="Rubro"
              :options="options"
              emit-value
            />

            <q-input
              filled
              v-model="dato2.color"
              class="my-input"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="dato2.color" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <!-- <q-input
              filled
              type="text"
              v-model="dato2.imagen"
              label="Ingresar imagen"
              lazy-rules
              :rules="[
              val =>  val.length > 0 || 'Por favor ingresa datos',
              // val => val > 0 && val < 100 || 'Please type a real age'
              ]"
            /> -->

<!--            <q-toggle v-model="accept" label="I accept the license and terms" />-->

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
    <q-dialog v-model="dialog_img">
      <q-card>
        <q-card-section class="bg-amber-14 text-white">
          <div class="text-h6">Modificar imagen</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
            @submit="onMod"
            class="q-gutter-md"
          >
            <q-uploader
              style="max-width: 300px"
              label="Main Image"
              :factory="uploadFile2"
              max-files="1"
              accept=".jpg,.png, image/*"
            />
            <div>
              <q-btn label="Modificar" type="submit" color="positive" icon="add_circle"/>
              <q-btn  label="Cancelar" icon="delete" color="negative" v-close-popup />
            </div>

          </q-form>
        </q-card-section>


      </q-card>
    </q-dialog>

<q-dialog v-model="dialog_add">
      <q-card>
        <q-card-section class="bg-amber-14 text-white">
          <div class="text-h6">Agregar Producto</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
            @submit="onAdd"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="dato2.nombre"
              type="text"
              label="Nombre"
              readonly
            />

            <q-input
              filled
              v-model="agregar"
              label="Cantidad a agregar"
              type="number"
              lazy-rules
              :rules="[ val => val>0 && val < 5000 || 'Por favor Valor']"
            />

             <div>
              <q-btn label="Agregar" type="submit" color="positive" icon="add_circle"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>


<q-dialog v-model="dialog_sub">
      <q-card>
        <q-card-section class="bg-amber-14 text-white">
          <div class="text-h6">Corregir cantidad Producto</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
            @submit="onSub"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="dato2.nombre"
              type="text"
              label="Nombre"
              readonly
            />

            <q-input
              filled
              v-model="disminuir"
              label="Cantidad a Retirar"
              type="number"
              lazy-rules
              :rules="[ val => val>0 && val < 5000 || 'Por favor Valor']"
            />

             <div>
              <q-btn label="Corregir" type="submit" color="red" icon="remove_circle"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

<q-dialog v-model="dialog_ver">
      <q-card>
        <q-card-section class="bg-amber-14 text-white">
          <div class="text-h6">Log Cambios Cantidad</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
            <q-input
              filled
              v-model="dato2.nombre"
              type="text"
              label="Nombre"
              readonly
            />
      <q-table
      title="Log Cantidad Productos"
      :data="prod2"
      :columns="columns2" />


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

    <q-form @submit.prevent="historialplato">
      <div class="row">
        <div class="col-4 q-pa-md">
          <q-input label="Fecha inicio" v-model="fecha.inicio"/>
        </div>
        <div class="col-4 q-pa-md">
          <q-input label="Fecha fin" v-model="fecha.fin"/>
        </div>
        <div class="col-4 q-pa-md">
          <q-btn type="submit" label="Imprimir" icon="send" class="full-width full-height" color="secondary"/>
        </div>
      </div>
    </q-form>

  </div>

</template>

<script>
import {date} from "quasar";

export default {
  data () {
    return {
      url:process.env.URL,
      fecha:{
        inicio:date.formatDate(Date.now(),'YYYY-MM-DD'),
        fin:date.formatDate(Date.now(),'YYYY-MM-DD'),
      },
      alert: false,
      dialog_mod:false,
      dialog_img:false,
      dialog_del:false,
      dialog_add:false,
      dialog_sub:false,
      dialog_ver:false,
      name: null,
      age: null,
      accept: false,
      dato:{},
      dato2:{},
      modprod:{},
      options:[],
      props:[],
      agregar:0,
      disminuir:0,
      columns: [
        {
          name: 'nombre',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.nombre,
          // format: val => `${val}`,
          sortable: true
        },
        { name: 'imagen', align: 'center', label: 'Imagen', field: 'color', sortable: true },
        { name: 'cantidad', align: 'right', label: 'Stock', field: 'cantidad', sortable: true },
        { name: 'precio', align: 'right', label: 'Precio', field: 'precio', sortable: true },
        { name: 'rubro', align: 'center', label: 'Rubro', field: 'rubro', sortable: true },
        { name: 'activo', align: 'center', label: 'Activo', field: 'activo' },
        { name: 'opcion', label: 'Opcion', field:'action',  sortable: false },

      ],
      columns2: [
        {
          name: 'cantidad',
          required: true,
          label: 'cantidad',
          align: 'left',
          field: row => row.cantidad,
          // format: val => `${val}`,
          sortable: true
        },
        { name: 'detalle', align: 'center', label: 'detalle', field: 'detalle', sortable: true },
        { name: 'fecha', align: 'right', label: 'fecha', field: 'fecha', sortable: true },
        { name: 'nombre', align: 'right', label: 'nombre', field: 'name', sortable: true },

      ],
      data: [
      ],
      prod2: [
      ]
    }
  },
  created() {
    this.misdatos();
    this.misrubros();
  },
  methods:{
    camestado(prod){
      this.$axios.post(process.env.URL+'/activarprod',prod).then(res=>{
          this.misdatos();
      });

    },
    uploadFile(files) {
      this.file_path = files[0]
      const fileData = new FormData()
      fileData.append('imagen', this.file_path)
      // console.log(fileData);
      //Replace http://localhost:8000 with your API URL
      const uploadFile = this.$axios.post(process.env.URL+'/upload', fileData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        // console.log(response.data);
        this.dato.imagen=response.data;
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Imagen subido correctamente!'
        });
        // Notify plugin needs to be installed
        // https://quasar.dev/quasar-plugins/notify#Installation
        // this.$q.notify({
        //   type: 'possitive',
        //   message: `Image Uploaded`
        // })
      });
    },
    uploadFile2(files) {
      this.file_path = files[0]
      const fileData = new FormData()
      fileData.append('imagen', this.file_path)
      // console.log(fileData);
      //Replace http://localhost:8000 with your API URL
      const uploadFile = this.$axios.post(process.env.URL+'/upload', fileData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        // console.log(response.data);
        this.dato2.imagen=response.data;
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Imagen subido correctamente!'
        });
        // Notify plugin needs to be installed
        // https://quasar.dev/quasar-plugins/notify#Installation
        // this.$q.notify({
        //   type: 'possitive',
        //   message: `Image Uploaded`
        // })
      });
    },
    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    historialplato(){
      this.$axios.post(process.env.URL+'/logproducto',this.fecha).then(res=>{
        // console.log(res.data)
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
    misdatos(){
      this.$q.loading.show();
      this.$axios.get(process.env.URL+'/product').then(res=>{
        // console.log(res.data)
        this.data=res.data;
        this.$q.loading.hide();
      })
    },
    misrubros(){
        this.options=[];
        this.$axios.get(process.env.URL+'/rubro').then(res=>{
            res.data.forEach(row => {
                this.options.push({label:row.nombre,value:row.id});
            });
        })
    },
    editRow(producto){
        // console.log(producto.row);
        this.dato2= producto.row;
        this.dialog_mod=true;
    },
    editImg(producto){
      // console.log(producto.row);
      this.dato2= producto.row;
      this.dato2.imagen='';
      this.dialog_img=true;
    },
    deleteRow(producto){
        // console.log(producto.row);
        this.dato2= producto.row;
        this.dialog_del=true;
    },

    addRow(producto){
        // console.log(producto.row);
        this.dato2= producto.row;
        this.dialog_add=true;
    },
    substractRow(producto){
        this.dato2= producto.row;
        this.dialog_sub=true;
    },
    verRow(producto){
        this.dato2= producto.row;
        this.$axios.post(process.env.URL+'/verdatos',this.dato2).then(res=>{
          console.log(res.data);
          this.prod2=res.data;
        });
        this.dialog_ver=true;
    },
    onSubmit () {
            if(this.dato.imagen==null || this.dato.imagen=='')
        alert('Ingresar la imagen');
      else{ 

      this.$q.loading.show();

      this.$axios.post(process.env.URL+'/product', this.dato).then(res=>{
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Creado correctamente'
        });
        this.alert=false;
        this.misdatos();
      })}


    },
    onMod(){
        if(this.dato2.imagen==null || this.dato2.imagen=='')
          alert('seleccionar imagen');
        else{
        this.$q.loading.show();
        this.$axios.put(process.env.URL+'/product/'+this.dato2.id,this.dato2).then(res=>{
         this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Modificado correctamente'
        });
        this.dialog_mod=false;
          this.dialog_img=false;
        this.misdatos();})}
    },
    onDel(){
        this.$q.loading.show();
        this.$axios.delete(process.env.URL+'/product/'+this.dato2.id).then(res=>{
         this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Eliminado correctamente'
        });
        this.dialog_del=false;
        this.misdatos();})
    },
    onAdd(){
        this.$q.loading.show();
        this.modprod={id:this.dato2.id,cantidad:this.agregar}
        this.$axios.post(process.env.URL+'/productadd',this.modprod).then(res=>{
         this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Agregado correctamente'
        });
        this.dialog_add=false;
        this.agregar=0;
        this.misdatos();})
    },


onSub(){
        this.$q.loading.show();
        this.modprod={id:this.dato2.id,cantidad:this.disminuir};
        this.$axios.post(process.env.URL+'/productsub',this.modprod).then(res=>{
         this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Agregado correctamente'
        });
        this.dialog_sub=false;
        this.disminuir=0;
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
