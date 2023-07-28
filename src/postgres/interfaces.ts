export interface Buttons_test {
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
export interface Buttons_test_database {
  id: number;
  test_result: Buttons_test;
}

export interface Test {
  id: number;
  name: string;
}
