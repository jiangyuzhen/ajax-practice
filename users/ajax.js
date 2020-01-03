/**
options = {
  url: "",
  method: "",
  headers: {},  
  data: "", 
  success: function(result) {},  // 请求成功后调用此方法
  fail: function(error) {}    // 请求失败或出错后调用此方法
}
**/
window.ajax = function (options) {
  options = {
    url: options.url || "",
    method: options.method.toLocaleUpperCase() || "GET",
    headers: options.headers || {},
    data: options.data || null,
    onSuccess: options.success || function (result) { },
    onFailure: options.fail || function (error) { }
  };

  var xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url, true);
  if (options.method === 'POST' || options.method === 'PUT') {
    xhr.setRequestHeader('content-type', 'application/json');
    options.data = JSON.stringify(options.data);
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || (xhr.status === 201 && options.method === 'POST')) {
        options.onSuccess(JSON.parse(xhr.responseText));
      } else {
        options.onFailure(xhr.status);
      }
    }
  };
  xhr.send(options.data);

}