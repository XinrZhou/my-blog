<template>
    <PageHeader :pageName="PAGE_TYPE.BLOGS" />
    <el-row  justify="center">
        <el-col :xs="22" :sm="20" :md="20" :lg="13" >
            <div class="articles">
                <ArticleCardList />
            </div>
        </el-col>
    </el-row>
    <el-pagination layout="prev, pager, next" v-model:current-page="page" v-model:page-size="pageSize"
        :total="articleList.total" @current-change="handleCurrentChange" />
</template>

<script lang="ts" setup>
    import router from '@/router'
    import { ref, reactive, computed } from 'vue'
    import PageHeader from '@/views/foreground/components/PageHeader.vue'
    import ArticleCardList from '@/views/foreground/components/ArticleCardList.vue'
    import { useArticleStore } from '@/store/useArticleStore'
    import { PAGE_TYPE } from '@/types/Const'

    let page = ref(1)
    let pageSize = ref(6)

    let store = useArticleStore()
    const articleList = computed(() => store.articleList)

    const handleCurrentChange = () => {
        store.getArticles(page.value, pageSize.value)
    }
</script>

<style scoped>
    .page-description {
        text-align: center;
        font: 36px/1 Tahoma, Helvetica, Arial, ”\5b8b\4f53”, sans-serif;
    }

    .el-row {
        margin-top: 50px;
    }

    /* articles */
    .articles {
        margin: 20px;
    }

    .el-pagination {
        margin-top: 20px;
        justify-content: center;
    }
</style>