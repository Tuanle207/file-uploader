import { FileExplorer } from "./components/FileExplorer";
import { Uploader } from "./components/Uploader";

const AppRoutes = [
  {
    index: true,
    element: <Uploader />
  },
  {
    path: '/upload',
    element: <Uploader />
  },
  {
    path: '/explorer',
    element: <FileExplorer />
  }
];

export default AppRoutes;
