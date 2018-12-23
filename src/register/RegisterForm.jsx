/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage,
  FormSection,
  FormHeader,
} from '@atlaskit/form';

const Styles = {
  Form: css`
    display: flex;
    margin: 0 auto;
    flex-direction: column;
  `,
  FieldWrapper: css`
    margin-bottom: 1rem;
  `,
  Remember: css`
    margin-top: 2rem;
  `,
};

const RegisterForm = (props) => (
  <div css={Styles.Form}>
    <Form onSubmit={props.onSubmit}>
      {({ formProps }) => (
        <form {...formProps}>
          <FormHeader title="Create a new account" />
          <FormSection>
            <h4>Base information</h4>
            <Field name="email" isRequired defaultValue="">
              {({ fieldProps, error }) => (
                <div css={Styles.FieldWrapper}>
                  <TextField type="email" autoComplete="off" placeholder="Enter email"  {...fieldProps} />
                    {!error && (
                      <HelperMessage>
                        You can only use letters, numbers & periods.
                      </HelperMessage>
                    )}
                    {error && (
                      <ErrorMessage>
                        This email is already in use, try another one.
                      </ErrorMessage>
                    )}
                </div>
              )}
            </Field>
            <Field
              name="password"
              defaultValue=""
              isRequired
              validate={value => (value.length < 4 ? 'TOO_SHORT' : undefined)}
            >
              {({ fieldProps, error, meta }) => (
                <div css={Styles.FieldWrapper}>
                  <TextField type="password" placeholder="Enter your secret password" {...fieldProps} />
                  {!error && !meta.valid && (
                    <HelperMessage>
                      Use 4 or more characters with a mix of letters, numbers &
                      symbols.
                    </HelperMessage>
                  )}
                  {error && (
                    <ErrorMessage>
                      Password needs to be more than 4 characters.
                    </ErrorMessage>
                  )}}
                  {meta.valid && <ValidMessage>Awesome password!</ValidMessage>}
                </div>
              )}
            </Field>
          </FormSection>
          <FormSection>
            <h4>Detail information</h4>
            <Field
              name="firstname"
              defaultValue=""
              isRequired
              validate={value => (value.length < 2 ? 'TOO_SHORT' : undefined)}
            >
              {({ fieldProps }) => (
                <div css={Styles.FieldWrapper}>
                  <TextField type="text" placeholder="Enter your first name" {...fieldProps} />
                </div>
              )}
            </Field>
            <Field
              name="lastname"
              defaultValue=""
              isRequired
              validate={value => (value.length < 2 ? 'TOO_SHORT' : undefined)}
            >
              {({ fieldProps }) => (
                <div css={Styles.FieldWrapper}>
                  <TextField type="text" placeholder="Enter your last name" {...fieldProps} />
                </div>
              )}
            </Field>
          </FormSection>
          <div css={Styles.Remember}>
            <CheckboxField name="remember" label="Remember me" defaultIsChecked>
              {({ fieldProps }) => (
                <Checkbox {...fieldProps} label="Always sign in on this device" />
              )}
            </CheckboxField>
          </div>
          <FormFooter>
            <ButtonGroup>
              <Button appearance="subtle">Cancel</Button>
              <Button type="submit" appearance="primary" isLoading={props.submitting}>
                Sign up
              </Button>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  </div>
);

export default RegisterForm;
