class UserInfo {
  #profileNameElement;
  #profileDescriptionElement;
  
  constructor( profileNameSelector, profileAboutSelector ) {
    this.#profileNameElement = profileNameSelector;
    this.#profileDescriptionElement = profileAboutSelector;
    // console.log(this.#profileNameElement);
    // console.log(this.#profileDescriptionElement);
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