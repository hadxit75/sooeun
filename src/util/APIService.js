import { baseURL } from "./variables";

export default {
  getObjectList() {
    const url = `${baseURL}/api/object/list`;
    return this.$http
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  }
};
