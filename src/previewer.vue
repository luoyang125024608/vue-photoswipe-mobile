<template>
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <template v-if="$scopedSlots.topbar">
            <slot name="topbar" :current="index" :total="imgs.length"></slot>
          </template>
          <template v-else>
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          </template>
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip">
          </div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
        <div class="my__caption" v-if="$scopedSlots.caption">
          <div class="my__caption__center">
            <slot :current="index" name="caption"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import './photoswipe.css'
  import './my-skin/default-skin.css'
  import PhotoSwipe from './photoswipe.js'
  import UI from './photoswipe-ui-default.js'

  const DefaultOptions = {
    hideAnimationDuration: 250,
    showAnimationDuration: 250,
    showHideOpacity: true,
    tapToClose: true,
    loop: false,
    history: false
  }
  export default {
    name: 'previewer',
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      options: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        index: 0,
        photoswipe: null,
        imgs: [{}]
      }
    },
    methods: {
      initImgs (list) {
        return list.map(one => {
          if (one.w === undefined) {
            one.w = 0
            one.h = 0
          }
          return one
        })
      },
      init (options, imgs) {
        options.isClickableElement = function (el) {
          return true
        }
        const self = this
        this.imgs = imgs
        if (this.$scopedSlots.topbar) {
          options.preloaderEl = false
          options.counterEl = false
          options.closeEl = false
        }
        this.photoswipe = new PhotoSwipe(this.$el, UI, this.imgs, options)
        this.photoswipe.listen('gettingData', function (index, item) {
          if (!item.w || !item.h) {
            /* eslint-disable*/
            const img = new Image()
            img.onload = function () {
              item.w = this.width
              item.h = this.height
              // self.photoswipe.invalidateCurrItems()
              self.photoswipe.updateSize(true)
            }
            img.src = item.src
          }
        })

        this.photoswipe.listen('afterChange', () => {
          this.index = this.photoswipe.getCurrentIndex()
        })

        this.photoswipe.init()
        this.photoswipe.listen('close', () => {
          this.$emit('close')
        })
      },
      show (index) {
        // 图片起始坐标
        this.$nextTick(() => {
          this.index = index
          this.options.index = index
          this.init(Object.assign(JSON.parse(JSON.stringify(DefaultOptions)), this.options), this.initImgs(this.list))
        })
      },
      open (index, list = [], params = {}) {
        this.$nextTick(() => {
          this.index = index
          params.index = index
          this.init(Object.assign(JSON.parse(JSON.stringify(DefaultOptions)), params), this.initImgs(list))
        })
      },
      close () {
        this.photoswipe.close()
      }
    }
  }
</script>
