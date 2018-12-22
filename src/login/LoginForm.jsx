/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  // HelperMessage,
  // ErrorMessage,
  // ValidMessage,
} from '@atlaskit/form';

const Styles = {
  Form: css`
    display: flex;
    margin: 0 auto;
    flex-direction: column;
  `,
  FieldWrapper: css`
    margin-bottom: 1rem;
  `
};

const LoginForm = (props) => (
  <div css={Styles.Form}>
    <Form onSubmit={props.onSubmit}>
      {({ formProps }) => (
        <form {...formProps}>
          <Field name="email" isRequired defaultValue="">
            {({ fieldProps, error }) => (
              <div css={Styles.FieldWrapper}>
                <TextField type="email" autoComplete="off" placeholder="Enter email"  {...fieldProps} />
                  {/* {!error && (
                    <HelperMessage>
                      You can use letters, numbers & periods.
                    </HelperMessage>
                  )}
                  {error && (
                    <ErrorMessage>
                      This email is already in use, try another one.
                    </ErrorMessage>
                  )} */}
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
                {/* {!error && !meta.valid && (
                  <HelperMessage>
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols.
                  </HelperMessage>
                )}
                {error && (
                  <ErrorMessage>
                    Password needs to be more than 8 characters.
                  </ErrorMessage>
                )} */}
                {/* {meta.valid && <ValidMessage>Awesome password!</ValidMessage>} */}
              </div>
            )}
          </Field>
          <CheckboxField name="remember" label="Remember me" defaultIsChecked>
            {({ fieldProps }) => (
              <Checkbox {...fieldProps} label="Always sign in on this device" />
            )}
          </CheckboxField>
          <FormFooter>
            <ButtonGroup>
              <Button appearance="subtle">Cancel</Button>
              <Button type="submit" appearance="primary" isLoading={props.submitting}>
                Login
              </Button>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  </div>
);

export default LoginForm;
