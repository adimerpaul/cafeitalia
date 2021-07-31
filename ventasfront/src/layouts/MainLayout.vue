<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{$store.state.user.name}}
        </q-toolbar-title>

        <div>CAFE ITALIA &nbsp;&nbsp;</div><br>
        <q-btn @click="logout" v-if="$store.getters.isLoggedIn" label="salir" color="red" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Opciones del sistema
        </q-item-label>
        <q-item
          clickable
          to="/"
          exact
        >
          <q-item-section
            avatar
          >
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Principal</q-item-label>
            <q-item-label caption>
              Pagina principal
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          to="/login"
          exact

          v-if="!$store.getters.isLoggedIn"

        >
          <q-item-section
            avatar
          >
            <q-icon name="login" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Login</q-item-label>
            <q-item-label caption>
              Ingreso al sistema
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          to="/dosage"
          exact
          v-if="$store.state.menudosificacion"
        >
          <q-item-section
            avatar
          >
            <q-icon name="engineering" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dosificacion</q-item-label>
            <q-item-label caption>
              Dosificacion Factura
            </q-item-label>
          </q-item-section>
        </q-item>

          <q-item
          clickable
          to="/secure"
          exact
          v-if="$store.state.menurubro"
          >
          <q-item-section
            avatar
          >
            <q-icon name="precision_manufacturing" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Rubros</q-item-label>
            <q-item-label caption>
              Rubros del sistema
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/deliveri"
          exact
          v-if="$store.state.menudeliveri"

          >
          <q-item-section
            avatar
          >
            <q-icon name="delivery_dining" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Delivery</q-item-label>
            <q-item-label caption>
              Lista de Delivery
            </q-item-label>
          </q-item-section>
        </q-item>


        <q-item
          clickable
          to="/product"
          exact
          v-if="$store.state.menuproducto"
          >
          <q-item-section
            avatar
          >
            <q-icon name="inventory_2" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Productos</q-item-label>
            <q-item-label caption>
              Productos del sistema
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/venta"
          exact
          v-if="$store.state.menuventa"
          >
          <q-item-section
            avatar
          >
            <q-icon name="store" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Venta Cafe Italia</q-item-label>
            <q-item-label caption>
              Ventas sabor peru
            </q-item-label>
          </q-item-section>
        </q-item>


        <q-item
          clickable
          to="/listado"
          exact
          v-if="$store.state.menureporte"
          >
          <q-item-section
            avatar
          >
            <q-icon name="list_alt" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Listado</q-item-label>
            <q-item-label caption>
              Listado de Ventas
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/listadodeliveri"
          exact
          v-if="$store.state.menureporte"
          >
          <q-item-section
            avatar
          >
            <q-icon name="delivery_dining" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Listado Delivery</q-item-label>
            <q-item-label caption>
              Reporte por cobrar
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/resumen"
          exact
          v-if="$store.state.boolresumendia"
        >
          <q-item-section
            avatar
          >
            <q-icon name="local_mall" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Resumen Dia</q-item-label>
            <q-item-label caption>
              Reporte de Ventas
            </q-item-label>
          </q-item-section>
        </q-item>


        <q-item
          clickable
          to="/informe"
          v-if="$store.state.boolgraficaproducto"
          exact>
          <q-item-section
            avatar
          >
            <q-icon name="bar_chart" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Grafica Producto</q-item-label>
            <q-item-label caption>
              Reporte de Productos
            </q-item-label>
          </q-item-section>
        </q-item>

                <q-item
          clickable
          to="/libroiva"
          exact
          v-if="$store.state.menureporte"
          >
          <q-item-section
            avatar
          >
            <q-icon name="point_of_sale" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Libro IVA</q-item-label>
            <q-item-label caption>
              Listado de Facturas
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/client"
          exact
          v-if="$store.state.menucliente"
          >
          <q-item-section
            avatar
          >
            <q-icon name="groups" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Clientes</q-item-label>
            <q-item-label caption>
              Clientes del sistema
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/user"
          exact
          v-if="$store.state.menuusuario"
          >
          <q-item-section
            avatar
          >
            <q-icon name="badge" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Usuarios</q-item-label>
            <q-item-label caption>
              Usuarios del sistema
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-if="$store.getters.isLoggedIn"
          @click="logout"
        >
          <q-item-section
            avatar
          >
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Salir</q-item-label>
            <q-item-label caption>
              Salir del sistema
            </q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>


export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
    }
  },
  created() {
    // let permisos=this.$store.state.user;
    // console.log(permisos)
  },
  methods:{
    logout: function () {
      // console.log('a');
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>
