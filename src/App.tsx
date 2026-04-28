import { useQuery } from '@tanstack/react-query';
import { Demo } from './components/demo';

interface Response {
  message: string;
}

export default function App() {
  const { data, isLoading, error } = useQuery<Response>({
    queryKey: ['demo'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/posts`).then((res) => res.json()),
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
