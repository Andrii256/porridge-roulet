import { FOOD_OPTIONS_KEYS } from "../constants.ts";

export type FoodOptionKey = (typeof FOOD_OPTIONS_KEYS)[number];

export type FoodOption = {
  key: FoodOptionKey;
  checked: boolean;
};
