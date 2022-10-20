import { METHOD, request } from '@/utils/request';

class Request {
  constructor(METHOD_URL) {
    this.method_url = METHOD_URL || '';
  }

  /**
   * GET 请求
   * @param url 接口 路由
   * @param params 接口 请求参数
   * @param config 额外 配置项
   * @returns Promise
   * */
  get(url, params, config = {}) {
    const apiUrl = `${this.method_url + url}`;
    return request(apiUrl, METHOD.GET, params, config);
  }

  /**
   * POST 请求
   * @param url 接口 路由
   * @param params 接口 请求参数
   * @param config 额外 配置项
   * @returns Promise
   * */
  post(url, params, config = {}) {
    const apiUrl = `${this.method_url + url}`;
    return request(apiUrl, METHOD.POST, params, config);
  }

  /**
   * PUT 请求
   * @param url 接口 路由
   * @param params 接口 请求参数
   * @param config 额外 配置项
   * @returns Promise
   * */
  put(url, params, config = {}) {
    const apiUrl = `${this.method_url + url}`;
    return request(apiUrl, METHOD.PUT, params, config);
  }

  /**
   * DELETE 请求
   * @param url 接口 路由
   * @param params 接口 请求参数
   * @param config 额外 配置项
   * @returns Promise
   * */
  delete(url, params, config = {}) {
    const apiUrl = `${this.method_url + url}`;
    return request(apiUrl, METHOD.DELETE, params, config);
  }
}

export default Request;
