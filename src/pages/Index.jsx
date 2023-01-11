import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Cliente from '../components/Cliente';
import { obtenerClientes } from '../data/Clientes';

export function loader() {
  // componente que se muestra mientras se carga el componente Index (ver main.jsx)
  // en el main se usa mediante el hook useLoaderData

  // obtengo los clientes de la api
  const clientes = obtenerClientes();
  return clientes;
}

const Index = () => {
  // hook que se usa para cargar los datos de la ruta
  // me muestra lo que retorna la funcion loader de arriba osea el array de clientes
  const clientes = useLoaderData();
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes</p>
      {clientes.length ? (
        <table className='mt-5 w-full bg-white table-auto'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='p-2'>Clientes</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <Cliente cliente={cliente} id={cliente.id}></Cliente>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='mt-10 text-center'>No hay clientes</p>
      )}
    </>
  );
};

export default Index;
