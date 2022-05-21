import Filter from "@modules/posts/types/Filter";

type FILTER_DATABASE = {
  published?: boolean;
  active?: boolean;
  author_id?: number;
};

export const getFiltersToList = (filters?: Filter) => {
  const filtersDatabase: FILTER_DATABASE = {};
  if (filters?.published !== undefined) {
    filtersDatabase.published = filters.published;
  }
  if (filters?.active !== undefined) {
    filtersDatabase.active = filters.active;
  }
  if (filters?.author !== undefined) {
    filtersDatabase.author_id = filters.author;
  }
  return filtersDatabase;
};
