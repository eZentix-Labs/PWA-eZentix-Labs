import { Link } from "react-router-dom";
import { ActionIcon, SocialIcon } from "./Icons.jsx";
import { trackClick } from "../lib/api.js";

export default function ActionButton({ item, brand = false }) {
  const isInternal = item.href.startsWith("/");

  const inner = (
    <>
      <span className="icon-circle" style={{ background: item.bgColor || "#FFFFFF" }}>
        {brand ? <SocialIcon name={item.icon} /> : <ActionIcon name={item.icon} />}
      </span>
      <span className="action-label">{item.label}</span>
    </>
  );

  const onClick = () => trackClick(item.key, item.type || "button");

  // Internal routes stay in the app; everything else opens in a new tab.
  if (isInternal) {
    return (
      <Link className="action-button" to={item.href} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <a className="action-button" href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {inner}
    </a>
  );
}
