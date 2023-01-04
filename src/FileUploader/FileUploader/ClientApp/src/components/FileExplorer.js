import { useEffect, useState } from "react"
import { apiService } from "../services/api.service";
import './FileExplorer.css';

export function FileExplorer() {

  const [ files, setFiles ] = useState([]);
  
  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = () => {
    apiService.getAllFiles().then((files) => {
      setFiles(files.map((file) => ({ filename: file })));
    });
  };

  const downloadFile = (file) => {
    apiService.downloadFile(file.filename);
  };

  const deleteFile = async (file) => {
    await apiService.deleteFile(file.filename);
    getFiles();
  };
 
  return (
    <ul className="reset">
      {
        files.map((file) => (
          <li key={file.filename} className="fileItem">
            <span>{ file.filename }</span>
            <button className="fileIconActionButton" type="button" onClick={(() => downloadFile(file))}>download</button>
            <button className="fileIconActionButton" type="button" onClick={() => deleteFile(file)}>delete</button>
          </li>
        ))
      }
    </ul>
  )
}
