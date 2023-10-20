"use strict";

class LoadPicture {
    constructor(
        apiUrl,
        displayElement = document.body,
        photosPerPage = 10,
        sortOrder = "ASC"
    ) 
    {
        this.apiUrl = apiUrl;
        this.displayElement = displayElement;
        this.photosPerPage = photosPerPage;
        this.sortOrder = sortOrder;
        this.photos = [];
        this.currentPage = 0;
    }

    async load() {
        this.showLoadingIcon();

        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`Y'a un soucis chef. Status: ${response.status}`);
            }

            const data = await response.json();

            if (this.sortOrder === "DESC") {
                data.reverse();
            }

            this.photos = data;
            this.display();
            data.forEach(photo => console.log(photo.url));
            } catch (error) {
                console.error(error);
            }
        }

    display() {
        this.removeLoadingIcon();

        const start = this.currentPage * this.photosPerPage;
        const end = start + this.photosPerPage;
        const photosToDisplay = this.photos.slice(start, end);

        const container = document.createElement("div");
        container.classList.add("photo-container");

        for (const photo of photosToDisplay) {
            const img = document.createElement("img");
            img.src = photo.url;
            container.appendChild(img);
        }

        this.displayElement.appendChild(container);

        if (end < this.photos.length) {
            this.addLoadMoreButton();
        }
    }

    showLoadingIcon() {
        const loadingIcon = document.createElement("img");
        loadingIcon.src = "./images/loader.png";
        loadingIcon.classList.add("loading-icon");
        this.displayElement.appendChild(loadingIcon);
    }

    removeLoadingIcon() {
        const loadingIcon = this.displayElement.querySelector(".loading-icon");
        if (loadingIcon) {
            this.displayElement.removeChild(loadingIcon);
        }
    }

    addLoadMoreButton() {
        const loadMoreButton = document.createElement("button");
        loadMoreButton.textContent = "T'en veux plus?";
        loadMoreButton.addEventListener("click", () => {
            this.currentPage++;
            this.display();
        });
    
        this.displayElement.appendChild(loadMoreButton);
    }

    loadNextSet() {
        this.currentPage++;
        this.display();
    }
}

export { LoadPicture };
