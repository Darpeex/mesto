class UserInfo {
  #profileNameElement;
  #profileDescriptionElement;
  
  constructor( profileNameSelector, profileAboutSelector ) {
    this.#profileNameElement = document.querySelector(profileNameSelector);
    this.#profileDescriptionElement = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    return {
      userName: this.#profileNameElement.textContent,
      userDescription: this.#profileDescriptionElement.textContent
    }
  }

  setUserInfo({ userName, userDescription }) {
    this.#profileNameElement.textContent = userName;
    this.#profileDescriptionElement.textContent = userDescription;
  }
}

export default UserInfo;