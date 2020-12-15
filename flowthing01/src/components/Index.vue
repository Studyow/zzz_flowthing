<template>
  <div class="index container">
    <div class="card small" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing,index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditCookie', params: { cookie_slug: smoothie.slug } }">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>

    <!-- <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="https://scontent.fcgy1-1.fna.fbcdn.net/v/t1.0-9/84608034_197503324990183_7981451315156877312_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEqwprsya_DNzypvQUPuDQYfUSLNcmtUaB9RIs1ya1RoFQYF04QkyIOs6c15z6rMc819OmQO2yw45dxw8PBxajT&_nc_ohc=RZN_V6swKHwAX_4r1lj&_nc_ht=scontent.fcgy1-1.fna&oh=f89fc2576154c7199a04baac55e1e456&oe=5FF54230">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">Tiki Hut Corner<i class="material-icons right">more_vert</i></span>
        <p><a href="https://web.facebook.com/tikihutcorner/">visit page</a></p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
        <p>Here is some more information about this product that is only revealed once clicked on.</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data () {
    return {
      smoothies: []
    }
  },
  methods: {
    deleteSmoothie(id) {
      // delete doc from firestore
      db.collection('cookies').doc(id).delete() //nagunitan na si id tas delete firestore
      .then(() => { // delete front end
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id != id
        })
      })
    }
  },
  created(){
    //fetch data from firestore
    db.collection('cookies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        // console.log(doc.data(), doc.id)
        let cookie = doc.data()
        cookie.id = doc.id // mirror data
        this.smoothies.push(cookie)

      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .index{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
  }
  .index h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  .index .ingredients{
    margin: 30px auto;
  }
  .index .ingredients li{
    display: inline-block;
  }
  .index .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    font-size: 1.4em;
    color: #aaa;
  }
</style>
