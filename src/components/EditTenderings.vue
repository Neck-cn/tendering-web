<template>
  <el-main>
    <el-scrollbar style="height: 100%">
      <el-form :model="tendering" ref='tendering' :rules="Rules">
        <div style="display: flex;justify-content: space-between;align-items: center">

          <el-button type="primary" @click="addTendering('tendering')">提交</el-button>
        </div>
        <el-form-item prop="title">
          <el-input style="" placeholder="请输入文章标题" v-model="tendering.title"></el-input>
        </el-form-item>
        <el-form-item prop="content">
          <!-- 图片上传组件辅助-->
          <el-upload
            :with-credentials='true'
            id="quill-upload"
            :action="url"
            name="img"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload">
          </el-upload>
          <!--富文本编辑器组件-->
          <el-row v-loading="quillUpdateImg">
            <quillEditor
              v-model="tendering.content"
              ref="myQuillEditor"
              :options="editorOption"
            >
            </quillEditor>
          </el-row>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </el-main>
</template>
<script>

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import {quillEditor} from 'vue-quill-editor'
  import {reqInsertTendering} from "../api";

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction
    [{'color': []}, {'background': []}],
    [{'align': []}],
    ['link', 'image', 'video'],// dropdown with defaults from theme
    [{'font': []}],
    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    ['clean']                                         // remove formatting button
  ];
  export default {
    name: "EditNews",
    data() {
      return {
        quillUpdateImg: false,
        url: this.Variable.baseURL + "upload/img",
        Rules: {
          title: [{required: true, message: '标题不能为空', trigger: ["blur"]}],

          content: [{required: true, message: '内容不能为空', trigger: ["blur"]}],
        },
        tendering: {
          content: "",
          title: "",

        },
        json_img:[],
        news_category: [],
        editorOption: {
          placeholder: '',
          theme: 'snow',  // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    document.querySelector('#quill-upload input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        }
      }
    }, components: {
      quillEditor
    },
    methods: {
      addTendering(tendering) {
        this.$refs[tendering].validate(async(valid) => {
            if (valid) {
              let result = await reqInsertTendering(this.tendering.title, this.tendering.content);
              if (result.code === 200&&result.data===1) {
                this.$message({
                  type: "success",
                  message: "发布成功！"
                });
                this.Variable.ok.ok = true;
                this.$router.replace("/My/MyTenderings");
              } else {
                this.$message.error("哎呀，出错了！");
              }

            }
          }
        );
      }, // 富文本图片上传前
      beforeUpload() {
        // 显示loading动画
        this.quillUpdateImg = true
      },

      uploadSuccess(res) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill;
        // 如果上传成功
        if (res.url !== null) {
          this.json_img.push(res.url);
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', res.url);
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          this.$message.error('图片插入失败')
        }
        // loading动画消失
        this.quillUpdateImg = false
      },

      // 富文本图片上传失败
      uploadError() {
        // loading动画消失
        this.quillUpdateImg = false;
        this.$message.error('图片插入失败')
      }
    }, created() {

    }
  }
</script>
<style scoped>
</style>
