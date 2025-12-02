import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClients } from "@/lib/api";

/**
 * Custom hook to manage client-specific data loading
 * Automatically refetches when client changes via URL params
 *
 * @param fetchData - Async function that fetches data for a given client
 * @returns { loading, clientName, clientId, refetch }
 */
export function useClientData<T>(fetchData: (clientName: string, clientId: number) => Promise<T>) {
  const params = useParams();
  const clientName = params.id;
  const [loading, setLoading] = useState(true);
  const [clientId, setClientId] = useState<number | null>(null);
  const [data, setData] = useState<T | null>(null);

  const loadData = async () => {
    if (!clientName) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const clients = await getClients();
      const client = clients.find((c) => c.name.toLowerCase() === clientName.toLowerCase());

      if (client) {
        setClientId(client.id);
        const result = await fetchData(clientName, client.id);
        setData(result);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [clientName]);

  return {
    loading,
    clientName,
    clientId,
    data,
    refetch: loadData,
  };
}
