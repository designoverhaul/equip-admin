<template>

  <div class="column window-height window-width row justify-center items-center"
       style="background: linear-gradient(#8274C5, #5A4A9F);">
    <div class="row">
      <q-card square class="shadow-24" style="width:400px;height:400px;">
        <q-card-section class="bg-deep-purple-7">
          <h4 class="text-h5 text-white q-my-md">Equip Admin</h4>
          <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
            <!--              <q-btn fab icon="add" color="purple-4" />-->
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-px-sm q-pt-xl">
            <q-input square clearable v-model="user.email" type="email" label="Email">
              <template v-slot:prepend>
                <q-icon name="email"/>
              </template>
            </q-input>
            <q-input square clearable v-model="user.password" type="password" label="Password">
              <template v-slot:prepend>
                <q-icon name="lock"/>
              </template>
            </q-input>
          </q-form>
        </q-card-section>

        <q-card-actions class="q-px-lg">
          <q-btn unelevated size="lg" color="purple-4" class="full-width text-white" @click="login" v-if="!loading"
                 label="Sign In"/>
        </q-card-actions>
        <q-card-section class="text-center q-pa-sm">
          <p class="text-grey-6"></p>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="column q-pa-lg">
    <!--      <div class="row">
            <q-card square class="shadow-24" style="width:300px;height:485px;">
              <q-card-section class="bg-deep-purple-7">
                <h4 class="text-h5 text-white q-my-md">Registration</h4>
                <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
                  <q-btn fab icon="close" color="purple-4" />
                </div>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-xl q-pb-lg">
                  <q-input square clearable v-model="user.email" type="email" label="Email">
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input square clearable v-model="user.username" type="username" label="Username">
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input square clearable v-model="user.password" type="password" label="Password">
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn unelevated size="lg" color="purple-4" class="full-width text-white" label="Get Started" />
              </q-card-actions>
              <q-card-section class="text-center q-pa-sm">
                <p class="text-grey-6">Return to login</p>
              </q-card-section>
            </q-card>
          </div>-->
  </div>

</template>

<script>
import {QSpinnerDots} from 'quasar'
import {mapActions} from "vuex";

export default {


  components: {
    QSpinnerDots
  },
  data() {
    return {
      loading: false,
      user: {
        email: 'aaronheine@gmail.com',
        password: '123456'
      }
    }
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    login: async function () {
      debugger
      if (this.user.email && this.user.password) {
        this.loading = true
        await this.$auth
          .signInWithEmailAndPassword(this.user.email, this.user.password)
          .then(() => {
            debugger
            localStorage.setItem('loggedIn', true)
            this.$router.push({path: 'categories'})
          })
          .catch(err => {
            this.$q.dialog({
              title: 'Error',
              message:
              err.message
            })
          })
        this.loading = false
      } else {
        this.$q.dialog({
          title: 'Error',
          message:
            'An error has ocurred while login in. Check your user data.'
        })
      }
    }
  }
}
</script>
