<template>
  <b-modal id="delete-confirmation" hide-footer title="Estas seguro?">
    <b-button variant="danger" class="mr-1" @click="callDelete">Eliminar</b-button>
    <b-button variant="secondary" @click="cancelAction">Cancelar</b-button>
  </b-modal>
</template>

<script>
import EventBus from '@/eventBus';

export default {
  name: 'DeleteModal',
  data() {
    return {
      requestedObject: Object,
    };
  },
  created() {
    EventBus.$on('delete-requested', (deleteCall) => {
      this.requestedObject = deleteCall;
      this.$bvModal.show('delete-confirmation');
    });
  },
  methods: {
    callDelete() {
      const functionName = `delete${this.requestedObject.type}`;
      window[functionName](this.requestedObject.id).then(() => {
        this.$bvModal.hide('delete-confirmation');
        EventBus.$emit('delete-done', 'deleted');
      });
    },
    cancelAction() {
      this.$bvModal.hide('delete-confirmation');
      EventBus.$emit('delete-done', 'canceled');
    },
  },
};
</script>
