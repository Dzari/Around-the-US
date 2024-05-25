export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
    this._profileName = document.querySelector("#edit-profile-name-placeholder");
    this._profileJob = document.querySelector("#edit-profile-subtitle-placeholder");
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._profileName.value = name;
    this._profileJob.value = job;
  }
}
