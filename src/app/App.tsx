import { RouterProvider } from 'react-router-dom'; // <-- Ubah baris ini
import { router } from './routes';
import '../styles/theme.css';

export default function App() {
  return <RouterProvider router={router} />;
}
