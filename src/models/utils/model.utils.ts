export const modelConfig = {
  timestamps: true,
  versionKey: false,
}

export const modelKeysDefault = {
  active: {
    type: Boolean,
    required: true,
    default: true,
  }
}

export interface IModel {
  _id?: Id;
}