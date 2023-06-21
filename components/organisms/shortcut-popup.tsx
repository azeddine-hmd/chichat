"use client";

import { useContext } from "react";
import Hr from "../atoms/hr";
import Popup from "../molecules/popup";
import { GlobalContext } from "@/client-context/global";
import Field from "../atoms/field";

export default function ShortcutPopup() {
  const shortcutHelpPopup = useContext(GlobalContext)!!.shortcutHelpPopup;

  return (
    <Popup
      onClick={(e) => shortcutHelpPopup.set(false)}
      className="bg-black/30 text-2xl text-white backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-lg border border-gray-800 bg-gray-500 p-5 px-10 pb-14 shadow-lg"
      >
        <div className="mb-4 flex w-full -translate-x-5 items-center justify-center text-3xl font-semibold text-muted">
          Shortcuts :
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <div className="mt-4 inline-flex h-full flex-col gap-4">
            <div>
              <Field className="inline h-fit w-fit text-[20px] shadow-lg">
                SHIFT
              </Field>
              <span className="mx-2 text-sm text-muted">+</span>
              <Field className="inline h-fit w-fit text-[20px] shadow-lg">
                ?
              </Field>
            </div>

            <div>
              <Field className="inline h-fit w-fit text-[20px] shadow-lg">
                CTRL
              </Field>
              <span className="mx-2 text-sm text-muted">+</span>
              <Field className="inline h-fit w-fit text-[20px] shadow-lg">
                ALT
              </Field>
              <span className="mx-2 text-sm text-muted">+</span>
              <Field className="inline h-fit w-fit text-[20px] shadow-lg">
                P
              </Field>
            </div>
          </div>

          <Hr className="mx-4 h-full border-gray-700" />

          <div className="text-md mt-4 inline-flex h-full flex-col gap-4 text-gray-400">
            <div>open shortcut help</div>
            <div>open quick search</div>
          </div>
        </div>
      </div>
    </Popup>
  );
}
