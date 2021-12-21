import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Collapse, Icon } from "@blueprintjs/core";
import { Colors } from "constants/Colors";

type AccordionProps = React.PropsWithChildren<{
  backgroundColor?: string;
  borderColor?: string;
  className?: string;
  isCollapsible: boolean;
  title?: string;
}>;

type StyledToggleHeaderProps = {
  isOpen: boolean;
};

type StyledWrapperProps = {
  backgroundColor?: string;
  borderColor?: string;
};

const COLLAPSE_PADDING = 10;
const WRAPPER_MARGIN_BOTTOM = 8;
const DEFAULT_BORDER_COLOR = Colors.GREY_3;
const DEFAULT_BACKGROUND_COLOR = "fff";

const StyledToggleHeader = styled.div<StyledToggleHeaderProps>`
  align-items: center;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  padding-bottom: ${({ isOpen }) => (isOpen ? COLLAPSE_PADDING : 0)}px;
  width: 100%;
`;

const StyledToggleHeaderText = styled.span`
  width: 100%;
`;

const StyledWrapper = styled.div<StyledWrapperProps>`
  border: 1px solid ${({ borderColor }) => borderColor || DEFAULT_BORDER_COLOR};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || DEFAULT_BACKGROUND_COLOR};
  padding: ${COLLAPSE_PADDING}px;
  position: relative;
  margin-bottom: ${WRAPPER_MARGIN_BOTTOM}px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

function Accordion({
  backgroundColor,
  borderColor,
  children,
  className,
  isCollapsible,
  title,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isCollapsible && !isOpen) {
      setIsOpen(true);
    }
  }, [isCollapsible, isOpen, setIsOpen]);

  const toggleIsOpen = () => setIsOpen((prevState) => !prevState);

  return (
    <StyledWrapper
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      className={className}
    >
      {isCollapsible && (
        <StyledToggleHeader
          isOpen={isOpen}
          onClick={toggleIsOpen}
          role="button"
          tabIndex={0}
        >
          <StyledToggleHeaderText>{title}</StyledToggleHeaderText>
          <Icon
            icon={isOpen ? "chevron-up" : "chevron-down"}
            iconSize={16}
            style={{ color: "#2E3D49" }}
          />
        </StyledToggleHeader>
      )}
      <Collapse isOpen={isOpen}>{children}</Collapse>
    </StyledWrapper>
  );
}

export default Accordion;
