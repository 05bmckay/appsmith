import * as Sentry from "@sentry/react";
import { Collapse } from "@blueprintjs/core";
import React, { useCallback, useState } from "react";
import ArrowRight from "remixicon-react/ArrowRightSLineIcon";

interface SettingSectionProps {
  isOpen?: boolean;
  className?: string;
  title: string;
  children?: React.ReactNode;
}

export function SettingSection(props: SettingSectionProps) {
  const [isOpen, setOpen] = useState(props.isOpen);

  /**
   * toggles the collapsible section
   */
  const toggleCollapse = useCallback(() => {
    setOpen(!isOpen);
  }, [setOpen, isOpen]);

  return (
    <div className={`px-3 py-3 ${props.className}`}>
      <div
        className={` cursor-pointer flex items-center justify-between uppercase text-md `}
        onClick={toggleCollapse}
      >
        <div className="font-semibold">{props.title}</div>
        <div>
          <ArrowRight
            className={` transform transition-all ${isOpen ? "rotate-90" : ""}`}
          />
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        <div className="pt-2 space-y-3">{props.children}</div>
      </Collapse>
    </div>
  );
}

SettingSection.displayName = "SettingSection";

export default Sentry.withProfiler(SettingSection);
