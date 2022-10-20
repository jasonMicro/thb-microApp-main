<template>
  <a-modal
    :visible="visible"
    destroyOnClose
    width="900px"
    :footer="null"
    @cancel="cancel"
  >
    <div style="margin-top: 30px; height: 500px">
      <tdc-video-player :src="data" @click.native="onOpen" />
    </div>
  </a-modal>
</template>

<script>
import TdcVideoPlayer from '@/components/TdcVideoPlayer';

export default {
  name: 'TdcVideoPlayerModal',
  props: ['visible', 'data', 'width'],
  components: { TdcVideoPlayer },
  data() {
    return {
      src: null
    };
  },
  watch: {},
  methods: {
    onOpen(e) {},
    cancel() {
      this.$emit('show');
    }
  }
};
</script>
