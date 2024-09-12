import { FC, ReactElement, ReactNode, useEffect } from "react";
import { useLocal } from "../react/use-local";

const w = window as unknown as {
  loadingIcon: string;
  ContentLoading?: FC<{ alt?: any; note?: any }>;
};

export const Loading: FC<{
  children?: ReactNode;
  className?: string;
  show?: boolean;
  backdrop?: boolean;
  note?: ReactNode;
  alt?: ReactElement;
  pointer?: boolean;
}> = ({ children, className, show, backdrop, note, alt, pointer }) => {
  const local = useLocal(
    {
      icon: <div className="px-4 py-1">Loading...</div>,
      value: 0.111,
      ival: null as any,
    },
    () => {}
  );
  useEffect(() => {
    local.ival = setInterval(() => {
      local.value += 0.1333;
      if (local.value >= 1.3) {
        local.value = 0;
      }
      local.render();
    }, 200);
    if (w.loadingIcon) {
      local.icon = (
        <img
          alt="loading"
          src={w.loadingIcon}
          className={css`
            width: 42px;
            height: 42px;
          `}
        />
      );
      local.render();
    }
    return () => {
      clearInterval(local.ival);
    };
  }, []);

  const CustomLoading = w.ContentLoading;
  console.log();
  return (
    <>
      {backdrop !== false && (
        <div
          className={cx(
            "flex items-center z-40 bg-white pointer-events-none",
            "w-full h-full fixed transition-all duration-1000",
            typeof show !== "undefined"
              ? show
                ? "opacity-50"
                : "opacity-0"
              : "opacity-50"
          )}
          onContextMenuCapture={(e) => {
            e.preventDefault();
          }}
        ></div>
      )}
      {children ? (
        <div
          onContextMenuCapture={(e) => {
            e.preventDefault();
          }}
          className={cx(
            "flex flex-1 items-center justify-center z-40 transition-all",
            className
              ? className
              : backdrop !== false
                ? "w-full h-full fixed"
                : "",
            typeof show !== "undefined" ? (show ? "" : "hidden") : ""
          )}
        >
          <div className="flex items-center justify-center flex-col space-y-3 bg-white p-4 rounded-lg select-none">
            <div className="text-sm">{children}</div>
          </div>
        </div>
      ) : (
        <div
          className={cx(
            "flex flex-1 items-center justify-center z-40  transition-all",
            pointer !== true && "pointer-events-none",
            className
              ? className
              : backdrop !== false
                ? "w-full h-full fixed"
                : "",
            typeof show !== "undefined" ? (show ? "" : "hidden") : ""
          )}
        >
          {CustomLoading ? (
            <CustomLoading alt={alt} note={note} />
          ) : (
            <div
              className={cx(
                "w-1/6 flex flex-col items-center justify-center",
                css`
                  min-width: 30px;
                  .pr-outer {
                    background: rgba(0, 0, 0, 0.1) !important;
                  }
                `
              )}
            >
              <div className="text-[10px] text-slate-400 whitespace-nowrap">
                {note}
              </div>

              <div className="pr-outer w-full h-[3px] flex items-stretch rounded-sm overflow-hidden">
                <div
                  className={cx(
                    "bg-blue-800 transition-all duration-200 rounded-sm w-full",
                    css`
                      transform: translate(${-100 + local.value * 200}%);
                    `
                  )}
                ></div>
              </div>
              {alt}
            </div>
          )}
        </div>
      )}
    </>
  );
};
