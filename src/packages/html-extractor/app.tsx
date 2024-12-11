import { useEffect, useState } from 'preact/hooks';
import styles from "../../style.css?inline";

function loadUMDResource(url: string, globalVar: string) {
  return new Promise((resolve, reject) => {
    // 检查全局对象中是否已经存在该库的变量
    if (window[globalVar]) {
      console.log(`${globalVar} already loaded.`);
      resolve(window[globalVar]);
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    script.onload = () => {
      if (window[globalVar]) {
        console.log(`${globalVar} loaded successfully.`);
        resolve(window[globalVar]);
      } else {
        reject(new Error(`Failed to load ${url}: ${globalVar} is not defined.`));
      }
    };

    script.onerror = () => {
      reject(new Error(`Failed to load ${url}`));
    };

    document.head.appendChild(script);
  });
}

let client = null
// https://help.aliyun.com/zh/oss/developer-reference/putobject?spm=a2c4g.11186623.0.i11
const headers = {
  "Cache-Control": "max-age=31536000",
  // 指定初始化分片上传时是否覆盖同名Object。此处设置为true，表示禁止覆盖同名Object。
  // "x-oss-forbid-overwrite": "true",
};

const options = {
  // 获取分片上传进度、断点和返回值。
  progress: (p, cpt, res) => {
    console.log("获取分片上传进度、断点和返回值。", p);
  },
  headers,
  // 设置并发上传的分片数量。
  parallel: 4,
  // 设置分片大小。默认值为1 MB，最小值为100 KB。
  partSize: 1024 * 1024,
};

export const upload = async (file) => {
  if (!client) {
    const OSS = await loadUMDResource('https://gosspublic.alicdn.com/aliyun-oss-sdk-6.18.0.min.js', 'OSS')

    client = new OSS({
      region: "oss-cn-guangzhou",
      accessKeyId: "",
      accessKeySecret: "",
      bucket: "kingan-md-img",
    });
  }
  try {
    // 指定上传到examplebucket的Object名称，例如exampleobject.txt。
    // const name = "wx_assets/assets_new/exampleobject.txt";
    // ${}内填充月日时分秒
    const name = `data/test/incomeData${new Date().toLocaleString().split(' ')[1].replaceAll(':', '-')}.html`;
    // const data = document.getElementById("file").files[0];
    const res = await client.multipartUpload(name, file, {
      ...options,
    });
    console.log(res);
    return res
  } catch (err) {
    console.log(err);
  }
};

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const onCopy = () => {
    // 复制整个html
    setIsLoading(true)
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const file = new File([blob], 'uploaded-html.html', { type: 'text/html' });
    upload(file)
      .then(res => {
        return navigator.clipboard.writeText(JSON.stringify(res))
      })
      .then(() => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Error copying or uploading HTML:', err);
        setShowToast(false); // 或者显示错误提示
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log('✨ html-extractor 脚本 ✨');
  }, []);

  return (
    <>
      <style>{styles}</style>
      <button className="fixed right-2 bottom-20 btn btn-square btn-primary" onClick={onCopy}>
        {
          isLoading ?
            <span className="loading loading-spinner"></span> :
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" /><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1" /></g>
            </svg>
        }
      </button>

      <div className="toast toast-center z-10">
        <div className={`alert alert-success text-white ${showToast ? '' : 'hidden'}`}>
          <span>🎉 复制成功，去粘贴吧～</span>
        </div>
      </div>
    </>
  );
};
