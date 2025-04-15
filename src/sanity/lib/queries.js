export const heroFetch = `*[_type == "hero"][0]`;

export const seoFetch = `*[_type == "seo"][0]`;

export const cardFetch = `*[_type == "card"][0]`;

export const salesFetch = `*[_type == "salesContent"][0]`;

export const statsFetch = `*[_type == "statsSection"][0]`;

export const blogFetch = `*[_type == "blog"][0]`;

export const galleryFetch = `*[_type == "gallery"][0]`;

export const testimonialFetch = `*[_type == "testimonial"][0]`;

export const serviceFetch = `*[_type == "service"][0]`;

// export const faqFetch = `*[_type == "faq"][0]`;

export const ctaFetch = `*[_type == "cta"][0]`;

export const navMenuFetch = `*[_type == "navMenu"][0]`;

export const contactFetch = `*[_type == "contact"][0]`;

export const footerFetch = `*[_type == "footer"][0]`;

export const productFetch = `*[_type == "product"][0]`;

export const aboutFetch = `*[_type == "about"][0]`;

export const newsFetch = `*[_type == "news"][0]`;

export const categoryFetch = `*[_type == "category"]`;

export const adsFetch = `*[_type == "adsSection"][0]`;

export const newsFetchWithSearchAndFilter = (
  searchTerm = "",
  categoryId = ""
) => {
  const search = searchTerm
    ? `&& (mainCard.title[$locale] match "*${searchTerm}*" || mainCard.description[$locale] match "*${searchTerm}*")`
    : "";
  const categoryFilter = categoryId
    ? `&& mainCard.category._ref == "${categoryId}"`
    : "";

  return `
      {
        "headerTitle": *[_type == "newsSection"][0].headerTitle,
        "mainCard": *[_type == "news" ${search} ${categoryFilter}][0],
        "otherCards": *[_type == "news" ${search} ${categoryFilter}][1...5],
      }
    `;
};
