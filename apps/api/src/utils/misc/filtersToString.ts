export const filterToString = (filters: { field: string, comparator: string, value: string }[]) => [...(filters || [])].length > 0 ? filters.reduce((acc: string, key, i) => {
    if (i !== 0) acc += ' and '
    if (!key.field.includes('.')) acc += 'r.'
    acc += (key.field + ' ')
    acc += key.comparator
    if (key.comparator === 'like') acc += ' "%' + key.value + '%" '; else if (key.comparator === 'is') acc += key.value; else acc += '"' + key.value + '"'
    return acc
}, '') : 'true'