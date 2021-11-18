<template>
    <div class="about">
        <h1 class="title">Users Page</h1>
        <h2 class="subtitle">Should be accesible only to admins</h2>

        <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Handle</th>
                    <th>Profile Pic</th>
                    <th>isAdmin</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="u in list" :key="u.handle">
                    <th>{{ u.firstName }}</th>
                    <th>{{ u.lastName }}</th>
                    <td>{{ u.handle }}</td>
                    <td>
                        <img :src="u.pic" width="50" :alt="u.handle" />
                    </td>
                    <td>{{ u.isAdmin }}</td>
                    <td>
                        <a href="">Emails</a> <br />
                        <a href="">Friends</a>
                    </td>
                    <td>
                        <p class="buttons">
                            <button class="button">
                                <span class="icon is-small">
                                    <i class="fas fa-eye"></i>
                                </span>
                            </button>
                            <button class="button">
                                <span class="icon is-small">
                                    <i class="fas fa-edit"></i>
                                </span>
                            </button>
                            <button class="button">
                                <span class="icon is-small">
                                    <i class="fas fa-trash"></i>
                                </span>
                            </button>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>import {  GetAll } from "../services/users"

export default {
    data() {
        return {
            list: []
        }
    },
    async mounted(){
        this.list = await GetAll();
    }
}
</script>