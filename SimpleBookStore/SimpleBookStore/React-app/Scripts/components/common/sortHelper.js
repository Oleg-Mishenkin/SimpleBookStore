export function Sort(objects, sortProp, isAsc) {
    objects.sort(function (a, b) {
        if (isAsc)
            return (a[sortProp] < b[sortProp]) ? -1 : (a[sortProp] > b[sortProp] ? 1 : 0);
        else
            return (a[sortProp] > b[sortProp]) ? -1 : (a[sortProp] < b[sortProp] ? 1 : 0);
    });

    return objects;
}