class StorageService {
    setSortProp(sortProp, direction) {
        localStorage.setItem('sortProp', sortProp);
        localStorage.setItem('sortAsc', direction);
    }

    getSortProp() {
        var result = {};
        var sortProp = localStorage.getItem('sortProp');
        var direction = localStorage.getItem('sortAsc');

        result.sortProp = sortProp;
        result.sortAsc = direction == 'true';
        return result
    }
}

export default StorageService;