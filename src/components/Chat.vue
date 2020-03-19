<template>
  <section class="chat">
    <div class="chat__messages">
      <div class="chat__bubble" v-for="m in getMessages" :key="m.id" :class="{ me: m.me }">
        {{m.user.name}} : {{ m.message }}
      </div>
    </div>
    <form class="chat__sender" @submit.prevent="sender">
      <input class="chat__input" required v-model="message"/>
      <button type="submit" class="chat__btn">Отправить</button>
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'chat',
  data: () => ({
    message: null
  }),
  computed: {
    ...mapGetters(['getMessages'])
  },
  methods: {
    ...mapActions(['sendMessage']),
    sender () {
      this.sendMessage(this.message)
      this.message = null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .chat{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    &__messages{
      width: 100vw;
      height: calc(100vh - 60px);
      overflow-y: auto;
      padding: 8px;
    }
    &__sender{
      border-top: 1px solid #e2e2e2;
      display: flex;
      width: 100vw;
      height: 60px;
      padding: 12px;
    }
    &__input{
      flex: 1;
    }
    &__bubble{
      width: 100%;
      padding: 8px;
      border: 1px solid #e2e2e2;
      margin-bottom: 4px;
      &.me{
        background-color: rgba(0, 0, 0, .5);
        color: white
      }
    }
  }
</style>
