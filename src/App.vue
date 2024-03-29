<script lang="ts" setup>
import Notebook from '@components/Notebook/Notebook.vue';
import { camelToSpaces } from '@helpers';
import { Head, useHead } from '@vueuse/head';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouteStore } from '/src/store/routeStore';
import KYZCLogo from '/src/static/kadiryazici.png';
import { useContext } from 'vite-ssr/vue';

const { url } = useContext();
const route = useRoute();
const routeStore = useRouteStore();

const routeName = computed(() => camelToSpaces(route.name as string) + ' - Kadir Yazıcı Portfolio');

useHead({
   meta: [
      {
         name: 'description',
         content:
            'This website is about me, you can find informations about me and technologies I use or maybe you may hire me.'
      },
      {
         name: 'og:image',
         content: `https://${host()}${KYZCLogo}`
      },
      {
         name: 'twitter:image',
         content: `https://${host()}${KYZCLogo}`
      },
      {
         name: 'og:title',
         content: routeName
      }
   ]
});

function host() {
   let _url = url.host;
   if (typeof process !== 'undefined' && typeof process.env.VERCEL_URL !== 'undefined') {
      _url = process.env.VERCEL_URL as string;
   }
   return _url;
}
</script>

<template>
   <Head>
      <title>{{ routeName }}</title>
   </Head>
   <RouterView v-slot="{ Component }">
      <Notebook>
         <transition
            :leaveActiveClass="
               routeStore.lastPage < routeStore.currentPage ? 'anim-flip-out' : 'anim-opacity-out'
            "
            :enterActiveClass="
               routeStore.lastPage > routeStore.currentPage ? 'anim-flip-in' : 'anim-opacity-in'
            "
         >
            <component :is="Component" />
         </transition>
      </Notebook>
   </RouterView>
</template>

<style lang="scss">
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   -webkit-tap-highlight-color: transparent;
}

body {
   overscroll-behavior: none;
   font-family: 'Kalam', cursive !important;
}

#app {
   min-height: 100vh;
   overflow: hidden;
   display: flex;
   background-color: vars.$white;
   color: vars.$dark;
   background: url('/src/static/background.jpg') repeat;
   align-items: flex-start;
   padding-top: vars.$p * 3;
   justify-content: center;

   @include mix.forMobile {
      justify-content: flex-start;
   }

   @include mix.forMoreMobile {
      padding: 0;
   }
}

p {
   font-size: calc(#{vars.$tiny} + 2px);
   display: block;
   margin: vars.$p 0;
   text-align: left;
}

.anim-flip-in,
.anim-flip-out {
   transform-origin: 50px 50%;
   position: absolute;
   left: 0;
   top: 0;
   backface-visibility: hidden;
   -webkit-backface-visibility: hidden;
   z-index: 10;
}

.anim-flip-in {
   animation: flipIn 0.35s ease-out;
}
.anim-flip-out {
   animation: flipIn 0.35s ease-out reverse;
}

@keyframes flipIn {
   0% {
      transform: rotateY(-90deg);
   }
   100% {
      transform: rotateY(0deg);
   }
}

// a mini trick for Vue transition to wait
.anim-opacity-out,
.anim-opacity-in {
   --from: 1;
   --to: 0.95;
   animation: animOpacity 0.35s ease-out;
   // position: absolute;
}
@keyframes animOpacity {
   0% {
      opacity: var(--from);
   }
   100% {
      opacity: var(--to);
   }
}
img {
   display: inline !important;
}

a,
a:visited {
   color: vars.$blue;
   text-decoration: underline;
   &:hover {
      color: darken(vars.$green, 1.5);
   }
}

:not(pre) > code[class*='language-'],
pre[class*='language-'] {
   border-radius: 5px !important;
   box-shadow: vars.$dropShadowLeft;
   &,
   & * {
      font-family: sans-serif !important;
      font-size: 12px !important;
   }
}
</style>
