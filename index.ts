import { useState } from 'react';

interface FieldSchema {
  type: "string";
  title: string;
  enum?: string[];
  format?: 'radio' | 'checkbox';
};

export const useDynamicForm = (title: string, description: string) => {
  const [formSchema, setFormSchema] = useState({
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    type: "object",
    properties: {},
  });

  // Add a new field to the form with custom options
  const addField = (fieldName: string, options: string[], numAllowedSelections: number) => {
    const fieldSchema: FieldSchema = {
      type: 'string',
      title: fieldName,
    };

    if (options) {
      fieldSchema.enum = options;
      if (numAllowedSelections === 1) {
        fieldSchema.format = 'radio';
      } else {
        fieldSchema.format = 'checkbox';
      }
    }

    setFormSchema((prevSchema) => ({
      ...prevSchema,
      properties: {
        ...prevSchema.properties,
        [fieldName]: fieldSchema,
      },
    }));
  };

  return { addField, formSchema: {...formSchema, title, description} };
}
