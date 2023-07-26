export interface Buttons_test_json {
  htmlString: string;
  correctText: string;
  name: string;
  comment: string;
  checked: boolean;
  url: string;
  testID: string;
  chromeVersion: string | null;
  chromeExtensionVersion: string | null;
  outcome: string;
}
export interface Buttons_test {
  id: number;
  test_result: Buttons_test_json;
}
