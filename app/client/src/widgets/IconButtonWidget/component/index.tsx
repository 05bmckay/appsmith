import React, { useMemo } from "react";
import styled from "styled-components";
import { Button } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";

import { ComponentProps } from "widgets/BaseComponent";
import { ThemeProp } from "components/ads/common";
import { WIDGET_PADDING } from "constants/WidgetConstants";
import _ from "lodash";
import {
  ButtonBorderRadius,
  ButtonBoxShadow,
  ButtonVariant,
  ButtonVariantTypes,
} from "components/constants";
import {
  getBorderRadiusValue,
  getCustomBackgroundColor,
  getCustomBorderColor,
  getCustomHoverColor,
  getCustomTextColor,
  getBoxShadowValue,
} from "widgets/WidgetUtils";
import { FALLBACK_COLORS } from "constants/ThemeConstants";

type IconButtonContainerProps = {
  disabled?: boolean;
};

const IconButtonContainer = styled.div<IconButtonContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  ${({ disabled }) => disabled && "cursor: not-allowed;"}
`;

export interface ButtonStyleProps {
  borderRadius?: ButtonBorderRadius;
  boxShadow?: string;

  backgroundColor: string;
  buttonVariant?: ButtonVariant;
  dimension?: number;
  hasOnClickAction?: boolean;
}

export const StyledButton = styled((props) => (
  <Button
    {..._.omit(props, [
      "buttonVariant",
      "buttonStyle",
      "borderRadius",
      "boxShadow",
      "dimension",
      "hasOnClickAction",
    ])}
  />
))<ThemeProp & ButtonStyleProps>`

  background-image: none !important;
  height: ${({ dimension }) => (dimension ? `${dimension}px` : "auto")};
  width: ${({ dimension }) => (dimension ? `${dimension}px` : "auto")};
  min-height: auto !important;
  min-width: auto !important;
  ${({ backgroundColor, buttonVariant, hasOnClickAction, theme }) => `
    &:enabled {
      background: ${
        getCustomBackgroundColor(buttonVariant, backgroundColor) !== "none"
          ? getCustomBackgroundColor(buttonVariant, backgroundColor)
          : buttonVariant === ButtonVariantTypes.PRIMARY
          ? theme.colors.button.primary.primary.bgColor
          : "none"
      } !important;
    }

    ${
      hasOnClickAction
        ? `&:hover:enabled, &:active:enabled {
        background: ${
          getCustomHoverColor(theme, buttonVariant, backgroundColor) !== "none"
            ? getCustomHoverColor(theme, buttonVariant, backgroundColor)
            : buttonVariant === ButtonVariantTypes.SECONDARY
            ? theme.colors.button.primary.secondary.hoverColor
            : buttonVariant === ButtonVariantTypes.TERTIARY
            ? theme.colors.button.primary.tertiary.hoverColor
            : theme.colors.button.primary.primary.hoverColor
        } !important;
      }`
        : ""
    }

    &:disabled {
      background-color: ${theme.colors.button.disabled.bgColor} !important;
      color: ${theme.colors.button.disabled.textColor} !important;
      pointer-events: none;
    }

    &&:disabled {
      background-color: ${theme.colors.button.disabled.bgColor} !important;
      border-color: ${theme.colors.button.disabled.bgColor} !important;
      color: ${theme.colors.button.disabled.textColor} !important;
    }

    border: ${
      getCustomBorderColor(buttonVariant, backgroundColor) !== "none"
        ? `1px solid ${getCustomBorderColor(buttonVariant, backgroundColor)}`
        : buttonVariant === ButtonVariantTypes.SECONDARY
        ? `1px solid ${theme.colors.button.primary.secondary.borderColor}`
        : "none"
    } !important;

    & > span {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      color: ${
        buttonVariant === ButtonVariantTypes.PRIMARY
          ? getCustomTextColor(theme, backgroundColor)
          : getCustomBackgroundColor(
              ButtonVariantTypes.PRIMARY,
              backgroundColor,
            ) !== "none"
          ? getCustomBackgroundColor(
              ButtonVariantTypes.PRIMARY,
              backgroundColor,
            )
          : `${theme.colors.button.primary.secondary.textColor}`
      } !important;
    }

    & > span > svg {
      height: 60%;
      width: 60%;
      min-height: 16px;
      min-width: 16px;
    }
  `}

  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: ${({ boxShadow }) => `${boxShadow}`} !important;
`;

export interface IconButtonComponentProps extends ComponentProps {
  iconName?: IconName;
  backgroundColor: string;
  buttonVariant: ButtonVariant;
  borderRadius: string;
  boxShadow: string;
  isDisabled: boolean;
  isVisible: boolean;
  hasOnClickAction: boolean;
  onClick: () => void;
  height: number;
  width: number;
}

function IconButtonComponent(props: IconButtonComponentProps) {
  const {
    backgroundColor,
    borderRadius,
    boxShadow,
    buttonVariant,
    hasOnClickAction,
    height,
    isDisabled,
    onClick,
    width,
  } = props;

  /**
   * returns the dimension to be used for widget
   * whatever is the minimum between width and height,
   * we will use that for the dimension of the widget
   */
  const dimension = useMemo(() => {
    if (width > height) {
      return height - WIDGET_PADDING * 2;
    }

    return width - WIDGET_PADDING * 2;
  }, [width, height]);

  return (
    <IconButtonContainer disabled={isDisabled}>
      <StyledButton
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        boxShadow={boxShadow}
        buttonVariant={buttonVariant}
        dimension={dimension}
        disabled={isDisabled}
        hasOnClickAction={hasOnClickAction}
        icon={props.iconName}
        large
        onClick={onClick}
      />
    </IconButtonContainer>
  );
}

IconButtonComponent.defaultProps = {
  backgroundColor: FALLBACK_COLORS.backgroundColor,
};

export default IconButtonComponent;
