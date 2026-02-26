/** All blog posts as a collection. */
export const getAllPosts = collection => {
  return collection.getFilteredByGlob('./src/posts/**/*.md').reverse();
};

/** All relevant pages as a collection for sitemap.xml */
export const showInSitemap = collection => {
  return collection.getFilteredByGlob('./src/**/*.{md,njk}');
};

/** All tags from all posts as a collection - excluding custom collections */
export const tagList = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags.filter(tag => !['posts', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

/** All Categories from all posts as a collection */

export const categoriesList = collection => {
  const categoriesSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.categories) return;
    item.data.categories.forEach(category => categoriesSet.add(category));
  });
  return Array.from(categoriesSet).sort();
};

export const categoriesPages = collection => {
  const categoriesSet = new Set();
  const categoriesPages = collection.getAll().filter((item) => item.data.categories)
  
  categoriesPages.forEach(item => {
    if (!item.data.categories) return;
    item.data.categories.forEach(category => categoriesSet.add(category));
  });
  
  const genCategories = Array.from(categoriesSet).reduce((accumulator, category) => {
    accumulator[category] = categoriesPages.filter((item) => item.data.categories.includes(category))
    return accumulator;
  }, {})

  return genCategories;
};