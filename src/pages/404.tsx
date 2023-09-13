import { Link } from '@umijs/max';

export default function Page() {
  return (
    <div className="z-10 flex flex-col justify-center items-center mt-20">
      <div className="text-[10vw] leading-none text-green font-semibold">404</div>
      <h2 className="mt-5 text-[1.6vw] leading-none text-green font-semibold">
        SOMETHING IS WRONG
      </h2>
      <p className="mt-4 text-sm leading-tight text-gray font-light text-center">
        The page you are looking for was moved, removed or might never existed.
      </p>
      <Link className="btn bg-green mt-5 lg:mb-6 text-dark uppercase" to="/">
        Go back
      </Link>
    </div>
  );
}
