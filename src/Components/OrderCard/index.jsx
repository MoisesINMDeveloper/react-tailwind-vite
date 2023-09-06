const OrderCard = (props) => {
  const { id, title, imageUrl, price, handleDelete } = props;
  let renderHandlerDelete;
  if (handleDelete) {
    renderHandlerDelete = (
      <svg
        onClick={() => handleDelete(id)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );
  }

  return (
    <div className="flex items-center justify-between mb-3 overflow-y-start">
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20">
          <img
            className="object-contain w-full h-full rounded-lg "
            src={imageUrl}
            alt={title}
          />
        </figure>
        <p className="p-5 text-sm font-light line-clamp-1">{title}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-lg font-medium">${price}</p>
        <button>{renderHandlerDelete}</button>
      </div>
    </div>
  );
};
export { OrderCard };
