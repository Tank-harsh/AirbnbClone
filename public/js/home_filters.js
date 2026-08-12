 const filterButtons = document.querySelectorAll(".filter");
  const cardContainer = document.querySelector(".row");

  // Highlight active filter button
  filterButtons.forEach(button => {
    button.addEventListener("click", async () => {
      // Toggle active class
      filterButtons.forEach(btn => btn.classList.remove("active-filter"));
      button.classList.add("active-filter");

      const filterdata = button.dataset.filter;

      try {
        const response = await fetch(`/listings/filter?filter=${filterdata}`);
        const listings = await response.json();
        displayListings(listings);
      } catch (err) {
        console.error("Filter fetch error:", err);
      }
    });
  });

  function displayListings(listings) {
    // Clear existing cards
    cardContainer.innerHTML = "";

    if (listings.length === 0) {
      cardContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="fa-solid fa-magnifying-glass fa-2x mb-3" style="color:#aaa"></i>
          <p style="color:#666;">No listings found for this category.</p>
        </div>`;
      return;
    }

    listings.forEach(list => {
      const price = list.price.toLocaleString("en-IN");
      const card = `
        <a href="/listings/${list._id}" style="text-decoration: none;">
          <div class="card listing-card">
            <img src="${list.image.url}" class="card-img-top" alt="card-image" style="height: 20rem;">
            <div class="card-img-overlay"></div>
            <div class="card-body">
              <p class="card-text">
                <b>${list.title}</b><br>
                &#8377;${price} /night
              </p>
            </div>
          </div>
        </a>`;
      cardContainer.insertAdjacentHTML("beforeend", card);
    });
  }