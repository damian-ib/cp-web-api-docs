<script>
import Navbar from '@/components/Navbar.vue';
export default {
    components: {
        Navbar
    },
    props: {
        reverseWrap: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<template>
    <div class="container">
        <navbar />
        <div class="content" :id="(reverseWrap) ? 'reversed' : null">
            <main>
                <slot name="content"></slot>
            </main>
            <aside>
                <slot name="aside"></slot>
            </aside>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
}

.content {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.content#reversed {
    flex-direction: column-reverse;
}

main {
    padding-inline: 1.5rem;
    
}

aside {
    width: 100%;
}

@media only screen and (min-width: 700px) {
    .container {
        flex-direction: row;
        align-items: flex-start;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .content#reversed main {
        padding-top: 0;
    }

    main {
        padding-top: 3rem;
        flex: 1;
    }
}

@media only screen and (min-width: 1200px) {
    .content {
        flex-direction: row;
    }

    .content#reversed {
        flex-direction: unset;
    }
    
    .content#reversed main {
        padding-top: 3rem;
    }

    aside {
        width: 300px;
    }
}
</style>