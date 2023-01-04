const getAllFiles = async () => {
  return await fetch('http://54.255.216.103:5000/file').then((res) => res.json());
}

const downloadFile = (filename) => {
  const URL = `http://54.255.216.103:5000/file/download?filename=${filename}`;
  const link = document.createElement('a');
  link.download = filename;
  link.href = URL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const uploadFile = async (file) => {
  const form = new FormData();
  form.append('files', file);
  return await fetch('http://54.255.216.103:5000/file/create', {
    method: 'POST',
    body: form
  });
}

const deleteFile = async (filename) => {
  return await fetch(`http://54.255.216.103:5000/file/delete?filename=${filename}`, {
    method: 'POST',
  });
}

export const apiService = {
  getAllFiles,
  downloadFile,
  uploadFile,
  deleteFile
}
