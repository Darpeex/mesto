// Делаем выборку DOM элементов
const popupElement = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__info_edit-button');
const popupCloseButton = popupElement.querySelector('.popup__submit-button_action_close');
const popupSaveButton = popupElement.querySelector('.popup__submit-button_action_save');

// Открываем попап
const openPopup = function () {
  popupElement.classList.add('popup_opened');
};
popupEditButton.addEventListener('click', openPopup);

// Закрываем попап
const closePopup = function () {
  popupElement.classList.remove('popup_opened');
};
popupCloseButton.addEventListener('click', closePopup);





// При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице
// Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются. О том, как работает кнопка «Сохранить», расскажем дальше.
//После внесения изменений и нажатия кнопки «Сохранить» информация на странице должна обновиться, а попап автоматически закрыться:
// Специальное событие submit отправляет форму (его мы ещё не проходили). Перед вами шаблон кода, реализующий его обработку. Постарайтесь в нём разобраться. Мы оставили в коде комментарии, которые с этим помогут:

//Посмотреть на Я.П