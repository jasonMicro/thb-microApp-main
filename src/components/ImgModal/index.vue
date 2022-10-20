<template>
  <a-modal
    :visible="visible"
    destroyOnClose
    :width="width"
    :footer="null"
    @cancel="cancel"
  >
    <img :src="imgUrl" style="width: 100%; margin-top: 30px" />
  </a-modal>
</template>

<script>
export default {
  name: 'ImgModal',
  props: ['visible', 'imgUrl', 'width'],
  methods: {
    cancel() {
      this.$emit('img-show');
    }
  }
};
</script>
