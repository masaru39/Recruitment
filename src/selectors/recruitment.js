export const getVisibleRecruitment = (state) => {
  if (!state.recruitment.data) return [];
  const regExp = new RegExp(state.recruitment.searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
  return state.recruitment.data
    .filter(data => regExp.test(data.name)
      || regExp.test(data.position)
      || regExp.test(data.no))
    .sort((a, b) => {
      const direction = state.recruitment.direction === 'ascending' ? 1 : -1;
      if (a[state.recruitment.sortKey] < b[state.recruitment.sortKey]) {
        return direction * -1;
      }
      else if (a[state.recruitment.sortKey] > b[state.recruitment.sortKey]) {
        return direction;
      }
      return 0;
    });
};


