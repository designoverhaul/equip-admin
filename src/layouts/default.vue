<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar color="primary">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title>
          Equip Admin
          <!--          <div slot="subtitle">Quasar Framework 0.15.6 + Firebase Auth</div>-->
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Categories',
    caption: 'categories',
    icon: 'school',
    link: 'categories'
  },
  {
    title: 'Users',
    caption: 'users',
    icon: 'code',
    link: '/users'
  },
  {
    title: 'Goals',
    caption: 'goals',
    icon: 'chat',
    link: 'goals'
  },
  /*  {
      title: 'Forum',
      caption: 'forum.quasar.dev',
      icon: 'record_voice_over',
      link: 'https://forum.quasar.dev'
    },
    {
      title: 'Twitter',
      caption: '@quasarframework',
      icon: 'rss_feed',
      link: 'https://twitter.quasar.dev'
    },
    {
      title: 'Facebook',
      caption: '@QuasarFramework',
      icon: 'public',
      link: 'https://facebook.quasar.dev'
    },
    {
      title: 'Quasar Awesome',
      caption: 'Community Quasar projects',
      icon: 'favorite',
      link: 'https://awesome.quasar.dev'
    }*/
];

export default {
  name: 'LayoutDefault',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      essentialLinks: linksList,

    }
  },
  components: {
    EssentialLink
  },

  methods: {
    logout() {
      this.$auth.signOut().then(() => {
        console.log('Logout Successfull')
      })
    }
  },
  beforeCreate() {
    this.$auth.onAuthStateChanged(user => {
      if (!user)
        debugger
      this.$router.push({path: 'login'})
    })
  }
}
</script>

<style>
</style>
