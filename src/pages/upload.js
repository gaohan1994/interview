import React, { useCallback, useRef, useEffect, useState } from 'react';

export default function Upload() {
  const { setFile, fetchChunksData, chunksPromies } = useUpload(
    'http://localhost:9090/api/upload'
  );

  const onChangeFile = (event) => {
    // console.log('event', event);
    const files = event.target.files;
    setFile(files[0]);
  };

  const upload = () => {
    fetchChunksData()
      .then((result) => {
        console.log('result', result);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <div>
      upload
      <input type="file" onChange={onChangeFile} />
      <button onClick={upload}>upload</button>
    </div>
  );
}

function useUpload(url) {
  const sendChunkNumber = useRef(0);

  const [file, setFile] = useState(null);
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    if (!!file) {
      const { chunks } = splitFile(file);
      setChunks(chunks);
    }
  }, [file]);

  /**
   * 请求分片上传接口
   * 依赖file 和 chunks
   */
  const fetchChunksData = useCallback(() => {
    console.log('chunks', chunks);

    if (chunks.length <= 0 || !file) {
      return Promise.reject('请选择文件');
    }

    let promises = [];

    // return new Promise((resolve, reject) => {})

    for (let i = 0; i < chunks.length; i++) {
      // 构建请求报文
      let form = new FormData();
      form.append('fileName', file.name);
      form.append('index', i);
      form.append('file', chunks[i]);

      promises.push(fetch(url, { method: 'Post', body: form }));

      // fetch(url, { method: 'Post', body: form })
      //   .then((result) => {
      //     sendChunkNumber.current += 1;

      //     // 如果全部上传了，让后端进行合并
      //     if (sendChunkNumber.current === chunks.length) {
      //       console.log('merge');
      //     }
      //   })
      //   .catch((error) => {
      //     console.log('error', error);
      //   });
    }
    return Promise.all(promises);
  }, [url, file, chunks]);

  return { setFile, fetchChunksData, chunksPromies };
}

/**
 * 把文件进行分片
 *
 * @param {*} file
 */
function splitFile(file, options = {}) {
  // lastModified: 1625020689702
  // lastModifiedDate: Wed Jun 30 2021 10:38:09 GMT+0800 (中国标准时间) {}
  // name: "40A4576B5FE4A445054E32F92A202A67.mp4"
  // size: 18139807
  // type: "video/mp4"
  // webkitRelativePath: ""

  /**
   * 数据分片
   * @param chunks
   */
  let chunks = [];

  /**
   * 文件总大小
   * @param totalSize
   */
  let totalSize = file.size;

  /**
   * 分片大小 默认 1MB 1024*1024
   * @param splitSize
   */
  let splitSize =
    typeof options.splitSize === 'number' ? options.splitSize : 1024 * 1024;

  try {
    if (totalSize <= splitSize) {
      // 如果文件总大小小于要分片的大小
      chunks.push(file.slice(0));
      return;
    }

    // 循环拆分文件
    let start = 0;
    while (start < totalSize) {
      /**
       * 当前切片数据 从 start 开始 start + splitSize 结束
       * @param currentChunkBlob
       */
      const currentChunkBlob = file.slice(start, start + splitSize);

      chunks.push(currentChunkBlob);

      start += splitSize;
    }
  } catch (error) {
    return error;
  } finally {
    return { file, chunks };
  }
}
