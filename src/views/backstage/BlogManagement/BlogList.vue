<template>
    <h2>我的博客</h2>
    <el-table :data="articleList.articles" border stripe style="width: 100%">
        <el-table-column prop="updateTime" label="Date" width="200" />
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="label" label="Label" width="150">
            <template #default="scope">
                <el-tag type="success" effect="dark">{{scope.row.label}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="Operations" width="180">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" 
        v-model:current-page="page" v-model:page-size="pageSize" :total="articleList.total" 
        @current-change="handleCurrentChange"
    />
</template>

<script setup lang='ts'>
    import { ref, reactive, toRaw, computed } from 'vue'
    import { Article } from '@/types/type'
    import { useArticleStore } from '@/store/useArticleStore'
    import BlogEditPanel from '@/views/backstage/components/BlogEditPanel.vue'
    import router from '@/router'

    let page = ref(1)
    let pageSize = ref(10)

    const store = useArticleStore()
    store.getArticles(page.value, pageSize.value)
    const articleList = computed(() => store.articleList)

    const handleEdit = (index: number, row: Article) => {
        router.push({
            path: '/backstage/index/blogmanagement/edit',
            query: {
                id: row.id
            }
        })
    }

    const handleDelete = (index: number, row: Article) => {
        store.deletArticle(row.id)
    }

    const handleCurrentChange = () => {
        store.getArticles(page.value, pageSize.value)
    }

</script>

<style scoped>
 .el-pagination {
        margin-top: 20px;
        justify-content: center;
    }
</style>