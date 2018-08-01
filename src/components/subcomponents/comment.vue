<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea  placeholder="请输入内容( 最多120字 )" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="( item,i ) in comments" :key="item.add_time">
                <div class="cms-title">
                    第{{ i+1 }}}楼&nbsp;&nbsp;用户: {{ item.user_name }}&nbsp;&nbsp;;发表时间:{{ item.add_time | dataFormat }}
                </div>
                <div class="cms-body">
                    {{ item.content ==='undefined' ? '无内容' : item.content }}
                </div>
            </div>
        </div>
       
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pageindex: 1, //默认展示第一页数据
                comments: []
            }
        },
        created() {
            getComments();
        },
        methods: {
            getComments() {
                this.$http
                .get("api/getcomments/"+this.id+this.pageindex)
                .then(resule => {
                    if(resule.status === 0) {
                        // this.comments = result.body.message;
                        // 每当获取新评论数据的时候,不要把老数据清覆盖,而是应该老数据拼接新数据
                        this.comments = this.comments.concat( result.body.message )
                    } else {
                        Toast("获取评论失败")
                    }
                })
            },
            getMore(){
                // 加载更多
                this.pageIndex++;
                this.getComments();
            }
        },
        props:["id"]
    }
</script>
<style lang="scss" scoped>
    .cmt-container {
        h3 {
            font-size: 10px;
        }
        textarea {
            font-size:14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                .cmt-title{
                    line-height: 30px;
                    background-color: #ccc;
                }
                .cmt-body {
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>
