import {
  FetchSelectedAppThemeAction,
  UpdateSelectedAppThemeAction,
  ChangeSelectedAppThemeAction,
} from "actions/appThemingActions";
import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
} from "constants/ReduxActionConstants";
import { AppTheme } from "entities/AppTheming";
import ThemingApi from "api/AppThemingApi";
import { all, takeLatest, put } from "redux-saga/effects";

const dummyThemes: AppTheme[] = [
  {
    name: "Classic",
    created_at: "12/12/12",
    created_by: "@appsmith",
    config: {
      colors: {
        primaryColor: "#50AF6C",
        backgroundColor: "#F6F6F6",
      },
      borderRadius: {
        appBorderRadius: {
          none: "0px",
          md: "0.375rem",
          lg: "1.5rem",
          full: "9999px",
        },
      },
      boxShadow: {
        appBoxShadow: {
          none: "none",
          sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          md:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          lg:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      },
      fontFamily: {
        appFont: ["System Default", "Nunito Sans", "Poppins"],
      },
    },
    stylesheet: {
      AUDIO_RECORDER_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      BUTTON_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      BUTTON_GROUP_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CHART_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CHECKBOX_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CHECKBOX_GROUP_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CONTAINER_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      DATE_PICKER_WIDGET2: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "none",
      },
      FILE_PICKER_WIDGET_V2: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      FORM_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      FORM_BUTTON_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      ICON_BUTTON_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      IFRAME_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      IMAGE_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      INPUT_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "none",
      },
      LIST_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MAP_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MENU_BUTTON_WIDGET: {
        menuColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MODAL_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      },
      MULTI_SELECT_TREE_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      },
      MULTI_SELECT_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      },
      DROP_DOWN_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "none",
      },
      RADIO_GROUP_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
      },
      RICH_TEXT_EDITOR_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      STATBOX_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      SWITCH_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
      },
      TABLE_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      TABS_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      TEXT_WIDGET: {},
      VIDEO_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      SINGLE_SELECT_TREE_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      },
    },
    properties: {
      colors: {
        primaryColor: "#50AF6C",
        backgroundColor: "#F6F6F6",
      },
      borderRadius: {
        appBorderRadius: "0px",
        buttonBorderRadius: "0px",
      },
      boxShadow: {
        appBoxShadow: "none",
      },
      fontFamily: {
        appFont: "System Default",
      },
    },
  },
  {
    name: "Default",
    created_at: "12/12/12",
    created_by: "@appsmith",
    config: {
      colors: {
        primaryColor: "#553DE9",
        backgroundColor: "#F6F6F6",
      },
      borderRadius: {
        appBorderRadius: {
          none: "0px",
          DEFAULT: "0.25rem",
          md: "0.375rem",
          lg: "0.5rem",
          xl: "0.75rem",
          "2xl": "1rem",
          "3xl": "1.5rem",
          full: "9999px",
        },
        buttonBorderRadius: {
          none: "0px",
          md: "0.375rem",
          lg: "0.5rem",
        },
      },
      boxShadow: {
        appBoxShadow: {
          none: "none",
          sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          DEFAULT:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          md:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          lg:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      },

      fontFamily: {
        appFont: ["Roboto", "Nunito Sans", "Poppins"],
      },
    },
    stylesheet: {
      AUDIO_RECORDER_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      BUTTON_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      BUTTON_GROUP_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CHART_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CHECKBOX_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CHECKBOX_GROUP_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CONTAINER_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      DATE_PICKER_WIDGET2: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "none",
      },
      FILE_PICKER_WIDGET_V2: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      FORM_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      FORM_BUTTON_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      ICON_BUTTON_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      IFRAME_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      IMAGE_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      INPUT_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "none",
      },
      LIST_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MAP_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MENU_BUTTON_WIDGET: {
        menuColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MODAL_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      },
      MULTI_SELECT_TREE_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      },
      MULTI_SELECT_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      },
      DROP_DOWN_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "none",
      },
      RADIO_GROUP_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
      },
      RICH_TEXT_EDITOR_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      STATBOX_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      SWITCH_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
      },
      TABLE_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      TABS_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      TEXT_WIDGET: {},
      VIDEO_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      SINGLE_SELECT_TREE_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      },
    },
    properties: {
      colors: {
        primaryColor: "#553DE9",
        backgroundColor: "#F6F6F6",
      },
      borderRadius: {
        appBorderRadius: "0.375rem",
        buttonBorderRadius: "0.375rem",
      },
      boxShadow: {
        appBoxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      },
      fontFamily: {
        appFont: "Nunito Sans",
      },
    },
  },
  {
    name: "Sharp",
    created_at: "12/12/12",
    created_by: "@appsmith",
    config: {
      colors: {
        primaryColor: "#3B7DDD",
        backgroundColor: "#153D77",
      },
      borderRadius: {
        appBorderRadius: {
          none: "0px",
          DEFAULT: "0.25rem",
          md: "0.375rem",
          lg: "0.5rem",
          xl: "0.75rem",
          "2xl": "1rem",
          "3xl": "1.5rem",
          full: "9999px",
        },
        buttonBorderRadius: {
          none: "0px",
          md: "0.375rem",
          lg: "0.5rem",
        },
      },
      boxShadow: {
        appBoxShadow: {
          none: "none",
          sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          DEFAULT:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          md:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          lg:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      },
      fontFamily: {
        appFont: ["Roboto", "Nunito Sans", "Poppins"],
      },
    },
    stylesheet: {
      AUDIO_RECORDER_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      BUTTON_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      BUTTON_GROUP_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CHART_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CHECKBOX_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CONTAINER_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      DATE_PICKER_WIDGET2: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      FILE_PICKER_WIDGET_V2: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      FORM_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      ICON_BUTTON_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      IFRAME_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      IMAGE_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      INPUT_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
      },
      LIST_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MAP_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MENU_BUTTON_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MODAL_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      },
      MULTI_SELECT_TREE_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      },
      MULTI_SELECT_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      },
      DROPDOWN_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
      },
      RADIO_GROUP_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
      },
      RICH_TEXT_EDITOR_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      STATBOX_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      SWITCH_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
      },
      TABLE_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      TABS_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      TEXT_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      VIDEO_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      SINGLE_SELECT_TREE_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
    },
    properties: {
      colors: {
        primaryColor: "#3B7DDD",
        backgroundColor: "#153D77",
      },
      borderRadius: {
        appBorderRadius: "0px",
        buttonBorderRadius: "0.375rem",
      },
      boxShadow: {
        appBoxShadow: "none",
      },
      fontFamily: {
        appFont: "Roboto",
      },
    },
  },
  {
    name: "Rounded",
    created_at: "12/12/12",
    created_by: "@appsmith",
    config: {
      colors: {
        primaryColor: "#DE1593",
        backgroundColor: "#F6F6F6",
      },
      borderRadius: {
        appBorderRadius: {
          none: "0px",
          DEFAULT: "0.25rem",
          md: "0.375rem",
          lg: "0.5rem",
          xl: "0.75rem",
          "2xl": "1rem",
          "3xl": "1.5rem",
          full: "9999px",
        },
        buttonBorderRadius: {
          none: "0px",
          md: "0.375rem",
          lg: "0.5rem",
        },
      },
      boxShadow: {
        appBoxShadow: {
          none: "none",
          sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          DEFAULT:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          md:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          lg:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      },
      fontFamily: {
        appFont: ["Roboto", "Nunito Sans", "Poppins"],
      },
    },
    stylesheet: {
      AUDIO_RECORDER_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      BUTTON_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      BUTTON_GROUP_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CHART_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CHECKBOX_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      CONTAINER_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      DATE_PICKER_WIDGET2: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      FILE_PICKER_WIDGET_V2: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      FORM_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      ICON_BUTTON_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      IFRAME_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      IMAGE_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      INPUT_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      LIST_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MAP_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MENU_BUTTON_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MODAL_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      },
      MULTI_SELECT_TREE_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      MULTI_SELECT_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      DROPDOWN_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
      },
      RADIO_GROUP_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
      },
      RICH_TEXT_EDITOR_WIDGET: {
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      STATBOX_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      SWITCH_WIDGET: {
        backgroundColor: "{{appsmith.theme.colors.primaryColor}}",
      },
      TABLE_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      TABS_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      TEXT_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      VIDEO_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
      SINGLE_SELECT_TREE_WIDGET: {
        primaryColor: "{{appsmith.theme.colors.primaryColor}}",
        borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
        boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      },
    },
    properties: {
      colors: {
        primaryColor: "#DE1593",
        backgroundColor: "#F6F6F6",
      },
      borderRadius: {
        appBorderRadius: "1rem",
        buttonBorderRadius: "0.375rem",
      },
      boxShadow: {
        appBoxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        appFont: "Roboto",
      },
    },
  },
];

/**
 * fetches all themes of the application
 *
 * @param action
 */
export function* fetchAppThemes() {
  try {
    const response = yield ThemingApi.fetchThemes();

    yield put({
      type: ReduxActionTypes.FETCH_APP_THEMES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ReduxActionErrorTypes.FETCH_APP_THEMES_ERROR,
      payload: { error },
    });
  }
}

/**
 * fetches the selected theme of the application
 *
 * @param action
 */
export function* fetchAppSelectedTheme(
  action: ReduxAction<FetchSelectedAppThemeAction>,
) {
  const { applicationId } = action.payload;
  try {
    const response = yield ThemingApi.fetchSelected(applicationId);

    yield put({
      type: ReduxActionTypes.FETCH_SELECTED_APP_THEME_SUCCESS,
      payload: dummyThemes[0],
    });
  } catch (error) {
    yield put({
      type: ReduxActionErrorTypes.FETCH_SELECTED_APP_THEME_ERROR,
      payload: { error },
    });
  }
}

/**
 * updates the selected theme of the application
 *
 * @param action
 */
export function* updateSelectedTheme(
  action: ReduxAction<UpdateSelectedAppThemeAction>,
) {
  const { applicationId, theme } = action.payload;

  try {
    const response = yield ThemingApi.updateTheme(applicationId, theme);

    yield put({
      type: ReduxActionTypes.UPDATE_SELECTED_APP_THEME_SUCCESS,
      payload: theme,
    });
  } catch (error) {
    yield put({
      type: ReduxActionErrorTypes.UPDATE_SELECTED_APP_THEME_ERROR,
      payload: { error },
    });
  }
}

/**
 * change the selected theme of the application
 *
 * @param action
 */
export function* changeSelectedTheme(
  action: ReduxAction<ChangeSelectedAppThemeAction>,
) {
  const { applicationId, theme } = action.payload;

  try {
    yield ThemingApi.changeTheme(applicationId, theme);

    yield put({
      type: ReduxActionTypes.CHANGE_SELECTED_APP_THEME_SUCCESS,
      payload: theme,
    });
  } catch (error) {
    yield put({
      type: ReduxActionErrorTypes.CHANGE_SELECTED_APP_THEME_ERROR,
      payload: { error },
    });
  }
}

export default function* appThemingSaga() {
  yield all([
    takeLatest(ReduxActionTypes.FETCH_APP_THEMES_INIT, fetchAppThemes),
    takeLatest(
      ReduxActionTypes.FETCH_SELECTED_APP_THEME_INIT,
      fetchAppSelectedTheme,
    ),
    takeLatest(
      ReduxActionTypes.UPDATE_SELECTED_APP_THEME_INIT,
      updateSelectedTheme,
    ),
    takeLatest(
      ReduxActionTypes.CHANGE_SELECTED_APP_THEME_INIT,
      updateSelectedTheme,
    ),
  ]);
}
