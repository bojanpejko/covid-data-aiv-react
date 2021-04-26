export const getDataSelector = store => {
    return store.getIn(['data', 'data'])
}

export const getSingleDataSelector = store => {
    return store.getIn(['data', 'singleData'])
}