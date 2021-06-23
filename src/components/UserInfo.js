export default class UserInfo {

  constructor({nameSelector, infoSelector}) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const user = {
      name: this._name.textContent.trim(),
      info: this._info.textContent.trim()
    };
    return user;
  }

  setUserInfo({name, info}) {
    this._name.textContent = name.trim();
    this._info.textContent = info.trim();
  }
}