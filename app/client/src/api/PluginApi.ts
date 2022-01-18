import Api from "api/Api";
import { AxiosPromise } from "axios";
import { GenericApiResponse } from "api/ApiResponses";
import { PluginType } from "entities/Action";
import { DependencyMap } from "utils/DynamicBindingUtils";
import { ValidationTypes } from "constants/WidgetValidation";

export type PluginId = string;
export type PluginPackageName = string;
export type GenerateCRUDEnabledPluginMap = Record<PluginId, PluginPackageName>;

export enum UIComponentTypes {
  DbEditorForm = "DbEditorForm",
  UQIDbEditorForm = "UQIDbEditorForm",
  ApiEditorForm = "ApiEditorForm",
  RapidApiEditorForm = "RapidApiEditorForm",
  JsEditorForm = "JsEditorForm",
}

export enum DatasourceComponentTypes {
  RestAPIDatasourceForm = "RestAPIDatasourceForm",
  AutoForm = "AutoForm",
}
export interface Plugin {
  id: string;
  name: string;
  type: PluginType;
  packageName: string;
  iconLocation?: string;
  uiComponent: UIComponentTypes;
  datasourceComponent: DatasourceComponentTypes;
  allowUserDatasources?: boolean;
  templates: Record<string, string>;
  responseType?: "TABLE" | "JSON";
  documentationLink?: string;
  generateCRUDPageComponent?: string;
}

export interface PluginFormPayload {
  form: any[];
  editor: any[];
  setting: any[];
  dependencies: DependencyMap;
}

class PluginsApi extends Api {
  static url = "v1/plugins";
  static fetchPlugins(
    orgId: string,
  ): AxiosPromise<GenericApiResponse<Plugin[]>> {
    return Api.get(PluginsApi.url, { organizationId: orgId });
  }

  static fetchFormConfig(
    id: string,
  ): AxiosPromise<GenericApiResponse<PluginFormPayload>> {
    return Api.get(PluginsApi.url + `/${id}/form`).then((response: any) => {
      addValidationConfig(response.data.editor);
      addValidationConfig(response.data.settings);
      return response;
    });
  }
}

export default PluginsApi;

function addValidationConfig(editorConfig: any): any {
  if (!editorConfig || !editorConfig.length) return;

  for (let i = 0; i < editorConfig.length; i++) {
    if (editorConfig[i].configProperty) {
      editorConfig[i]["validationConfig"] = {
        type: ValidationTypes.TEXT,
        params: {
          required: true,
        },
      };
    }
    if (editorConfig[i].children) {
      addValidationConfig(editorConfig[i].children);
    }
  }
}
