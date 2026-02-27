import chunk from "lodash.chunk";

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

export const tagPages = collection => {
  let paginationSize = 15;
  // Thanks @zachleat - https://github.com/11ty/eleventy/issues/332#issuecomment-445236776
  let tagMap = [];
  let tagsArray = tagList(collection);
  for (let tagName of tagsArray) {
    let tagItems = collection.getFilteredByTag(tagName);
    let pagedItems = chunk(tagItems, paginationSize);
    for (let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
      tagMap.push({
        name: tagName,
        type: "tag",
        totalPages: (max - 1),
        pageNumber: pageNumber,
        pageData: pagedItems[pageNumber]
      });
    }
  }
  return tagMap;
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
  let paginationSize = 15;
  const categoriesPages = collection.getAll().filter((item) => item.data.categories)

  // Thanks @zachleat - https://github.com/11ty/eleventy/issues/332#issuecomment-445236776
  let categoryMap = [];
  let categoriesArray = categoriesList(collection);
  for (let categoryName of categoriesArray) {
    let categoryItems = categoriesPages.filter((item) => item.data.categories.includes(categoryName));
    let pagedItems = chunk(categoryItems, paginationSize);
    for (let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
      categoryMap.push({
        name: categoryName,
        type: "category",
        totalPages: (max - 1),
        pageNumber: pageNumber,
        pageData: pagedItems[pageNumber]
      });
    }
  }
  return categoryMap;
};

