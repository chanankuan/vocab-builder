export default function ActionsBtn({ action }: { action: () => void }) {
  return (
    <button className="text-gray-dark hover:text-mainFont" onClick={action}>
      ...
    </button>
  );
}
