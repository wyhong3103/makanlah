import { useState } from 'react';
import useFetch from '@/hooks/useFetch';

const useLeaderboard = () => {
  const _fetch = useFetch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLeaderboard = async (index = 0) => {
    try {
      setLoading(true);
      const response = await _fetch(`/leaderboard/batch/${index}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw Error('Failed to get leaderboard information');
      }
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, getLeaderboard };
};

const useUserRank = () => {
  const _fetch = useFetch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserRank = async () => {
    try {
      setLoading(true);
      const response = await _fetch(`/leaderboard/your-rank`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw Error('Failed to get leaderboard information');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getUserRank };
};

export { useLeaderboard, useUserRank };
