class UserInfo {
  #profileNameElement;
  #profileAvatarElement;
  #profileDescriptionElement;
  
  constructor( profileNameSelector, profileAboutSelector, profileUpdateAvatar) { // name, about, avatar
    this.#profileNameElement = document.querySelector(profileNameSelector);
    this.#profileAvatarElement = document.querySelector(profileUpdateAvatar);
    this.#profileDescriptionElement = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    return {
      name: this.#profileNameElement.textContent,
      about: this.#profileDescriptionElement.textContent,
      avatar: this.#profileAvatarElement.textContent
    }
  }

  setUserInfo(newUserData) {
    this.#profileNameElement.textContent = newUserData.name;
    this.#profileDescriptionElement.textContent = newUserData.about;
    this.#profileAvatarElement.textContent = newUserData.avatar
  }
}

export default UserInfo;