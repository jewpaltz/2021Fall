<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <Nav />

                <router-view/>                 
            </div>
        </div>
       
    </div>

</template>

<style lang="scss">


</style>

<script>
import Nav from "./components/Nav";

export default {
    components: {
        Nav
    }
}
</script>