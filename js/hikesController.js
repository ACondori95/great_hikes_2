import HikeModel from "./hikeModel.js";
import HikesView from "./hikesView.js";
import Comments from "./comments.js";

export default class HikesController {
  constructor(parentId) {
    this.parentElement = document.getElementById(parentId);
    this.hikeModel = new HikeModel();
    this.hikesView = new HikesView(parentId);
    this.comments = new Comments("hikes", "comments");
  }
  showHikeList() {
    const hikeListElement = this.parentElement;
    const hikeList = this.hikeModel.getAllHikes();
    this.hikesView.renderHikeList(hikeListElement, hikeList);
    this.addHikeListener();
    this.comments.showCommentList();
  }
  showOneHike(hikeName) {
    const hike = this.hikeModel.getHikeByName(hikeName);
    this.hikesView.renderOneHikeFull(this.parentElement, hike).ontouchend =
      () => {
        this.showHikeList();
      };
    this.comments.showCommentList(hikeName);
  }
  addHikeListener() {
    const childrenArray = Array.from(this.parentElement.children);
    childrenArray.forEach((child) => {
      child.addEventListener("touchend", (e) => {
        this.showOneHike(e.currentTarget.dataset.name);
      });
    });
  }
}
