<template>
    <div class="empty-main">
        <div class="empty-content">
            <img class="empty-image" :src="emptyLogo" />
            <div class="empty-wording">{{emptyWording}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        model: {},
        props: {
            emptyLogo: {
                type: String,
                default: '../../static/images/icon-blank.png'
            },
            emptyWording: {
                type: String,
                default: '为空页面提示文字'
            }
        },
        data() {
            return {};
        },
        created() {},
        destroyed() {},
        watch: {},
        methods: {},
        components: {}
    };
</script>

<style scoped>
    .empty-main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .empty-content {
        position: absolute;
        top: 40%;
        transform: translateY(-50%);
        text-align: center;
        width: 100%;
    }
    .empty-image {
        margin: 0 auto;
        width: 107px;
        height: 107px;
    }
    .empty-wording {
        font-size: 16px;
        color: #838A91;
        margin-top: 10px;
    }
</style>
