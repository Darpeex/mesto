class UserInfo {
  #profileNameElement;
  #profileDescriptionElement;
  
  constructor( profileNameSelector, profileAboutSelector ) {
    this.#profileNameElement = document.querySelector(profileNameSelector);
    this.#profileDescriptionElement = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    return {
      name: this.#profileNameElement.textContent,
      about: this.#profileDescriptionElement.textContent
    }
  }

  setUserInfo(newUserData) {
    this.#profileNameElement.textContent = newUserData.name;
    this.#profileDescriptionElement.textContent = newUserData.about;
  }
}

export default UserInfo;