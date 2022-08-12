<script setup lang="ts">
import { computed, onMounted, reactive, watch } from "vue";
import { useStore } from "vuex";
import { Article } from "../types";
import Card from "../components/Card.vue";
import { getTime } from "../utils/day";
const store = useStore();
interface ArticleListInfo {
  isOpenArticle: boolean; //是否打开文章
  searchModel: "标题" | "标签"; //搜索栏的模式
  page: number; //当前页数
  openArticleID: number; //打开文章的id
  sortArticles: Article[]; //排序后的文章列表
  nowarticles: Article[]; //当前显示的文章列表
  nowArticle: Article | null; //现在打开的文章列表
  searchString: string; //搜索的字符串
  isWriteArticle: boolean; //是否打开写文章界面
  addArticle: {
    //写文章的数据
    title: string; //标题
    tags: string; //标签
    content: string; //内容
    isError: boolean; //是否有错误
  };
}
const articleListInfo: ArticleListInfo = reactive({
  isOpenArticle: false,
  searchModel: "标题",
  page: 0,
  openArticleID: -1,
  sortArticles: (store.state.articles as Article[]).sort((a: Article, b: Article) => b.releaseTime - a.releaseTime),
  nowarticles: [],
  nowArticle: null,
  searchString: "",
  isWriteArticle: false,
  addArticle: { title: "", tags: "", content: "", isError: false },
});
//watch
// 监听页数变化，更换表格中的数据
watch(
  () => articleListInfo.page,
  (newPage: number) => {
    let { page } = articleListInfo;
    articleListInfo.nowarticles = articleListInfo.sortArticles.filter((article: Article, index: number): boolean | undefined => {
      if (page * 5 <= index && (page + 1) * 5 > index) {
        return true;
      }
    });
  }
);
//筛选一次冲0开始
watch(articleListInfo.sortArticles, () => {
  articleListInfo.page = 0;
});
//computed
const pageList = computed(() => {
  const pageArr: number[] = [];
  let max: number = Math.ceil(articleListInfo.sortArticles.length / 5);
  if (max <= 5) {
    for (let index = 0; index < max; index++) {
      pageArr.push(index + 1);
    }
  } else if (articleListInfo.page <= 4 && max > 5) {
    for (let index = 0; index <= 5; index++) {
      pageArr.push(index + 1);
    }
  } else if (articleListInfo.page > 4 && max > 5) {
    let addIndex = 1;
    pageArr.push(articleListInfo.page + 1);
    while (pageArr.length < 5) {
      pageArr.push(articleListInfo.page - addIndex + 1, articleListInfo.page + addIndex + 1);
      addIndex++;
    }
  }
  return pageArr;
});
//方法
//关闭文章
const closeArticle = () => {
  articleListInfo.isOpenArticle = false;
};
//下一页
const addPage = () => {
  articleListInfo.page++;
};
//下一页
const reducePage = () => {
  articleListInfo.page--;
};
//跳转某一页
const jumpPage = (pageIndex: number) => {
  articleListInfo.page = pageIndex - 1;
};
//切换搜索模式
const switchSearchModel = () => {
  if (articleListInfo.searchModel === "标签") {
    articleListInfo.searchModel = "标题";
  } else {
    articleListInfo.searchModel = "标签";
  }
};
//打开文章
const openArticle = (article: Article) => {
  articleListInfo.openArticleID = article.id;
  articleListInfo.nowArticle = articleListInfo.nowarticles.filter((v) => v.id === articleListInfo.openArticleID)[0];
  articleListInfo.isOpenArticle = true;
};
//搜索文章
const searchArticle = (event: Event) => {
  event.preventDefault();
  const from = event.target as HTMLFormElement;
  const fromData: FormData = new FormData(from);
  articleListInfo.searchString = (fromData.get("searchString") as string).trim();
  if (articleListInfo.searchString === "") {
    articleListInfo.sortArticles = (store.state.articles as Article[]).sort((a: Article, b: Article) => b.releaseTime - a.releaseTime);
  } else if (articleListInfo.searchModel === "标签") {
    articleListInfo.sortArticles = store.state.articles
      .filter((v: Article): boolean => {
        for (const tag of v.tags) {
          if (tag.includes(articleListInfo.searchString)) {
            return true;
          }
        }
        return false;
      })
      .sort((a: Article, b: Article) => b.releaseTime - a.releaseTime);
  } else {
    articleListInfo.sortArticles = store.state.articles.filter((v: Article) => v.title.includes(articleListInfo.searchString)).sort((a: Article, b: Article) => b.releaseTime - a.releaseTime);
  }
  articleListInfo.page = 0;
  articleListInfo.nowarticles = articleListInfo.sortArticles.filter((v, index) => index <= 5);
};
//写文章
const addArticle = (event: Event) => {
  event.preventDefault();
  const from = event.target as HTMLFormElement;
  const fromData: FormData = new FormData(from);
  const title = fromData.get("title") as string;
  let tagstring = fromData.get("tags") as string;
  const content = fromData.get("content") as string;
  // console.log(title, tags, content);
  if (title === "" || tagstring === "" || content === "") {
    articleListInfo.addArticle.isError = true;
    setTimeout(() => (articleListInfo.addArticle.isError = false), 10000);
  }
  const tags = tagstring.split(",");
  // console.log(tags);
  const newArticle: Article = { id: (Math.random() * 1000) | 0, title, content, tags, releaseTime: Date.now() };
  articleListInfo.isWriteArticle = false;
  store.commit("addArticle", newArticle);
  articleListInfo.nowarticles = articleListInfo.nowarticles.sort((a: Article, b: Article) => b.releaseTime - a.releaseTime);
};
//懒加载表格
onMounted(() => {
  articleListInfo.nowarticles = articleListInfo.sortArticles.filter((v, index) => index <= 5);
});
</script>

<template>
  <div class="article">
    <Card v-show="!articleListInfo.isOpenArticle && !articleListInfo.isWriteArticle">
      <div class="article-fun-area">
        <button class="article-fun-btn" @click="() => (articleListInfo.isWriteArticle = true)">写文章</button>
        <form class="search-from" @submit="searchArticle">
          <input class="search-prefix" type="button" :value="articleListInfo.searchModel" @click="switchSearchModel" />
          <input class="search-content" type="search" name="searchString" placeholder="搜索内容" />
          <input class="search-submit" type="submit" alt="搜索" width="20px" height="20px" value="搜索" name="submit" />
        </form>
      </div>
      <div class="articles-list">
        <div class="article-head">
          <div class="article-title">标题</div>
          <div class="article-releaseTime">创建时间</div>
          <div class="article-tags">标签</div>
        </div>
        <div v-for="article in articleListInfo.nowarticles" :key="article.id" class="article-item" @click="() => openArticle(article)">
          <div class="article-title">{{ article.title }}</div>
          <div class="article-releaseTime">{{ getTime(article.releaseTime) }}</div>
          <div class="article-tags">
            <span v-for="(tag, index) in article.tags" :key="index" class="article-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button class="btn-prev" @click="reducePage" :disabled="articleListInfo.page <= 0">&lt;</button>
        <button :class="{ 'btn-page': true, 'now-page': pageIndex - 1 === articleListInfo.page }" v-for="pageIndex in pageList" @click="jumpPage(pageIndex)">
          <span>{{ pageIndex }}</span>
        </button>
        <button class="btn-next" @click="addPage" :disabled="articleListInfo.page + 1 >= Math.ceil(store.state.articles.length / 5)">></button>
      </div>
    </Card>
    <Card v-if="articleListInfo.isOpenArticle && articleListInfo.nowArticle != null" :title="articleListInfo.nowArticle.title" :content="articleListInfo.nowArticle.content" :releaseTime="articleListInfo.nowArticle.releaseTime" :tags="articleListInfo.nowArticle.tags" :close="articleListInfo.isOpenArticle" @closeCard="closeArticle" />
    <Card v-if="articleListInfo.isWriteArticle" width="550px" height="80vh" position="relative">
      <h1 style="{{text-align: center;}}">欢迎编写高质量的博客！</h1>
      <form class="add-article-from" @submit="addArticle">
        <div class="add-article-input">
          <input class="add-article-prefix" type="button" value="标题" />
          <input class="add-article-content" type="search" name="title" placeholder="输入标题" />
        </div>
        <div class="add-article-input">
          <input class="add-article-prefix" type="button" value="标签" />
          <input class="add-article-content" type="search" name="tags" placeholder="输入标签，使用英文逗号分开" />
        </div>
        <h2>内容：</h2>
        <div class="add-article-input">
          <textarea class="add-article-content add-article-textarea" name="content" rows="5" v-model="articleListInfo.addArticle.content"></textarea>
        </div>
        <div>
          <h3 class="add-article-error-text" v-show="articleListInfo.addArticle.isError">提示：标题、标签、内容都要输入哦！</h3>
        </div>
        <div class="add-article-input add-article-submit">
          <input class="add-article-content" type="submit" name="searchString" value="提交" />
        </div>
      </form>
    </Card>
  </div>
</template>

<style scpoed>
.article {
  width: 100%;
  height: 100%;
  /* margin:auto; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.no-open-articl,
.open-articl {
  width: 80%;
}
.articles-list {
  width: 100%;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.article-item,
.article-head {
  width: 100%;
  height: 36px;
  line-height: 36px;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.5s;
}
.article-item:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
.article-title,
.article-tags {
  width: 150px;
  overflow: hidden;
}
.article-tag {
  background: #ecf5ff;
  border: 1px #d9ecff solid;
  height: 36px;
  margin: 1px;
  line-height: 36px;
  padding: 0 9px;
  border-radius: 4px;
  color: #409eff;
}
.btn-prev,
.btn-next,
.btn-page {
  width: 20px;
  background-color: #f5f7fa;
  border: 0;
  margin: 5px;
  cursor: pointer;
  padding: 0;
  line-height: 20px;
  font-size: 20px;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 12%), 0 3px 1px -2px rgb(0 0 0 / 6%), 0 1px 5px 0 rgb(0 0 0 / 12%);
}
.now-page {
  color: #409eff;
}
.pagination {
  display: flex;
  justify-content: end;
}
.article-fun-area {
  display: flex;
  justify-content: space-between;
}
.article-fun-btn-list {
  display: flex;
}
.article-fun-btn {
  background-color: #fff;
  color: #606266;
  text-align: center;
  transition: 0.1s;
  border: 1px solid #dcdfe6;
  padding: 8px 15px;
  height: 38px;
  border-radius: 4px;
  margin: 0 10px;
  cursor: pointer;
}
.article-fun-btn:hover {
  background-color: #ecf5ff;
}

/* 搜索栏 */
.search-box {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 47px;
  /* padding-top: 90px; */
  max-width: 520px;
  width: 80%;
  /* margin: 0 auto; */
}
.search-from,
.add-article-input {
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0 10px 0 4px;
  position: relative;
  line-height: 38px;
  border: 1px solid #e3e5e7;
  background-color: #f1f2f3;
  border-radius: 8px;
  opacity: 0.9;
  transition: background-color 1s;
}

.search-content,
.add-article-content {
  border: 0;
  background-color: transparent;
  line-height: 38px;
  outline: 0;
  padding: 0 8px;
  flex: 1;
}
.search-submit,
.search-prefix,
.add-article-prefix {
  border: 0;
  background-color: transparent;
  line-height: 38px;
  cursor: pointer;
  color: #606266;
}
.add-article-input {
  margin: 10px 0;
}
.add-article-textarea {
  display: flex;
  max-height: 250px;
  line-height: 16px;
}
.add-article-submit {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.add-article-error-text {
  color: #606266;
  transition: 5s;
}
/* .search-submit:hover,
.search-prefix:hover {
  background-color: #fff;
} */
</style>
