export const CATEGORY_OPTIONS = ["Cream", "Lotion", "Make-up", "Hair"];

const LEGACY_CATEGORY_MAP = {
  earphone: "Cream",
  headphone: "Lotion",
  watch: "Make-up",
  smartphone: "Make-up",
  laptop: "Cream",
  camera: "Make-up",
  accessories: "Lotion",
  hair: "Hair",
  haircare: "Hair",
  "hair-care": "Hair",
};

export const normalizeCategory = (value) => {
  if (typeof value !== "string") {
    return "Cream";
  }

  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return "Cream";
  }

  const normalizedValue = trimmedValue.toLowerCase();

  if (normalizedValue === "cream") {
    return "Cream";
  }

  if (normalizedValue === "lotion") {
    return "Lotion";
  }

  if (normalizedValue === "make-up" || normalizedValue === "makeup") {
    return "Make-up";
  }

  if (normalizedValue === "hair" || normalizedValue === "haircare" || normalizedValue === "hair-care") {
    return "Hair";
  }

  return LEGACY_CATEGORY_MAP[normalizedValue] || trimmedValue;
};
