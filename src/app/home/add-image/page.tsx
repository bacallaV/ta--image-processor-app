"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AddImagePage() {
  const router = useRouter();

  const [effect, setEffect] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [blur, setBlur] = useState<string | null>(null);
  const [fishEye, setFishEye] = useState<string | null>(null);
  const [width, setWidth] = useState<string | null>(null);
  const [height, setHeight] = useState<string | null>(null);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!effect || !file) {
      alert('Selecciona un efecto e imagen')
      return;
    }

    const EffectDataHandler = {
      resize: (formData: FormData) => {
        formData.append('width', width!);
        formData.append('height', height!);
      },
      fisheye: (formData: FormData) => {
        formData.append('radius', fishEye!);
      },
      blur: (formData: FormData) => {
        formData.append('blur', blur!);
      },
    }

    const formData = new FormData();
    formData.append('image', file);
    EffectDataHandler[(effect as keyof typeof EffectDataHandler)](formData);
    console.log(formData.values())

    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3001/images/'+effect, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (!res.ok) {
      alert('Error al subir imagen')
      return;
    }

    router.push('/home')
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white"> Procesar imagen </h2>
          <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                      <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen</label>
                      <input type="file" name="image" id="image" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                  </div>

                  <div>
                      <label htmlFor="effect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Efecto</label>
                      <select id="effect" defaultValue={undefined} onChange={(e) => setEffect(e.target.value)} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                          <option>Selecciona un efecto</option>
                          <option value="resize">Tamaño</option>
                          <option value="fisheye">Ojo de pez</option>
                          <option value="blur">Blur</option>
                      </select>
                  </div>

                  {
                    effect === 'blur' &&
                    <div>
                        <label htmlFor="blur" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blur</label>
                        <input type="number" name="blur" id="blur" onChange={(e) => setBlur(e.target.value)} min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required />
                    </div>
                  }

                  {
                    effect === 'fisheye' &&
                    <div>
                        <label htmlFor="fisheye" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ojo de pez</label>
                        <input type="number" name="fisheye" id="fisheye" onChange={(e) => setFishEye(e.target.value)} min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required />
                    </div>
                  }

                  {
                    effect === 'resize' &&
                    <div>
                      <div>
                          <label htmlFor="width" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ancho</label>
                          <input type="number" name="width" id="width" onChange={(e) => setWidth(e.target.value)} min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required />
                      </div>
                      <div>
                          <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alto</label>
                          <input type="number" name="height" id="height" onChange={(e) => setHeight(e.target.value)} min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required />
                      </div>
                    </div>
                  }

              </div>
              <button type="submit" className="text-white mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Purple to Pink</button>
          </form>
      </div>
    </section>
  )
}