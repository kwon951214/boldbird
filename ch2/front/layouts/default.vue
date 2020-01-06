<template>
    <v-app>
        <nav>
            <v-toolbar dark color="green">
                <v-toolbar-title>
                    <nuxt-link to="/">Nodebird</nuxt-link>
                </v-toolbar-title>
                <v-spacer/>
                <v-toolbar-items>
                    <v-text-field label="검색" hide-details prepend-icon="mdi-magnify"
                                  :style="{ display: 'flex', alignItems: 'center' }" />
                    <v-btn text nuxt to="/profile">
                        <div>프로필</div>
                    </v-btn>
                    <v-btn text nuxt to="/signup" :style="{display: 'flex', alignItems: 'center'}">
                        회원가입
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </nav>
        <v-row no-gutters>
            <v-col cols="12" xs="12" md="4">
                <LoginForm></LoginForm>
            </v-col>
            <v-col cols="12" xs="12" md="8">

                <nuxt />
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
    import LoginForm from '~/components/LoginForm';
export default {
components:{
    LoginForm
}
};
</script>
<style>
    .v-application a {
        color: #ebeff3;
    }
</style>