const ErrorComponent = ({ info }) => {
  return (
    <div className="bg-red-500 h-fit rounded p-4 flex flex-col gap-5 mt-44 mx-auto text-center">
      <p>Sorry, an error occurred, please try again later.</p>
      <h2 className="font-semibold">{info}</h2>
    </div>
  );
};

export default ErrorComponent;