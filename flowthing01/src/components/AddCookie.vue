<template>
    <div class="add-cookie container">
        <h2 class="center-align indigo-text">Add new friends</h2>
        <form @submit.prevent="add_Cookie"> <!-- Created form for adding to new datafile, classes are from the DB-->
            
            <div class="field title">
                <label for="title">Cookie Title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <!-- show ingredients -->
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredients:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <!-- Add ingredient -->
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="add_Ing" v-model="another">
                <p>{{another}}</p>
            </div>

            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add Cookie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'


export default {
    name: 'AddCookie',
    data(){
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        add_Cookie(){
            if (this.title){
                this.feedback = null
                // create a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!-:@]/g,
                    lower: true
                })
                db.collection('cookies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
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
                this.ingredients.push(this.another)
                this.another = null
                console.log(this.ingredients)
            } else {
                this.feedback = 'You must add a value to add an ingredient'
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>



<style>
.add-cookie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-cookie h2 {
    font-size: 2em;
    margin: 20px auto;
}
.add-cookie .field{
    margin: 20px auto;
    position: relative;
}
.add-cookie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;

}
</style>