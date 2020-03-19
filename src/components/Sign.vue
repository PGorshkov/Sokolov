<template>
  <section class="sign">
    <form class="sign__form" @submit.prevent="sendAuth(user)">
      <input class="sign__input" required placeholder="Введите имя" v-model="user.name"/>
      <button type="submit" class="sign__btn">Войти</button>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'sign',
  data: () => ({
    user: {
      id: `u${(+new Date).toString(16)}`,
      name: null
    }
  }),
  methods: {
    ...mapActions(['sendAuth'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .sign{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    &__form{
      display: flex;
      flex-direction: column;
    }
    &__input{
      margin-bottom: 8px;
    }
  }
</style>
