import { loadUMDResource } from './fetch'

// Interface for OSS client with multipart upload capability
interface OSSClient {
  multipartUpload: (name: string, file: File, options: any) => Promise<any>;
}

// Interface for OSS constructor that creates OSSClient instances
interface OSSConstructor {
  new(config: {
    region: string;
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
  }): OSSClient;
}

// Extend Window interface to include OSS property
declare global {
  interface Window {
    OSS: OSSConstructor;
  }
}

// Singleton OSS client instance
let client: OSSClient | null = null;

// Headers for OSS upload requests
const headers = {
  "Cache-Control": "max-age=31536000", // Cache for 1 year
};

// Options for multipart upload
const options = {
  progress: (p: number, cpt: any, res: any) => {
    console.log("获取分片上传进度、断点和返回值。", p);
  },
  headers,
  parallel: 4, // Number of parallel upload threads
  partSize: 1024 * 1024, // 1MB per part
};

/**
 * Uploads a file to Alibaba Cloud OSS using multipart upload
 * @param file - The file to upload
 * @returns Promise resolving to upload result
 * @throws Error if upload fails
 */
export const uploadToOSS = async (file: File) => {
  // Initialize OSS client if not already initialized
  if (!client) {
    // Load OSS SDK from CDN
    const OSS = await loadUMDResource(
      'https://gosspublic.alicdn.com/aliyun-oss-sdk-6.18.0.min.js',
      'OSS'
    ) as OSSConstructor;

    // Create new OSS client instance
    client = new OSS({
      region: "oss-cn-guangzhou", // OSS region
      accessKeyId: "", // TODO: Add access key ID
      accessKeySecret: "", // TODO: Add access key secret
      bucket: "kingan-md-img", // Target bucket name
    });
  }

  try {
    // Generate unique filename using current time
    const name = `data/test/incomeData${new Date().toLocaleString().split(' ')[1].replaceAll(':', '-')}.html`;

    // Perform multipart upload
    const res = await client.multipartUpload(name, file, {
      ...options,
    });

    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
