<template>
  <div class="q-pa-md">
    <q-btn v-if="$store.state.crearusuario" label="Agregar Usuario" color="positive" @click="alert = true" icon="add_circle" class="q-mb-xs" />
    <q-dialog v-model="alert" >
      <q-card style="width:50%">
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
              v-model="dato.name"
              type="text"
              label="Nombre Completo"
              hint="Ingresar nombre"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />

            <q-input
              filled
              v-model="dato.email"
              type="email"
              label="Email"
              hint="Ingresar email"
              lazy-rules
              :rules="[ val => valemail(val)  || 'Por favor ingresa email']"
            />

            <q-input
              filled
              v-model="dato.password"
              label="Password"
              type="password"
              hint="Ingresar password"
              lazy-rules
              :rules="[ val => val.length >= 8 || 'Ingrese password']"
            />

            <h5>Permisos</h5>
            <div>
                    <q-option-group
                    :options="options"
                    type="checkbox"
                    v-model="dato.group"
                    ></q-option-group>
            </div>


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
      title="Usuarios"
      :data="data"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body-cell-opcion="props">
            <q-td :props="props">
              <q-btn v-if="$store.state.modificarusuario" dense round flat color="red" @click="editPass(props)" icon="vpn_key"></q-btn>
              <q-btn v-if="$store.state.modificarusuario" dense round flat color="yellow" @click="editRow(props)" icon="edit"></q-btn>
              <q-btn v-if="$store.state.eliminarusuario" dense round flat color="red" @click="deleteRow(props)" icon="delete"></q-btn>
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
              v-model="dato2.name"
              type="text"
              label="Nombre Completo"
              hint="Ingresar nombre"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingresa datos']"
            />
            <q-input
              filled
              v-model="dato2.email"
              type="email"
              label="Email"
              hint="Ingresar email"
              lazy-rules
              :rules="[ val =>  valemail(val) || 'Por favor ingresa datos']"
            />
                        <h5>Permisos</h5>
            <div>
                    <q-option-group
                    :options="options"
                    type="checkbox"
                    v-model="dato2.group"
                    ></q-option-group>
            </div>

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

    <q-dialog v-model="dialog_pass">
      <q-card>
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Modificar Password</div>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <q-form
            @submit="onPass"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="dato4.password"
              label="Password"
              type="password"
              hint="Ingresar password"
              lazy-rules
              :rules="[ val => val.length >= 8 || 'Ingrese password']"
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
  </div>

</template>

<script>
const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
export default {
  data () {
    return {
      alert: false,
      dialog_mod:false,
      dialog_del:false,
      dialog_pass:false,
      name: null,
      age: null,
      accept: false,
      dato:{group:[]},
      permiso:{},
      dato2:{group:[]},
      dato3:{},
      dato4:{},
      options:[],
      props:[],
      columns: [
        {
          name: 'nombre',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.name,
          // format: val => `${val}`,
          sortable: true
        },
        { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
        { name: 'opcion', label: 'Opcion', field:'action',  sortable: false },
      ],
      data: [
      ]
    }
  },
  created() {
    this.misdatos();
    this.mispermisos();
  },
  methods:{
    misdatos(){
      this.$q.loading.show();
      this.$axios.post(process.env.URL+'/listuser').then(res=>{
        // console.log(res.data)
        this.data=res.data;
        this.$q.loading.hide();
      })
    },
    mispermisos(){
        this.dato.group=[];
        this.$axios.get(process.env.URL+'/permiso').then(res=>{
            //this.permiso=res.data;
            console.log(res.data);
            res.data.forEach(row => {
                this.options.push({label:row.nombre,value:row.id});
            });
        })
    },
    valemail(em){
        return emailPattern.test(em);
    },
    editRow(user){
      console.log(user);
        this.dato2= user.row;
        this.dato2.group=[];
        user.row.usuariopermisos.forEach(cl => {
            this.dato2.group.push(cl.permiso_id);
        });
        // console.log(this.dato2);

        this.dialog_mod=true;
    },
    editPass(user){
        this.dato4= user.row;

        this.dialog_pass=true;
    },
    deleteRow(user){
        this.dato3= user.row;
        this.dialog_del=true;

    },

    onSubmit () {
      this.$q.loading.show();
      this.$axios.post(process.env.URL+'/register', this.dato).then(res=>{
        console.log(res.data);
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

    onPass () {
      this.$q.loading.show();
      this.$axios.post(process.env.URL+'/modpass', this.dato4).then(res=>{
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Modificado correctamente'
        });
        this.dialog_pass=false;
        this.misdatos();
      })
    },

    onMod(){
        this.$q.loading.show();
        this.$axios.post(process.env.URL+'/modificar',this.dato2).then(res=>{
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
        this.$axios.post(process.env.URL+'/eliminar/'+this.dato3.id).then(res=>{
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
