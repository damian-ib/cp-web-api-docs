<script>
import { useAccountTypeStore } from '@/stores/accountTypeStore.js';
import BaseLayout from '@/layouts/BaseLayout.vue'
import DownloadCard from '@/components/DownloadCard.vue'
import AuthenticationIndividual from '@/docs/authentication/AuthenticationIndividual.vue'
import AuthenticationInstitutional from '@/docs/authentication/AuthenticationInstitutional.vue'
import AccountToggle from '@/components/AccountToggle.vue'
import ResourceLink from '../components/support/ResourceLink.vue';
export default {
  components: {
    BaseLayout,
    DownloadCard,
    AuthenticationIndividual,
    AuthenticationInstitutional,
    AccountToggle,
    ResourceLink
},
  computed: {
    activeTab() {
      const store = useAccountTypeStore()
      return (store.accountType == 'individual') ? 'AuthenticationIndividual' : 'AuthenticationInstitutional';
    },
  },
  data() {
    return {
      downloads: [
        {
          title: 'Gateway',
          content: 'Download a latest version of the Client Portal API gateway.',
          url: 'https://download2.interactivebrokers.com/portal/clientportal.gw.zip'
        }
      ]
    }
  },
}
</script>

<template>
  <base-layout>
    <template #content>
      <div class="content-header">
        <h2>Authentication</h2>
        <account-toggle id="active"/>
      </div>
      <component :is="activeTab" />
    </template>
    <template #aside>
      <div class="downloads">
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

.content-header:last-child {
  display: none;
}

.downloads {
  display: flex;
  flex-direction: column;
  margin-inline: 1.5rem;
}

#active {
  display: none;
}

@media only screen and (min-width: 700px) {
  #active {
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