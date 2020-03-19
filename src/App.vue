<template>
  <div id="app">
    <component :is="startComponent" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chat from './components/Chat'
import Sign from './components/Sign'
export default {
  name: 'App',
  components: { Sign, Chat },
  computed: {
    ...mapGetters(['getAuth']),
    startComponent () {
      return this.getAuth ? 'Chat' : 'Sign'
    }
  },
  methods: {}
}
</script>

<style lang="scss">
  body,
  html{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  *{
    box-sizing: border-box;
  }
</style>
