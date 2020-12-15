<template>
  <div class="the_my_editor_container">
    <quill-editor v-model="content" ref="myTextEditor" :options="editorOption"
    @input="handle_change_value"
    >
    </quill-editor>
  </div>
</template>

<script>
import { ossUploadFile, complete_path } from '@/apis/uploader/aliyun.js'
import quillEditor from './quill-editor-config.js'

export default {
  name: 'r-quill-editor',
  components: {
    quillEditor: quillEditor
  },
  props: {
    value: {
      type: String
    },
    /* 上传图片的地址 */
    uploadUrl: {
      type: String,
      default: '/'
    },
    /* 上传图片的file控件name */
    fileName: {
      type: String,
      default: 'file'
    },
    maxUploadSize: {
      type: Number,
      default: 1024 * 1024 * 500
    }
  },
  data () {
    return {
      content: this.value,
      editorOption: {
        placeholder: '请输入内容'
      },
      addRange: []
    }
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quill
    }
  },
  methods: {
    handle_change_value(){
      this.$emit('input', this.content)
    },
    // 点击图片ICON触发事件
    imgHandler (state) {
      this.addRange = this.$refs.myTextEditor.quill.getSelection()
      this.file_click('image/jpeg,image/png,image/jpg,image/gif')
    },
    onFileChange (e) {
      let fileInput = e.target
      if (fileInput.files.length === 0) {
        return
      }
      const file = fileInput.files[0]
      this.editor.focus()
      // 限制图片/视频大小
      // 插入文件
      this.insert_file(file)
    },
    async insert_file (file) {
      let path = `help`
      const file_path = await ossUploadFile({
        file: file,
        up_path: path,
        random_file_name: true,
        public_read: true
      })
      let file_type = 'image'
      let c_path = complete_path(file_path)
      if (file.type.includes('video')) {
        file_type = 'simpleVideo'
        c_path = {
          url: c_path,
          controls: 'controls',
          width: '66%'
        }
      }

      this.editor.insertEmbed(
        this.editor.getSelection().index,
        file_type,
        c_path
      )
    },
    file_click (accept = 'image/jpeg,image/png,image/jpg,image/gif') {
      let input = document.createElement('input')
      input.type = 'file'
      input.name = this.fileName
      input.accept = accept
      input.onchange = this.onFileChange
      input.click()
    },
    videoHandler (state) {
      this.addRange = this.$refs.myTextEditor.quill.getSelection()
      this.file_click('video/mp4')
    }
  },
  mounted () {
    this.$refs.myTextEditor.quill
      .getModule('toolbar')
      .addHandler('image', this.imgHandler)
    this.$refs.myTextEditor.quill
      .getModule('toolbar')
      .addHandler('video', this.videoHandler) // 为视频ICON绑定事件
  }
}
</script>

<style lang="less">
.editor-video{
  margin-left: 14%;
}

</style>
