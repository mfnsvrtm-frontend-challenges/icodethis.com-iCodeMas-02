const featuredArray = document.querySelectorAll('.featured')

function renderRatings() {
    const ratingContainers = document.querySelectorAll('.featured-rating');
    ratingContainers.forEach(renderRating)
}

function renderRating(ratingContainer) {
    const rating = parseFloat(ratingContainer.dataset.value);

    const filled = Math.floor(rating);
    const rest = rating - filled;

    const filledEl = document.createElement('img');
    filledEl.classList.add('star-filled');
    filledEl.src = "svg/star-filled.svg";

    ratingContainer.append(...Array.from({length: filled}, _ => filledEl.cloneNode()));

    if (rest === 0) {
        return;
    }

    const outlineEl = document.createElement('div');
    outlineEl.classList.add('star-outline');
    const outlineImg = document.createElement('img');
    outlineImg.src = "svg/star-outline.svg";
    outlineEl.appendChild(outlineImg);

    outlineEl.style.background = `linear-gradient(90deg,#FCCA6D ${rest*100}%, rgba(0, 0, 0, 0) ${rest*100}%)`

    ratingContainer.append(outlineEl);
}

function initializeItems() {
    const itemWrappers = document.querySelectorAll('.item-wrapper');
    itemWrappers.forEach((wrapper, id) => {
        wrapper.onclick = () => {
            selectItem(id, itemWrappers);
        }

        if ('sticker' in wrapper.dataset) {
            const sticker = document.createElement('div');
            sticker.classList.add('item-sticker');
            sticker.textContent = wrapper.dataset.sticker;
            sticker.style.backgroundColor = wrapper.dataset.color;
            wrapper.appendChild(sticker);
        }

        wrapper.style.outlineColor = wrapper.dataset.color;
    });
}

function selectItem(id, wrappers) {
    wrappers.forEach(wrapper => wrapper.classList.remove('selected'));
    const selected = wrappers[id];
    selected.classList.add('selected');

    featuredArray.forEach(featured => featured.classList.remove('selected'))
    featuredArray[id].classList.add('selected');
}

renderRatings();
initializeItems();
