import { useQuery } from '@tanstack/react-query';
import { Demo } from './components/demo';

interface Response {
  message: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const { data, isLoading, error } = useQuery<Response>({
    queryKey: ['demo'],
    queryFn: () => fetch(`${API_URL}/posts`).then((res) => res.json()),
  });

  console.log(data);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && <div>Data: {data.message}</div>}
      <Demo />
    </>
  );
}
