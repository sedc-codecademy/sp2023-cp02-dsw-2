let products = [
    { name: "Lavazza Gusto Forte Intenso", image: "../../images/products-images/picture1.png" },
    { name: "ILLY Decaf", image: "../../images/products-images/picture2.png" },
    { name: "Gimoka Miscela Bar", image: "../../images/products-images/picture3.png" },
    { name:"DolceVita Intenso", image:"../../images/products-images/picture4.png" },
    { name:"Lavazza Delicato | Nespresso", image:"../../images/products-images/picture5.png" },
  ];
  
  let searchInput = document.getElementById("search");
  let autocompleteDropdown = document.getElementById("autocomplete-dropdown");
  
  searchInput.addEventListener("input", function() {
    let query = searchInput.value.toLowerCase();
    let matches = [];
  
    if (query.length > 0) {
      matches = products.filter(function(item) {
        return item.name.toLowerCase().includes(query);
      });
    }
  
    showAutocompleteSuggestions(matches);
  });
  
  function showAutocompleteSuggestions(matches) {
    autocompleteDropdown.innerHTML = "";
  
    if (matches.length > 0) {
      let dropdownMenu = document.createElement("div");
      dropdownMenu.classList.add("dropdown-menu", "show", "py-0");
      autocompleteDropdown.appendChild(dropdownMenu);
  
      matches.forEach(function(match) {
        let dropdownItem = document.createElement("a");
        dropdownItem.classList.add("dropdown-item", "d-flex", "align-items-center");
  
        let img = document.createElement("img");
        img.classList.add("me-2");
        img.src = match.image;
        img.alt = match.name;
        img.style.width = "50px";
  
        let itemName = document.createElement("span");
        itemName.innerText = match.name;
  
        dropdownItem.appendChild(img);
        dropdownItem.appendChild(itemName);
        dropdownMenu.appendChild(dropdownItem);
      });
  
      autocompleteDropdown.style.display = "block";
    } else {
      autocompleteDropdown.style.display = "none";
    }
  }
  