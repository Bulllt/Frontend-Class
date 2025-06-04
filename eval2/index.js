document.addEventListener("DOMContentLoaded", function () {
  const heroImage = document.querySelector(".heroImage");
  const regionSelect = document.getElementById("region");
  const trainerNameInput = document.getElementById("trainerName");
  const pokemonCardsSection = document.getElementById("pokemonCards");
  const cardsContainer = document.querySelector(".cardsContainer");
  const submitButton = document.getElementById("submitSelection");
  const selectionsLogSection = document.getElementById("selectionsLog");
  const selectionsList = document.querySelector(".selectionsList");
  const resetButton = document.getElementById("resetSelections");

  const regions = [
    {
      name: "Kanto",
      value: "kanto",
      image: "assets/img/kanto.jpg",
      starters: [1, 4, 7],
    },
    {
      name: "Johto",
      value: "johto",
      image: "assets/img/johto.jpg",
      starters: [152, 155, 158],
    },
    {
      name: "Hoenn",
      value: "hoenn",
      image: "assets/img/hoenn.png",
      starters: [252, 255, 258],
    },
  ];

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "-- Selecciona una región --";
  placeholderOption.selected = true;
  placeholderOption.disabled = true;
  regionSelect.appendChild(placeholderOption);

  regions.forEach((region) => {
    const option = document.createElement("option");
    option.value = region.value;
    option.textContent = region.name;
    regionSelect.appendChild(option);
  });

  regionSelect.addEventListener("change", async function () {
    if (!this.value) return;
    const selectedRegion = regions.find((r) => r.value === this.value);

    if (selectedRegion) {
      const newImage = new Image();
      newImage.src = selectedRegion.image;

      newImage.onload = function () {
        heroImage.style.opacity = "0";

        setTimeout(() => {
          heroImage.src = selectedRegion.image;
          heroImage.style.opacity = "1";
        }, 500);
      };

      pokemonCardsSection.classList.remove("hidden");
      submitButton.classList.add("hidden");
      cardsContainer.innerHTML = "";
      selectedPokemon = null;

      await loadStarterPokemon(selectedRegion.starters);
    }
  });

  async function loadStarterPokemon(pokemonIds) {
    try {
      for (const id of pokemonIds) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = await response.json();
        console.log(pokemonData);
        createPokemonCard(pokemonData);
      }
    } catch (error) {
      console.error("Error loading Pokémon data:", error);
    }
  }

  let selectedPokemon = null;
  let selections = [];
  const typeColors = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    poison: "#A040A0",
  };

  function createPokemonCard(pokemonData) {
    const card = document.createElement("div");
    card.className = "pokemonCard";
    card.dataset.id = pokemonData.id;

    const imageUrl =
      pokemonData.sprites.other["official-artwork"].front_default;

    const typesHTML = pokemonData.types
      .map(
        (type) => `
      <span class="typeBadge" style="background-color: ${
        typeColors[type.type.name]
      }">
        ${type.type.name}
      </span>
    `
      )
      .join("");

    card.innerHTML = `
      <img src="${imageUrl}" alt="${pokemonData.name}" class="pokemonImage">
      <span class="pokemonId">#${pokemonData.id
        .toString()
        .padStart(3, "0")}</span>
      <h3 class="pokemonName">${pokemonData.name}</h3>
      <div class="pokemonTypes">${typesHTML}</div>
    `;

    card.addEventListener("click", function () {
      if (
        this.classList.contains("selected") ||
        this.classList.contains("disabled")
      )
        return;

      const previouslySelected = document.querySelector(
        ".pokemonCard.selected"
      );
      if (previouslySelected) {
        previouslySelected.classList.remove("selected");
      }

      this.classList.add("selected");
      selectedPokemon = pokemonData;

      submitButton.classList.remove("hidden");
    });

    cardsContainer.appendChild(card);
  }

  function showError(element, message) {
    const errorElement = element.nextElementSibling;
    element.classList.add("error");
    errorElement.textContent = message;
    errorElement.style.display = "block";

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.focus();
  }
  function clearError(element) {
    const errorElement = element.nextElementSibling;
    element.classList.remove("error");
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
  trainerNameInput.addEventListener("input", function () {
    clearError(this);
  });

  submitButton.addEventListener("click", function () {
    clearError(trainerNameInput);
    if (!trainerNameInput.value.trim()) {
      showError(trainerNameInput, "Debes ingresar un nombre");
      return;
    }

    const trainerName = trainerNameInput.value.trim();
    const pokemonName = selectedPokemon.name;

    const duplicate = selections.some(
      (selection) =>
        selection.trainerName.toLowerCase() === trainerName.toLowerCase() &&
        selection.pokemonName.toLowerCase() === pokemonName.toLowerCase()
    );

    if (duplicate) {
      alert(`${trainerName} ya ha seleccionado a ${pokemonName} antes`);
      return;
    }

    const selection = {
      trainerName: trainerName,
      pokemonName: pokemonName,
    };

    selections.push(selection);
    updateSelectionsLog();
    selectionsLogSection.classList.remove("hidden");
  });

  function updateSelectionsLog() {
    selectionsList.innerHTML = "";

    if (selections.length === 0) {
      resetButton.style.display = "none";
      selectionsLogSection.classList.add("hidden");
    } else {
      selections.forEach((selection) => {
        const item = document.createElement("li");
        item.className = "selectionItem";
        item.textContent = `${selection.trainerName} eligió a ${selection.pokemonName}`;
        selectionsList.appendChild(item);
      });
      resetButton.style.display = "inline-block";
    }
  }

  resetButton.addEventListener("click", function () {
    selections = [];
    updateSelectionsLog();
    selectionsLogSection.classList.add("hidden");

    document.querySelectorAll(".pokemonCard.selected").forEach((card) => {
      card.classList.remove("selected");
    });

    submitButton.classList.add("hidden");
    selectedPokemon = null;
  });
});
