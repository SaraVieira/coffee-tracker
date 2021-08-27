import Layout from '../components/Layout'
import LoginView from '../components/LoginView'

export default function Example() {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
            <div>
              <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                <span className="md:block">Data to enrich your</span>{' '}
                <span className="text-indigo-400 md:block">online business</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua ad ad non deserunt
                sunt.
              </p>
              <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">
                Used by
              </p>
              <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                <div className="flex flex-wrap items-start justify-between">
                  <div className="flex justify-center px-1">
                    <img
                      className="h-9 sm:h-10"
                      src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                      alt="Tuple"
                    />
                  </div>
                  <div className="flex justify-center px-1">
                    <img
                      className="h-9 sm:h-10"
                      src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                      alt="Workcation"
                    />
                  </div>
                  <div className="flex justify-center px-1">
                    <img
                      className="h-9 sm:h-10"
                      src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                      alt="StaticKit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
            <LoginView />
          </div>
        </div>
      </div>
    </Layout>
  )
}
