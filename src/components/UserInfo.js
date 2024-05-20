export default class UserInfo {
  constructor() {
    this._profileName = document.querySelector(".profile__name");
    this._profileJob = document.querySelector(".profile__subtitle");
  }

  getUserInfo() {
    return {
      title: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo({ name, subtitle }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = subtitle;
  }
}
