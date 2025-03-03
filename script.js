document.getElementById("search-button").addEventListener("click", async () => {
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
    const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`;

    if (!searchInput) {
        alert("Please enter a Pokémon name or ID.");
        return;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Pokémon not found");
        const data = await response.json();

        document.getElementById("pokemon-info").classList.remove("hidden");
        document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
        document.getElementById("pokemon-id").textContent = `#${data.id}`;
        document.getElementById("weight").textContent = `Weight: ${data.weight}`;
        document.getElementById("height").textContent = `Height: ${data.height}`;
        
        // Display sprite
        const sprite = document.getElementById("sprite");
        sprite.src = data.sprites.front_default;
        sprite.classList.remove("hidden");

        // Populate types
        const typesContainer = document.getElementById("types");
        typesContainer.innerHTML = "";
        data.types.forEach(typeObj => {
            const typeSpan = document.createElement("span");
            typeSpan.textContent = typeObj.type.name.toUpperCase();
            typesContainer.appendChild(typeSpan);
        });

        // Populate stats
        document.getElementById("hp").textContent = data.stats[0].base_stat;
        document.getElementById("attack").textContent = data.stats[1].base_stat;
        document.getElementById("defense").textContent = data.stats[2].base_stat;
        document.getElementById("special-attack").textContent = data.stats[3].base_stat;
        document.getElementById("special-defense").textContent = data.stats[4].base_stat;
        document.getElementById("speed").textContent = data.stats[5].base_stat;

    } catch (error) {
        alert("Pokémon not found");
        document.getElementById("pokemon-info").classList.add("hidden");
    }
});

