export const CreateSlug = (text) => {
    return text
     .toLowerCase()
     .trim()
     .normalize("NFD")
     .replace(/\p{Diacritic}/gu, "")
     .replace(/[^a-z0-9 -]/g, "")
     .replace(/\s+/g, "-")
     .replace(/-+/g, "-")
}