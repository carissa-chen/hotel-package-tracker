class SearchController {
  #searchQuery;
  #searchFilter;
  #packageRepository;

  constructor(packageRepository) {
    this.#packageRepository = packageRepository;
  }

  searchPackages(query, filter) {
    this.#searchQuery = query;
    this.#searchFilter = filter;
    return this.#packageRepository.findPackagesByCriteria(query, filter);
  }
}

module.exports = SearchController;
