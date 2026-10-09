import java.util.List;

public class SearchController {
    private String searchQuery;
    private String searchFilter;
    private PackageRepository packageRepository;

    public SearchController(PackageRepository repo) {
        this.packageRepository = repo;
    }

    public List<Package> searchPackages(String query, String filter) {
        this.searchQuery = query;
        this.searchFilter = filter;
        return packageRepository.findPackagesByCriteria(query, filter);
    }
}
