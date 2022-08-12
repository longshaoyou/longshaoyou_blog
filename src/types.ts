import { Store } from "vuex";
export interface Article {
  id: number; //文章id
  title: string; //文章标题
  content: string; //文章内容
  releaseTime: number; //发布时间
  tags: string[]; //标签
}
export interface Project {
  id: number;
  name: string;
  logoURL: string;
  tags: string[];
  introduce: string; //简介
  url: string;
}
export interface MenuItem {
  id: number;
  name: string;
  to: string;
}
export interface State {
  articles: Article[];
  projects: Project[];
  MenuItems: MenuItem[];
}

export interface ComponentCustomProperties {
  $store: Store<State>;
}
