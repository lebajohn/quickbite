const ErrorPage = ({
  errorMessage,
  goBack,
}) => {
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center px-6">

      <div className="max-w-lg w-full bg-[#1a1a1a] border border-red-500/20 rounded-3xl p-10 text-center">

        <h1 className="text-6xl mb-4">
          ⚠️
        </h1>

        <h2 className="text-4xl font-serif text-red-400 mb-4">
          Authentication Failed
        </h2>

        <p className="text-gray-300 mb-8">
          {errorMessage}
        </p>

        <button
          onClick={goBack}
          className="bg-amber-500 hover:bg-amber-400 transition text-black px-8 py-4 rounded-xl font-bold"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;