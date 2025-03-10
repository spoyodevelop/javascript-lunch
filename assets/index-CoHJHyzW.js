(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function createElement(tag, props = {}) {
  const element = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === "className") {
      if (Array.isArray(value)) {
        element.classList.add(...value);
      } else if (typeof value === "string") {
        element.classList.add(value);
      }
      return;
    }
    if (key in element) element[key] = value;
  });
  return element;
}
function createElementsFragment(elements) {
  const fragment = document.createDocumentFragment();
  fragment.append(...elements);
  return fragment;
}
function createButton({
  type,
  textContent,
  className,
  onclick
}) {
  return createElement("button", {
    type,
    onclick,
    className,
    textContent
  });
}
const defaultOption = { value: "", text: "선택해 주세요" };
function createDropdownBox({
  labelText,
  id,
  dropdownList,
  required = false
}) {
  const dropdownBox = createElement("div", {
    className: ["form-item", required && "form-item--required"]
  });
  const dropdownLabel = createElement("label", {
    htmlFor: id,
    className: "text-caption",
    textContent: labelText
  });
  const select = createElement("select", {
    name: id,
    id,
    required
  });
  const optionList = [defaultOption, ...dropdownList];
  const optionElements = optionList.map(
    ({ value, text }) => createElement("option", {
      value,
      textContent: text
    })
  );
  select.append(...optionElements);
  const fragment = createElementsFragment([dropdownLabel, select]);
  dropdownBox.appendChild(fragment);
  return dropdownBox;
}
function createInputBox({
  labelText,
  type,
  id,
  required = false,
  textCaption = "",
  placeholder = ""
}) {
  const inputBox = createElement("div", {
    className: ["form-item", `${required && "form-item--required"}`]
  });
  const inputLabel = createElement("label", {
    htmlFor: id,
    className: "text-caption",
    textContent: labelText
  });
  const input = createElement("input", {
    type,
    name: id,
    id,
    required,
    placeholder
  });
  const fragment = createElementsFragment([inputLabel, input]);
  if (textCaption) {
    const textCaptionEl = createElement("span", {
      className: ["help-text", "text-caption"],
      textContent: textCaption
    });
    fragment.appendChild(textCaptionEl);
  }
  inputBox.appendChild(fragment);
  return inputBox;
}
function createTextAreaBox({
  id,
  labelText,
  required = false,
  textCaption = "",
  cols = 30,
  rows = 5,
  placeholder = ""
}) {
  const textAreaBox = createElement("div", {
    className: ["form-item", `${required && "form-item--required"}`]
  });
  const textAreaLabel = createElement("label", {
    htmlFor: "description",
    className: "text-caption",
    textContent: labelText
  });
  const textArea = createElement("textarea", {
    name: id,
    id,
    cols,
    rows,
    placeholder
  });
  const fragment = createElementsFragment([textAreaLabel, textArea]);
  if (textCaption) {
    const textCaptionEl = createElement("span", {
      className: ["help-text", "text-caption"],
      textContent: textCaption
    });
    fragment.appendChild(textCaptionEl);
  }
  textAreaBox.appendChild(fragment);
  return textAreaBox;
}
const FOOD_CATEGORY = [
  { value: "한식", text: "한식" },
  { value: "중식", text: "중식" },
  { value: "일식", text: "일식" },
  { value: "아시안", text: "아시안" },
  { value: "양식", text: "양식" },
  { value: "기타", text: "기타" }
];
const RESTAURANT_DISTANCE = [
  { value: "5", text: "5분 내" },
  { value: "10", text: "10분 내" },
  { value: "15", text: "15분 내" },
  { value: "20", text: "20분 내" },
  { value: "30", text: "30분 내" }
];
const RESTAURANT_FIELD_LENGTH = {
  name: { min: 1, max: 12 },
  description: { min: 0, max: 300 },
  link: { min: 0, max: 300 }
};
const ERROR_MESSAGE = {
  INVALID_CATEGORY: "존재하지 않는 카테고리 입니다.",
  INVALID_RESTAURANT_NAME_LENGTH: `음식점 이름은 ${RESTAURANT_FIELD_LENGTH.name.min}글자 이상, ${RESTAURANT_FIELD_LENGTH.name.max}글자 이하만 가능합니다.`,
  INVALID_RESTAURANT_DISTANCE: "음식점 거리가 유효하지 않습니다.",
  INVALID_RESTAURANT_DESCRIPTION_LENGTH: `음식점 설명은 ${RESTAURANT_FIELD_LENGTH.description.max}이하만 가능합니다.`,
  INVALID_RESTAURANT_LINK_LENGTH: `움식점 링크는 ${RESTAURANT_FIELD_LENGTH.link.max}이하만 가능합니다.`,
  DUPLICATE_RESTAURANT: `이미 동일한 이름의 음식점이 있습니다. 다른 음식점을 입력해주세요.`
};
function extractByKey(list, key) {
  return list.map((item) => item[key]).filter((value) => typeof value === "string");
}
function extractFormData(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}
function isInRange(value, min, max) {
  return value >= min && value <= max;
}
const categoryList = extractByKey(FOOD_CATEGORY, "value");
const distanceList = extractByKey(RESTAURANT_DISTANCE, "value");
function _validateRestaurantCategory(category) {
  if (!categoryList.includes(category)) {
    throw new Error(ERROR_MESSAGE.INVALID_CATEGORY);
  }
}
function _validateRestaurantName(restaurantName) {
  if (!isInRange(
    restaurantName.length,
    RESTAURANT_FIELD_LENGTH.name.min,
    RESTAURANT_FIELD_LENGTH.name.max
  )) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTAURANT_NAME_LENGTH);
  }
}
function _validateRestaurantDistance(distance) {
  if (!distanceList.includes(distance)) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTAURANT_DISTANCE);
  }
}
function _validateRestaurantDescription(description) {
  if (!isInRange(
    description.length,
    RESTAURANT_FIELD_LENGTH.description.min,
    RESTAURANT_FIELD_LENGTH.description.max
  )) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTAURANT_DESCRIPTION_LENGTH);
  }
}
function _validateRestaurantLink(link) {
  if (!isInRange(
    link.length,
    RESTAURANT_FIELD_LENGTH.link.min,
    RESTAURANT_FIELD_LENGTH.link.max
  )) {
    throw new Error(ERROR_MESSAGE.INVALID_RESTAURANT_LINK_LENGTH);
  }
}
function restaurantFormValidation(restaurant) {
  _validateRestaurantCategory(restaurant.category);
  _validateRestaurantName(restaurant.name);
  _validateRestaurantDistance(restaurant.distance);
  _validateRestaurantDescription(restaurant.description);
  _validateRestaurantLink(restaurant.link);
  return { ...restaurant, isFavorite: false };
}
const categoryIcon = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png"
};
function createRestaurantItem({
  category,
  name,
  distance,
  description,
  link,
  isFavorite
}) {
  const restaurantItem = createElement("li", { className: "restaurant" });
  restaurantItem.innerHTML = `
  <div class="restaurant__category">
    <img
      src="${categoryIcon[category]}"
      alt="${category}"
      class="category-icon"
    />
  </div>
  <div class="restaurant__info">

    <div class="restaurant__header"> 
      <div> 
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body"
        >캠퍼스부터 ${distance}분 내</span
      >
      </div>
       <img src="${isFavorite ? "./Star.png" : "./Un-star.png"}" class="favorite-icon"/>
    </div>
   
  
    <p class="restaurant__description text-body">
      ${description}
    </p>
    
  </div>
  `;
  return restaurantItem;
}
const Toast = {
  showToast(message, type = "error", duration = 5e3) {
    if (type === "info") duration = 2e3;
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    if (type == "error") message = message.replace("[ERROR]", "");
    toast.innerHTML = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, duration);
    toast.addEventListener("click", () => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    });
  },
  resetToast() {
    let toastContainer = document.querySelector(".toast-container");
    if (toastContainer) toastContainer.remove();
  }
};
const restaurantList = [
  {
    name: "피양콩할마니",
    distance: "10",
    description: "2005년, 장모님께 전수받은 전통 설렁탕 조리법을 현대적인 감각으로 재해석한 곳. 깊고 진한 국물 맛이 일품입니다.",
    isFavorite: false,
    category: "한식",
    link: "https://pi-yangkonghalmani.com"
  },
  {
    name: "친친",
    distance: "10",
    description: "2004년부터 이어온 깊은 내공의 중식당. 편리한 교통과 넓은 주차 공간, 그리고 정통 중화요리를 경험할 수 있는 곳.",
    isFavorite: false,
    category: "중식",
    link: "https://chinchin-chinese.com"
  },
  {
    name: "잇쇼우",
    distance: "5",
    description: "정통 사누끼 우동을 직접 제면하여 선보이는 전문점. 장인의 정성이 담긴 깊은 감칠맛을 경험해 보세요.",
    isFavorite: false,
    category: "일식",
    link: "https://isshou-udon.jp"
  },
  {
    name: "이태리키친",
    distance: "20",
    description: "정통 이탈리안 요리에 창의적인 변화를 더한 모던 다이닝 레스토랑.",
    isFavorite: false,
    category: "양식",
    link: "https://italykitchen.co.kr"
  }
];
function addRestaurant(restaurant) {
  if (searchRestaurant(restaurant.name))
    throw new Error(ERROR_MESSAGE.DUPLICATE_RESTAURANT);
  restaurantList.push(restaurant);
}
function searchRestaurant(name) {
  return restaurantList.find((item) => item.name === name);
}
function createRestaurantForm() {
  const restaurantAddForm = createElement("form", {
    className: "restaurant-add-form"
  });
  restaurantAddForm.append(
    createDropdownBox({
      labelText: "카테고리",
      id: "category",
      dropdownList: FOOD_CATEGORY,
      required: true
    }),
    createInputBox({
      labelText: "이름",
      required: true,
      type: "text",
      id: "name",
      placeholder: "음식점 이름(12자 이하)"
    }),
    createDropdownBox({
      labelText: "거리(도보 이동 시간)",
      id: "distance",
      dropdownList: RESTAURANT_DISTANCE,
      required: true
    }),
    createTextAreaBox({
      labelText: "설명",
      id: "description",
      textCaption: "메뉴 등 추가 정보를 입력해 주세요.",
      placeholder: "설명은 300자 이하여야 합니다. 맛있는 설명을 곁들여 주세요!"
    }),
    createInputBox({
      labelText: "참고 링크",
      type: "text",
      id: "link",
      textCaption: "메장 정보를 확인할 수 있는 링크를 입력해 주세요.",
      placeholder: "https://example.com 링크는 300자 이하여야 합니다."
    })
  );
  const buttonContainer = createElement("div", {
    className: "button-container"
  });
  buttonContainer.append(
    createButton({
      type: "button",
      className: [
        "button",
        "button--secondary",
        "text-caption",
        "cancel-button"
      ],
      textContent: "취소하기",
      onclick: () => document.querySelector(".modal").close()
    }),
    createButton({
      type: "submit",
      className: ["button", "button--primary", "text-caption"],
      textContent: "추가하기"
    })
  );
  restaurantAddForm.appendChild(buttonContainer);
  function handleAddRestaurantFormSubmit(event) {
    event.preventDefault();
    try {
      const restaurantForm = extractFormData(restaurantAddForm);
      const restaurant = restaurantFormValidation(restaurantForm);
      const restaurantListElement2 = document.querySelector(".restaurant-list");
      addRestaurant(restaurantForm, restaurantList);
      restaurantListElement2.appendChild(createRestaurantItem(restaurantForm));
      Toast.showToast(`${restaurant.name} 음식점을 추가했습니다.`, "success");
      const modal = document.querySelector(".modal");
      restaurantAddForm.reset();
      modal.close();
    } catch (error) {
      Toast.showToast(`${error.message}`, "error");
    }
  }
  restaurantAddForm.addEventListener("submit", handleAddRestaurantFormSubmit);
  return restaurantAddForm;
}
document.querySelector("#app");
const modalContainer = document.querySelector(".modal-container");
const restaurantFrom = createRestaurantForm();
const restaurantListElement = document.querySelector(".restaurant-list");
modalContainer.appendChild(restaurantFrom);
restaurantList.forEach(
  (restaurantItem) => restaurantListElement.appendChild(createRestaurantItem(restaurantItem))
);
function handleBottomSheetToggle(event) {
  const modal = document.querySelector(".modal");
  if (event.target.closest(".restaurant-add-button")) {
    modal.show();
  }
  if (event.target.closest(".modal-backdrop")) {
    modal.close();
  }
}
document.body.addEventListener("click", handleBottomSheetToggle);
