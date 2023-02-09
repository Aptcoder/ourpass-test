export default class Helper {
  public static async formatResponse(message, data = {}) {
    return {
      status: true,
      message,
      data,
    };
  }
}
