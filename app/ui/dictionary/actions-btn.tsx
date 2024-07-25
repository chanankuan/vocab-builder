export default function ActionsBtn({
  action,
}: {
  action: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      className="relative text-gray-dark transition-colors hover:text-mainFont"
      onClick={action}
    >
      ...
    </button>
  );
}
