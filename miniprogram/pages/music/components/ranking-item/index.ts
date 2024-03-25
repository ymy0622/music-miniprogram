Component({
  properties: {
    data: Object,
  },
  data: {
    imageVisible: false,
  },
  methods: {
    handleImageLoaded() {
      this.setData({ imageVisible: true })
    },
  },
})
