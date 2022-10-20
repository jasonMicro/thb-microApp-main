<template>
  <div style="height: 100%">
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="options"
      style="height: 100%"
      v-if="urlType === 2"
    >
    </video-player>
    <iframe
      :src="videoIframeUrl"
      v-if="urlType === 10"
      style="border: 0; width: 100%; height: 100%"
    ></iframe>
  </div>
</template>
<script>
import 'videojs-contrib-hls';

export default {
  name: 'TdcVideoPlayer',
  data() {
    return {
      options: {
        playbackRates: [], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'application/x-mpegURL', // 类型
            src: '' // url地址
          }
        ],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false, // 当前时间和持续时间的分隔符
          durationDisplay: false, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        },
        flash: {
          hls: {
            withCredentials: false
          }
        }
      },
      videoIframeUrl: ''
    };
  },
  props: {
    src: {
      type: String
    },
    urlType: {
      type: Number,
      default: () => {
        return 2;
      }
    }
  },
  watch: {
    src: {
      handler(v, ovl) {
        const _this = this;
        if (_this.urlType === 2) {
          _this.options.sources[0].src = v;
        } else {
          _this.videoIframeUrl = v;
        }
      },
      deep: true,
      immediate: true //实时监听
    }
  }
};
</script>

<style>
.player-container {
  width: 100%;
  height: 100%;
}

.player-container .error-layer .error-icon {
  margin: 0 !important;
}

.video-js .vjs-tech {
  background: #0d1948;
}

.vjs-fluid {
  height: 100% !important;
  padding-top: 0 !important;
}

.video-js .vjs-control {
  z-index: 999;
}
</style>
