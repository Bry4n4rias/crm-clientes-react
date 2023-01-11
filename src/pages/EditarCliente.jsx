import React from 'react';
import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from 'react-router-dom';
import Error from '../components/Error';
import Formulario from '../components/Formulario';
import { obtenerCliente, actualizarCliente } from '../data/Clientes';

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId); // params.id viene de la ruta /clientes/:id/editar en main.jsx
  if (Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Cliente no encontrado',
    });
  }
  return cliente;
}

export async function action({ request, params }) {
  const formData = await request.formData(); // obtiene los datos del formulario en formato json {nombre: 'nombre', empresa: 'empresa', etc}
  // console.log(formData.get('nombre')); // obtiene el valor del campo nombre del formulario

  // validacion del campo email
  const email = formData.get('email'); // obtiene el valor del campo email del formulario

  // validacion en general
  const errores = []; // array para guardar los errores

  const datosForm = Object.fromEntries(formData); // objeto para guardar los datos del formulario

  if (Object.values(datosForm).includes('')) {
    // si alguno de los campos esta vacio
    errores.push('Todos los campos son obligatorios'); // agrega el error al array
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    // si el email no es valido segun la regex de arriba hace lo siguiente
    errores.push('El email no es valido'); // agrega el error al array
  }

  if (Object.keys(errores).length) {
    return errores; // si hay errores retorna el array de errores
  }

  // actualizar cliente
  // le pasamos el id que viene por parametro y los datos del formulario nuevo
  await actualizarCliente(params.clienteId, datosForm); // si no hay errores actualiza el cliente
  return redirect('/'); // redirecciona a la ruta raiz
}

const EditarCliente = () => {
  const cliente = useLoaderData();
  const navigate = useNavigate();
  const errores = useActionData();
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
      <p className='mt-3'>Ingresa los nuevos datos del nuevo ciente</p>

      <div className='flex justify-end'>
        <button
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
          onClick={() => navigate('/')} // navega a la ruta raiz, si pongo (-1) me lleva a la pagina anterior
        >
          Volver
        </button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-4 py-10 mt-20'>
        {errores?.length &&
          // si hay errores los mapeamos y mostramos mediante el componente Error
          // pasamos la key por si hay mas de un error y pasamos el error como children para q se muestra en Error
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method='post'>
          <Formulario cliente={cliente} />
          <input
            type='submit'
            className='mt-5 w-full bg-blue-800 uppercase font-blod text-white text-lg cursor-pointer'
            value='Guardar cliente'
          />
        </Form>
      </div>
    </>
  );
};

export default EditarCliente;
