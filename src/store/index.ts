import { createStore } from "vuex";
import { State, Article } from "../types";

const store = createStore({
  state(): State {
    return {
      articles: [
        { id: 1, title: "第1篇文章的标题", content: "这是第1篇文章的内容", releaseTime: 1657458128375, tags: ["Tag1"] },
        { id: 2, title: "第2篇文章的标题", content: "这是第2篇文章的内容", releaseTime: 1657458228375, tags: ["Tag1"] },
        { id: 3, title: "第3篇文章的标题", content: "这是第3篇文章的内容", releaseTime: 1657458328375, tags: ["Tag3"] },
        { id: 4, title: "第4篇文章的标题", content: "这是第4篇文章的内容", releaseTime: 1657458428375, tags: ["Tag1"] },
        { id: 5, title: "第5篇文章的标题", content: "这是第5篇文章的内容", releaseTime: 1657458528375, tags: ["Tag2"] },
        { id: 6, title: "第6篇文章的标题", content: "这是第6篇文章的内容", releaseTime: 1657458628375, tags: ["Tag2"] },
        { id: 7, title: "第7篇文章的标题", content: "这是第7篇文章的内容", releaseTime: 1657458728375, tags: ["Tag1", "Tag3"] },
        { id: 8, title: "第8篇文章的标题", content: "这是第8篇文章的内容", releaseTime: 1657458828375, tags: ["Tag1"] },
        { id: 9, title: "第9篇文章的标题", content: "这是第9篇文章的内容", releaseTime: 1657458928375, tags: ["Tag1", "Tag2"] },
        { id: 10, title: "第10篇文章的标题", content: "这是第10篇文章的内容", releaseTime: 1657458028375, tags: ["Tag1"] },
        { id: 11, title: "第11篇文章的标题", content: "这是第11篇文章的内容", releaseTime: 1657459028375, tags: ["Tag2"] },
        { id: 12, title: "第12篇文章的标题", content: "这是第12篇文章的内容", releaseTime: 1657410028375, tags: ["Tag1"] },
        { id: 13, title: "第13篇文章的标题", content: "这是第13篇文章的内容", releaseTime: 1657411028375, tags: ["Tag4"] },
        { id: 14, title: "第14篇文章的标题", content: "这是第14篇文章的内容", releaseTime: 1657412028375, tags: ["Tag1"] },
        { id: 15, title: "第15篇文章的标题", content: "这是第15篇文章的内容", releaseTime: 1657413028375, tags: ["Tag1", "Tag4"] },
        { id: 16, title: "第16篇文章的标题", content: "这是第16篇文章的内容", releaseTime: 1657414028375, tags: ["Tag2"] },
        { id: 17, title: "第17篇文章的标题", content: "这是第17篇文章的内容", releaseTime: 1657415028375, tags: ["Tag4"] },
        { id: 18, title: "第12篇文章的标题", content: "这是第12篇文章的内容", releaseTime: 1657416028375, tags: ["Tag1"] },
        { id: 19, title: "第13篇文章的标题", content: "这是第13篇文章的内容", releaseTime: 1657417028375, tags: ["Tag4"] },
        { id: 20, title: "第14篇文章的标题", content: "这是第14篇文章的内容", releaseTime: 1657418028375, tags: ["Tag1"] },
        { id: 21, title: "第15篇文章的标题", content: "这是第15篇文章的内容", releaseTime: 1657419028375, tags: ["Tag1", "Tag4"] },
        { id: 22, title: "第16篇文章的标题", content: "这是第16篇文章的内容", releaseTime: 1657420028375, tags: ["Tag2"] },
        { id: 23, title: "第17篇文章的标题", content: "这是第17篇文章的内容", releaseTime: 1657421028375, tags: ["Tag4"] },
      ],
      projects: [
        { id: 1, name: "个人博客网站", logoURL: "https://www.longjiaming.cn/img/longshaoyou_logo_128.jpg", introduce: "这是一个使用 Vue3 +TypeScript 全家桶开发的个人网站", tags: ["Vue3", "TypeScript", "Markdown"], url: "/" },
        { id: 2, name: "医院叫号系统", logoURL: "https://hospital.longjiaming.cn/loginImg.jpeg", introduce: "这是一个使用 Vue3 全家桶开发的医院叫号系统", tags: ["Vue3", "Vant", "Axios", "WebSocket", "Node.js", "Express"], url: "https://hospital.longjiaming.cn" },
        { id: 3, name: "酒店后台管理系统", logoURL: "https://hotel.longjiaming.cn/img/favicon.b1417257.svg", introduce: "这是一个使用 Vue2 全家桶写的酒店后台管理系统", tags: ["Vue2", "Element", "Axios", "Node.js", "Express"], url: "https://hotel.longjiaming.cn" },
        { id: 4, name: "个人启动页", logoURL: "https://www.longjiaming.cn/img/longshaoyou_logo_128.jpg", introduce: "这是一个使用原生写的浏览器启动页", tags: ["HTML5", "CSS3", "Javascript", "ES6"], url: "https://www.longjiaming.cn/startPage/" },
      ],
      MenuItems: [
        { id: 1, name: "主页", to: "/" },
        { id: 2, name: "文章", to: "/article" },
        { id: 3, name: "项目", to: "/project" },
        { id: 4, name: "留言", to: "/comment" },
      ],
    };
  },
  mutations: {
    addArticles(state: State): void {
      let len = state.articles.length;
      for (let index = len; index <= len + 5; index++) {
        state.articles.push({
          id: index,
          title: `第${index}篇文章的标题`,
          content: `这是第${index}篇文章的内容`,
          releaseTime: Date.now(),
          tags: ["test1"],
        });
      }
    },
    sortArticles(state: State): void {
      state.articles.sort((a: Article, b: Article) => a.releaseTime - b.releaseTime);
    },
    addArticle(state: State, article: Article): void {
      state.articles.push(article);
    },
  },
  getters: {
    doneTodos(state: State): Article[] {
      return state.articles;
    },
  },
});
export default store;
