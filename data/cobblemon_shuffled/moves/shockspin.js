{
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Shock Spin",
    pp: 40,
    priority: 0,
    flags: { contact: 1, protect: 1, gravity: 1, mirror: 1, metronome: 1},
    onAfterHit(target, pokemon, move) {
        if (!move.hasSheerForce) {
            if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
            this.add("-end", pokemon, "Leech Seed", "[from] move: Rapid Spin", "[of] " + pokemon);
            }
            const sideConditions = ["spikes", "toxicspikes", "stealthrock", "stickyweb", "gmaxsteelsurge"];
            for (const condition of sideConditions) {
            if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
                this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Rapid Spin", "[of] " + pokemon);
            }
            }
            if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
            pokemon.removeVolatile("partiallytrapped");
            }
        }
    },
    onAfterSubDamage(damage, target, pokemon, move) {
        if (!move.hasSheerForce) {
            if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
            this.add("-end", pokemon, "Leech Seed", "[from] move: Rapid Spin", "[of] " + pokemon);
            }
            const sideConditions = ["spikes", "toxicspikes", "stealthrock", "stickyweb", "gmaxsteelsurge"];
            for (const condition of sideConditions) {
            if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
                this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Rapid Spin", "[of] " + pokemon);
            }
            }
            if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
            pokemon.removeVolatile("partiallytrapped");
            }
        }
    },
    onTry(source, target, move) {
        if (
            source.volatiles['smackdown'] ||
            source.volatiles['ingrain'] ||
            this.field.getPseudoWeather('Gravity')
        ) {
            return false;
        }
    },
    secondary: {
        chance: 100,
        self: {
            volatileStatus: 'magnetrise'
        }
    },
    target: "normal",
    type: "Electric",
    zMove: { basePower:100, boost: { evasion:1 } },
    contestType: "Cleaver"
}