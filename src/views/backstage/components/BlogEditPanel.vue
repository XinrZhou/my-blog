<template>
    <div class="editor-div">
        <v-md-editor height="400px" @save="handleSave" v-model="article.content" autofocus="true" />
        <el-form label-width="100px" style="max-width: 460px" label-position="left">
            <el-form-item label="标签">
                <el-input v-model="article.label" />
            </el-form-item>
            <el-form-item label="标题">
                <el-input type="textarea" v-model="article.title" />
            </el-form-item>
            <el-form-item label="封面">
                <ImageUpload :imageUrl="article.imgUrl" @Upload="getUploadData"/>
            </el-form-item>
            <el-form-item label="摘要">
                <el-input type="textarea" v-model="article.digest" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang='ts'>
    import BlogEditPanel from '@/views/backstage/component/BlogEditPanel.vue'
    import ImageUpload from '@/views/backstage/components/ImageUpload.vue'
    import { ref, reactive, toRaw, watch } from 'vue'
    import { Article } from '@/types/type'
    import { ElInput, ElMessage } from 'element-plus'
    import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
    import type { UploadFile, UploadUserFile, UploadProps } from 'element-plus'
    import { useArticleStore } from '@/store/useArticleStore.ts'
    import { useRouter } from 'vue-router'
    import { getBase64 } from '@/utils/util.ts'

    const store = useArticleStore()
    const router = useRouter()

    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)
    const articleId = ref('')

    const fileList = ref < UploadUserFile[] > ([

    ])

    let fileBase64 = ""

    let article = ref < Article > ({
        label: '',
        labelCount: 1,
        title: '',
        imgUrl: '',
        digest: '',
        content: ''
    })

    //if update 
    if (router.currentRoute.value.query.id != undefined) {
        store.getArticle(router.currentRoute.value.query.id)
        articleId.value = router.currentRoute.value.query.id
    }

    watch(() => store.article, () => {
        let articleObj = toRaw(store.article)
        article.value = articleObj
        fileList.value.push({
            url: "data:image/jpeg;base64," + articleObj.imgUrl
        })
    })

    // get upload data 
    let getUploadData = (uploadImgUrl: string) => {
        toRaw(article.value).imgUrl = uploadImgUrl
    }

    // picture remove
    const handleRemove: UploadProps['onRemove'] = (file: UploadFile) => {
        article.imgUrl = ''
    }

    // picture preview
    const handlePictureCardPreview = (file: UploadFile) => {
        dialogImageUrl.value = file.url
        dialogVisible.value = true
    }

    // save
    const handleSave = (text, html) => {
        article.content = html
        if (router.currentRoute.value.query.id != undefined) {
            store.putArticle(toRaw(article.value))
        } else {
            store.addArticle(toRaw(article.value))
        }
    }

    let httpRequest = (data) => {
        imageUrl.value = URL.createObjectURL(data.file);
        const isPFX = data.file.type === 'image/jpeg' || data.file.type === 'image/jpg' || data.file.type === 'image/png';
        const isLt2M = data.file.size / 1024 / 1024 < 2;
        if (!isPFX) {
            ElMessage.error("上传头像图片只能是 JPG、PNG、JPEG 格式!");
        } else if (!isLt2M) {
            ElMessage.error("上传文件大小不能超过 2MB!");
        } else {
            getBase64(data.file).then(resBase64 => {
                fileBase64 = resBase64.split(',')[1]
                toRaw(article.value).imgUrl = fileBase64
            })

        }
    }


</script>

<style scoped>
    .editor-div {
        margin: 20px 0;
    }

    .el-form {
        margin-top: 30px;
    }
</style>