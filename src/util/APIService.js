import { baseURL } from "./variables";
import axios from "axios";

export default {
  getObjectList() {
    const url = `${baseURL}/api/object/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  }
};
