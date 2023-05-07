class Manager {
  getSortFromParams(params) {
    if (params["sort"] != undefined)
      return { price: params["sort"] == "asc" ? 1 : -1 };
  }
  getCleanFilters(params) {
      delete params["sort"];
      return params
  }
}
export default Manager;
