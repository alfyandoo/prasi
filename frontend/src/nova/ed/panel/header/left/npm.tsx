import { EdNpmPopup } from "../../popup/npm/npm-popup";
import { TopBtn } from "../top-btn";

export const EdNpm = () => {
  return (
    <TopBtn style="slim" popover={<EdNpmPopup />}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M4 10v4h2v-3h1v3h1v-4H4m5 0v5h2v-1h2v-4H9m3 1v2h-1v-2h1m2-1v4h2v-3h1v3h1v-3h1v3h1v-4h-6M3 9h18v6h-9v1H8v-1H3V9z"
        ></path>
      </svg>
    </TopBtn>
  );
};
