<script>
import { useAccountTypeStore } from '@/stores/accountTypeStore.js';
import BaseLayout from '@/layouts/BaseLayout.vue';
import AccountToggle from "@/components/AccountToggle.vue";
import EndpointsList from '@/components/endpoints/EndpointsList.vue';
import DownloadCard from '../components/DownloadCard.vue';
import Warning from '../components/Warning.vue';
export default {
  components: {
    BaseLayout,
    AccountToggle,
    EndpointsList,
    DownloadCard,
    Warning
},
  setup() {
    return {
      store: useAccountTypeStore(),
    };
  }
}
</script>

<template>
  <base-layout>
    <template #content>
      <div class="content-header">
        <h2>Endpoints Explorer</h2>
        <account-toggle id="active"/>
      </div>
      <warning>
        <p>
          This page is intended to be used on a desktop or laptop.
        </p>
      </warning>
      <p>
        On this page you will find all of the available endpoints along with their descriptions. Please note, the Client Portal
        API does not allow any banking or account operations. For this, please see the Digital Account Management (DAM) API.
      </p>
      <endpoints-list :accountType="this.store.accountType" />
    </template>
    <template #aside>
      <div class="downloads">
        <h2>Resources</h2>
        <download-card :title="'Download swagger.json'" :url="'https://interactivebrokers.github.io/cpwebapi/swagger.json'" :content="'Download the swagger.json file'"/>
        <download-card :title="'Doc style endpoints'" :url="'https://www.interactivebrokers.com/api/doc.html'" :content="'DOC style endpoints'"/>
      </div>
    </template>
  </base-layout>
</template>

<style scoped>
.content-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.downloads {
  margin-inline: 1.5rem;
}

.warning {
  display: none;
}

#active {
  display: none;
}

@media (min-width: 700px) {
  #active {
    display: block;
  }
}

@media (max-width: 700px) {
  .warning {
    display: block;
  }
}

@media only screen and (min-width: 1200px) {
  .downloads {
    margin-inline: 0;
    margin-right: 1.5rem;
    margin-top: 3rem;
  }
}
</style>