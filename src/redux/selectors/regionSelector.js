export const getRegionsSelector = store => {
    return store.getIn(['regions', 'regions'])
}

export const getRegionSelector = store => {
    return store.getIn(['regions', 'region'])
}