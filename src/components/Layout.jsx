import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  return (
    <div className='md:flex md:min-h-screen'>
      <aside className='md:w-1/4 bg-blue-900 px-5 py-10'>
        <h2 className='text-4xl font-black text-center text-white'>
          CRM - Clientes
        </h2>

        <nav className='mt-10'>
          <Link
            to='/'
            className={`${
              location.pathname === '/' ? 'text-blue-300' : 'text-white'
            } block mt-2 text-2xl hover:text-blue-300`}
          >
            Clientes
          </Link>
          <Link
            to='/clientes/nuevo'
            className={`${
              location.pathname === '/clientes/nuevo'
                ? 'text-blue-300'
                : 'text-white'
            } block mt-2 text-2xl hover:text-blue-300`}
          >
            Nuevo Cliente
          </Link>
        </nav>
      </aside>

      <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
