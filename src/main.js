import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
const db = indexedDB.open('chat', 1);
db.onupgradeneeded = () => {
  console.log(123)
  let dbR = db.result;
  if (!dbR.objectStoreNames.contains('messages')) {
    dbR.createObjectStore('messages', {keyPath: 'id'});
  }
  if (!dbR.objectStoreNames.contains('users')) {
    dbR.createObjectStore('users', {keyPath: 'id'});
  }
  store.commit('initDB', db )
};

db.onsuccess = async () => {
  let dbR = db.result;
  let transaction = dbR.transaction('users', "readonly")
  const users = transaction.objectStore("users")
  if (sessionStorage.getItem('session')) {
    const user = users.get(sessionStorage.getItem('session'))
    user.onsuccess = () => {
      store.commit('initSession', user.result)
    }
  }
  setInterval(() => {
    transaction = dbR.transaction('messages', "readonly")
    const messages = transaction.objectStore("messages")
    const m = messages.getAll()
    m.onsuccess = () => {
      store.commit('initMessages',  m.result)
    }
  }, 0)
  store.commit('initDB', db )
  // продолжить работу с базой данных, используя объект db
};
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
