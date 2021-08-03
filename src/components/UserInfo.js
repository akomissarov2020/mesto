export default class UserInfo {

  constructor({nameSelector, infoSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const user = {
      name: this._name.textContent.trim(),
      info: this._info.textContent.trim()
    };
    return user;
  }

  setUserInfo({name, about, avatar}) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
  }
}