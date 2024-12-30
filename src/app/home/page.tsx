"use client"
import Card from "@app/components/Card";
import { useEffect, useState } from "react";

type Image = {
  id: number;
  title: string;
  url: string;
}

async function loadData(token: string): Promise<Image[]> {
  const res = await fetch('http://localhost:3001/images', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!res.ok) {
    throw new Error('Unauthorized')
  }

  const data = await res.json();

  return data.data;
}

export default function HomePage() {
  const [data, setData] = useState<Image[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const images = await loadData(token ?? '');
        setData(images);
      } catch (error) {
        setError('Sin autorización')
      }
    }

    fetchData();
  }, [])

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-row flex-wrap gap-8 p-12 min-h-full">
      {data?.map(image => (
        <Card key={image.id} id={image.id} title={image.title} url={image.url}>
        </Card>
      ))}
    </div>
  )
}