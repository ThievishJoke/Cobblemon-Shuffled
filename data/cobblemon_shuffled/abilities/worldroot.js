{
    onCriticalHit: false,
    onResidual(pokemon) {
        this.heal(pokemon.baseMaxhp / 16, pokemon);
    },
    flags: { breakable: 1 },
    name: "Worldroot",
    rating: 4
}