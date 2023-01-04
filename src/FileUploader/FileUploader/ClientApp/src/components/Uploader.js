import { useRef, useState } from "react"
import { apiService } from "../services/api.service";

const UploadState = {
  INITIAL: 0,
  UPLOADING: 1,
  UPLOADED: 2
};

export function Uploader() {

  const inputRef = useRef(null);
  const [ file, setFile ] = useState(null);
  const [ state, setState ] = useState(UploadState.INITIAL);

  const selectFile = () => {
    inputRef.current.click();
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setState(UploadState.INITIAL);
  };

  const uploadFile = () => {
    setState(UploadState.UPLOADING);
    apiService.uploadFile(file).then(() => {
      setTimeout(() => {
        setState(UploadState.UPLOADED);
      }, 1000);
    }).catch((e) => {
      setState(UploadState.INITIAL);
      console.log(e);
    });
  };

  return (
    <div>
      <div>
        <button type="button" onClick={selectFile}>Select file</button>
        {
          state === UploadState.INITIAL && !!file && (
            <button type="button" className="fileIconActionButton" onClick={uploadFile}>Upload file</button>
          )
        }
      </div>
      <input ref={inputRef} hidden type="file" multiple={false} onChange={onFileChange}/>
      {
        state === UploadState.UPLOADING && (
          <p>Uploading...</p>
        )
      }
      {
        state === UploadState.UPLOADED && !!file && (
          <p>Uploaded! Please check File Explorer tab!</p>
        )
      }
      <p>{file?.name}</p>
    </div>
  );
}