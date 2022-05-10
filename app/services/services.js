function Services() {
  this.fetchData = () => {
    return axios({
      url: "https://62654a2994374a2c506eee58.mockapi.io/api/v1/userList",
      method: "GET",
    });
  };

  this.deleteUserById = (id) => {
    return axios({
      url: `https://62654a2994374a2c506eee58.mockapi.io/api/v1/userList/${id}`,
      method: "DELETE",
    });
  };

  this.addTeacher = (teacher) => {
    return axios({
      url: "https://62654a2994374a2c506eee58.mockapi.io/api/v1/userList",
      method: "POST",
      data: teacher,
    });
  };

  this.getTeacherById = (id) => {
    return axios({
      url: `https://62654a2994374a2c506eee58.mockapi.io/api/v1/userList/${id}`,
      method: "GET",
    });
  };

  this.updateTeacher = (id, teacher) => {
    return axios({
      url: `https://62654a2994374a2c506eee58.mockapi.io/api/v1/userList/${id}`,
      method: "PUT",
      data: teacher,
    });
  };
}
