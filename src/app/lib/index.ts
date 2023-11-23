import produce from 'immer'
import { SchemaOf } from 'yup'

// export const useModelFactory =
//   <Model = unknown>(defaultModel: Model, schema: SchemaOf<any>) =>
//   (model?: Partial<Model>) => {
//     return produce(defaultModel, (draft) => {
//       return schema.validateSync({ ...draft, ...model }, { stripUnknown: true })
//     })
//   }

export const useModelFactory =
  <Model = unknown, Context = unknown>(options: {
    defaults: (context?: Context) => Model
    schema: (context?: Context) => SchemaOf<Model>
  }) =>
  (model?: Partial<Model>, context?: Context): Model => {
    return produce(options.defaults(context), (draft: unknown) => {
      return options
        .schema(context)
        .validateSync({ ...draft, ...model }, { stripUnknown: true })
    })
  }
