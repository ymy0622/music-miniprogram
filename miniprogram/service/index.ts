enum METHOD {
  OPTIONS = 'OPTIONS',
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  TRACE = 'TRACE',
  CONNECT = 'CONNECT',
}

const BASE_URL = 'http://127.0.0.1:3000'
// const BASE_URL = 'http://192.168.31.37:3000'

class MyRequest {
  request<T = any>(url: string, method: METHOD, data: any): Promise<T> {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method,
        data,
        success(res) {
          resolve(res.data as T)
        },
        fail(err) {
          reject(err)
        },
      })
    })
  }

  get<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>(url, METHOD.GET, data)
  }

  post<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>(url, METHOD.POST, data)
  }

  put<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>(url, METHOD.PUT, data)
  }

  delete<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>(url, METHOD.DELETE, data)
  }
}

const request = new MyRequest()
export default request
