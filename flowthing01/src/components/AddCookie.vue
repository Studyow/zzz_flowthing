<template>
    <div class="add-cookie container">
        <h2 class="center-align indigo-text">Add New Cookie Recipe</h2>
        <form @submit.prevent="add_Cookie"> <!-- Created form for adding to new datafile, classes are from the DB-->
            
            <div class="field title">
                <label for="title">Cookie Title:</label>
                <input type="text" name="title" v-model="title">
            </div>

            <div v-for="(ing, index) in ingredients" :key="index">
                <label for="ingredient">Ingredients:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
            </div>

            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="add_Ing" v-model="another">
            </div>

            <div class="field center-align">
                <p v-if="feeback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add Cookie</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AddCookie',
    date(){
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null
        }
    },
    methods: {
        add_Cookie(){
            console.log(this.title)
        },
        add_Ing(){
            if(this.another) {
                this.ingredients.push(this.another)
                this.another = null
                console.log(this.ingredients)
            } else {
                this.feedback = 'You must add a value to add an ingredient'
            }
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
}
</style>