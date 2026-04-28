import { LogoutButton } from '@/components/logout-button';
import { useAuth } from '@/hooks/api/use-auth';
import { api, extractError } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

interface PostResponse {
  message: string;
}

async function getPosts() {
  const response = await api.get('/posts');
  return response.data;
}

function HomePage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery<PostResponse, Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  console.log(data);
  return (
    <div>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
      <h1>Home</h1>

      {user && (
        <div className="mb-4 space-y-1 text-sm">
          <p>
            <span className="font-medium">User ID:</span> {user.id}
          </p>
          <p>
            <span className="font-medium">Username:</span> {user.email_address}
          </p>
        </div>
      )}

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {extractError(error)}</div>}
      {data && <div>{data.message}</div>}
    </div>
  );
}

export const Component = HomePage;
