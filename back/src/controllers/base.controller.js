class Controller {
  static success(res, data) {
    if (!data.status) {
      data.status = "success";
    }

    return res.status(200).json(data);
  }

  static error(res, data, status = 500) {
    return res.status(status).json(data);
  }
}

export default Controller;
