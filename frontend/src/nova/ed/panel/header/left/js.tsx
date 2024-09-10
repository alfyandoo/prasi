import { useGlobal, useLocal } from "prasi-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { TopBtn } from "../top-btn";
import { useEffect } from "react";
import { isLocalhost } from "../../../../../utils/ui/is-localhost";
import { Tooltip } from "../../../../../utils/ui/tooltip";

export const EdSiteJS = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  const local = useLocal({
    ctrl: false,
  });
  useEffect(() => {
    addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Meta" || e.key === "Control") {
        local.ctrl = true;
        local.render();
      }
    });
    addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key === "Meta" || e.key === "Control") {
        local.ctrl = false;
        local.render();
      }
    });
  }, []);
  return (
    <TopBtn
      style="slim"
      innerClassName="flex-1 flex items-center justify-center"
      onClick={() => {
        if (!local.ctrl) {
          p.ui.popup.code.open = true;
          p.render();
        } else {
          local.ctrl = false;
          local.render();
          const vscode_url = isLocalhost()
            ? "http://localhost:8443?"
            : "https://prasi-vsc.avolut.com/?tkn=prasi&";

          window.open(`${vscode_url}folder=/site/${p.site.id}/site/src`);
        }
      }}
    >
      <Tooltip content="Hold ctrl/cmd to open in new tab">
        <div
          className="flex-1 min-h-[26px] flex items-center justify-center"
          dangerouslySetInnerHTML={{
            __html: `
<svg width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.573 0.275 C 11.507 0.294,11.421 0.327,11.382 0.348 C 11.343 0.369,9.999 1.520,8.396 2.906 C 6.792 4.291,5.462 5.424,5.440 5.424 C 5.418 5.424,4.776 4.956,4.013 4.384 C 3.251 3.813,2.585 3.327,2.533 3.306 C 2.383 3.243,2.065 3.256,1.920 3.330 C 1.754 3.416,0.189 4.975,0.094 5.150 C -0.036 5.390,-0.020 5.704,0.134 5.916 C 0.175 5.973,0.709 6.473,1.319 7.026 C 1.930 7.579,2.426 8.041,2.421 8.052 C 2.417 8.064,1.926 8.494,1.330 9.009 C 0.734 9.523,0.208 9.990,0.162 10.045 C -0.015 10.259,-0.044 10.597,0.093 10.849 C 0.189 11.024,1.752 12.583,1.920 12.670 C 2.086 12.757,2.417 12.759,2.573 12.675 C 2.632 12.644,3.273 12.173,3.997 11.629 L 5.315 10.641 5.424 10.741 C 5.484 10.796,6.713 11.909,8.154 13.214 C 10.000 14.885,10.820 15.610,10.926 15.667 L 11.076 15.747 11.750 15.747 L 12.424 15.747 14.055 14.933 C 15.555 14.185,15.695 14.110,15.803 13.991 C 16.016 13.754,16.000 14.232,16.000 8.253 C 16.000 2.432,16.009 2.785,15.849 2.554 C 15.791 2.470,15.439 2.223,14.215 1.406 C 13.358 0.834,12.602 0.341,12.535 0.311 C 12.435 0.266,12.348 0.255,12.053 0.248 C 11.816 0.243,11.652 0.252,11.573 0.275 M13.272 2.580 L 14.505 3.400 14.506 8.220 L 14.507 13.040 13.302 13.640 L 12.098 14.240 11.813 14.240 L 11.529 14.240 8.660 11.644 C 7.082 10.216,5.748 9.028,5.697 9.003 C 5.498 8.909,5.197 8.902,5.036 8.989 C 5.002 9.007,4.385 9.464,3.664 10.004 C 2.943 10.545,2.342 10.987,2.329 10.987 C 2.299 10.987,1.852 10.539,1.868 10.525 C 2.541 9.948,3.946 8.731,4.050 8.634 C 4.136 8.553,4.219 8.442,4.260 8.354 C 4.317 8.227,4.325 8.180,4.314 8.011 C 4.304 7.853,4.286 7.788,4.223 7.687 C 4.170 7.601,3.769 7.221,2.994 6.520 L 1.844 5.480 2.075 5.247 C 2.202 5.118,2.317 5.013,2.331 5.013 C 2.344 5.013,2.975 5.478,3.731 6.046 C 5.227 7.169,5.268 7.194,5.541 7.162 C 5.619 7.153,5.733 7.122,5.794 7.093 C 5.856 7.064,6.297 6.703,6.773 6.291 C 7.250 5.879,7.784 5.417,7.960 5.265 C 8.136 5.113,9.120 4.263,10.147 3.375 C 11.173 2.488,12.019 1.761,12.026 1.761 C 12.034 1.760,12.594 2.129,13.272 2.580 M11.640 4.257 C 11.611 4.263,11.539 4.286,11.480 4.308 C 11.421 4.329,10.401 5.046,9.213 5.901 C 6.867 7.590,6.920 7.547,6.851 7.854 C 6.825 7.969,6.825 8.031,6.851 8.146 C 6.919 8.453,6.868 8.410,9.213 10.099 C 10.401 10.954,11.427 11.675,11.493 11.700 C 11.840 11.833,12.236 11.671,12.422 11.320 L 12.493 11.187 12.493 8.000 L 12.493 4.813 12.422 4.680 C 12.333 4.512,12.208 4.391,12.053 4.324 C 11.926 4.268,11.729 4.236,11.640 4.257 M10.980 8.757 L 10.973 9.514 9.927 8.764 C 9.352 8.351,8.881 8.007,8.881 8.000 C 8.881 7.993,9.352 7.649,9.927 7.236 L 10.973 6.486 10.980 7.243 C 10.984 7.659,10.984 8.341,10.980 8.757 " stroke="none" fill="currentColor" fill-rule="evenodd"></path></svg>`,
          }}
        ></div>
      </Tooltip>
    </TopBtn>
  );
};
