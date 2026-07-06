import React, { createContext, useContext } from 'react';

interface FormFieldContextValue { name: string; }
const FormFieldContext = createContext<FormFieldContextValue>({ name: '' });

export const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = (props) => <form {...props} />;

export const FormField: React.FC<{ name: string; control?: any; render: (props: { field: any }) => React.ReactNode }> = ({ name, render }) => (
  <FormFieldContext.Provider value={{ name }}>
    {render({ field: { name, value: '', onChange: () => {}, onBlur: () => {}, ref: () => {} } })}
  </FormFieldContext.Provider>
);

export const FormItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</div>
);

export const FormLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <label className={className} style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)' }}>{children}</label>
);

export const FormControl: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

export const FormDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={className} style={{ fontSize: 12, color: 'var(--ld-semantic-color-text-secondary, #515357)' }}>{children}</p>
);

export const FormMessage: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => {
  if (!children) return null;
  return <p className={className} style={{ fontSize: 12, color: 'var(--ld-semantic-color-text-negative, #ea1100)' }}>{children}</p>;
};

export const useFormField = () => {
  const ctx = useContext(FormFieldContext);
  return { name: ctx.name, id: ctx.name, formItemId: `${ctx.name}-form-item`, formDescriptionId: `${ctx.name}-description`, formMessageId: `${ctx.name}-message`, error: undefined, invalid: false };
};

export default Form;
