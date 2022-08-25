export interface ICloudStorage {
  content:       ICloudContent;
  path:          string;
  success:       boolean;
}

interface ICloudContent {
  files:         Array<string>;
  directories:   Array<string>;
}
