import HeaderClient from "./HeaderClient";
import linkstit from "../header.json";

export default function Header() {
  return <HeaderClient linkstit={linkstit} />;
}
