import type { PkmType } from "@localTypes/Pokemon";

export type PkmTypeColor = {
  [key in PkmType]: {
    color: string;
    light: string;
    dark: string;
  };
};

const pkmTypeColors: PkmTypeColor = {
  bug: {
    color: "#729f3f",
    light: "#8db252",
    dark: "#5b8138",
  },
  electric: {
    color: "#eed535",
    light: "#f2e05e",
    dark: "#a1871f",
  },
  dark: {
    color: "#707070",
    light: "#8a8a8a",
    dark: "#595959",
  },
  fairy: {
    color: "#fdb9e9",
    light: "#fdd7ee",
    dark: "#9b6470",
  },
  dragon: {
    color: "#53a4cf",
    light: "#83bce9",
    dark: "#3c78a5",
  },
  fighting: {
    color: "#d56723",
    light: "#d7854a",
    dark: "#9f3e1e",
  },
  flying: {
    color: "#3dc7ef",
    light: "#68d8ff",
    dark: "#27a9db",
  },
  ground: {
    color: "#f7de3f",
    light: "#f7e468",
    dark: "#ab914d",
  },
  fire: {
    color: "#fd7d24",
    light: "#fd9d44",
    dark: "#9c531f",
  },
  grass: {
    color: "#9bcc50",
    light: "#bce672",
    dark: "#729f3f",
  },
  poison: {
    color: "#b97fc9",
    light: "#d9a9db",
    dark: "#7e1e9c",
  },
  steel: {
    color: "#9eb7b8",
    light: "#b5c6c6",
    dark: "#848d8f",
  },
  ghost: {
    color: "#7b62a3",
    light: "#a292c1",
    dark: "#554a7b",
  },
  ice: {
    color: "#51c4e7",
    light: "#81d5f2",
    dark: "#46a3c7",
  },
  normal: {
    color: "#a4acaf",
    light: "#bec6c8",
    dark: "#7d8b8f",
  },
  psychic: {
    color: "#f366b9",
    light: "#f692c4",
    dark: "#9b3e82",
  },
  rock: {
    color: "#a38c21",
    light: "#c2b446",
    dark: "#6d5c1f",
  },
  water: {
    color: "#4592c4",
    light: "#68abce",
    dark: "#3469a4",
  },
};

export default pkmTypeColors;
