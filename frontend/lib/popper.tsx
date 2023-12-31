import Arrow from "@/components/atoms/arrow";
import useOutsideElement from "@/hooks/use-Outside-Element";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

export type PopperState = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  menuPos?: Vec2 | undefined;
  setMenuPos: Dispatch<SetStateAction<Vec2 | undefined>>;
  menuPlacement: Placement;
  setMenuPlacement: Dispatch<SetStateAction<Placement>>;
};

export function usePopper(placement: Placement): PopperState {
  const pos = placement === "mouse" ? { x: 0, y: 0 } : undefined;
  const [menuPos, setMenuPos] = useState<Vec2 | undefined>(pos);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPlacement, setMenuPlacement] = useState<Placement>(placement);

  return {
    menuOpen: menuOpen,
    setMenuOpen: setMenuOpen,
    menuPos: menuPos,
    setMenuPos: setMenuPos,
    menuPlacement: menuPlacement,
    setMenuPlacement: setMenuPlacement,
  };
}

export type Placement = "top" | "bottom" | "left" | "right" | "mouse";

export type Vec2 = { x: number; y: number };

type PopoverProps = {
  children?: React.ReactNode;
  placement: Placement;
  position?: Vec2;
  margin?: number;
  unit?: "px" | "rem";
  arrow?: boolean;
  opener: Dispatch<SetStateAction<boolean>>;
} & React.ComponentProps<"div">;

function Popover({
  children,
  className,
  placement = "left",
  position,
  margin = 0,
  unit = "px",
  arrow = false,
  opener,
  ...restProps
}: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  if (placement === "mouse" && !position)
    throw new Error("please defined position when mouse selected as placement");

  useOutsideElement(popoverRef, () => {
    console.log("clicked outside Popover");
    opener(false);
  });

  let style: CSSProperties = {};
  switch (placement) {
    case "right":
      style.top = "50%";
      style.left = `calc(100% + 4px + ${margin}${unit})`;
      style.transform = "translate(0, -50%)";
      break;
    case "top":
      style.top = `calc(-100% - 4px - ${margin}${unit})`;
      style.left = "50%";
      style.transform = "translate(-50%, 0)";
      break;
    case "left":
      style.right = `calc(100% + 4px + ${margin}${unit})`;
      break;
    case "mouse":
      style.position = "fixed";
      style.top = position?.y;
      style.left = position?.x;
      style.transform = `translate(calc(-100%), 0)`;
      break;
  }

  return createPortal(
    <div
      className="absolute inset-0 z-10 h-fit w-fit min-w-max origin-left shadow-black"
      style={style}
      onClick={(e) => e.stopPropagation()}
      ref={popoverRef}
      {...restProps}
    >
      <div className="relative h-fit w-fit">
        {arrow && (
          <>
            {placement === "right" && <Arrow direction="left" />}
            {placement === "top" && <Arrow direction="bottom" />}
            {placement === "left" && <Arrow direction="right" />}
            {placement === "bottom" && <Arrow direction="top" />}
            {/* TODO: add capablity to adjust precisly arrow's position */}
          </>
        )}
        <div
          className={twMerge(
            "bg-black text-xs font-semibold text-[#dbdfe2] shadow-md",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export type PopperProps = {
  popperState: PopperState;
} & React.ComponentProps<"div">;

export function Popper({
  children,
  className,
  popperState,
  ...restProps
}: PopperProps) {
  const { setMenuOpen, menuOpen, menuPlacement, menuPos } = popperState;

  console.log("menuOpen:", menuOpen);

  return (
    <>
      {menuOpen && (
        <Popover
          className="rounded-md"
          opener={setMenuOpen}
          arrow={true}
          placement={menuPlacement}
          position={menuPos}
        >
          <div
            className={twMerge(
              "flex flex-col items-center justify-between space-y-1 overflow-scroll p-2",
              className
            )}
            {...restProps}
          >
            {children}
          </div>
        </Popover>
      )}
    </>
  );
}
