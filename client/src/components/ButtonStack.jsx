import ActionButton from "./ActionButton.jsx";

export default function ButtonStack({ buttons }) {
  return (
    <nav className="button-stack" aria-label="Quick actions">
      {buttons.map((item) => (
        <ActionButton key={item.key} item={item} />
      ))}
    </nav>
  );
}
