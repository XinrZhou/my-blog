<template>
    <PageHeader :pageName="PAGE_TYPE.MESSAGE" />
    <el-row>
        <el-col :span="24">
            <el-input v-model="message.content" placeholder="leave your message here..." size="large" clearable>
                <template #append>
                    <el-button :icon="EditPen" @Click="sendMessage" />
                </template>
            </el-input>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-scrollbar height="700px">
                <el-timeline>
                    <el-timeline-item :timestamp="item.insertTime" placement="top" v-for="item in messageList"
                        :id="item.id">
                        <el-card>
                            <h4>{{item.content}}</h4>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-scrollbar>
        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
    import PageHeader from '@/views/foreground/components/PageHeader.vue'
    import { ref, computed, toRaw } from 'vue'
    import { EditPen } from '@element-plus/icons-vue'
    import { useMessageStore } from '@/store/useMessageStore'
    import { Message } from '@/types/type'
    import { PAGE_TYPE } from '@/types/Const'

    let messageStore = useMessageStore()

    messageStore.getMessages()

    const messageList = computed(() => messageStore.messageList)

    let message = ref({
        content: ''
    })

    let sendMessage = () => {
        messageStore.postMessage(toRaw(message.value))
    }

</script>

<style scoped>
    /* Phone */
    @media screen and (max-width: 993px) {
        .el-row {
            max-width: 90%;
        }

        .el-input {
            width: 84%;
            margin: 26px 66px;
        }

        img {
            height: 300px;
        }
    }

    /* PC */
    @media screen and (min-width: 992px) {
        .el-row {
            left: 17%;
            max-width: 66%;
        }

        .el-input {
            width: 94%;
            margin: 26px 66px;
        }

        img {
            height: 460px;
        }
    }

    img {
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
    }

    .el-row {
        margin-top: 30px;
    }
</style>