// quill 编辑器
import Quill from 'quill'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

// Vue.use(VueQuillEditor /* { default global options } */)
import { quillEditor } from 'vue-quill-editor'

// https://www.cnblogs.com/linxiyue/p/10305047.html
const BlockEmbed = Quill.import('blots/block/embed')

class VideoBlot extends BlockEmbed {
  static create (value) {
    let node = super.create()
    node.setAttribute('src', value.url)
    node.setAttribute('controls', value.controls)
    node.setAttribute('width', value.width)
    // node.setAttribute('height', value.height)
    node.setAttribute('webkit-playsinline', true)
    node.setAttribute('playsinline', true)
    node.setAttribute('x5-playsinline', true)
    node.setAttribute('class', 'editor-video')
    return node
  }

  static value (node) {
    return {
      url: node.getAttribute('src'),
      controls: node.getAttribute('controls'),
      width: node.getAttribute('width'),
      height: node.getAttribute('height')
    }
  }
}

VideoBlot.blotName = 'simpleVideo'
VideoBlot.tagName = 'video'
Quill.register(VideoBlot)

export default quillEditor
