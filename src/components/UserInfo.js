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

  initUser({name, about, avatar}) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
  }

  setUserInfo({name, info}) {
    this._name.textContent = name;
    this._info.textContent = info;
  }

  setUserAvatar(url) {
    this._avatar.src = url;
  }
}