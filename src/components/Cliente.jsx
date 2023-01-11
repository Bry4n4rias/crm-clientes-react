import React from 'react';
import { Form, useNavigate, redirect } from 'react-router-dom';
import { eliminarCliente } from '../data/Clientes';

export async function action({ params }) {
  await eliminarCliente(params.clienteId);

  return redirect('/');
}

const Cliente = ({ cliente }) => {
  const navigate = useNavigate();

  const { nombre, empresa, email, telefono, id } = cliente;
  return (
    <tr className='border-b'>
      <td className='p-6 space-y-2'>
        <p className='text-2xl text-gray-800'>{nombre}</p>
        <p>{empresa}</p>
      </td>

      <td className='p-6'>
        <p className='text-gray-600'>
          <span className='text-gray-800 uppercase font-bold'>Email: </span>
          {email}
        </p>
        <p className='text-gray-600'>
          <span className='text-gray-800 uppercase font-bold'>Telefono: </span>
          {telefono}
        </p>
      </td>

      <td className='p-6 flex gap-3'>
        <button
          type='button'
          className='text-blue-600 hover:text-blue-700 uppercase font-bold text-xs'
          onClick={() => navigate(`/clientes/${id}/editar`)}
        >
          Editar
        </button>
        {/* no va ser navigate asi como arriba, ya que al darle al boton hay que eliminar de inmediato y no ir a otro pagina
        entoences, como esta descrito en las rutas al ir a esta url va a ralizar la action eliminarClienteAction */}
        <Form
          method='post'
          action={`/clientes/${id}/eliminar`}
          // antes de nada preguntamos si se quiere eliminar
          onSubmit={(e) => {
            if (!confirm('¿Seguro que desea eliminar este cliente?')) {
              e.preventDefault(); // si no se quiere eliminar, evitamos que se envie el formulario o q
              // que se ejecetu la accion por defecto que es action={`/clientes/${id}/eliminar`}
            }
          }}
        >
          <button
            type='submit'
            className='text-red-600 hover:text-red-700 uppercase font-bold text-xs'
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default Cliente;
