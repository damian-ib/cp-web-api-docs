<script>
export default {
    props: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        date: { type: String, required: true }
    },
    computed: {
        formatUpdateDate() {
            // TODO Handle future cases
            
            const date = Date.parse(this.date);
            const now = Date.now();
            const diff = (now - date) / 1000;
            if (diff < 60) {
                return 'Today';
            } else if (diff < 3600) {
                return Math.floor(diff / 60) + ' minutes ago';
            } else if (diff < 86400) {
                return Math.floor(diff / 3600) + ' hours ago';
            } else {
                return Math.floor(diff / 86400) + ' days ago';
            }
        }
    }
}
</script>

<template>
    <div class="latest-update-card">
        <div class="header">
            <span id="change-title">{{ title }}</span>
            <span id="change-date">{{ formatUpdateDate }}</span>
        </div>
        <div class="content">
            <p>{{ description }}</p>
        </div>
    </div>
</template>

<style scoped>
.latest-update-card {
    background-color: #f5f5f5;
    font-size: small;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

#change-date {
    width: fit-content;
}

#change-title {
    flex: 1;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #DB1222;
    color: white;
    gap: 1rem;
    padding: 1rem 0.75rem;
}

.content p {
    margin: 0;
    padding: 1rem;
}
</style>