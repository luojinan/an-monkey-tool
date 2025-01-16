
/**
 * 异步加载UMD模块资源
 * 
 * 本函数通过动态创建script标签来异步加载指定的UMD模块资源，并确保该资源在全局范围内可用
 * 它首先检查全局变量中是否已经存在指定的库，如果存在，则直接解析该库，否则创建并插入一个script标签来加载资源
 * 
 * @param url UMD模块资源的URL地址
 * @param globalVar 加载的UMD模块在全局作用域中预期的变量名
 * @returns 返回一个Promise，该Promise在资源加载成功时解析为全局变量中的模块对象，在加载失败时拒绝并提供错误信息
 */
export function loadUMDResource(url: string, globalVar: string) {
  return new Promise((resolve, reject) => {
    // 检查全局对象中是否已经存在该库的变量
    if (window[globalVar]) {
      console.log(`${globalVar} already loaded.`);
      resolve(window[globalVar]);
      return;
    }

    // 创建script元素并设置其src属性为指定的URL，用于加载UMD模块
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    // 当script加载完成时，检查全局变量是否已定义，以验证资源是否加载成功
    script.onload = () => {
      if (window[globalVar]) {
        console.log(`${globalVar} loaded successfully.`);
        resolve(window[globalVar]);
      } else {
        reject(new Error(`Failed to load ${url}: ${globalVar} is not defined.`));
      }
    };

    // 当script加载失败时，通过Promise拒绝并提供错误信息
    script.onerror = () => {
      reject(new Error(`Failed to load ${url}`));
    };

    // 将script元素添加到head中以开始加载过程
    document.head.appendChild(script);
  });
}