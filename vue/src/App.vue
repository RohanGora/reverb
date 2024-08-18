<template>
  <div class="chat card" id="app">
    <div class="scrollable card-body">
      Lead Ids
      <div v-for="(id, i) in ids" :key="i">
        <div class="message message-receive">
          <p>
            {{ id }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: 2,
      ids: [],
    };
  },
  mounted() {
    this.$echo.private('new-lead-generated').listen('NewLeadGenerated', (e) => {
      this.ids.push(e.leadId);
    });
    this.$echo.private('new-lead-assigned-' + this.userId).listen('NewLeadGenerated', (e) => {
      this.ids.push(e.leadId);
    });
  }
};
</script>