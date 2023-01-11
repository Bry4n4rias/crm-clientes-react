import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import NuevoCliente, {
  action as nuevoClienteAction,
} from './pages/NuevoCliente';
import Index, { loader as clientesLoader } from './pages/Index';
import ErrorPage from './components/ErrorPage';
import EditarCliente, {
  loader as editarClienteLoader,
  action as editarClienteAction,
} from './pages/EditarCliente';
import { action as eliminarClienteAction } from './components/Cliente';

const router = createBrowserRouter([
  {
    path: '/',
    // Layout es como una plantilla que se va a repetir en todas las rutas que se creen en children
    element: <Layout />, //tambien es el componente que contiene el <Outlet /> que muestra
    // el contenido de la ruta actual que estoy visitando en este caso el contenido de la ruta /clientes/nuevo, etc
    children: [
      {
        // Componente a mostrar por defecto sin necesidad de
        // colocar la ruta en la barra de direcciones
        index: true,
        element: <Index />,
        loader: clientesLoader, // componente que se muestra mientras se carga el componente Index
        errorElement: <ErrorPage />, // componente de error personalziado que se muestra si hay un error al cargar el componente Index
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction, // accion que se ejecuta cuando se envia el formulario de nuevo cliente
        errorElement: <ErrorPage />,
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: editarClienteLoader, // componente que se muestra mientras se carga el componente EditarCliente
        action: editarClienteAction, // accion que se ejecuta cuando se envia el formulario de editar cliente
        errorElement: <ErrorPage />,
      },
      {
        path: '/clientes/:clienteId/eliminar',
        action: eliminarClienteAction, // accion que se ejecuta cuando se envia el formulario de eliminar cliente
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
