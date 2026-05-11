import { rhinoCards } from "../villains/rhino";
import { rhinoMainSchemes } from "../schemes/rhinoMainScheme";
import { rhinoEncounterCards } from "../encounters/rhinoEncounter";
import { klawCards } from "../villains/klaw";
import { klawMainSchemes } from "../schemes/klawMainScheme";
import { klawEncounterCards } from "../encounters/klawEncounters";

export const scenarios = {
    rhino: {
        id: "rhino",
        name: "Rhino",
        villainCards: rhinoCards,
        mainSchemes: rhinoMainSchemes,
        encounterCards: rhinoEncounterCards,
    },

    klaw: {
        id: "klaw",
        name: "Klaw",
        villainCards: klawCards,
        mainSchemes: klawMainSchemes,
        encounterCards: klawEncounterCards,
    },
};
