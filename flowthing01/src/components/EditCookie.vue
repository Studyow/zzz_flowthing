<template>
    <div v-if="cookie" class="edit-cookie container">
        <!-- <h2>Edit Cookie {{ this.$route.params.cookie_slug }}</h2> -->
        <h2>Edit {{ cookie.title }} Cookie</h2>
        <form @submit.prevent="Edit_Cookie"> <!-- Created form for adding to new datafile, classes are from the DB-->
            
            <div class="field title">
                <label for="title">Cookie Title:</label>
                <input type="text" name="title" v-model="cookie.title">
            </div>
            <!-- show ingredients -->
            <div v-for="(ing, index) in cookie.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredients:</label>
                <input type="text" name="ingredient" v-model="cookie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <!-- Add ingredient -->
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="add_Ing" v-model="another">
                <p>{{another}}</p>
            </div>
            <!-- field button  -->
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update Cookie</button>
            </div>

        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditCookie',
    data(){
        return{
            cookie: null,
            another: null,
            feedback: null
        }
    },
    methods: {
        Edit_Cookie(){
            if (this.cookie.title){
                this.feedback = null
                // create a slug
                this.cookie.slug = slugify(this.cookie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!-:@]/g,
                    lower: true
                })
                db.collection('cookies').doc(this.cookie.id).update({
                    title: this.cookie.title,
                    ingredients: this.cookie.ingredients,
                    slug: this.cookie.slug
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedback = 'you must enter a cookie title'
            }
        },
        add_Ing(){
            if(this.another) {
                this.cookie.ingredients.push(this.another)
                this.another = null
                console.log(this.ingredients)
            } else {
                this.feedback = 'You must add a value to add an ingredient'
            }
        },
        deleteIng(ing){
            this.cookie.ingredients = this.cookie.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    },
    created(){
        let ref = db.collection('cookies').where('slug', '==', this.$route.params.cookie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                // console.log(doc.data())
                this.cookie = doc.data()
                this.cookie.id = doc.id
            })
        })
    }
}
</script>




<style>
.edit-cookie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-cookie h2 {
    font-size: 2em;
    margin: 20px auto;
}
.edit-cookie .field{
    margin: 20px auto;
    position: relative;
}
.edit-cookie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;

} 
</style>