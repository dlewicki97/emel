<template>

    <section class="container login-form">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a @click="loginTab = true; registerTab = false" :class="['nav-link', {'active': loginTab}]"
                    id="home-tab">Zaloguj</a>
            </li>
            <li class="nav-item">
                <a @click="loginTab = false; registerTab = true" :class="['nav-link', {'active': registerTab}]"
                    id="profile-tab">Zarejestruj</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div :class="['tab-pane', 'fade', {'show': loginTab}, {'active': loginTab}]" id="home" role="tabpanel"
                aria-labelledby="home-tab">
                <Login v-if="loginTab" />
            </div>
            <div :class="['tab-pane', 'fade', {'show': registerTab}, {'active': registerTab}]" id="profile"
                role="tabpanel" aria-labelledby="profile-tab">
                <Register v-if="registerTab" />
            </div>
        </div>
    </section>

</template>

<script>
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';

export default {
    components: {
        Login,
        Register,
    },
    data() {
        return {
            loginTab: true,
            registerTab: false,
        }
    },
}
</script>

<style scoped>
* {
    font-family: Roboto, sans-serif;
}
</style>