export const getAdminsSelector = store => {
    return store.getIn(['admins', 'admins'])
}