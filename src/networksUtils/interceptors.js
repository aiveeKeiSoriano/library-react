import axios from 'axios'

export default function initAxios(history) {
  axios.defaults.baseURL = "http://localhost:3300/";

  axios.interceptors.request.use(
    function (req) {
      let token = localStorage.getItem("access_token");
      if (!token) {
        console.log("Token not found");
      } else {
        req.headers["Authorization"] = "Bearer " + token;
      }
      return req;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

    async function getRefresh(token) {
        let response = await axios.post('/auth/token', { refresh: token })
        let data = response.data
        localStorage.setItem('access_token', data.access_token)
    }

  axios.interceptors.response.use(
    function (res) {
      return res;
    },
    function (error) {
        console.log(error.response)
        let { status, data } = error.response;
        console.log(status, data.message)
        if (status === 403) {
            let refresh_token = localStorage.getItem('refresh_token')
            if (!refresh_token || data.message === 'Invalid refresh token') {
                history.push("/login");
            }
            else {
                console.log(refresh_token, 'refresh')
               getRefresh(refresh_token)
            }
        }
      return Promise.reject(error);
    }
  );
}
