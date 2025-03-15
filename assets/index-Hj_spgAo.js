var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _restaurantList;
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
const RESTAURANT_DISTANCE_VALUES = [
  "5",
  "10",
  "15",
  "20",
  "30"
];
const RESTAURANT_FIELD_LENGTH = {
  name: { min: 1, max: 12 },
  description: { min: 0, max: 300 },
  link: { min: 0, max: 300 }
};
const INITIAL_RESTAURANT = [
  {
    name: "피양콩할마니",
    distance: 10,
    description: "2005년, 장모님께 전수받은 전통 설렁탕 조리법을 현대적인 감각으로 재해석한 곳. 깊고 진한 국물 맛이 일품입니다.",
    isFavorite: false,
    category: "한식",
    link: "https://pi-yangkonghalmani.com"
  },
  {
    name: "친친",
    distance: 10,
    description: "2004년부터 이어온 깊은 내공의 중식당. 편리한 교통과 넓은 주차 공간, 그리고 정통 중화요리를 경험할 수 있는 곳.",
    isFavorite: false,
    category: "중식",
    link: "https://chinchin-chinese.com"
  },
  {
    name: "잇쇼우",
    distance: 5,
    description: "정통 사누끼 우동을 직접 제면하여 선보이는 전문점. 장인의 정성이 담긴 깊은 감칠맛을 경험해 보세요.",
    isFavorite: false,
    category: "일식",
    link: "https://isshou-udon.jp"
  },
  {
    name: "이태리키친",
    distance: 20,
    description: "정통 이탈리안 요리에 창의적인 변화를 더한 모던 다이닝 레스토랑.",
    isFavorite: false,
    category: "양식",
    link: "https://italykitchen.co.kr"
  },
  {
    name: "수라간",
    distance: 5,
    description: "궁중 요리를 현대적으로 재해석한 한정식 전문점. 엄선된 재료와 정갈한 조리법으로 한식의 품격을 느낄 수 있습니다.",
    isFavorite: false,
    category: "한식",
    link: "https://souragan.kr"
  },
  {
    name: "홍콩반점0410",
    distance: 15,
    description: "가성비 뛰어난 짬뽕과 탕수육을 맛볼 수 있는 프랜차이즈 중식당. 매운맛 조절이 가능하며, 해물 육수로 깊은 맛을 냅니다.",
    isFavorite: false,
    category: "중식",
    link: "https://hongkongbanjum.com"
  },
  {
    name: "스시히로바",
    distance: 10,
    description: "고급 오마카세 스타일의 스시 전문점. 신선한 해산물과 장인의 기술이 어우러져 정통 일본 초밥의 깊은 풍미를 제공합니다.",
    isFavorite: false,
    category: "일식",
    link: "https://sushihiroba.com"
  },
  {
    name: "타이팟",
    distance: 20,
    description: "현지에서 직접 공수한 향신료를 활용해 태국 전통 요리를 선보이는 레스토랑. 팟타이와 똠양꿍이 대표 메뉴입니다.",
    isFavorite: false,
    category: "아시안",
    link: "https://thaipat.com"
  },
  {
    name: "비스트로루카",
    distance: 10,
    description: "이탈리아 가정식을 모티브로 한 소박하지만 정성 가득한 요리를 선보이는 레스토랑. 따뜻한 분위기 속에서 즐기는 파스타와 리조또가 인기입니다.",
    isFavorite: false,
    category: "양식",
    link: "https://bistroluca.com"
  },
  {
    name: "BBQ치킨",
    distance: 5,
    description: "바삭하고 촉촉한 프리미엄 치킨을 즐길 수 있는 브랜드. 다양한 소스와 사이드 메뉴가 준비되어 있습니다.",
    isFavorite: false,
    category: "기타",
    link: "https://bbqchicken.com"
  }
];
const ERROR_MESSAGE = {
  INVALID_CATEGORY: "존재하지 않는 카테고리 입니다.",
  INVALID_RESTAURANT_NAME_LENGTH: `음식점 이름은 ${RESTAURANT_FIELD_LENGTH.name.min}글자 이상, ${RESTAURANT_FIELD_LENGTH.name.max}글자 이하만 가능합니다.`,
  INVALID_RESTAURANT_DISTANCE: "음식점 거리가 유효하지 않습니다.",
  INVALID_RESTAURANT_DESCRIPTION_LENGTH: `음식점 설명은 ${RESTAURANT_FIELD_LENGTH.description.max}이하만 가능합니다.`,
  INVALID_RESTAURANT_LINK_LENGTH: `움식점 링크는 ${RESTAURANT_FIELD_LENGTH.link.max}이하만 가능합니다.`,
  DUPLICATE_RESTAURANT: "이미 동일한 이름의 음식점이 있습니다. 다른 음식점을 입력해주세요.",
  NO_RESTAURANT_FOUND: "해당 레스토랑이 없습니다. 이미 지워진것 일수 있어요."
};
const CATEGORY_ICON = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png"
};
const FOOD_CATEGORY_VALUES = [
  "한식",
  "중식",
  "일식",
  "아시안",
  "양식",
  "기타"
];
function isInRange(value, min, max) {
  return value >= min && value <= max;
}
function _validateRestaurantCategory(category) {
  if (!FOOD_CATEGORY_VALUES.includes(category)) {
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
  if (!RESTAURANT_DISTANCE_VALUES.includes(distance.toString())) {
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
function restaurantFormValidation(restaurantForm) {
  _validateRestaurantCategory(restaurantForm.category);
  _validateRestaurantName(restaurantForm.name);
  _validateRestaurantDistance(restaurantForm.distance);
  _validateRestaurantDescription(restaurantForm.description);
  _validateRestaurantLink(restaurantForm.link);
  const { name, distance, description, category, link } = restaurantForm;
  return {
    name,
    distance: +distance,
    description,
    category,
    link,
    isFavorite: false
  };
}
class RestaurantList {
  constructor(restaurantList) {
    __privateAdd(this, _restaurantList, []);
    __privateSet(this, _restaurantList, restaurantList);
  }
  get List() {
    return __privateGet(this, _restaurantList);
  }
  parseRestaurantForm(restaurantForm) {
    return restaurantFormValidation(restaurantForm);
  }
  searchRestaurant(name) {
    return __privateGet(this, _restaurantList).find((item) => item.name === name);
  }
  addRestaurant(restaurant) {
    if (this.searchRestaurant(restaurant.name))
      throw new Error(ERROR_MESSAGE.DUPLICATE_RESTAURANT);
    __privateGet(this, _restaurantList).push(restaurant);
  }
  deleteRestaurant(restaurantName) {
    if (!this.searchRestaurant(restaurantName))
      throw new Error(ERROR_MESSAGE.NO_RESTAURANT_FOUND);
    __privateSet(this, _restaurantList, [
      ...__privateGet(this, _restaurantList).filter((item) => item.name !== restaurantName)
    ]);
  }
  toggleFavoriteRestaurant(restaurant) {
    restaurant.isFavorite = !restaurant.isFavorite;
  }
}
_restaurantList = new WeakMap();
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
function appendStringForValue(array, string) {
  return array.map((ele) => ({ key: ele, value: ele + string }));
}
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
  let stringToAppend = "";
  if (dropdownList === RESTAURANT_DISTANCE_VALUES) {
    stringToAppend = "분 내";
  }
  const mappedList = appendStringForValue(dropdownList, stringToAppend);
  const optionElements = [
    createElement("option", {
      value: "",
      textContent: "선택해 주세요"
    }),
    ...mappedList.map(
      ({ key, value }) => createElement("option", {
        value: key,
        textContent: value
      })
    )
  ];
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
function setDataset(element, data) {
  Object.keys(data).forEach((key) => {
    element.dataset[key] = data[key];
  });
}
function createRestaurantItem({
  category,
  name,
  distance,
  description,
  link,
  isFavorite
}) {
  const restaurantItem = createElement("li", {
    className: "restaurant",
    id: name
  });
  setDataset(restaurantItem, {
    name,
    distance,
    category
  });
  restaurantItem.innerHTML = `
  <div class="restaurant__category">
    <img
      src="${CATEGORY_ICON[category]}"
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
function createRestaurantForm(restaurantList) {
  const restaurantAddForm = createElement("form", {
    className: "restaurant-add-form",
    id: "restaurant-add-form"
  });
  restaurantAddForm.append(
    createDropdownBox({
      labelText: "카테고리",
      id: "category",
      dropdownList: FOOD_CATEGORY_VALUES,
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
      dropdownList: RESTAURANT_DISTANCE_VALUES,
      required: true
    }),
    createTextAreaBox({
      labelText: "설명",
      id: "description",
      textCaption: "메뉴 등 추가 정보를 입력해 주세요.",
      placeholder: `설명은 ${RESTAURANT_FIELD_LENGTH.name.max}자 이하여야 합니다. 맛있는 설명을 곁들여 주세요!`
    }),
    createInputBox({
      labelText: "참고 링크",
      type: "text",
      id: "link",
      textCaption: "메장 정보를 확인할 수 있는 링크를 입력해 주세요.",
      placeholder: `https://example.com 링크는 ${RESTAURANT_FIELD_LENGTH.link.max}자 이하여야 합니다.`
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
      onclick: () => document.querySelector(".form-modal").close()
    }),
    createButton({
      type: "submit",
      className: ["button", "button--primary", "text-caption"],
      textContent: "추가하기"
    })
  );
  restaurantAddForm.appendChild(buttonContainer);
  return restaurantAddForm;
}
const DICTIONARY = {
  name: "이름",
  distance: "거리",
  all: "모든 음식점",
  favorite: "자주 가는 음식점",
  전체: "전체",
  ...FOOD_CATEGORY_VALUES.reduce((acc, cur) => {
    return { ...acc, [cur]: cur };
  }, {})
};
function handleSort(sortFor, restaurantList, restaurantListElement) {
  const restaurantItems = Array.from(restaurantListElement.children);
  localStorage.setItem("sort", sortFor);
  const sortedItems = sortList(restaurantItems, sortFor);
  sortedItems.forEach((item) => restaurantListElement.appendChild(item));
  Toast.showToast(`${DICTIONARY[sortFor]}순으로 식당을 정렬합니다.`, "info");
}
function sortList(list, sortOption) {
  return list.sort((a, b) => {
    const nameA = a.name || a.dataset.name;
    const nameB = b.name || b.dataset.name;
    const distanceA = Number(a.distance || a.dataset.distance);
    const distanceB = Number(b.distance || b.dataset.distance);
    if (sortOption === "distance") {
      return distanceA - distanceB || nameA.localeCompare(nameB);
    }
    return nameA.localeCompare(nameB) || distanceA - distanceB;
  });
}
function handleCombinedFilter(event, restaurantListElement, restaurantList) {
  clearRestaurantList(restaurantListElement);
  const { categoryFilter, favoriteFilter } = getFilterValues();
  let filteredList = applyFilters(
    restaurantList.List,
    categoryFilter,
    favoriteFilter
  );
  const sortedList = applySorting(filteredList);
  updateRestaurantListUI$1(restaurantListElement, sortedList);
  showFilterToast(event.target.value);
}
function clearRestaurantList(restaurantListElement) {
  while (restaurantListElement.firstChild) {
    restaurantListElement.removeChild(restaurantListElement.firstChild);
  }
}
function getFilterValues() {
  return {
    categoryFilter: document.getElementById("category-filter").value,
    favoriteFilter: document.querySelector(
      'input[name="favoriteFilter"]:checked'
    ).value
  };
}
function applyFilters(restaurantList, categoryFilter, favoriteFilter) {
  let filteredList = restaurantList;
  if (favoriteFilter !== "all") {
    filteredList = filteredList.filter(({ isFavorite }) => isFavorite);
  }
  if (categoryFilter !== "전체") {
    filteredList = filteredList.filter(
      ({ category }) => category === categoryFilter
    );
  }
  return filteredList;
}
function applySorting(filteredList) {
  const sortOption = localStorage.getItem("sort") || "name";
  return sortList(filteredList, sortOption);
}
function updateRestaurantListUI$1(restaurantListElement, sortedList) {
  sortedList.forEach(
    (restaurantItem) => restaurantListElement.appendChild(createRestaurantItem(restaurantItem))
  );
}
function showFilterToast(filterValue) {
  if (filterValue === "all" || filterValue === "전체") {
    Toast.showToast("모든 음식점을 보여줄께요.", "info");
  } else {
    Toast.showToast(`${DICTIONARY[filterValue]}만 보여드릴께요.`, "info");
  }
}
function handleFormModalToggle(event, modal) {
  const target = event.target;
  if (!target) return;
  if (target.closest(".restaurant-add-button")) {
    modal.show();
  }
  if (target.closest(".modal-backdrop")) {
    modal.close();
  }
}
function createRestaurantDescription({
  category,
  name,
  distance,
  description,
  link,
  isFavorite
}) {
  const restaurantItem = createElement("div", {
    className: "restaurant-description"
  });
  restaurantItem.innerHTML = `
    <div class="restaurant__category description__icon">
      <img
        src="${CATEGORY_ICON[category]}"
        alt="${category}"
        class="category-icon"
      />
    </div>
    <div class="restaurant__info">
        
      <div class="restaurant__header description__header"> 
        <div> 
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body"
          >캠퍼스부터 ${distance}분 내</span
        >
        </div>
         <img src="${isFavorite ? "./Star.png" : "./Un-star.png"}" class="favorite-icon" id="description-favorite" />
      </div>
     
     <div class="description__contents">
      <p class="restaurant__description text-body">
        ${description}
      </p>
        <p class="restaurant__description text-body">
          <a href="${link}" target="_blank" class="link">
              ${link}
          </a>
        </p>
     </div>
      <div class="button-container">
        <button type="button" class="button button--secondary text-caption" id="delete-button">삭제하기</button>
        <button type="button" class="button button--primary text-caption" id="close-button">닫기</button>
      </div>
      
    </div>
    `;
  return restaurantItem;
}
function handleDescriptionModalToggle(event, restaurantList, {
  modal,
  container
}) {
  const target = event.target;
  if (!target) return;
  if (target.classList.contains("favorite-icon")) return;
  if (isClosingConditionMet(target)) {
    closeModal$1(modal);
    return;
  }
  const restaurantElement = target.closest(".restaurant");
  if (restaurantElement) {
    openModal(modal, container, restaurantElement, restaurantList);
  }
}
function isClosingConditionMet(target) {
  const closeButton = document.querySelector("#close-button");
  const isCloseButton = target === closeButton;
  const isBackdrop = !!target.closest(".modal-backdrop");
  const isInsideModal = !!target.closest(".description-modal");
  return isCloseButton || isBackdrop || isInsideModal && !isBackdrop;
}
function closeModal$1(modal) {
  modal.close();
}
function openModal(modal, container, restaurantElement, restaurantList) {
  if (restaurantElement.classList.contains("restaurant-list")) return;
  updateModalContent(container, restaurantElement, restaurantList);
  modal.show();
}
function updateModalContent(container, restaurantElement, restaurantList) {
  var _a;
  container.innerHTML = "";
  const name = ((_a = restaurantElement.querySelector(".restaurant__name")) == null ? void 0 : _a.textContent) || "";
  const descriptionDiv = createRestaurantDescription(
    restaurantList.searchRestaurant(name)
  );
  container.appendChild(descriptionDiv);
}
function extractFormData(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}
const StorageManager = {
  getItem(key, defaultValue) {
    const value = localStorage.getItem(key);
    if (value === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      return defaultValue;
    }
  },
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
const STORAGE_KEYS = {
  RESTAURANT_LIST: "restaurantList",
  FAVORITE: "favorite",
  FILTER: "filter"
};
function toggleRestaurantVisibility(restaurantName, isVisible) {
  const restaurant = document.getElementById(restaurantName);
  if (!restaurant) return;
  restaurant.classList.toggle("hidden", !isVisible);
}
function toggleFavoriteRestaurantByName(restaurantName) {
  const restaurant = document.getElementById(restaurantName);
  if (!restaurant) return;
  const favoriteIcon = restaurant.querySelector(".favorite-icon");
  const descriptionFavorite = document.getElementById("description-favorite");
  if (favoriteIcon.src.includes("Un-star.png")) {
    favoriteIcon.src = "Star.png";
  } else {
    favoriteIcon.src = "Un-star.png";
  }
  if (!descriptionFavorite) return;
  if (descriptionFavorite.src.includes("Un-star.png")) {
    descriptionFavorite.src = "Star.png";
  } else {
    descriptionFavorite.src = "Un-star.png";
  }
}
function handleFavoriteToggle(event, restaurantList, restaurantListElement) {
  if (!event.target.classList.contains("favorite-icon")) return;
  const parent = event.target.parentElement;
  const name = parent.querySelector(".restaurant__name").textContent;
  const restaurant = restaurantList.searchRestaurant(name);
  if (!restaurant) return;
  restaurantList.toggleFavoriteRestaurant(restaurant);
  StorageManager.setItem(STORAGE_KEYS.RESTAURANT_LIST, restaurantList.List);
  toggleFavoriteRestaurantByName(name);
  const isFavoriteFilterOn = document.querySelector('input[name="favoriteFilter"]:checked').value === "favorite";
  if (isFavoriteFilterOn) {
    toggleRestaurantVisibility(name, restaurant.isFavorite);
  }
}
function deleteRestaurantElementByName(restaurantName) {
  const restaurant = document.getElementById(restaurantName);
  restaurant.remove();
}
function handleAddRestaurantFormSubmit(event, restaurantList, restaurantAddForm) {
  event.preventDefault();
  try {
    const restaurantForm = extractFormData(restaurantAddForm);
    const restaurant = restaurantFormValidation(restaurantForm);
    addRestaurantToList(restaurantList, restaurant);
    updateRestaurantListUI(restaurant, restaurantForm);
    Toast.showToast(`${restaurant.name} 음식점을 추가했습니다.`, "success");
    closeModal(document.querySelector(".form-modal"));
    restaurantAddForm.reset();
  } catch (error) {
    Toast.showToast(`${error.message}`, "error");
  }
}
function addRestaurantToList(restaurantList, restaurant) {
  restaurantList.addRestaurant(restaurant);
  StorageManager.setItem(STORAGE_KEYS.RESTAURANT_LIST, restaurantList.List);
}
function updateRestaurantListUI(restaurant, restaurantForm) {
  const restaurantListElement = document.querySelector(".restaurant-list");
  const isFavoriteFilterOn = document.querySelector('input[name="favoriteFilter"]:checked').value === "favorite";
  if (!isFavoriteFilterOn) {
    restaurantListElement.appendChild(createRestaurantItem(restaurantForm));
  }
}
function closeModal(modal) {
  if (modal) {
    modal.close();
  }
}
function handleDeleteRestaurant(event, restaurantList, restaurantListElement) {
  try {
    const parent = event.target.parentElement.parentElement;
    const name = parent.querySelector(".restaurant__name").textContent;
    restaurantList.deleteRestaurant(name);
    StorageManager.setItem(STORAGE_KEYS.RESTAURANT_LIST, restaurantList.List);
    deleteRestaurantElementByName(name);
    const descriptionModal2 = document.querySelector(".description-modal");
    descriptionModal2.close();
    Toast.showToast(`${name} 레스토랑을 삭제했습니다.`, "success");
  } catch (error) {
    Toast.showToast(`${error.message}`, "error");
  }
}
const formModal = document.querySelector(".form-modal");
const descriptionModal = document.querySelector(".description-modal");
const descriptionContainer = document.querySelector(".description");
function bindEventHandlers({
  restaurantList,
  restaurantListElement,
  restaurantAddForm
}) {
  document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target.closest("#delete-button")) {
      handleDeleteRestaurant(event, restaurantList);
    }
    handleFormModalToggle(event, formModal);
    handleDescriptionModalToggle(event, restaurantList, {
      modal: descriptionModal,
      container: descriptionContainer
    });
    handleFavoriteToggle(event, restaurantList);
  });
  const filterElements = document.querySelectorAll(
    "#category-filter, #favorite-filter"
  );
  filterElements.forEach((el) => {
    el.addEventListener("change", (event) => {
      handleCombinedFilter(event, restaurantListElement, restaurantList);
    });
  });
  const sortingFilter = document.getElementById(
    "sorting-filter"
  );
  if (!sortingFilter) return;
  sortingFilter.addEventListener("change", (event) => {
    handleSort(
      event.target.value,
      restaurantList,
      restaurantListElement
    );
  });
  restaurantAddForm.addEventListener(
    "submit",
    (event) => handleAddRestaurantFormSubmit(event, restaurantList, restaurantAddForm)
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const dialogs = document.getElementsByTagName("dialog");
      if (dialogs.length > 0 && dialogs[0].open) {
        dialogs[0].close();
      }
    }
  });
}
function initializeApp() {
  const modalContainer = document.querySelector(
    ".modal-container"
  );
  const restaurantListElement = document.querySelector(
    ".restaurant-list"
  );
  const restaurantForm = createRestaurantForm();
  if (!modalContainer || !restaurantListElement) {
    throw new Error("Required elements not found in the DOM.");
  }
  modalContainer.appendChild(restaurantForm);
  const restaurantAddForm = document.querySelector(
    ".restaurant-add-form"
  );
  if (!restaurantAddForm) {
    throw new Error("Restaurant add form element not found.");
  }
  const restaurantList = loadRestaurantList();
  return {
    restaurantList,
    restaurantListElement,
    restaurantAddForm
  };
}
function loadRestaurantList() {
  const initialRestaurant = StorageManager.getItem(
    STORAGE_KEYS.RESTAURANT_LIST,
    INITIAL_RESTAURANT
  );
  StorageManager.setItem(STORAGE_KEYS.RESTAURANT_LIST, initialRestaurant);
  return new RestaurantList(initialRestaurant);
}
function renderRestaurantList(restaurantList, restaurantListElement) {
  restaurantList.List.forEach(
    (restaurantItem) => restaurantListElement.appendChild(createRestaurantItem(restaurantItem))
  );
}
function setSorting(restaurantList, restaurantListElement) {
  const sortOption = localStorage.getItem("sort");
  if (sortOption) {
    handleSort(sortOption, restaurantList, restaurantListElement);
    document.getElementById("sorting-filter").value = sortOption;
  }
}
function init() {
  const { restaurantList, restaurantListElement, restaurantAddForm } = initializeApp();
  renderRestaurantList(restaurantList, restaurantListElement);
  setSorting(restaurantList, restaurantListElement);
  return { restaurantList, restaurantListElement, restaurantAddForm };
}
document.addEventListener("DOMContentLoaded", () => {
  const appState = init();
  bindEventHandlers(appState);
});
