export const CATEGORY_OPTIONS = ["Cream", "Lotion", "Make-up"];

const LEGACY_CATEGORY_MAP = {
  earphone: "Cream",
  headphone: "Lotion",
  watch: "Make-up",
  smartphone: "Make-up",
  laptop: "Cream",
  camera: "Make-up",
  accessories: "Lotion",
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

  return LEGACY_CATEGORY_MAP[normalizedValue] || trimmedValue;
};
